import axios from 'axios';
import React,{useState} from 'react';
import "./Deposite.css"

function Deposite() {

   const [accNum, setaccNum] = useState("");
   const [amount, setamount] = useState("");
   const [message, setmessage] = useState("");

   async function deposite(event) {
       event.preventDefault();
       try {
        const accdetails = {
            accNum,
            amount,
        };
        console.log("------",accdetails)
        const res = await axios.post(
            "http://localhost:8080/adminAction/deposit",
            accdetails
          );
        console.log("response", res);
        setmessage(res.data);
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
   }

    return (
        <div className="deposite_page">
            <div className="deposite_container">
                <form onSubmit={deposite}>
                    <h4>Enter the account number:</h4>
                    <input
                        type="text"
                        onChange={(e) =>setaccNum(e.target.value)}
                        value={accNum}
                    />
                    <h4 className="bottom_header">Specify the amount you would like to deposite:</h4>
                    <input type="text" 
                        onChange={(e) => setamount(e.target.value)}
                        value={amount}
                    ></input>
                    <button  type="submit">Deposite</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    ) 
}

export default Deposite;