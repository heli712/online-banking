import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import axios from "axios";

function AdminHeader(){
    async function logout() {
        console.log("------logingout")
            const res = await axios.get(
                "http://localhost:8080/adminRouter/logout"
              );
            console.log("response", res);
    }
    return (
        <div className='header'>
            <div className="header_row">
                <Link className="link_home" to="/adminpage">
                    <b><h1 className="name">Credila</h1></b>
                </Link>
                <div className='header_nav'>
                    <Link className="link_check" to="/adminpage">
                        <b><span className="option">Checking & Savings</span></b>
                    </Link>
                    <Link className="link_check" to="/pending">
                    <b><span className="option">Customer Request</span></b>
                    </Link>
                    <b><span className="option">Check Deposite</span></b>
                    <Link className="link_check" to="/">
                        <b><span className="option" onChange={logout}>Logout</span></b>
                    </Link>
                </div> 
            </div>         
        </div>
    )
}

export default AdminHeader;