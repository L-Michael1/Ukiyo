import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/user-context'
import { useHistory, Link } from 'react-router-dom'
import { signIn } from '../../api'
import { Container, Grid, Paper, TextField, Button, Fade, Grow } from '@material-ui/core'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import styled from 'styled-components';
import swal from 'sweetalert'


const Login = () => {

    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const initialState = {
        email: '',
        password: '',
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingUser = await signIn(userInfo);
            console.log(existingUser);
            setUser({
                uid: existingUser.data.uid,
                nickname: existingUser.data.nickname,
                email: existingUser.data.email,
            });
            await swal('Login successful', '', 'success')
            history.push('/')
        } catch (error) {
            swal('Error signing in', 'Something went wrong! Try again later...', 'error')
            console.error(error.message)
        }
    }

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const [userInfo, setUserInfo] = useState(initialState);

    return (
        <Grow in={true} timeout={{ enter: 1200, exit: 1000 }} >
            <Container maxWidth='xs'>
                <HeaderLink to='/'>
                    <HeaderContainer>
                        <Header>Ukiyo </Header>
                        <p>HOME</p>
                    </HeaderContainer>
                </HeaderLink>
                <StyledPaper elevation={4}>
                    <VpnKeyOutlinedIcon fontSize='large' style={{ color: '#009CDA' }} />
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
                                <Button type='submit' fullWidth style={{ color: '#fff', backgroundColor: '#009CDA' }}>
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
    color: #009CDA;
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
    margin-top: 128px;
    padding: 16px;
`

const SubHeader = styled.h4`
    margin-top: 10px;
    margin-bottom: -8px;
    font-size: 34px;
    font-weight: 400;
`

const Logo = styled.img`
    max-width: 130px;
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
