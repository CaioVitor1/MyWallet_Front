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
        <Register>
                <Left>
                    <h3>{time}</h3>
                    <h4>{description}</h4>
                </Left>
                {(type === "input") && (<InputValue>{value}</InputValue>)}   
                {(type === "output") && (<OutputValue>{value}</OutputValue>)}     
        </Register>
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
        <BodyinitialPage>
            <Footer>
                <h2> Olá, {user.name}</h2>
                <img onClick={logout} src={vector} />
            </Footer>

            {(bills.length === 0) && (<RecordsEmpty><h3> Não há registros de entrada e saída</h3></RecordsEmpty>)}
            {(bills.length !== 0) && (<Records>
                {bills.map( (data) => <RenderBills time={data.time} value={data.value} description={data.description} type={data.type}  />) }
               
                <Balance>
                    <h3>SALDO</h3>
                   {(totalBalance >= 0) && (<InputValue>{totalBalance}</InputValue>)} 
                   {(totalBalance < 0) && (<OutputValue>{totalBalance}</OutputValue>)} 
                </Balance>
                </Records>)}
            <CashFlow>
                 <Input>
                    <img onClick={() => navigate('/input')} src={plus} />
                    <h4> Nova entrada</h4>
                </Input>
                <Output>
                    <img onClick={() => navigate('/output')} src={minus} />
                    <h4> Nova saída</h4>
                </Output>
            </CashFlow>  
        </BodyinitialPage>
    )
}

const BodyinitialPage = styled.div`
        background-color: #A328D6;
        padding: 25px 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
`
const Footer = styled.div`
        display: flex;
        justify-content: space-between;
    h2{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
`
const RecordsEmpty = styled.div`
        margin-top: 22px;
        background-color: white;
        width: 326px;
        height: 446px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 10px;
    h3{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
`

const CashFlow = styled.div`
        display: flex;
    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        margin-left: 10px;
        margin-top: 47px;
        display: flex;
    }
    img {
        margin-top: 10px;
        margin-left: 10px;
    }
`
const Input = styled.div`
        background: #8A2BE2;
        width: 155px;
        height: 114px;
        left: 25px;
        top: 537px;
        border-radius: 5px;
        margin-right: 15px;
`
const Output = styled.div`
        background: #8A2BE2;
        width: 155px;
        height: 114px;
        left: 25px;
        top: 537px;
        border-radius: 5px;
`
const Records = styled.div`
        display: flex;
        flex-direction: column;
        position: relative;
        margin-top: 22px;
        background-color: white;
        width: 326px;
        height: 446px;
        border-radius: 5px;
        margin-bottom: 10px;
        padding-top: 25px;
`
const Register = styled.div`
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
    h3{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #C6C6C6;
        margin-right: 10px;
    }
    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;  
    }
`
const Left = styled.div`
        display: flex;
`
const OutputValue = styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #C70000;
        padding-right: 10px;
`
const InputValue = styled.p`
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #03AC00;
        padding-right: 10px;
`
const Balance = styled.div`
        position: absolute;
        bottom: 10px;
        display: flex;
        justify-content:space-between;
        width: 90%;
        padding-left: 15px;
    h3{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }
`