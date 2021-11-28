import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import axios from "axios";

function Header(){
    async function logout() {
        console.log("------logingout")
            const res = await axios.get(
                "http://localhost:8080/userRouter/logout"
              );
            console.log("response", res);
    }
    return (
        <div className='header'>
            <div className="header_row">
                <Link className="link_home" to="/Checking">
                    <b><h1 className="name">Credila</h1></b>
                </Link>
                <div className='header_nav'>
                    <Link className="link_check" to="/Checking">
                        <b><span className="option">Checking & Savings</span></b>
                    </Link>
                    <b><span className="option">Credit Cards</span></b>
                    <Link className="link_check" to="/transaction">
                    <b><span className="option">Transaction</span></b>
                    </Link>
                    <Link className="link_check" to="/">
                        <b><span className="option" onChange={logout}>Logout</span></b>
                    </Link>
                </div> 
            </div>         
        </div>
    )
}

export default Header;