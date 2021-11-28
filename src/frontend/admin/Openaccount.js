import React, {useState} from 'react';
import './openaccount.css';
import axios from "axios";

function Openaccount() {
    const [accNum, setaccNum] = useState("");
    const [firstName, setfirstName] = useState("");
    const [email, setEmail] = useState("");
    const [lname, setlname] = useState("");
    const [accountType, setaccountType] = useState("")
    const [message, setmessage] = useState("")

    async function openacc(event){
    event.preventDefault();
    try {
        const openDetails = {
            accNum,
            email,
            firstName,
            lname,
            accountType,
        };
        console.log("------",openDetails)
        const res = await axios.post(
            "http://localhost:8080/adminAction/openAccount",
            openDetails
          );
        console.log("response", res);
        console.log(res.data)
        setmessage(res.data)
    }catch(err){
        console.error(err);
        console.log("incatch")
    }
}
    return(
        <div className="openAcc">
            <div className="openAcc_container">
                <form onSubmit={openacc}>
                    <h4>Account Number:</h4>
                    <input type="text"
                        onChange={(e) => setaccNum(e.target.value)}
                        value={accNum}
                    />
                    <h4>Email:</h4>
                    <input type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <h4>FirstName</h4>
                    <input type="text"
                        onChange={(e) => setfirstName(e.target.value)}
                        value={firstName}
                    />
                    <h4>LastName</h4>
                    <input type="text"
                        onChange={(e) => setlname(e.target.value)}
                        value={lname}
                    />
                    <h4 className="acc_header" for="acc">Select the type of Account:</h4>
                    <input type="text"
                        onChange={(e) => setaccountType(e.target.value)}
                        value={accountType}
                    />
                    <button  
                        type="submit">Submit</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Openaccount;