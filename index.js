const express = require('express'); 
const db = require('./config/mongoose');   // require the db before u fire up express 
const Contact = require('./models/contact');   // collection
const app = express();
const port = 8000; 

app.set('view engine', 'ejs'); 
app.set('views' , './views'); 

app.use( express.urlencoded() ); // mw to parse the form data. must be written before the controller code

app.use(express.static('./assets'))

/*
let contactList = [
	{
		name : "janvi", 
		phone : 123
	},
	{
	    name : "abc", 
		phone : 789
	}
]

custom middleware functions

app.use(function(req,res,next){
   console.log("middleware 1 "); 
   req.myname = "abc";          // middlware can manip req data 
   next(); 
})

app.use(function(req,res,next){
   console.log("middleware 2"); 
   console.log("printing from mw2 ",req.myname); 
   next(); 
})
*/

// delete contact by the object id since theyre unique 

app.get("/delete-contact/" , function(req,res){ // can give any name to the vaiable part phone/num etc
  console.log(req.query); // query params   req.params->  STRING PARAMS  

  Contact.findByIdAndDelete(req.query.id , function(err){
     if(err){
	 	 console.log("error has occured during deletion"); 
		 return ; 
	 }
	 return res.redirect('back'); 
  });
  
})


app.post("/create-contact" , function(req,res){  
    console.log(req.body); 
	//contactList.push(req.body); 
	Contact.create({
	  name : req.body.name ,  // body property holds the form obj 
	  phone : req.body.phone
	} , function(err, newContact){
	  if(err){
	  	  console.log("error while creating a contact"); 
		  return; 
	  }
	  console.log(newContact); 
	  return res.redirect('back'); 
	})
});



app.get("/" , function(req,res){
    Contact.find({} , function(err,contacts){  // empty query => will fetch all teh contacts in teh db
	   if(err){
	   	   console.log("error: couldnt fetch contacts from teh db"); 
		   return; 
	   }

	   return res.render("contact" , {  // viwes lie in the viwes folder so just mention the ejs filename 
           //contactlist : contactList,// keys cant have spl char.If u wanna have, enclose them with "" -> "contact-list" : contactList.access it using bracket notation
	       title : "abc",
		   contactlist : contacts 

	   });
	});

})



app.listen ( port , function(err){
    if(err){
		console.log("error whiel establishing connec"); 
		return
	}
	else{
	    console.log("successful")
	}
}); 
