import app from './server.js';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import MakeupDAO from './dao/MakeupDAO.js';
// import ReviewsDAO from './dao/reviewsDAO.js'; // Assuming you have a similar DAO for reviews

async function main() {
  dotenv.config();

  const client = new MongoClient(process.env.MONGODB_URI);

  const port = process.env.PORT || 8000;

  try {
    await client.connect();
    await MakeupDAO.injectDB(client);
    // await ReviewsDAO.injectDB(client); // Assuming you have a similar function for injecting reviews DAO

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
