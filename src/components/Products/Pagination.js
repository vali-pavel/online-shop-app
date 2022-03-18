import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap'

export default function PaginationComponent({ totalPages, setCurrentPage }) {
    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (selectedPage) => {
        setActivePage(selectedPage)
        setCurrentPage(selectedPage)
    }


    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageClick(number)}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
        <div>
            <Pagination size="sm">{paginationItems}</Pagination>
        </div>
    )
}

PaginationComponent.propTypes = {
    totalPages: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired
}
