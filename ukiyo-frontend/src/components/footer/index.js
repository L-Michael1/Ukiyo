import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Fade } from '@material-ui/core'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import styled from 'styled-components'
import github from '../../assets/github.png'

const Footer = () => {
    return (
        <Fade in={true} timeout={{ enter: 1200, exit: 1000 }}>
            <Container>
                <HoverAnchor href='https://www.linkedin.com/in/mlam977/' target='_blank'>
                    <LinkedInIcon style={{ color: 'black' }} fontSize='large' />
                </HoverAnchor>
                <HoverLink to='/'>
                    <h3>Ukiyo</h3>
                </HoverLink>
                <a href='http://github.com/L-Michael1' target='_blank'>
                    <StyledAvatar src={github} />
                </a>
            </Container>
        </Fade>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: auto;
    bottom: 0;
    width: 100%;
    height: 60px !important;
    border-top: 1px solid whitesmoke;
    background-color: #fff;
`
const StyledAvatar = styled(Avatar)`
    transition: all 0.4s ease 0s;

    &:hover{
        cursor: pointer;
        transform: translateY(-4px);
    }
`

const HoverAnchor = styled.a`
    transition: all 0.4s ease 0s;

    &:hover{
        cursor: pointer;
        transform: translateY(-4px);
    }
`

const HoverLink = styled(Link)`
    text-decoration:none;
    color: #009CDA;
    transition: all 0.4s ease 0s;

    &:hover{
        cursor: pointer;
        transform: translateY(-4px);
    }
`

export default Footer;
