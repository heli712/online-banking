import React from 'react';
import './Footer.css';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

function Footer() {

    return (
        <div className='footer'>
            <h1>Choose what's right for you</h1>
            <div class='icons'>
                <div className="footer_option">
                    <BusinessCenterIcon className='icon' style = {{fontSize: 60}}/>
                    <span className="des">Business</span>
                </div>
                <div className="footer_option">
                    <CreditCardIcon className='icon' style = {{fontSize: 60}}/>
                    <span className="des" >Credit Card</span>
                </div>
                <div className="footer_option">
                    <AccountBalanceWalletIcon className='icon' style = {{fontSize: 60}}/>
                    <span className="des">Account Balance</span>
                </div>
                <div className="footer_option">
                    <AccountBalanceIcon className='icon' style = {{fontSize: 60}}/>
                    <span className="des">Transaction</span>
                </div>
            </div>
            
        </div>
    )
}


export default Footer;