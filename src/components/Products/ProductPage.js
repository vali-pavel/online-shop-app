import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Form, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { userRoles } from '../enums';
import Checkout from '../Checkout/Checkout';
import ProductService from '../../services/productService';

const tokenString = localStorage.getItem('token');

export default function ProductPage({ userId, userRole }) {
    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [quantity, setQuantity] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    const { product_id } = useParams();

    useEffect(() => {
        setLoading(true);
        async function getProduct() {
            const productService = new ProductService(tokenString);
            const productResponse = await productService.getProduct(product_id)

            if (productResponse.error) {
                setError(productResponse.error.detail);
            } else {
                setProduct(productResponse);
            }
        }

        async function getProductImages() {
            const productService = new ProductService(tokenString);
            const productResponse = await productService.getImages(product_id)

            if (productResponse.error) {
                setError(productResponse.error.detail);
            } else {
                setProductImages(productResponse);
            }
        }

        getProduct();
        getProductImages(product_id);

        setLoading(false)
    }, []);

    return (
        <div className='product-wrapper'>
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess(false)} dismissible>Order was submitted</Alert>}
            {productImages.length > 0 && <Carousel className="img-carousel">
                {productImages.map((image, index) =>
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src={`data:image/jpeg;base64,${ image }`} />
                    </Carousel.Item>
                )}
            </Carousel>}
            {product && <div>
                <h1>{product.name}</h1>
                <div>Price: {product.price}</div>
                <Form.Control type="number" placeholder="Quantity" min="1" onChange={e => setQuantity(e.target.value)} />
                {userRole === userRoles.Customer && <Checkout
                    userId={userId}
                    productId={parseInt(product_id)}
                    quantity={quantity}
                    setSuccess={setSuccess}
                    setError={setError}>
                </Checkout>}
            </div>}
        </div>
    )
}

ProductPage.propTypes = {
    userId: PropTypes.number,
    userRole: PropTypes.number.isRequired,
}
