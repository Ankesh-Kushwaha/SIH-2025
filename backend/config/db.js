import mongoose from 'mongoose';

const databaseConnection = async () => {
  //console.log(process.env.MONGO_DB_URI);
  try {
      mongoose.connect(
        process.env.MONGO_DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => console.log("✅ Connected to MongoDB"))
      .catch(err => console.error("❌ DB connection error:", err));
  }
  catch (err) {
    throw new Error('Error while connecting to dataBase', err);
  }
}

export default databaseConnection;