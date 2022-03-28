import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Products.css';
import { productCategories, productColors } from './enums';
import { userRoles, alertTypes } from '../enums';
import ProductService from '../../services/productService';

const tokenString = localStorage.getItem('token');

export default function NewProduct({ userId, userRole }) {
    const [sku, setSku] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [color, setColor] = useState(productColors.White);
    const [minDeliveryDays, setMinDeliveryDays] = useState(1);
    const [maxDeliveryDays, setMaxDeliveryDays] = useState(5);
    const [vendorName, setVendorName] = useState();
    const [category, setCategory] = useState(productCategories.Shoes);
    const [inventory, setInventory] = useState();
    const [files, setFiles] = useState()
    const [alert, setAlert] = useState({ msg: "", type: null })

    const handleSubmit = async e => {
        e.preventDefault();

        const productService = new ProductService(tokenString);
        const newProduct = await productService.createProduct({
            user_id: userId,
            sku: sku,
            name: name,
            price: price,
            color: color,
            min_delivery_days: minDeliveryDays,
            max_delivery_days: maxDeliveryDays,
            vendor_name: vendorName,
            category: category,
            inventory: inventory
        });

        if (newProduct.error) {
            setAlert({ msg: newProduct.error.detail, type: alertTypes.Error })
        } else {
            setAlert({ msg: "Product was successfully created.", type: alertTypes.Success })
        }

        if (files) {
            let formData = new FormData();
            formData.append("product_id", newProduct.id);
            for (const image of Array.from(files)) {
                formData.append('files', new Blob([image]), image.name);
            }
            await productService.uploadImages(formData);
        }
    }

    return (
        userRole === userRoles.Merchant ? <div className="new-product-wrapper">
            {alert.type && <Alert variant={alert.type} onClose={() => setAlert({ msg: "", type: null })} dismissible>{alert.msg}</Alert>}
            <Form onSubmit={handleSubmit}>
                <h1>New Product</h1>
                <Form.Group>
                    <Form.Label>SKU</Form.Label>
                    <Form.Control type="text" required onChange={e => setSku(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" required onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" step="any" required onChange={e => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <Form.Select defaultChecked={productColors.White} onChange={e => setColor(e.target.value)}>
                        {Object.entries(productColors).map(([key, value]) => <option key={key} value={value}>{key}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Delivery Days</Form.Label>
                    <div className='d-flex align-items-center'>
                        <Form.Control required type="number" defaultValue={minDeliveryDays} onChange={e => setMinDeliveryDays(e.target.value)}></Form.Control>
                        -
                        <Form.Control required type="number" defaultValue={maxDeliveryDays} onChange={e => setMaxDeliveryDays(e.target.value)}></Form.Control>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control required type="text" onChange={e => setVendorName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultChecked={productCategories.Shoes} onChange={e => setCategory(e.target.value)}>
                        {Object.entries(productCategories).map(([key, value]) => <option key={key} value={value}>{key}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control required type="number" onChange={e => setInventory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Images</Form.Label>
                    <Form.Control type="file" multiple accept="image/png, image/jpeg" onChange={e => setFiles(e.target.files)}></Form.Control>
                </Form.Group>
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </div> : "You are not authorized to view this page"
    )
}

NewProduct.propTypes = {
    userId: PropTypes.number,
    userRole: PropTypes.number
}
