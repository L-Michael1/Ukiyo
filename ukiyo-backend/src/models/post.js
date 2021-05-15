import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = Schema({
    uid: String,
    creator: String,
    title: String,
    message: String,
    tags: [String],
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    // If viewable on home page
    isPrivate: Boolean,
})

const Post = model('Post', postSchema);

export default Post;