import styled from "styled-components";
import react from "react";
import { Link,  useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate(); 

    function cadastrar () {
        const body = {
            name,
            email,
            password,
            repeatPassword
        }
        console.log(body)
        const promise = axios.post("https://mywalletcv.herokuapp.com/sign-up", body)
        promise
        .then(res => {
            console.log(res.data);
            navigate('/');
        })
        .catch(res => {
            console.log("deu ruim")
            alert("Você inseriu dados inválidos ou já cadastrados. Insira novamente!")
        })
    }
    return (
        <BodyCadastro>
            <h2>MyWallet</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome" />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="senha" />
                <input type="text" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Confirme a senha" />
                <button onClick={cadastrar}> Cadastrar</button> 
               <Link style={{ textDecoration: 'none' }} to={`/cadastro`} >
                    <h3> Já tem uma conta? Entre agora</h3>
               </Link>
        </BodyCadastro>
    )
}

const BodyCadastro = styled.div`
    padding-top: 159px;
    background-color: #A328D6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border: solid;
    padding-bottom: 170px;

h2{
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
    }
input {
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: black;
    margin-left: 18px;
    margin-bottom: 13px;
}
button {
    width: 326px;
    height: 46px;
    background: #8A2BE2;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    margin-left: 18px;
    margin-bottom: 36px;
}
h3{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;  
    display: flex;
    align-items: center;
    justify-content: center;
}
`