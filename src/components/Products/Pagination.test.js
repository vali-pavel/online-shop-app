import { render, screen } from '@testing-library/react';
import PaginationComponent from './Pagination';

test('renders pagination', () => {
    const setCurrentPage = () => { }
    const totalPages = 2;
    render(<PaginationComponent totalPages={totalPages} setCurrentPage={setCurrentPage} />)

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(totalPages)
})
