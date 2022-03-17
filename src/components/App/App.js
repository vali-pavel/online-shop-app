import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import useToken from './useToken';
import './App.css';

function App() {
    const { token, setToken } = useToken();

    return (
        <div className="wrapper">
            <Router>
                <Routes>
                    <Route path='/login' element={<Login setToken={setToken} />} />
                    <Route path='/signup' element={<Signup setToken={setToken} />} />
                    <Route path='/admin/signup' element={<Signup setToken={setToken} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;