import express from "express";
import connectDatabase from "./database.js";
import {readDataFolder} from "./updater.js";
import readDataFromCSV from "./readDataFromCSV.js";

const app = express();

readDataFromCSV();
readDataFolder();

async function getDataFromDatabase(collectionName) {
    try {
        const db = await connectDatabase();
        const collection = db.collection(collectionName);
        const data = await collection.find({}).toArray();
        return data;
    } catch (error) {
        throw error;
    }
}

async function getCardStatus(identifier) {
    try {
        const pickUpData = await getDataFromDatabase(
            "Sample_Card_Status_Info_-_Pickup"
        );
        const deliveryExceptionData = await getDataFromDatabase(
            "Sample_Card_Status_Info_-_Delivery_exceptions"
        );
        const deliveryData = await getDataFromDatabase(
            "Sample_Card_Status_Info_-_Delivered"
        );
        const returnedData = await getDataFromDatabase(
            "Sample_Card_Status_Info_-_Returned"

        );
        
        let status = "";
        let card=returnedData.find((data) => {
            const userContactLastNineDigits = data["User contact"].match(/\d+/g).join('').slice(-9);
            return (
                data["Card ID"] === identifier ||
                userContactLastNineDigits === identifier.slice(-9)
            );
        });
        if(card){
            status="Returned";
        }
        else{
            card=deliveryData.find((data) => {
              const userContactLastNineDigits = data["User contact"].match(/\d+/g).join('').slice(-9);
                return (
                    data["Card ID"] === identifier ||
                    userContactLastNineDigits === identifier.slice(-9)
                );
            });
            if(card){
                status="Delivered";
            }
            else{
                card=deliveryExceptionData.find((data) => {
                  const userContactLastNineDigits = data["User contact"].match(/\d+/g).join('').slice(-9);
                    return (
                        data["Card ID"] === identifier ||
                        userContactLastNineDigits === identifier.slice(-9)
                    );
                });
                if(card){
                    status="Delivery Exception";
                }
                else{
                    card=pickUpData.find((data) => {
                      const userContactLastNineDigits = data["User contact"].match(/\d+/g).join('').slice(-9);
                        return (
                            data["Card ID"] === identifier ||
                            userContactLastNineDigits === identifier.slice(-9)
                        );
                    });
                    if(card){
                        status="In Transit";
                    }
                }
            }
        }

        if (!status) {
            status = "Card not found";
        }

        return { status,card: {
            'Card ID': card['Card ID'],
            'User contact': card['User contact'],
            Timestamp: card.Timestamp,
            'Comment':(card['Comment']?card['Comment']:"")
          }
        };
    } catch (error) {
        throw error;
    }
}

app.use("/get_card_status", async (req, res) => {
    try {
        const { phoneNumber, cardId } = req.query;
        const identifier = cardId ? cardId : phoneNumber;
        if (!identifier) {
            return res.status(400).json("Identifier is required");
        }

        const cardStatus = await getCardStatus(identifier);
        res.json(cardStatus);
    } catch (error) {
        console.log("Error in retrieving card status", error);
        res.sendStatus(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
