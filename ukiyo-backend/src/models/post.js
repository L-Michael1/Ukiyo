import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = Schema({
    uid: { type: String, required: true },
    creator: { type: String, required: true },
    title: { type: String, required: true },
    preview: { type: String, default: '' },
    recipe: { type: String, default: '' },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const Post = model('Post', postSchema);

export default Post;