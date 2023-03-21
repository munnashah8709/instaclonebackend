const mongose=require("mongoose")

const table=new mongose.Schema({
    Location:String,
    Discription:String,
    Name:String,
    image:{
    data:Buffer,
    contentType:String
   },
     Dates:String
})

const User= new mongose.model("User",table);
module.exports=User;