import react from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "./contexts/Usercontext";
import { useContext } from "react";

export default function Input() {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    function sendInput() {
        console.log("Opa dindim");
        const body = {
            value: value,
            description: description,
            type: "input"
        }
        const promise = axios.post("http://localhost:5000/input", body);
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
        <div className="inputBody">
            <h2> Nova entrada</h2>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
            <button onClick={sendInput}> Salvar entrada</button> 
        </div>
       
    )
}