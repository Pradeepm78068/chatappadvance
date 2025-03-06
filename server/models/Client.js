const mongoose=require("mongoose")
const ClientSchema=new mongoose.Schema({
  Name:String,
  Mail:String,
  PassWord:String

})
const ClientModel=mongoose.model("Client",ClientSchema)
module.exports=ClientModel