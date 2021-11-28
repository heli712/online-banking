const express = require('express')
const router = express.Router()
const Transactions = require('../models/transaction')
const Admin = require('../models/adminModel')
const Customers = require('../models/customers')
const Accounts = require('../models/accounts')


router.post('/', async (req, res) => {
  console.log("hi")
  console.log(req.body)
  try{
    const customers = await Customers.findOne({email: req.body.email})
    console.log(customers)
    res.send(customers)
  }catch (err) {
    console.log(err);
    res.status(404).send("Error in catch")
  }
 
/*
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
    const customers = new Customers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const newCustomer= await customers.save()
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
      }
    
    //res.send("The customer was added") */
})

router.post('/balance',async (req, res) => {
  console.log("In backend")
  const sav_account = await Accounts.findOne({email: req.body.email, accountType:"savings"})
  const check_account = await Accounts.findOne({email: req.body.email, accountType:"checkings"})
  console.log(sav_account)
  console.log(check_account)
  res.json({checkingBalance: check_account.balance, savingBalance: sav_account.balance})
})

// Getting all
router.get('/openAccount', async (req, res) => {
    const customers = await Customers.find({status:"pending"})
    res.send(customers)
    Customers.find({status:"approve"} ,function(err, docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    })
})
//=========================
//Opening an account
router.post('/openAccount', async (req, res) => {
  try {
      console.log("____on Backend",req.body);
      const { accNum, email, firstName,lname, accountType} = req.body;
      console.log("acc", req.body)
      console.log("===>>>", req.body.firstName)
      if(accNum.length == 0 || email.length == 0 || firstName.length == 0 || accountType.length == 0) {
        return res.send("Enter all the fields correctly")
      }

      const existingAccNum = await Accounts.findOne({accNum})
      console.log("Here")
      if (existingAccNum)
        return res.send(
          " account number already exists.",
        );
        console.log("After checking")
        console.log(req.body.email)
        const existingCustomer = await Customers.findOne({email})
        console.log("===>>>", existingCustomer)
        if(existingCustomer === null) 
          return res.send("Customer does not exist")
    
        Customers.updateOne({email:req.body.email}, 
          {status:"approve"}, function(err,docs){
            if(err){
              res.status(500).send(err)
            }
            else if(!docs){
              return res.status(200).send("status updated")
            } 
          }
          );
          console.log(req.body.accountType)
          if(req.body.accountType === 'savings')
          {
            Customers.updateOne({email: req.body.email},
            {savingsAcc: req.body.accNum}, function(err,udocs) {
              if(err) {
                res.send(err);
              }
              else if (! udocs){
                return res.status(205).send(
                   "Customer not found "
              )}
            })}
            else{
              Customers.updateOne({email: req.body.email},
                {checkingsAcc: req.body.accNum}, function(err,udocs) {
                  if(err) {
                    res.send(err);
                  }
                  else if (! udocs){
                    return res.status(205).send(
                      "Customer not found "
                  )
                }
                })
            }
      const newAccount = new Accounts({
          accNum,
          email, 
          firstName,
          lname,
          accountType
      }) ;
      console.log("Before saving")
      const saveAccount = await newAccount.save();
      res.status(201).send("Account Created...!!!");
  }catch (err) {
      console.log("In Catch backend catch")
      console.error(err);
      res.status(500).send();
    }
  });
//===================================================
// Closing an account 

