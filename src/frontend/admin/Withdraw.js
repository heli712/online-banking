import React,{useState} from 'react';
import "./Withdraw.css"
import axios from "axios";

function Withdraw() {

    const [accNum, setaccNum] = useState("");
    const [amount, setamount] = useState("");
    const [message, setmessage] = useState("");
    
    async function withdraw(event) {
        event.preventDefault();
        try {
            const accdetails = {
                accNum,
                amount,
            };
            console.log("------",accdetails)
            const res = await axios.post(
                "http://localhost:8080/adminAction/withdraw",
                accdetails
              );
            console.log("response", res);
            setmessage(res.data)
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
   }
    return (
        <div className="withdraw_page">
            <div className="withdraw_container">
                <form onSubmit={withdraw}>
                    <h4>Select the account number you would like to withdraw from:</h4>
                    <input 
                        type="text"
                        onChange={(e) => setaccNum(e.target.value)}
                        value={accNum}
                    />
                    <h4 className="wbottom_header">Specify the amount you would like to withdraw:</h4>
                    <input type="text" 
                        onChange={(e) => setamount(e.target.value)}
                        value={amount}
                    ></input>
                    <button type="submit">Withdraw</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Withdraw;