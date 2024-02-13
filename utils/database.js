import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    
    console.log("i am here in databse")

    if(isConnected) {
        console.log("MongoDB is already connected");
        return;    
    }

    try {
        console.log("I am in database connection")
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ithardwarepart",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDb connected');
    } catch (error) {
        console.log(error);
    }
}