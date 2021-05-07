import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = Schema({
    uid: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    nickname: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User = model('User', userSchema);

export default User;