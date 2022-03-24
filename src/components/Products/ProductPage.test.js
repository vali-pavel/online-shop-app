import { render, screen, queryByAttribute } from '@testing-library/react';
import ProductPage from './ProductPage';
import { userRoles } from '../enums';

const getById = queryByAttribute.bind(null, 'id');

test('not renders the checkout button for merchant', () => {
    const dom = render(<ProductPage userRole={userRoles.Merchant} />)
    const checkoutButton = getById(dom.container, 'checkout-button');
    expect(checkoutButton).toBeNull();
})

test('renders the checkout button for customer', () => {
    const dom = render(<ProductPage userId={1} userRole={userRoles.Customer} />)
    const checkoutButton = getById(dom.container, 'checkout-button');
    expect(checkoutButton).toBeInTheDocument();
})
