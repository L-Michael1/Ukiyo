import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/navbar'
import Posts from '../../components/posts';
import Footer from '../../components/footer'

const Home = () => {
    return (
        <Container>
            <Navbar />
            <Posts />
            <Footer />
        </Container>
    )
}

const Container = styled.div`
      
`

export default Home;
