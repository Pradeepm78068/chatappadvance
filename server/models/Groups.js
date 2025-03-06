const mongoose=require("mongoose");
const GroupSchema=new mongoose.Schema({
  Name:String,
})
const GroupModel=mongoose.model("Groups",GroupSchema)
module.exports=GroupModel