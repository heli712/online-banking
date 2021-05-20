import React, {useContext, useState} from 'react';
import './Login.css';
import {useHistory} from "react-router-dom";
import background from './relax.jpg';
import axios from "axios";
//import AuthContext from "./AuthContext";

function Userlogin(){
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  //  const { getLoggedIn} = useContext(AuthContext);
    async function login(event) {
        event.preventDefault();
        try {
            const loginUser = {
                email,
                password,
            };
            console.log("------",loginUser)
            axios.post(
                "http://localhost:8080/userRouter/login",
                loginUser
              )
              .then((response)=>{
                console.log("response", response);
                localStorage.setItem("email",response.data.email);
                localStorage.setItem("checkingAccount",response.data.checkingAcc);
                localStorage.setItem("savingAccount",response.data.savingsAcc);
                history.push("/checking");
                

              })

          //  await getLoggedIn();
           

        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }
    
    const register = (event) => {
        event.preventDefault();
        history.push("User_signup");
    }
    return(
        <div className="admin_user" style={{backgroundImage:`url(${background})`}} >
            <h1>Credila</h1>
            <div className='login'>
                <div className='login_container'>
                    <h1>Welcome</h1>
                    <form onSubmit = {login}>
                        <input type='text' onChange={(e) => setEmail(e.target.value)} value={email}  placeholder='Email'/>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'/>
                        <button type="submit" className='signin' >Login</button>
                    </form>
                    <button onClick={register} className="signin">
                        Create your Account
                    </button>
                </div>
            </div>
        </div>
    )

}
export default Userlogin;