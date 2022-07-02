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


function RenderBills({value, description, type, time}) {
   
    return (
        <div className="register">
                <div className="left">
                    <h3>{time}</h3>
                    <h4>{description}</h4>
                </div>
                {(type === "input") && (<h5 className="inputValue">{value}</h5>)}   
                {(type === "output") && (<h5 className="outputValue">{value}</h5>)}     
        </div>
    )
}

export default function InitialPage() {
const { user, setUser } = useContext(UserContext);
const navigate = useNavigate(); 
const [bills, setBills] = useState([]);
const [totalBalance, setTotalBalance] = useState(0);
let total = 0;

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
    
    useEffect(() => {
        for(let i = 0; i < bills.length; i++) {
            let valor = parseFloat(bills[i].value)
            if(bills[i].type === "input") {
                total += valor
            } else if(bills[i].type === "output" && valor < 0) {
                total += valor
            }
            else {
                total -= valor
            }
            console.log("O valor é " + total)
        }
        setTotalBalance(total) 
    })    
    
    function logout() {
        setUser(
            {   
                name: "",
                token: "",
                email: ""
            }
        )
        setBills([]);
        console.log("Vamos mudar de página")
        console.log(user);
        console.log(bills)
        navigate('/');
    }

    return (
        <div className="bodyinitialPage">
            <div className="footer">
                <h2> Olá, {user.name}</h2>
                <img onClick={logout} src={vector} />
            </div>

            {(bills.length === 0) && (<div className="recordsEmpty"><h3> Não há registros de entrada e saída</h3></div>)}
            {(bills.length !== 0) && (<div className="records">
                {bills.map( (data) => <RenderBills time={data.time} value={data.value} description={data.description} type={data.type}  />) }
               
                <div className="balance">
                    <h3>SALDO</h3>
                   {(totalBalance > 0) && (<h4 className="inputValue">{totalBalance}</h4>)} 
                   {(totalBalance < 0) && (<h4 className="outputValue">{totalBalance}</h4>)} 
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