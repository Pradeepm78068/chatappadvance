const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
 const app=express()
 const ClientModel=require("./models/Client")
 const GroupModel=require("./models/Groups")
 app.use(express.json())
 app.use(cors())
  const {Server}=require('socket.io')
  const http=require('http')
  const server=http.createServer(app)
  const io=new Server(server,{
     cors:{
         origin:'*',
         methods:["GET","POST"]
     }
  })

mongoose.connect("mongodb+srv://717823p337:pradeepm%4078@client.tetjj.mongodb.net/?retryWrites=true&w=majority&appName=client")
.then(()=>{
    console.log("mongo db connected")
})
.catch(err=> console.log(err));

app.post('/register',async(req,res)=>{
    const {Name,Mail,PassWord}=req.body;
    const user=await ClientModel.findOne({Mail});
    if(user)
    {
        return res.json("already registered");
    } 
   ClientModel.create(req.body) 
   .then(Client => res.json(Client))
   .catch(err =>{res.json(err)})
})

//it is for LOGIN
app.post('/Login',(req,res)=>{
    const{Mail,PassWord}=req.body;
    ClientModel.findOne({Mail})
    .then(user=>{
        if(user){
            if(user.PassWord===PassWord)
            {
                console.log(user.Name);
                
                res.json({message:"success",name:user.Name})    
            }else
            res.json("wrong password");
        }else {
            res.json("No record Found");
        }
    })
 })


app.post('/createGroup',async(req,res)=>{
    try{
        const{Name}=req.body;
    const user= await GroupModel.findOne({Name});
    if(user)
    {
        return res.json({message:"already registered"});
    }
    await GroupModel.create({Name})  ;
    res.json({message:"Group Created "})
   }catch(err)
   {
    console.error("Error creating group:", err);
    res.status(500).json({ message: "Error occurred", error: err.message });
   }
   
})
app.post('/LoginWithCode',(req,res)=>{
    const{Name}=req.body;
    GroupModel.findOne({Name})
    .then(group=>{
        if(group){
             res.json({message:"Joined"});
        }else {
             res.json({message:"No Group Found"});
        }
    }).catch(err => console.log(err))
 })



 io.on("connection",(socket)=>{
    console.log(socket.id);
    
    socket.on("join_room", (room) => {
        socket.join(room);
      });
      socket.on("message", ({ text, sender, room }) => {
        socket.to(room).emit("rec_msg", { text, sender }); 
      });
    
})
 server.listen(3001,()=>{
    console.log("socket and sever connected");
})
