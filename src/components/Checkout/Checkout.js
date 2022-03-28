import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import OrderService from '../../services/orderService';

export default function Checkout({ userId, productId, quantity = 1, setError, setSuccess }) {
    const handleCheckout = async () => {
        const tokenString = localStorage.getItem('token');
        const body = {
            user_id: userId,
            product_id: productId,
            quantity: quantity
        }
        const orderService = new OrderService(tokenString);
        const orderResponse = await orderService.createOrder(body);

        if (orderResponse.error) {
            setError(orderResponse.error.detail);
        } else {
            setSuccess(true);
        }
    }

    return (
        <Button id="checkout-button" variant="outline-success" onClick={handleCheckout}>1-Click Checkout</Button>
    )
}

Checkout.propTypes = {
    userId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    setError: PropTypes.func,
}
