import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import './AccountPage.css';

export default function AccountPage({ userId }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()
    const [account, setAccount] = useState({})
    const [customerId, setCustomerId] = useState()
    const tokenString = localStorage.getItem('token');

    const formatExpirationDate = (expiration_date) => {
        const year = expiration_date.getFullYear();
        let month = expiration_date.getMonth() + 1;
        if (month < 10) {
            month = `0${ month }`;
        }
        return `${ year }-${ month }`;
    }

    useEffect(() => {
        setLoading(true);
        async function getCustomer() {
            const requestUrl = `/api/customers/${ userId }`;

            return fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': tokenString
                },
            })
                .then(async response => {
                    const jsonResponse = await response.json()
                    if (response.ok) {
                        const expiration_date = new Date(jsonResponse.card_expiration);
                        const expiration_date_formatted = formatExpirationDate(expiration_date);
                        setCustomerId(jsonResponse.id)
                        setAccount({
                            ...account,
                            shippingAddress: jsonResponse.shipping_address,
                            billingAddress: jsonResponse.billing_address,
                            cardNumber: jsonResponse.card_number,
                            cardExpiration: expiration_date_formatted,
                            cardHolder: jsonResponse.card_holder
                        })
                    }
                })
        }
        getCustomer();
        setLoading(false)
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const requestUrl = customerId ? `/api/customers/${ userId }` : `/api/customers/`;
        const requestMethod = customerId ? 'PUT' : 'POST';
        const body = {
            user_id: userId,
            shipping_address: account.shippingAddress,
            billing_address: account.billingAddress,
            card_number: account.cardNumber,
            card_expiration: new Date(account.cardExpiration),
            card_holder: account.cardHolder
        }

        return fetch(requestUrl, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': tokenString
            },
            body: JSON.stringify(body)
        })
            .then(async response => {
                const jsonResponse = await response.json()
                if (response.ok) {
                    setCustomerId(jsonResponse.id)
                    setAccount({
                        shippingAddress: jsonResponse.shipping_address,
                        billingAddress: jsonResponse.billing_address,
                        cardNumber: jsonResponse.card_number,
                        cardExpiration: jsonResponse.card_expiration,
                        cardHolder: jsonResponse.card_holder
                    })
                }
            })
    }

    return (
        <div>
            <div className="account-information d-flex">
                <Form onSubmit={handleSubmit}>
                    <h1>Account Information</h1>
                    <Form.Group>
                        <Form.Label>Shipping address</Form.Label>
                        <Form.Control id="shipping-address" type="text" defaultValue={account.shippingAddress} onChange={e => setAccount(account => ({ ...account, shippingAddress: e.target.value }))}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Billing address</Form.Label>
                        <Form.Control id="billing-address" type="text" defaultValue={account.billingAddress} onChange={e => setAccount(account => ({ ...account, billingAddress: e.target.value }))}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Card number</Form.Label>
                        <Form.Control id="card-number" type="number" defaultValue={account.cardNumber} onChange={e => setAccount(account => ({ ...account, cardNumber: e.target.value }))}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Card expiration</Form.Label>
                        <Form.Control id="card-expiration" type="month" defaultValue={account.cardExpiration} onChange={e => setAccount(account => ({ ...account, cardExpiration: e.target.value }))}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Card holder</Form.Label>
                        <Form.Control id="card-holder" type="text" defaultValue={account.cardHolder} onChange={e => setAccount(account => ({ ...account, cardHolder: e.target.value }))}></Form.Control>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}
