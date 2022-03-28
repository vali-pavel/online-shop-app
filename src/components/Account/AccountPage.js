import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

import { alertTypes } from '../enums';
import './AccountPage.css';
import CustomerService from '../../services/customerService';

export default function AccountPage({ userId }) {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({})
    const [customerId, setCustomerId] = useState()
    const [alert, setAlert] = useState({ msg: "", type: null })
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
            const customerService = new CustomerService(tokenString);
            const customer = await customerService.getCustomer(userId);

            if (customer.error) {
                setAlert({ msg: customer.error.detail, type: alertTypes.Error })
            } else {
                const expiration_date = new Date(customer.card_expiration);
                const expiration_date_formatted = formatExpirationDate(expiration_date);
                setCustomerId(customer.id);
                setAccount({
                    ...account,
                    shippingAddress: customer.shipping_address,
                    billingAddress: customer.billing_address,
                    cardNumber: customer.card_number,
                    cardExpiration: expiration_date_formatted,
                    cardHolder: customer.card_holder
                })
            }
        }
        getCustomer();
        setLoading(false)
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const customerService = new CustomerService(tokenString);
        const body = {
            user_id: userId,
            shipping_address: account.shippingAddress,
            billing_address: account.billingAddress,
            card_number: account.cardNumber,
            card_expiration: new Date(account.cardExpiration),
            card_holder: account.cardHolder
        }

        let customer;
        if (customerId) {
            customer = await customerService.updateCustomer(body, userId);
        } else {
            customer = await customerService.createCustomer(body);
        }
        if (customer.error) {
            setAlert({ msg: customer.error.detail, type: alertTypes.Danger })
        } else {
            setCustomerId(customer.id);
            setAccount({
                shippingAddress: customer.shipping_address,
                billingAddress: customer.billing_address,
                cardNumber: customer.card_number,
                cardExpiration: customer.card_expiration,
                cardHolder: customer.card_holder
            })
            setAlert({ msg: "The account was successfully updated.", type: alertTypes.Success })
        }
    }


    return (
        <div>
            {alert.type && <Alert variant={alert.type} onClose={() => setAlert({ msg: "", type: null })} dismissible>{alert.msg}</Alert>}
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
