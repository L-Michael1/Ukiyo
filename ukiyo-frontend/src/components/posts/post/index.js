import React, { useContext } from 'react'

const Post = ({ post }) => {
    if (post) {
        return (
            <div>
                {post.message}
            </div>
        )
    } else {
        return null;
    }
}

export default Post;
