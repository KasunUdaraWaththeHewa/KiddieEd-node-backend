const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT=process.env.PORT || 8070;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());

const URL=process.env.MONGODB_URL;
mongoose.connect(URL,{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useFindAndModify:false
});
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Connection Success!");
})

const gamesRouter=require("./src/api/routes/gamesRoutes.js");
app.use("/games",gamesRouter);
const guidedLessonsRouter=require("./src/api/routes/guidedLessonsRoutes.js");
app.use("/guidedLessons",guidedLessonsRouter);
const lessonPlansRouter=require("./src/api/routes/lessonPlansRoutes.js");
app.use("/lessonPlans",lessonPlansRouter);
const worksheetsRouter=require("./src/api/routes/worksheetsRoutes.js");
app.use("/worksheets",worksheetsRouter);
const userRoutes=require("./src/api/routes/user.js");
app.use("/user",userRoutes);


app.listen(PORT,()=>{
    console.log(`Server is up and running on port: ${PORT}`);
})