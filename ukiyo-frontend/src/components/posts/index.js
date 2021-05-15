import React, { useContext } from 'react'
import { Grid, Grow, CircularProgress, makeStyles } from '@material-ui/core'
import { PostsContext } from '../../contexts/posts-context';
import Drooling from '../../assets/drooling.png';
import Post from './post'
import styled from 'styled-components';

const useStyles = makeStyles({
    loading: {
        display: 'flex',
        margin: 'auto',
        marginTop: '18%',
        marginBottom: '17%',
    }
})

const Posts = () => {
    const classes = useStyles();
    const { posts, postsLoading, error } = useContext(PostsContext);
    return (
        postsLoading ?
            <CircularProgress className={classes.loading} color='secondary' size={80} thickness={1.8} />
            : error ?

                <Grow in={true} timeout={{ enter: 1800, exit: 1000 }}>
                    <ErrorContainer>
                        <h1>Something went wrong...</h1>
                        <ErrorImage src={Drooling} />
                    </ErrorContainer>
                </Grow >

                :

                <Grow in={true} timeout={{ enter: 1800, exit: 1000 }}>
                    <Container container alignContent='center' alignItems='center' justify='center' >
                        {posts.map((post) => {
                            return (
                                <Grid item key={post._id}>
                                    <Post post={post} />
                                </Grid>
                            )
                        })}
                    </Container>
                </Grow >
    )
}

const Container = styled(Grid)`
    margin: auto;
    width: 100%;
    max-width: 60%;
`

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 275px;
    margin-bottom: 275px;
`
const ErrorImage = styled.img`
    object-fit: contain;
    width: 100%auto;
    height: auto;
    max-width: 150px;
`

export default Posts
