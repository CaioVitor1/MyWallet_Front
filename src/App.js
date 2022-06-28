import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Cadastro from "./Cadastro";
import UserContext from "./contexts/Usercontext";

export default function App() {
    const [user, setUser] = useState({
        name: "",
        token: "",
    })
    
    return (
        
        <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    )
}