import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, TextField, Button, Grow } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import styled from 'styled-components';
import { UserContext } from '../../contexts/user-context';
import firebase from '../../firebase/firebase';
import swal from 'sweetalert'
import UserLoading from '../../components/user-loading';

const ForgotPassword = () => {

    const auth = firebase.auth();
    const { userLoading, setUserLoading } = useContext(UserContext);
    const [email, setEmail] = useState('');

    const handleChange = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserLoading(true);
        try {
            await auth.sendPasswordResetEmail(email);
            swal('Success', 'Check your email to reset your password', 'success');
        } catch (error) {
            swal('Error', 'Email is not registered in our system...', 'error');
        }
        setUserLoading(false);
    }

    return (
        userLoading
            ?
            <UserLoading />
            :
            <Grow in={true} timeout={{ enter: 1200, exit: 1000 }} >
                <Container maxWidth='xs'>
                    <HeaderLink to='/'>
                        <HeaderContainer>
                            <Header>Ukiyo </Header>
                            <p>HOME</p>
                        </HeaderContainer>
                    </HeaderLink>
                    <StyledPaper elevation={4}>
                        <LockOpenIcon fontSize='large' style={{ color: '#f4a261' }} />
                        <SubHeader>Password</SubHeader>
                        <SubHeader>Reset</SubHeader>
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField name='email' type='email' variant='outlined' label='Email Address' fullWidth required onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Button type='submit' fullWidth style={{ color: '#fff', backgroundColor: '#f4a261' }}>
                                        Reset
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
            </Grow >
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

export default ForgotPassword;
