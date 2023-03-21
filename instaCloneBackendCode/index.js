const expres=require("express");
const multer=require("multer");
const fs=require("fs");
const path=require("path")
const app=expres();
app.use(expres.json());
const cors=require("cors")
const PORT=8000;
app.use(cors())
const User=require("./src/schema/model");
//require("../InstaBackendCode/src/connection/connect")


const mongoose = require("mongoose");
const url ="mongodb+srv://munnashah8709:Munnashah8709@cluster0.7pxur9r.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(url,(err)=> {
    if(err){
      console.log("err")
    }else{
      console.log("connected to db")
    }
  });

// the is multer code ,befor using this multer you need to instal multer npm
const Storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
})
const upload = multer({
    storage:Storage  
})

app.post("/user", upload.single("image"), (req, res)=>{
 const data= new User({
      Location:req.body.Location,
      Discription:req.body.Discription,
      Name:req.body.Name,
      Dates:req.body.Dates,
    image:{
        data: fs.readFileSync("../InstaBackendCode/uploads/"+  req.file.filename),
        contentType:"image/jpg"
    }})
     data.save().then(()=>{ res.send("successfull")}).catch((err)=>{console.log(err)}); 
})

app.get("/", async(req, res)=>{
    try{
        const reciev=await User.find({});
        res.status(201).send(reciev);

    }catch(e){
       res.status(400).send(e)
    }
})



app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})