import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Container, Alert } from 'react-bootstrap';

import { userRoles } from '../enums';
import Checkout from '../Checkout/Checkout';
import PaginationComponent from './Pagination';

const tokenString = localStorage.getItem('token');

export default function ProductsPage({ userId, userRole }) {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getProducts() {
            const requestUrl = userRole === userRoles.Merchant ?
                `/api/products?user_id=${ userId }&page_number=${ currentPage }` :
                `/api/products?page_number=${ currentPage }`;

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
                    if (!response.ok) {
                        setError(jsonResponse.error.detail)
                    } else {
                        setProducts(jsonResponse)
                    }

                })
        }
        getProducts();
        setLoading(false)
    }, [currentPage]);



    const totalPages = products && Math.ceil(products.total / products.size);

    return (
        <div>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess(false)} dismissible>Order was submitted</Alert>}
            {products !== undefined ? <Container>
                {products.items.map((product, index) => <div key={product.id}>
                    {index === 0 && <Row>
                        <Col>Name</Col>
                        <Col>Price</Col>
                        {userRole === userRoles.Customer && <Col xs={2}></Col>}
                    </Row>}
                    <Row key={product.id} className="d-flex justify-content-between flex-direction-column">
                        <Col className="product-name">{product.name}</Col>
                        <Col className="product-price">{product.price}</Col>
                        {userRole === userRoles.Customer && <Col xs={2}>
                            <Checkout
                                userId={userId}
                                productId={product.id}
                                setSuccess={setSuccess}
                                setError={setError} />
                        </Col>}
                    </Row>
                </div>)}
                <PaginationComponent totalPages={totalPages} setCurrentPage={setCurrentPage}></PaginationComponent>
            </Container> : "No Products"}
        </div>
    )
}

ProductsPage.propTypes = {
    userId: PropTypes.number,
    userRole: PropTypes.number
}
