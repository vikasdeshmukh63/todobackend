const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("connected successfully to database");
});

db.on("error",()=>{
    console.log("database connection failed");
});