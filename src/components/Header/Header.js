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

    return (
        <div className="d-flex justify-content-right">
            {userRole === userRoles.Customer && <Button variant="outline-primary" size="sm" onClick={handleCustomerEdit}>Edit Account</Button>}
            <Button variant="outline-primary" size="sm" onClick={handleSignout}>Sign out</Button>
        </div>
    )
}

Header.propTypes = {
    userRole: PropTypes.number.isRequired
}
