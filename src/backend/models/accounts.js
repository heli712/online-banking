const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  accId: {
    type: Schema.Types.ObjectId, 
    
  },
  accNum:{
    type: String,
    unique:true,
    index:true
  },
  firstName:{
    type: String,
  },
  lastName:{
    type: String,
  
  },
  userType:{
    type: String,
    
  },
  email:{
    type: String,
    //required : true,
    //ref: "customers" // how we associate each account with a user
  },
  accountType: {
    type: String,
    default:"Checking"
  },
  balance:{
    type: Number,
    default: 0
    //required = true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

const  Account = mongoose.model("Accounts", AccountSchema);
module.exports =  Account;
