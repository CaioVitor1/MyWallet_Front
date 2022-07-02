import react from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "./contexts/Usercontext";
import { useContext } from "react";
import vector from "./assets/Vector.png"
import minus from "./assets/minus.png"
import plus from "./assets/plus.png"


function RenderBills({value, description, type, totalBalance, setTotalBalance}) {
   
    return (
        <div className="register">
                <div className="left">
                    <h3>30/11</h3>
                    <h4>{description}</h4>
                </div>
                {(type === "input") && (<h5 className="inputValue">{value}</h5>)}   
                {(type === "output") && (<h5 className="outputValue">{value}</h5>)}     
        </div>
    )
}

export default function InitialPage() {
const register = 1 
const { user, setUser } = useContext(UserContext);
const navigate = useNavigate(); 
const [bills, setBills] = useState([]);
const [totalBalance, setTotalBalance] = useState(0);

useEffect(() => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`

        }
    }
    const promise = axios.get("http://localhost:5000/cashFlux", config)
    promise
    .then(res =>{
        console.log(res.data);
        setBills(res.data)
        console.log(bills)
    })
    .catch(err => {
        console.log(err);
        console.log("deu ruim")
    })
}, [])
    let total = 0
    useEffect(() => {
        for(let i = 0; i < bills.length; i++) {
            if(bills[i].type === "input") {
                let valor = parseFloat(bills[i].value)
                total += valor
            } else {
                let valor = parseFloat(bills[i].value)
                total -= valor
            }
            console.log("O valor é " + total)
        }
        setTotalBalance(total) 
    })    
             
    return (
        <div className="bodyinitialPage">
            <div className="footer">
                <h2> Olá, {user.name}</h2>
                <img src={vector} />
            </div>

            {(register === 0) && (<div className="recordsEmpty"><h3> Não há registros de entrada e saída</h3></div>)}
            {(register !== 0) && (<div className="records">
                {bills.map( (data) => <RenderBills totalBalance={totalBalance} setTotalBalance={setTotalBalance} value={data.value} description={data.description} type={data.type}  />) }
               
                <div className="balance">
                    <h3>SALDO</h3>
                    <h4>{totalBalance}</h4>
                </div>
                </div>)}
            <div className="cashFlow">
                 <div className="input">
                    <img onClick={() => navigate('/input')} src={plus} />
                    <h4> Nova entrada</h4>
                </div>
                <div className="output">
                    <img onClick={() => navigate('/output')} src={minus} />
                    <h4> Nova saída</h4>
                </div>
            </div>  
        </div>
    )
}