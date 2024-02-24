import fs from 'fs';
import path from 'path';
import connectDatabase from './database.js';
import csvtojson from 'csvtojson';

async function readDataFromCSV() {
  try {
    const db = await connectDatabase();
    const dataFolder = path.join('data');

    fs.readdirSync(dataFolder).forEach(async (file) => {
      const collectionName = path.parse(file).name;

      const collection = db.collection(collectionName.replace(/ /g, '_'));

      const csvFilePath = path.join(dataFolder, file);
      const jsonArray = await csvtojson().fromFile(csvFilePath);

      const transformedArray = jsonArray.map(obj => {
        if(!obj['User contact']){
          obj['User contact'] = obj['User Mobile'];
          delete obj['User Mobile'];
        }
        return obj;
      });

      await collection.deleteMany({});
      await collection.insertMany(transformedArray);
      console.log(`Data imported into ${collectionName} collection`);
    });
  } catch (error) {
    console.error('Error importing data:', error);
  } 
}
export default readDataFromCSV;