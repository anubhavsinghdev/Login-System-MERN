import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

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