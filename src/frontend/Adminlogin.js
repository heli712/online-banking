import React, {useState} from 'react';
import background from './relax.jpg';
import './Login.css';
import {useHistory} from "react-router-dom";
import axios from "axios";

function Adminlogin(){
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function login(event) {
        event.preventDefault();
        try {
            const loginAdmin = {
                email,
                password,
            };
            console.log("------",loginAdmin)
            const res = await axios.post(
                "http://localhost:8080/adminRouter/login",
                loginAdmin
              );
            console.log("response", res);
            history.push("/adminpage");
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
        
    }
    
    return(
        <div className="admin_user" style={{backgroundImage:`url(${background})`}} >
            <h1>Credila</h1>
            <div className='login'>
                <div className='login_container'>
                    <h1>Welcome</h1>
                    <form onSubmit={login}>
                        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input type='password' placeholder='Password'onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <button onClick = {login} className='signin' >Login</button>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Adminlogin;