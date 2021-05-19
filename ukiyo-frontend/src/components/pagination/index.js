import React, { useContext } from 'react';
import { Pagination } from '@material-ui/lab';
import styled from 'styled-components'
import { PostsContext } from '../../contexts/posts-context'

const RecipePagination = () => {

    const { postsPerPage, totalPosts, paginate } = useContext(PostsContext);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container>
            <Pagination onChange={(e, page) => paginate(page)} count={pageNumbers.length} />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`

export default RecipePagination;