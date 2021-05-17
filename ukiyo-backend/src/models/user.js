import mongoose from 'mongoose';
import Post from './post.js'
const { Schema, model } = mongoose;

const userSchema = Schema({
    uid: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    // Favourites to hold recipe ids
    favourites: [String],
})

const User = model('User', userSchema);

export default User;