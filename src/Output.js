import react from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "./contexts/Usercontext";
import { useContext } from "react";

export default function Output() {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    function sendOutput() {
        console.log("Oh no, conta nova")
    }

    return (
        <div className="outputBody">
            <h2> Nova entrada</h2>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
            <button onClick={sendOutput}> Salvar entrada</button> 
        </div>
       
    )
}