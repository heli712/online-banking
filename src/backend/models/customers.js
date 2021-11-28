const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  savingsAcc: { 
    type:String,
    default: 0
  },
  checkingsAcc: { 
    type:String,
    default: 0
  },
  status: {
    type: String,
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

/*customerSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});*/

const Customer = mongoose.model("Customers", customerSchema);
module.exports= Customer