import React, {useEffect} from 'react';
import './waitfor.css';
import axios from "axios";
import {useHistory} from 'react-router-dom'

const WaitForAdmin = () => {
    const history = useHistory();
    const email = localStorage.getItem("email");

    useEffect(() => {
        const asFun = async () => {
            const response = await axios.post("http://localhost:8080/adminAction",{email: email});
            console.log("_____>>>",email)
            console.log(response)
            if(response.data.status === "approve"){
                history.push("/Userlogin")
            }
        }
        asFun()
    }, [])

    return (
        <div className="waitforadmin">
            <div className="message">
                <h1>Wait for Admin</h1> 
                <h1>to Approv Request...!!!</h1>
            </div>
        </div>
    )
}

export default WaitForAdmin;