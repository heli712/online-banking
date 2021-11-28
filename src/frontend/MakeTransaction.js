import React, {useState} from 'react';
import axios from "axios";
import './makeTransaction.css'

function MakeTransaction() {
   const [srcAcc, setsrcAcc] = useState("");
   const [tgtAcc, settgtAcc] = useState("");
   const [amount, setamount] = useState("");
   const [rec, setrec] = useState("");
   const [recdate,setrecdate] = useState("");
   const [freq, setfreq] = useState("");
   const [message, setmessage] = useState("");


   async function transaction(event) {
       event.preventDefault();
       try {
        const transData = {
            srcAcc,
            tgtAcc,
            amount,
            rec,
            recdate,
            freq
        }
        axios.post("http://localhost:8080/transactionRouter/makeATransaction",
            transData
        ).then(function(response){
             console.log(response)
            setmessage(response.data)
         })

       } catch (error) {
           console.log("Incatch",error)
       }
   }
    return (
        <div className="transaction_page">
            <div className="transaction_container">
                <form onSubmit={transaction}>
                    <h4>Enter Source Account Number:</h4>
                    <input
                        type="text"
                        onChange={(e) =>setsrcAcc(e.target.value)}
                        value={srcAcc}
                    />
                    <h4>Enter Target Account Number:</h4>
                    <input
                        type="text"
                        onChange={(e) =>settgtAcc(e.target.value)}
                        value={tgtAcc}
                    />
                    <h4>Specify the amount:</h4>
                    <input type="text"  
                        onChange={(e) => setamount(e.target.value)}
                        value={amount}
                    ></input>
                    <h4>Recurring:</h4>
                    <input type="text"  
                        onChange={(e) => setrec(e.target.value)}
                        value={rec}
                    ></input>
                    <h4>Recurring Date:</h4>
                    <input type="text" 
                        onChange={(e) => setrecdate(e.target.value)}
                        value={recdate}
                    ></input>
                    <h4>Recurring Frequency:</h4>
                    <input type="text" 
                        onChange={(e) => setfreq(e.target.value)}
                        value={freq}
                    ></input>
                    <button  type="submit">Make Payment</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    )
}


export default MakeTransaction;