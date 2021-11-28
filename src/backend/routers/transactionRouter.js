const express = require('express')
const router = express.Router()
const Transactions = require('../models/transaction')
const Accounts = require('../models/accounts')
const Recurring = require('../models/recurring')

function createDate(days, months, years) {
  var date = new Date(); 
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;    
}

// Getting all
router.post('/SeeAllTransactions', async (req, res) => {
  console.log("===>>>",req.body.accNum)
  console.log("===>>>>",req.body.transactionType)
  const transactions = await Transactions.find({$or: [{srcAcc:req.body.accNum},{ tgtAcc:req.body.accNum}]}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log(req.body.srcAcc);
        console.log("First function call : ", docs);
    }
})
  res.send(transactions.filter(transaction => transaction.date >= createDate(0, -6, -1)))
})

router.get('/SeeAllDeposits', async (req, res) => {
const transactions = await Transactions.find({$or: [{srcAcc:req.body.accNum},{ tgtAcc:req.body.accNum}],transactionType:"Deposit"}, function (err, docs) {
  if (err){
      console.log(err);
  }
  else{
      console.log(req.body.srcAcc);
      console.log("First function call : ", docs);
  }
})
res.send(transactions.filter(transaction => transaction.date >= createDate(0, -6, -1)))
})


router.post('/makeATransaction', async (req, res) => {
  if (req.body.amount<= 0) {
    return res.status(204).send("Amount should be greater than Zero ")}
        
  if (req.body.srcAcc === null || req.body.srcAcc === "") {
    return res.status(204).send( "Source account cannot be empty ")}

  if (req.body.tgtAcc === null || req.body.tgtAcc === "") {
    return res.status(204).send("Target account cannot be empty ")}

  if (req.body.tgtAcc === req.body.srcAcc){
    return res.status(204).send( "Source account and target account cannot be same ")}

  await Accounts.findOne({accNum: req.body.srcAcc}, await function (err, docs) {
    global.src = docs})
  await Accounts.findOne({accNum: req.body.tgtAcc}, await function (err, docs) {
     global.tgt=docs})
    
  if(req.body.recurringFlag === "true"){
      if (req.body.recurFreq === null || req.body.recurFreq === "" || req.body.recurDate === null || req.body.recurDate === "") {
        return res.send("Recurring data missing ")
    }
    if (req.body.recurDate === 0 || req.body.recurDate > 31) {
      return res.send( "Incorrect recurring date ")
    }
    } 
  if(global.src===null || global.tgt===null){
       res.send("Accounts not found")
     }
        
else{
  //Check if balance is suffiencient
  await Accounts.findOne({accNum: req.body.srcAcc}, await function (err, docs) {
  if(err){
    res.status(500).send(err);
  }
  else if(docs===null){
    res.send("Source account not found")
  }
  else{
    
    if(docs.balance< req.body.amount){
      return res.send("Insufficient balance ")
  }
}  
}  ) 
  // Deduct Balance from Source account
        Accounts.findOne({accNum: req.body.srcAcc}, function (err, docs) {
        if(err){
          console.log(err);
        }
        else{
          let changebal = parseFloat(docs?.balance) - parseFloat(req.body.amount);
          Accounts.updateOne({accNum: req.body.srcAcc},
            {balance: changebal}, function(err,udocs) {
              if(err) {
                console.log(err);
              }
            });
        }
      })
      //Add amount to target account
      Accounts.findOne({accNum: req.body.tgtAcc}, function (err, docs) {
        if(err){
          console.log(err);
        }
        else{
          let changebal = parseFloat(docs.balance) + parseFloat(req.body.amount);
          Accounts.updateOne({accNum: req.body.tgtAcc},
            {balance: changebal}, function(err,udocs) {
              if(err) {
                console.log(err);
              }
            });
        }
      })
      //Added this transaction to transaction schema
   
        const transaction= new Transactions({
          srcAcc: req.body.srcAcc,
          amount: req.body.amount,
          tgtAcc: req.body.tgtAcc,
          transactionType: req.body.transactionType,
          recurringFlag: req.body.recurringFlag 
        })
        const newTransaction=  transaction.save()

      // Add recurring data to recurring table
      if(req.body.recurringFlag==="true") {
        const recurring= new Recurring({
          recurSrcAcc: req.body.srcAcc,
          recurAmt: req.body.amount,
          recurTgtAcc: req.body.tgtAcc,
          recurDate: req.body.recurDate,
          recurFreq: req.body.recurFreq 
        })
        
          const newRecurring = recurring.save()
        }
        return res.status(200).send("Transaction completed successfully!")
    
  }
    
})
    

module.exports = router