import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Container, Grid, Paper, TextField, Button } from '@material-ui/core'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import styled from 'styled-components';

const Login = () => {

    const history = useHistory();

    const initialState = {
        email: '',
        password: '',
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('logging in')
        // Auth
        // Success => 
        // history.push('/')
        // Fail => 
        // Alert user invalid email/password
    }

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const [userInfo, setUserInfo] = useState(initialState);

    return (
        <Container maxWidth='xs'>
            <StyledPaper elevation={4}>
                <VpnKeyOutlinedIcon fontSize='large' style={{ color: '#009CDA' }} />
                <Header>Sign In</Header>
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
    )
}

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 128px;
    padding: 16px;
`

const Header = styled.h4`
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
