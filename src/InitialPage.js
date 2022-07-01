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

export default function InitialPage() {
const register = 1 
const { user, setUser } = useContext(UserContext);

    return (
        <div className="bodyinitialPage">
            <div className="footer">
                <h2> Olá, {user.name}</h2>
                <img src={vector} />
            </div>

            {(register === 0) && (<div className="records"><h3> Não há registros de entrada e saída</h3></div>)}
            {(register !== 0) && (<div className="records"><h3> HÁ REGISTROS!!!!</h3></div>)}
            <div className="cashFlow">
                 <div className="input">
                    <img src={plus} />
                    <h4> Nova entrada</h4>
                </div>
                <div className="output">
                    <img src={minus} />
                    <h4> Nova saída</h4>
                </div>
            </div>  
        </div>
    )
}