import React, {useState, useEffect} from 'react';
import "./seesavings.css"
import axios from "axios";


function SeeChecking(){
    const [transaction, setTransaction ] = useState([]);
    const [filteredTransaction, setFilteredTransaction] = useState([]);
    const [transactionType, setTransactiontype] = useState("")
    const accNum = localStorage.getItem("savingAccount")
    useEffect(() => {
        switch(transactionType) {
            case "credit":
                setFilteredTransaction(transaction.filter(tran => tran.tgtAcc === accNum))
                break
            case "debit":
                setFilteredTransaction(transaction.filter(tran => tran.srcAcc === accNum))
                break
            case "withdrawal":
                setFilteredTransaction(transaction.filter(tran => tran.transactionType === "Withdrawal"))
                break
            case "deposit":
                setFilteredTransaction(transaction.filter(tran => tran.transactionType === "Deposit"))
                break
            default:
                setFilteredTransaction(transaction)
                break    
        }
    }, [transactionType])

    useEffect(() => {
        const asFunc = async () => {
            try{
                const usedetails = {
                    accNum
                }
                console.log("====>>>",accNum)
                console.log("=====>>>>",transactionType)
                const res = await axios.post("http://localhost:8080/transactionRouter/SeeAllTransactions",usedetails)
                console.log(res)
                setTransaction(res.data)
                setFilteredTransaction(res.data)
            }
            catch(error){
                console.log(error)
            }
        }
        asFunc()
    }, [])

    return (
        <div className = "saving" >
            <input type="text" className="seesavings"
                placeholder="Search"
                onChange={(e) => setTransactiontype(e.target.value)}
                value={transactionType}
            />
            <table>
                <th>Source Account</th>
                <th>Target Account</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Recurring</th>
                <th>Date</th>
                {filteredTransaction.map((details) => (
                    <tr>
                    <td>{details.srcAcc}</td>
                    <td>{details.tgtAcc}</td>
                    <td>{details.amount}</td>
                    <td>{details.transactionType}</td>
                    <td>{details.recurringFlag ? "True" : "False"}</td>
                    <td>{`${new Date(details.date).getMonth()}/${new Date(details.date).getDate()}/${new Date(details.date).getFullYear()}`}</td>
                  </tr>
                ))}
            </table>
        </div>
    )
}

export default SeeChecking;