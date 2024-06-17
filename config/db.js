import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // if db is connected dont connect again

  if (connected) {
    console.log("mongodb is already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    connected = true;
    console.log("mongodb is now connected");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
