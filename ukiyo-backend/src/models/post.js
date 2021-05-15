import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = Schema({
    uid: String,
    creator: String,
    title: String,
    preview: String,
    recipe: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const Post = model('Post', postSchema);

export default Post;