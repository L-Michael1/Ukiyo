import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/user-context'
import { useHistory, Link } from 'react-router-dom'
import { updateUser, getUser } from '../../api'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Container, Grid, Paper, TextField, Button, Fade, Grow } from '@material-ui/core'
import styled from 'styled-components';
import swal from 'sweetalert'
import firebase from '../../firebase/firebase';
import bcrypt from 'bcryptjs';

const Profile = () => {

    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const initialState = {
        nickname: user.nickname,
        currentPassword: '',
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedUser = await updateUser(user.uid, userInfo);
            if (updatedUser.data.message) {
                swal('Error', 'Invalid password', 'error');
                return;
            }
            setUser({
                ...user,
                nickname: updatedUser.data.user.nickname,
            })
            await swal('Success', 'Edited profile successfully', 'success');
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleResetPassword = async () => {
        getUser(user.uid).then(async (res, req) => {
            const passwordMatch = await bcrypt.compare(userInfo.currentPassword, res.data.user.password);
            if (passwordMatch) {
                firebase.auth().sendPasswordResetEmail(user.email).then(() => {
                    console.log('hey');
                    swal('Success', 'Password reset email sent!', 'success');
                }).catch(err => {
                    swal('Error', 'Unable to send email at the moment...Try again later', 'error');
                })
                console.log('reset password')
            } else {
                swal('Error', 'Invalid password', 'error');
                return;
            }
        })
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
                    <AccountBoxIcon fontSize='large' style={{ color: '#009CDA' }} />
                    <SubHeader>Edit Profile</SubHeader>
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField name='nickname' type='text' variant='outlined' label='Profile Name' value={userInfo.nickname} fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name='currentPassword' type='password' variant='outlined' label='Current Password' fullWidth required onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button type='submit' fullWidth style={{ color: '#fff', backgroundColor: '#009CDA' }}>
                                    Submit Changes
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button fullWidth style={{ color: '#fff', backgroundColor: '#009CDA' }} onClick={handleResetPassword}>
                                    Reset Password
                                </Button>
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

export default Profile;
