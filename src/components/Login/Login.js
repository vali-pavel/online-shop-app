import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Login.css';

async function loginUser(credentials) {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(async response => {
            if (!response.ok) {
                return { error: await response.json() }
            }
            return {
                token: await response.text()
            }
        })
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault();
        const loginResponse = await loginUser({
            email,
            password
        });
        if (loginResponse.token) {
            setToken(loginResponse.token)
            window.location.href = '/products'
        } else {
            setError(loginResponse.error.detail)
        }
    }


    return (
        <div className="login-wrapper">
            <h1>Log In</h1>
            {error}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <div className='d-flex justify-content-between align-items-center'>
                    <Button type="submit">Log In</Button>
                    <Link to="/signup">Create account</Link>
                </div>
            </Form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
