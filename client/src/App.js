import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element=
                    {<Home />}
                />
                <Route path="/login" element=
                    {<Login />}
                />
                <Route path="/register" element=
                    {<Register />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;