router.post('/closeAccount', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
    console.log("====>>>>",req.body.accNum, req.body.email);
    if(req.body.accNum.length == 0 || req.body.email.length == 0) {
      return res.send("Enter all the fields correctly")
    }
  Accounts.findOne({accNum: req.body.accNum}, function (err, docs) {
    if(err){
      return res.status(500).send(err);
    }
    if(docs===null){
      return res.send("Account does not exist...!!!");
      // res.status(404).send({
        //message: "Account not found "
    //})
    }
   else{ 
    if(docs.accountType === 'savings')
    {
      Customers.updateOne({email: req.body.email},
        {savingsAcc: "0"}, function(err,udocs) {
          if(err) {
            return res.send(err);
            
          }
          else if (! udocs){
            res.send("Customer not found...!!!")
            return res.status(205).send(
              "Customer not found "
              
          )
        }
        
        })
    }
      else{
        Customers.updateOne({email: req.body.email},
          {checkingsAcc: "0"}, function(err,udocs) {
            if(err) {
              return res.send(err);
              
            }
            else if (! udocs){
              return res.status(205).send(
                "Customer not found "
            )
          }
          
          })
      }
  
	Accounts.deleteOne({accNum: req.body.accNum}, function(err,udocs){
    //console.log(udocs.accNum)
    return res.send("Account closed successfully...!!!");
  })
}})	
	//	else
		//	return res.send('Successfully! Account has been closed.');
  
})

router.post('/deposit', async (req,res,next) => {
  if(req.body.accNum === "" || req.body.amount === "") {
    return res.send("Enter appropriate fields")
  }
  Accounts.findOne({accNum: req.body.accNum}, function (err, docs) {
    if(err){
      res.status(500).send(err);
    }
    else   if(docs===null){
      return res.send("Account does not exist");
      
    }
    else{
      var changebal = parseFloat(docs.balance) + parseFloat(req.body.amount);
      Accounts.updateOne({accNum: req.body.accNum},
        {balance: changebal}, function(err,udocs) {
          if(err) {
            res.send(err);
          }
          else if (docs.accNum != req.body.accNum){
            return res.send(
              "Account not found "
          )
        }
          else {
            const transaction= new Transactions({
              srcAcc: req.body.srcAcc? req.body.srcAcc : "",
              amount: req.body.amount,
              tgtAcc: req.body.accNum,
              transactionType: req.body.transactionType? req.body.transactionType:'Deposit',
              recurringFlag: req.body.recurringFlag? req.body.recurringFlag:'false'
            })
    
          try{
            const newTransaction=  transaction.save()
            //res.status(201).json(newTransaction)
          } catch (err) {
            res.status(205).send("Enter appropriate fields ")
          }
            res.status(200).send("Deposit sucessful...!!!");
          }
        });
        //console.log(changebal);
      //console.log(parseFloat(docs.balance) + parseFloat(req.params.amount));
    }
  })
})

router.post('/withdraw', async (req,res) => {
  console.log("in backend", req.body.accNum)
  console.log("")
  if(req.body.accNum.length == 0 || req.body.amount.length == 0) {
    return res.send("Enter all the fields correctly")
  }
  Accounts.findOne({accNum: req.body.accNum}, function (err, docs) {
    console.log(docs)
    if(err){
      res.send(err);
    }
    else if (docs === null){

      return res.send(
         "Account not found "
    )
  }
    else if (docs.balance<req.body.amount){
      return res.send(
         "Insufficient balance "
    )
  }
    else{
      var changebal = parseFloat(docs.balance) - parseFloat(req.body.amount);
      
      Accounts.updateOne({accNum: req.body.accNum},
        {balance: changebal},async function(err,udocs) {
          if(err) {
            res.send(err);
          }else {
            const transaction= new Transactions({
              srcAcc: req.body.accNum,
              amount: req.body.amount,
              tgtAcc: req.body.accNum? req.body.tgtAcc :"",
              transactionType: req.body.transactionType? req.body.transactionType:'Withdrawal',
              recurringFlag: req.body.recurringFlag? req.body.recurringFlag:'false'
            })
            
            console.log(transaction);
            try{
             transaction.save()
             .then((response)=>{
              res.status(200).send("Withdrawal Successful...!!!");
             })
              //console.log("transaction->",transaction);
              .catch((e)=>{
                console.log(e);
              })
              
            }
            catch(error){
              console.log("Incatch", error);
            }
            
          }
        });
    }
  })
})


module.exports = router;