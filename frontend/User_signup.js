import React, {useState} from "react";
import axios from "axios";
import background from './relax.jpg';
import './Login.css';
import {useHistory} from "react-router-dom";

function User_signup() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vpassword, setVpassword] = useState("");

    async function signin(event){
        event.preventDefault();
        try {
            const signinUser = {
                name,
                email,
                password,
                vpassword,
            };
            console.log("------",signinUser)
            const res = await axios.post(
                "http://localhost:8080/userRouter",
                signinUser
              );
            console.log("response", res);
            localStorage.setItem("email",res.data.email);
            history.push("/afterlogin");
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
        
    }
    return (
        <div className="admin_user" style={{backgroundImage:`url(${background})`}} >
            <h1>Credila</h1>
            <div className='login'>
                <div className='login_container'>
                    <h1>Welcome</h1>
                    <form onSubmit={signin}>
                        <input 
                            type='text' 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        ></input>
                        <input 
                            type='text' 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type='password' 
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <input 
                            type='password' 
                            placeholder="Verify Password" 
                            onChange={(e) => setVpassword(e.target.value)}
                            value={vpassword}
                        />
                        <button type="submit" className='signup' >Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User_signup;