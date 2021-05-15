import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import Drooling from '../../assets/drooling-black.png'
import styled from 'styled-components';

const useStyles = makeStyles({
    loading: {
        display: 'flex',
        margin: 'auto',
        marginTop: '18%',
    }
})

const UserLoading = () => {
    const classes = useStyles();
    return (
        <LoadingContainer>
            <CircularProgress className={classes.loading} color='primary' size={70} thickness={1.8} />
            <LoadingLogo src={Drooling} />
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
`

const LoadingLogo = styled.img`
    object-fit: contain;
    width: 100%;
    max-width: 150px;
    margin-top: 20px;
    height: auto;
`

export default UserLoading;
