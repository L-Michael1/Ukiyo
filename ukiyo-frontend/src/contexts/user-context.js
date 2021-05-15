import { createContext } from 'react';

export const UserContext = createContext({
    user: {
        uid: '',
        nickname: '',
        email: '',
    },
})