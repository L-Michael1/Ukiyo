const ttl = 60 * 60 * 1000; // 1 hour
const key = 'user'
const initialUserState = {
    uid: '',
    nickname: '',
    email: ''
}

// Store user in local storage given some time to live
export const setUserWithExpiry = (value) => {
    const now = new Date();
    const user = {
        uid: value.uid,
        email: value.email,
        nickname: value.nickname,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(user));
}

// Get user from local storage 
export const getUserWithExpiry = () => {
    const userStr = localStorage.getItem(key);
    if (!userStr) return initialUserState;

    const user = JSON.parse(userStr);
    const now = new Date();
    if (now.getTime() > user.expiry) {
        localStorage.removeItem(key);
        return initialUserState;
    }
    return user;
}