import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <header className="header">
                    <h1 className="title">Booking System</h1>
                    <nav className="nav">
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;