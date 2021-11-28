import React from 'react';
import "./Admin_User.css";
import background from './relax.jpg';
import {useHistory} from 'react-router-dom';


function Admin_User() {

    const history = useHistory();

    const user = (event) => {
        event.preventDefault();
        history.push("/Userlogin")
    }

    const admin = (event) => {
        event.preventDefault();
        history.push("/Adminlogin");
    };

    return (
            <div className="admin_user" style={{backgroundImage:`url(${background})`}} >
                <h1>Credila</h1>
                <div className='admin'>
                    <div className='admin_container'>
                        <h1>Welcome</h1>
                        <form>
                            <button onClick={user} className="signin">User</button>
                            <button onClick={admin} className='signin' >Admin</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}
export default Admin_User;