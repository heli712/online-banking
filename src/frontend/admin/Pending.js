import React,{useState, useEffect} from 'react';
import axios from "axios";
import './Pending.css';
import { Link} from "react-router-dom";


function Pending() {
    const [usedetails, setusedetails] = useState([]);

    useEffect(() => {
        async function fetchdata() {
            const request = await axios.get("http://localhost:8080/adminAction/openAccount");
            setusedetails(request.data);
            return request;
        } 
        fetchdata();   
    },[]);
    return (
        <div className="pending">
            <table>
                <th>Email</th>
                <th>Name</th>
                    {usedetails.map((details) => (
                         <tr className="pending_row">
                            <td><Link className="pending_link" to="/openaccount">{details.email}</Link></td>
                            <td><Link className="pending_link" to="/openaccount">{details.name}</Link></td>
                        </tr>
                    ))}

            </table>    
        </div>
    )
}



export default Pending;