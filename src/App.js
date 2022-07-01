import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Cadastro from "./Cadastro";
import UserContext from "./contexts/Usercontext";
import InitialPage from "./InitialPage";
import Input from "./Input";
import Output from "./Output";

export default function App() {
    const [user, setUser] = useState({
        name: "",
        token: "",
        email: ""
    })
    
    return (
        
        <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/initialPage" element={<InitialPage />} />
                <Route path="/input" element={<Input />} />
                <Route path="/output" element={<Output />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    )
}