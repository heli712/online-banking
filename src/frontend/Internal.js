import React, {useState} from 'react';
import axios from "axios";
import './internal.css';

const Internal = () => {
    const [option, setOption] = useState("s-c");
   const [amount, setamount] = useState("");
   const [rec, setrec] = useState("");
   const [recdate,setrecdate] = useState("");
   const [freq, setfreq] = useState("");
    const [message, setmessage] = useState("");

   async function transaction(event) {
    event.preventDefault();
    let srcAcc = ""
    let tgtAcc = ""
    if (option === "s-c") {
        srcAcc = localStorage.getItem("savingAccount")
        tgtAcc = localStorage.getItem("checkingAccount")
    } else {
        tgtAcc = localStorage.getItem("savingAccount")
        srcAcc = localStorage.getItem("checkingAccount")
    }
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

    return(
        <div className="internal_page">
            <div className="internal">
                <form onSubmit={transaction}>
                <select name="Option" onChange={(e) => setOption(e.target.value)}>
                    <option value="s-c">Saving to Checking</option>
                    <option value="c-s">Checking to Saving</option>
                </select>
                    <h4>Specify the amount:</h4>
                    <input type="text" className="internal_amount" 
                        onChange={(e) => setamount(e.target.value)}
                        value={amount}
                    ></input>
                    <h4>Recurring:</h4>
                    <input type="text" className="internal_amount" 
                        onChange={(e) => setrec(e.target.value)}
                        value={rec}
                    ></input>
                    <h4>Recurring Date:</h4>
                    <input type="text" className="internal_amount" 
                        onChange={(e) => setrecdate(e.target.value)}
                        value={recdate}
                    ></input>
                    <h4>Recurring Frequency:</h4>
                    <input type="text" className="internal_amount" 
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


export default Internal;