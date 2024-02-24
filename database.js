import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://admin:Mongodb_shubhanshu24@cluster0.vjnaqjx.mongodb.net/zywa_card';
const client = new MongoClient(uri);

async function connectDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    return client.db('CardStatus')
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    throw error;
  }
}
export default connectDatabase;