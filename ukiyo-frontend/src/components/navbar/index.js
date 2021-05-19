import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Fade, Button } from '@material-ui/core'
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import { UserContext } from '../../contexts/user-context'
import sushi from '../../assets/sushi.png'
import styled from 'styled-components'
import swal from 'sweetalert'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser({
            uid: '',
            nickname: '',
            email: '',
        });
        localStorage.removeItem('user');
        swal(`You have logged out`, "Successfully logged out", "success")
    }

    return (
        <Fade in={true} timeout={{ enter: 1200, exit: 1000 }}>
            <NavContainer>
                <div>
                    {
                        user.uid !== ''
                            ?
                            <LogoContainer>
                                <Logo src={sushi} />
                            </LogoContainer>
                            :
                            <LogoContainer>
                                <Logo src={sushi} />
                            </LogoContainer>
                    }
                </div>

                <LogoLink to='/'>
                    <LogoContainer>
                        <Header>U</Header>
                    </LogoContainer>
                    <LogoContainer>
                        <Header>k</Header>
                    </LogoContainer>
                    <LogoContainer>
                        <Header>i</Header>
                    </LogoContainer>
                    <LogoContainer>
                        <Header>y</Header>
                    </LogoContainer>
                    <LogoContainer>
                        <Header>o</Header>
                    </LogoContainer>
                </LogoLink>

                <AuthContainer>
                    {user.uid !== ''
                        ?
                        <>
                            <SignedInContainer>
                                <LogoutButton variant='contained' onClick={handleLogout}>LOGOUT</LogoutButton>
                                <UsernameLink to='/Profile'>{user.nickname}</UsernameLink>
                            </SignedInContainer>
                        </>
                        :
                        <>
                            <ButtonLink to='/SignUp'>
                                <AuthButton variant='contained' color='primary'>Join</AuthButton>
                            </ButtonLink>
                        </>
                    }
                </AuthContainer>
            </NavContainer>
        </Fade>
    )
}

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: auto;
    border-bottom: 1px solid whitesmoke;
    background-color: white;
`

const LogoContainer = styled.div`
    margin: 3px;
    transition: all 0.2s ease 0s;

    &:hover {
        transform: translateY(-4px);
    }
`

const LogoLink = styled(Link)`
    display: flex;
    text-decoration: none;
    color: black;
`

const Header = styled.h1`
    font-weight: 500;
    font-size: 36px;
`

const Logo = styled.img`
    object-fit: contain;
    width: 100%auto;
    height: auto;
    max-width: 100px;
    margin-top: 4px;
`

const AuthContainer = styled.div`
    margin: 0px 12px 5px 0px;
`

const ButtonLink = styled(Link)`
    text-decoration: none;
`

const AuthButton = styled(Button)`
    background-color: #f4a261 !important;
    margin: 8px !important;
    transition: all 0.4s ease 0s !important;
    padding: 7px 13px !important;

    &:hover {
        background-color: #f08a3a !important;
        transform: translateY(-3px);
    }
`

const UsernameLink = styled(Link)`
    color: #f4a261;
    font-size: 16px;
    font-weight: 600;
    padding-top: 12px;

    transition: all 0.3s ease 0s;

    &:hover {
        color: #fc8c32;
        transform: translateY(-2px);
    }
`

const LogoutButton = styled(Button)`
    background-color: #DF362D !important;
    color: #fff !important;
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
    margin-top: 7px;
`

export default Navbar
