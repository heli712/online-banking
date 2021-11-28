const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReccuringSchema = new Schema({
  recurId: {
    type: Schema.Types.ObjectId, 
    
  },
  recurTgtAcc:{
    type: String
  },
  recurDate:{
    type: Date
  },
  recurAmt:{
    type: Number,
  },
  recurringFlag:{
    type: String,
  },
  recurSrcAcc:{
    type: String,
  },
  recurFreq:{
    type: String
  }
  
});

const  Recurring = mongoose.model("Recurring", ReccuringSchema);
module.exports =  Recurring;