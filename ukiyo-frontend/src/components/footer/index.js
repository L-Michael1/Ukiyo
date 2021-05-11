import React from 'react'
import { Avatar } from '@material-ui/core'
import styled from 'styled-components'
import heart from '../../assets/heart.png'
import github from '../../assets/github.png'

const Footer = () => {
    return (
        <Container>
            <Avatar src={heart} />
            <h3>Ukiyo</h3>
            <a href='http://github.com/L-Michael1' target='_blank'>
                <Avatar src={github} />
            </a>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0%auto;
    width: 100%;
    height: 60px;
    border-top: 1px solid whitesmoke;
    background-color: #fff;
`

export default Footer;
