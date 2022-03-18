import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import NewProduct from '../Products/NewProduct';
import ProductsPage from '../Products/ProductsPage';
import ProductPage from '../Products/ProductPage';
import PrivateRoute from '../auth/PrivateRoute';
import AccountPage from '../Account/AccountPage';
import useToken from './useToken';
import './App.css';

function App() {
    const { token, setToken } = useToken();

    let userId, userRole;
    if (token) {
        const decodedToken = jwt_decode(token);
        userId = decodedToken.sub;
        userRole = decodedToken.role;
    }

    return (
        <div className="wrapper">
            <Router>
                {token && <Header userRole={userRole} />}
                <Routes>
                    <Route path='/login' element={<Login setToken={setToken} />} />
                    <Route path='/signup' element={<Signup setToken={setToken} />} />
                    <Route path='/admin/signup' element={<Signup setToken={setToken} />} />
                    <Route path='/admin/products/new' element={
                        <PrivateRoute token={token}>
                            <NewProduct userId={userId} userRole={userRole} />
                        </PrivateRoute>}>
                    </Route>
                    <Route path='/' element={
                        <PrivateRoute token={token}>
                            <ProductsPage userId={userId} userRole={userRole} />
                        </PrivateRoute>}>
                    </Route>
                    <Route path='/products' element={
                        <PrivateRoute token={token}>
                            <ProductsPage userId={userId} userRole={userRole} />
                        </PrivateRoute>}>
                    </Route>
                    <Route path='/products/:product_id' element={
                        <PrivateRoute token={token}>
                            <ProductPage userId={userId} />
                        </PrivateRoute>}>
                    </Route>
                    <Route path='/account' element={
                        <PrivateRoute token={token}>
                            <AccountPage userId={userId} userRole={userRole} />
                        </PrivateRoute>}>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;