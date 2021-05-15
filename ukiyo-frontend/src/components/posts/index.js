import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import { PostsContext } from '../../contexts/posts-context';
import Post from './post'
import styled from 'styled-components';

const Posts = () => {
    const { posts } = useContext(PostsContext);

    return (
        <Container container spacing={0}>
            {posts.map((post) => {
                return (
                    <Grid item key={post._id} xs={12} sm={8} md={5} lg={4}>
                        <Post post={post} />
                    </Grid>
                )
            })}
        </Container>
    )
}

const Container = styled(Grid)`
    display: flex;
    width: 100%auto;
    max-width: 70%;
    margin: auto;
`

export default Posts
