import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../Login/Login';
import useToken from './useToken';
import './App.css';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;