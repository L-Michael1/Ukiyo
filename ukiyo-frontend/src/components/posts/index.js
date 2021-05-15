import React, { useContext } from 'react'
import { PostsContext } from '../../contexts/posts-context';
import Post from './post'

const Posts = () => {
    const { posts } = useContext(PostsContext);

    return (
        <div>
            {posts.map((post, index) => {
                return (
                    <Post post={post} />
                )
            })}
            <Post />
        </div>
    )
}

export default Posts
