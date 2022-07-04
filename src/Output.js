import react from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "./contexts/Usercontext";
import { useContext } from "react";
import dayjs from "dayjs";

export default function Output() {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const { user, setUser } = useContext(UserContext);
    let time = dayjs().format("'DD/MM'")

    const navigate = useNavigate(); 

    function sendOutput() {
        console.log("Opa dindim");
        const body = {
            value: value,
            description: description,
            type: "output",
            email: user.email,
            time: time
        }
        const promise = axios.post("https://mywalletcv.herokuapp.com/cashFlux", body);
        promise
        .then(res =>{
            console.log("deu bom")
            console.log(res.data);
        navigate('/initialPage');
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
            alert("Não foi possível enviar os valores!")
        })
    }

    return (
        <OutputBody>
            <h2> Nova entrada</h2>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
            <button onClick={sendOutput}> Salvar saída</button> 
        </OutputBody>
       
    )
}

const OutputBody = styled.div`
        background-color: #A328D6;
        padding: 25px 24px;
        padding-bottom: 320px;
    h2{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        margin-bottom: 40px;
    }
    input {
        width: 326px;
        height: 58px;
        left: 25px;
        top: 96px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 15px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000; 
    }
    button {
        width: 333px;
        height: 46px;
        background: #8A2BE2;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        margin-bottom: 36px;
    }
`