import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function Checkout({ userId, productId, quantity = 1, setError, setSuccess }) {
    const handleCheckout = () => {
        const tokenString = localStorage.getItem('token');
        const body = {
            user_id: userId,
            product_id: productId,
            quantity: quantity
        }

        return fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenString
            },
            body: JSON.stringify(body)
        })
            .then(async response => {
                if (!response.ok) {
                    const errorMessage = await response.json();
                    setError(errorMessage.detail);
                } else {
                    setSuccess(true);
                }
            })
    }

    return (
        <Button variant="outline-success" onClick={handleCheckout}>1-Click Checkout</Button>
    )
}

Checkout.propTypes = {
    userId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    setError: PropTypes.func,
}
