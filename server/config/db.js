import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected");
  }
  catch (error) {
    console.log(`Database Coonection Error : ${error}`)
    process.exit(1);
  }
}

export default dbconnect;