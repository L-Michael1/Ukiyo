import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Fade, Button } from '@material-ui/core'
import { UserContext } from '../../contexts/user-context'
import ukiyo from '../../assets/ukiyo.png'
import styled from 'styled-components'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <Fade in={true} timeout={{ enter: 1200, exit: 1000 }}>
            <NavContainer>
                <LogoContainer>
                    <Link to='/'>
                        <Logo src={ukiyo} />
                    </Link>
                </LogoContainer>

                <AuthContainer>
                    {user.uid !== '' ? <>Signed in</> :
                        <>
                            <ButtonLink to='/SignUp'>
                                <AuthButton variant='contained' color='primary'>Join</AuthButton>
                            </ButtonLink>
                            <ButtonLink to='/SignIn'>
                                <AuthButton variant='contained' color='primary'>Login</AuthButton>
                            </ButtonLink>
                        </>}

                </AuthContainer>
            </NavContainer>
        </Fade>
    )
}

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0%;
    z-index: 1;
    border-bottom: 1px solid whitesmoke;
    background-color: white;
`

const LogoContainer = styled.div`
    transition: all 0.4s ease 0s;

    &:hover {
        transform: translateY(-3px);   
    }
`

const Logo = styled.img`
    object-fit: contain;
    width: 100%auto;
    height: auto;
    max-width: 150px;
    margin: 8px;
`

const AuthContainer = styled.div`
    position: absolute;
    right: 0;
    margin-bottom: 5px;
`

const ButtonLink = styled(Link)`
    text-decoration: none;
`

const AuthButton = styled(Button)`
    background-color: #009CDA !important;
    margin: 8px !important;
    transition: all 0.4s ease 0s !important;

    &:hover {
        background-color: #0082b5 !important;
        transform: translateY(-3px);
    }
`

export default Navbar
