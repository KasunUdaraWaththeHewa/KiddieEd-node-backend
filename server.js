const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

//import routes
const Routes = require('./src/api/routes/index');

//app midleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

//route midleware
app.use(Routes);

mongoose.set('strictQuery', false);
mongoose.connect(URL).then(()=>{
    console.log('🔄 DB connected');
}).catch((err)=>{
    console.log(`⚠️ DB connection error: ${err.message}`)
});

app.listen(PORT,() => {
    console.log(`🚀 Server is up and running on PORT ${PORT}`);
});