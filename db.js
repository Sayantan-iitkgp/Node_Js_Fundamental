const mongoose= require('mongoose');

//Define mongodb url and connect url
const mongoURL='mongodb://localhost:27017/hotels';

//set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
})

//get the default connection
//mongoose maintain a default connection object representing the MongoDB connection.

const db=mongoose.connection;

//Define event listners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',()=>{
    console.log('MongoDB connection error');
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//export the module
module.exports= db;