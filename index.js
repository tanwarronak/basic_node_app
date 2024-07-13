import express from 'express'
import {userSchemaa} from './datacontroller/usershandle.js'
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.status(200).render("index")
    
})
app.post("/gotit",async(req,res)=>{
    try{
       const userdata = await userSchemaa.create(req.body);
       res.redirect("/users")
    
    }
   catch(error){
console.log(error);
res.status(404).send("some thing went wrong");
   }
})

app.get("/users",async (req,res)=>{
    const userdata = await userSchemaa.find()
    res.render("users",{userdata:userdata})
})
app.get("/Deleteuser/:id",async (req,res)=>{
    const userdata = await userSchemaa.findOneAndDelete({name:req.params.id})
   res.redirect("/users")
})
app.get("/Updateuser/:id",async(req,res)=>{
   const userdata = await userSchemaa.findOne({name:req.params.id})
   res.render("Updated",{userdata,userdata})
})
app.post("/Updateuser/:userid",async (req,res)=>{
    const {name,email,img} = req.body
   await userSchemaa.findByIdAndUpdate(req.params.userid,{name,email,img})
      res.redirect("/users")
})

app.listen(4000);