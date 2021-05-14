import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = Schema({
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
    }
})

const Post = model(postSchema);

export default Post;