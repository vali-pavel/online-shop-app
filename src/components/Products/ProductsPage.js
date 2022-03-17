import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { userRoles } from '../enums';

const tokenString = localStorage.getItem('token');

export default function ProductsPage({ userId, userRole }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts(userId) {
            return fetch(`/user_products?user_id=${ userId }`, {
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
                        return { error: jsonResponse }
                    } else {
                        return jsonResponse
                    }

                })
        }
        const productsResponse = getProducts(userId);
        console.log("Products ", productsResponse)
    }, [])

    return (
        userRole === userRoles.Merchant ? <div>

        </div> : "You are not authorized to view this page"
    )
}

ProductsPage.propTypes = {
    userId: PropTypes.number,
    userRole: PropTypes.number
}
