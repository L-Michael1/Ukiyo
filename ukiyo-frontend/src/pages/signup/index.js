import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/user-context'
import { useHistory, Link } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import { Container, Grid, Paper, TextField, Button, Fade, Grow } from '@material-ui/core'
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import styled from 'styled-components';
import swal from 'sweetalert'


const Login = () => {

    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const initialState = {
        first_name: '',
        last_name: '',
        nickname: '',
        email: '',
        password: '',
    }

    const handleSubmit = (e) => {
        swal('hey')
        e.preventDefault();
        console.log('logging in')
        // Auth
        // Success => 
        // history.push('/')
        // Fail => 
        // Alert user failed to signup
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
                    <Header>
                        Ukiyo
                    </Header>
                </HeaderLink>
                <StyledPaper elevation={4}>
                    <PermContactCalendarOutlinedIcon fontSize='large' style={{ color: '#009CDA' }} />
                    <SubHeader>Sign Up</SubHeader>
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

const Header = styled.h3`
    display: grid;
    place-items: center;
    font-size: 48px;
    margin-top: 48px;
    margin-bottom: -32px;
    transition: all 0.5s ease 0s;

    &:hover {
        transform: translateY(-5px);
        text-decoration: underline;
    }
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
