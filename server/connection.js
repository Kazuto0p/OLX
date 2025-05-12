
import mongoose from "mongoose";

export default async function connection() {
    const db = await mongoose.connect("mongodb://localhost:27017/OLX")
    console.log('DataBase connected');

    return db
    
}

