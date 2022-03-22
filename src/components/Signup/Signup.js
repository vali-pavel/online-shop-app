import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

import './Signup.css'
import { userRoles } from '../enums';

async function createUser(credentials) {
    return fetch('/api/users', {
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

export default function Signup({ setToken }) {
    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [error, setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault();

        const pathname = window.location.pathname;
        const userRole = pathname.includes('admin') ? userRoles.Merchant : userRoles.Customer;

        const response = await createUser({
            email: email,
            password: password,
            phone_number: parseInt(phoneNumber),
            full_name: fullName,
            role_type: userRole
        });
        if (response.token) {
            setToken(response.token)
            window.location.href = '/products'
        } else {
            setError(response.error.detail)
        }
    }


    return (
        <div className="signup-wrapper">
            {error}
            <Form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" required type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="full_name" required type="text" onChange={e => setFullName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name="phone_number" required type="number" onChange={e => setPhoneNumber(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" required type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

Signup.propTypes = {
    setToken: PropTypes.func.isRequired
}
