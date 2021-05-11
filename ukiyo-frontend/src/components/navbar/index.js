import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Fade, Button } from '@material-ui/core'
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import { UserContext } from '../../contexts/user-context'
import ukiyo from '../../assets/ukiyo.png'
import styled from 'styled-components'
import swal from 'sweetalert'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        // Firebase logout
        // Set user to NULL;
        // Clear local storage?
        setUser({
            uid: '',
            nickname: '',
            email: '',
        });

        swal(`You have logged out`, "Successfully logged out", "success")
    }

    return (
        <Fade in={true} timeout={{ enter: 1200, exit: 1000 }}>
            <NavContainer>
                <div>
                    {
                        user.uid !== ''
                            ?
                            <SignedInContainer>
                                <span>Hello,</span>
                                <UserName>
                                    {user.nickname}!
                                </UserName>
                            </SignedInContainer>
                            :
                            <div></div>
                    }
                </div>

                <Link to='/'>
                    <LogoContainer>
                        <Logo src={ukiyo} />
                    </LogoContainer>
                </Link>

                <AuthContainer>
                    {user.uid !== ''
                        ?
                        <SignedInContainer>
                            <LogoutButton variant='contained' color='secondary' onClick={handleLogout}>LOGOUT</LogoutButton>
                        </SignedInContainer>
                        :
                        <>
                            {/* <ButtonLink to='/SignUp'>
                                <AuthButton variant='contained' color='primary'>Join</AuthButton>
                            </ButtonLink> */}
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
    justify-content: space-evenly;
    position: sticky;
    top: 0%;
    z-index: 1;
    border-bottom: 1px solid whitesmoke;
    background-color: white;
`

const LogoContainer = styled.div`
    margin: 2px;
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

const SecondaryLogo = styled(LoyaltyOutlinedIcon)`
    margin-top: 2px;
    color: #009CDA !important;
    font-size: 42px !important;
`

const AuthContainer = styled.div`
    margin: 0px 12px 5px 0px;
`

const ButtonLink = styled(Link)`
    text-decoration: none;
`

const AuthButton = styled(Button)`
    background-color: #009CDA !important;
    margin: 8px !important;
    transition: all 0.4s ease 0s !important;
    padding: 7px 13px !important;

    &:hover {
        background-color: #0082b5 !important;
        transform: translateY(-3px);
    }
`

const UserName = styled.span`
    font-size: 16px;
    font-weight: 600;
`

const LogoutButton = styled(Button)`
    padding: 6px 10px !important;
    transition: all 0.4s ease 0s !important;

    &:hover {
        background-color: #d10000 !important;
        transform: translateY(-3px);
    }
`

const SignedInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default Navbar
