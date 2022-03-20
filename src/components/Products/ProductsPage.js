import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Container, Alert, Form } from 'react-bootstrap';

import { userRoles } from '../enums';
import Checkout from '../Checkout/Checkout';
import PaginationComponent from './Pagination';
import { productCategories } from './enums';
import './Products.css';
import { Link } from 'react-router-dom';

const tokenString = localStorage.getItem('token');

const getProductKey = (value) => {
    for (let key in productCategories) {
        if (productCategories[key] == value) {
            return key;
        }
    }
    return null;
};

export default function ProductsPage({ userId, userRole }) {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getProducts() {
            const requestUrl = userRole === userRoles.Merchant ?
                `/api/products?user_id=${ userId }&page_number=${ currentPage }` :
                `/api/products?page_number=${ currentPage }&category=${ category }`;

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
    }, [currentPage, category]);



    const totalPages = products && Math.ceil(products.total / products.size);

    return (
        <div>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess(false)} dismissible>Order was submitted</Alert>}
            {products !== undefined ? <Container>
                {userRole === userRoles.Customer && <Form.Select className="category-filter" onChange={e => setCategory(e.target.value)}>
                    {Object.entries(productCategories).map(([key, value]) => <option key={key} value={value}>{key}</option>)}
                </Form.Select>}

                {products.items.map((product, index) => <div key={product.id}>
                    {index === 0 && <Row>
                        <Col>Name</Col>
                        <Col>Price</Col>
                        <Col>Category</Col>
                        {userRole === userRoles.Customer && <Col xs={2}></Col>}
                    </Row>}
                    <Row key={product.id} className="d-flex justify-content-between flex-direction-column">
                        <Col className="product-name"><Link to={`/products/${ product.id }`}>{product.name}</Link></Col>
                        <Col className="product-price">{product.price}</Col>
                        <Col className="product-category">{getProductKey(product.category)}</Col>
                        {userRole === userRoles.Customer && <Col xs={2}>
                            <Checkout
                                userId={userId}
                                productId={product.id}
                                setSuccess={setSuccess}
                                setError={setError} />
                        </Col>}
                    </Row>
                </div>)}
                <div className="d-flex justify-content-between">
                    <PaginationComponent totalPages={totalPages} setCurrentPage={setCurrentPage}></PaginationComponent>
                </div>
                {userRole === userRoles.Merchant && <Link to='/admin/products/new'>Add New</Link>}
            </Container> : "No Products"}
        </div>
    )
}

ProductsPage.propTypes = {
    userId: PropTypes.number,
    userRole: PropTypes.number
}
