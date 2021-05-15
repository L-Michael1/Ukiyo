import { createContext } from 'react';

export const PostsContext = createContext({
    posts: [{
        _id: '',
        creator: '',
        title: '',
        message: '',
        tags: [String],
        isPrivate: null,
    }]
})