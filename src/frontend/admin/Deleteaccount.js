import React,{ useState} from 'react';
import './delacc.css';
import axios from "axios";

 
function Deleteaccount() {
    const [accNum, setaccNum] = useState("");
    const [email, setEmail] = useState("");
    const [message, setmessage] = useState("");

    async function remove(event){
        event.preventDefault();
        try {
            const accdetails = {
                accNum,
                email
            }
            console.log("------",accdetails)
            const res = await axios.post(
                "http://localhost:8080/adminAction/closeAccount",
                accdetails
              );
           
            console.log("response", res);
            setmessage(res.data)

        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }
    return(
        <div className="remAcc">
            <h1>Removing Customer's Account</h1>
            <div className="remAcc_container">
            <form onSubmit={remove}>
                <h4>Enter the Account Number</h4>
                <input
                    type="text"
                    onChange={(e) => setaccNum(e.target.value)}
                    value={accNum}
                />
                <h4>Enter Email:</h4>
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <button type="submit">Remove</button>
            </form>
            <p>{message}</p>
            </div>
        </div>
    )
}



export default Deleteaccount;