import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

import { userRoles } from "../enums";

export default function Header({ userRole }) {
    const handleSignout = () => {
        localStorage.removeItem("token")
        window.location.href = "/login";
    }

    const handleCustomerEdit = () => {
        window.location.href = "/account";
    }

    const handleProducts = () => {
        window.location.href = "/products";
    }

    return (
        <div className="d-flex justify-content-between">
            <div><Button variant="outline-primary" size="sm" onClick={handleProducts}>Products</Button></div>
            <div>
                {userRole === userRoles.Customer && <Button variant="outline-primary" size="sm" onClick={handleCustomerEdit}>Edit Account</Button>}
                <Button variant="outline-primary" size="sm" onClick={handleSignout}>Sign out</Button>
            </div>
        </div>
    )
}

Header.propTypes = {
    userRole: PropTypes.number.isRequired
}
