const mongoose = require('mongoose'); 

const contactSchema = new mongoose.Schema({  //contact -> document. contactList -> collection. Schema -> definition of the fields
  name : {    // name , phone -> fields
  	  type : String, 
	  required: true,
  },

  phone: {
  	  type: String, 
	  required : true
  }

});

const Contact = mongoose.model('Collection' , contactSchema); // defining teh name of teh collection and which schema it's modelled after'
module.exports = Contact;   // exporting collection