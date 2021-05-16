import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/user-context'
import { useHistory, Link } from 'react-router-dom'
import { signIn } from '../../api'
import { Container, Grid, Paper, TextField, Button, Fade, Grow } from '@material-ui/core'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import styled from 'styled-components';
import swal from 'sweetalert'
import UserLoading from '../../components/user-loading';

const Login = () => {
    const history = useHistory();
    const { setUser, userLoading, setUserLoading } = useContext(UserContext);

    const initialState = {
        email: '',
        password: '',
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserLoading(true);
        try {
            // Store user in local storage for a certain amount of time??
            const existingUser = await signIn(userInfo);
            setUser({
                uid: existingUser.data.uid,
                nickname: existingUser.data.nickname,
                email: existingUser.data.email,
            });
            setUserLoading(false);
            history.push('/')
        } catch (error) {
            swal('Error signing in', 'Something went wrong! Check credentials or try again later...', 'error')
            console.error(error.message)
        }
        setUserLoading(false);
    }

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const [userInfo, setUserInfo] = useState(initialState);

    return (
        userLoading ?
            <UserLoading /> :
            <Grow in={true} timeout={{ enter: 1200, exit: 1000 }} >
                <Container maxWidth='xs'>
                    <HeaderLink to='/'>
                        <HeaderContainer>
                            <Header>Ukiyo </Header>
                            <p>HOME</p>
                        </HeaderContainer>
                    </HeaderLink>
                    <StyledPaper elevation={4}>
                        <VpnKeyOutlinedIcon fontSize='large' style={{ color: '#f4a261' }} />
                        <SubHeader>Sign In</SubHeader>
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField name='email' type='email' variant='outlined' label='Email Address' fullWidth required onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField name='password' type='password' variant='outlined' label='Password' fullWidth required onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Button type='submit' fullWidth style={{ color: '#fff', backgroundColor: '#f4a261' }}>
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <StyledLink to='/SignUp'>
                                        Don't have an account? Sign up!
                                    </StyledLink>
                                </Grid>
                            </Grid>
                        </Form>
                    </StyledPaper>
                </Container>
            </Grow>
    )
}

const HeaderLink = styled(Link)`
    text-decoration: none;
    color: #f4a261;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease 0s;

    &:hover {
        transform: translateY(-5px);
        text-decoration: underline;
        text-decoration-thickness: 0;
        text-decoration-style: wavy;
    }
`

const Header = styled.h3`
    font-size: 48px;
    margin-top: 48px;
`

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 96px;
    margin-bottom: 64px;
    padding: 16px;
`

const SubHeader = styled.h4`
    margin-top: 10px;
    margin-bottom: -8px;
    font-size: 34px;
    font-weight: 400;
`

const Form = styled.form`
    margin-top: 24px;
    width: 100%auto;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
`

export default Login;
