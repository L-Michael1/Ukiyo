import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/navbar'
import PostModal from '../../components/post-modal'
import Posts from '../../components/posts';
import Footer from '../../components/footer'
import RecipePagination from '../../components/pagination';

const Home = () => {
    return (
        <Container>
            <Navbar />
            <PostModal />
            <Posts />
            <RecipePagination />
            <Footer />
        </Container>
    )
}

const Container = styled.div`
      
`

export default Home;
