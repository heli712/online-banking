import React from "react";
import "./Checking.css";
import {Link} from "react-router-dom"
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';

function AdminChecking(){
    return(
        <div className="checking">
            <div className="balance">
                <Link to="/openaccount" className="link_deposite">
                    <div className="checking_account">
                        <h1 className="cname">Add Account</h1>
                    </div>
                </Link>
                <Link to="remaccount" className="link_deposite">
                    <div className="saving_account">
                        <h1 className="sname">Remove Account</h1>
                    </div>
                </Link>
            </div>
            <div className="transactions">
                <Link className="link_deposite" to="/deposite">
                    <div class="deposite_">
                        <CreditCardOutlinedIcon className="dicon"style = {{fontSize: 150}}/>
                        <span className="dname">Deposite</span>
                    </div>
                </Link>
                <Link className="link_withdraw" to="/withdraw">
                    <div className="withdraw">
                        <ReceiptOutlinedIcon className="wicon" style = {{fontSize: 150}}/>
                        <span className="wname">Withdraw</span>
                    </div>
                </Link>
            </div>
            
        </div>
    )
}

export default AdminChecking;