import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { signUp } from '../../api'
import { Container, Grid, Paper, TextField, Button, Fade, Grow } from '@material-ui/core'
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import styled from 'styled-components';
import swal from 'sweetalert'


const Login = () => {

    const history = useHistory();

    const initialState = {
        first_name: '',
        last_name: '',
        nickname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userInfo.nickname.length > 10) {
            swal('Error signing up', 'Profile name has a maximum of 10 characters!', 'error')
            return;
        }

        if (userInfo.password.length < 6) {
            swal('Error signing up', 'Password must be atleast 6 characters!', 'error')
            return;
        }

        if (userInfo.password !== userInfo.passwordConfirm) {
            swal('Error signing up', 'Passwords do not match!', 'error');
            return;
        }

        try {
            await signUp(userInfo);
            await swal('Sign up successful', 'You can now log in!', 'success')
            history.push('/signIn')
        } catch (error) {
            swal('Error signing up', 'User already exists!', 'error')
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

    console.log(userInfo);

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
                    <PermContactCalendarOutlinedIcon fontSize='large' style={{ color: '#009CDA' }} />
                    <FormHeader>Sign Up</FormHeader>
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField name='first_name' type='text' variant='outlined' label='First Name' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name='last_name' type='text' variant='outlined' label='Last Name' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name='nickname' type='text' variant='outlined' label='Profile Name' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name='email' type='email' variant='outlined' label='Email Address' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name='password' type='password' variant='outlined' label='Password' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name='passwordConfirm' type='password' variant='outlined' label='Password Confirmation' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button type='submit' fullWidth style={{ color: '#fff', backgroundColor: '#009CDA' }}>
                                    signup
                            </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <StyledLink to='/SignIn'>
                                    Already have an account? Sign in!
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
    margin-top: 96px;
    margin-bottom: 64px;
    padding: 16px;
`

const FormHeader = styled.h4`
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
