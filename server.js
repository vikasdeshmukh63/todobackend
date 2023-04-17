const express = require("express");
var cors = require('cors')
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const dbConfig = require("./dbConfig/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes")
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware")

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// using routes 
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/task",taskRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
});


app.use(errorMiddleware);