import React,{useEffect,useState} from "react";
import "./Checking.css";
import {Link} from "react-router-dom"
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import axios from 'axios';

function Checking(){
    const [balances, setbalance] = useState("");
    const [bal,setbal] = useState("");
    const email = localStorage.getItem("email");
    
    useEffect(() => {
        const balance = async () => {
            const response = await axios.post("http://localhost:8080/adminAction/balance",{email: email});
            console.log("_____>>>",email)
            console.log("----",response.data)
            setbalance(response.data.checkingBalance)
            setbal(response.data.savingBalance)
        }
        balance()
    }, [])
    
    return(
        <div className="checking">
            <div className="balance">
                <Link className="link_deposite" to="/seechecking">
                    <div className="checkingnum">
                    <h1 className="cname">Checking Account Number: {localStorage.getItem("checkingAccount")}</h1>
                    </div>
                </Link>
                <Link className="link_deposite" to="/seesaving">
                    <div className="savingnum">
                        <h1 className="sname">Saving Account Number: {localStorage.getItem("savingAccount")}</h1>
                    </div>
                </Link>
                <div className="csb">
                    <h1 className="cb">Checking Balance: {balances}</h1>
                    <h1 className="sb">Saving Balance: {bal}</h1>
                </div>
            </div>
            
            {localStorage.getItem("savingAccount") !== "0" && localStorage.getItem("checkingAccount") !== "0" &&
                <div className="transactions">
                <Link className="link_deposite" to="/internal">
                    <div class="deposite_">
                        <CreditCardOutlinedIcon className="dicon"style = {{fontSize: 150}}/>
                        <span className="dname">Internal Transaction</span>
                    </div>
                </Link>
            </div>}
            
            
        </div>
    )
}

export default Checking;