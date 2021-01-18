const mongoose = require('mongoose'); 
mongoose.connect("mongodb://localhost/contactdb");  // mongoose has established connection with teh database
const db = mongoose.connection; // db->connection between mongoose and database

db.on('error', console.error.bind(console,'error has occured while trying to connect to db'));  // connection fail 

db.once('open' , function(){
  console.log("succesfully connected to the db "); 
})