import { render, screen, queryByAttribute } from '@testing-library/react';
import AccountPage from './AccountPage';

test('renders the account page', () => {
    render(<AccountPage userId={1} />);
    const headerText = screen.getByText("Account Information");
    expect(headerText).toBeInTheDocument();
});

test('renders the form fields', () => {
    const getById = queryByAttribute.bind(null, 'id');

    const dom = render(<AccountPage userId={1} />)
    const fieldIds = ['shipping-address', 'billing-address', 'card-number', 'card-expiration', 'card-holder']
    const formFields = fieldIds.map(fieldId => getById(dom.container, fieldId));

    formFields.forEach(formField => {
        expect(formField).toBeInTheDocument();
    })
})
