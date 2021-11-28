const mongoose= require('mongoose')
const Schema = mongoose.Schema



const transactionsSchema = new mongoose.Schema({
    transactionType:{
        type: String,
    },
    srcAcc: String,
    tgtAcc: String,
    trasactionType: String,
    amount: Number,
    recurringFlag: Boolean,
    recuuringId : Number,
    transactionComment: String,
    date:{
        type:  Date,
        default : Date.now
    }
})

const Transaction = mongoose.model("transactions", transactionsSchema)
module.exports = Transaction