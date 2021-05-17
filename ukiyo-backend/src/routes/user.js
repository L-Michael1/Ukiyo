import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Models
import User from '../models/user.js'
import Post from '../models/post.js'

const router = express.Router();

// Create user
router.post('/', async (req, res, next) => {
    const { uid, first_name, last_name, nickname, email } = req.body;
    try {
        await User.create({ uid, first_name, last_name, nickname, email });
        res.status(200).json({ user: { uid, first_name, last_name, nickname, email } });
    } catch (error) {
        res.status(412).json({ message: error.message });
    }
})

// Get user
router.get('/:id', async (req, res, next) => {
    const uid = req.params.id;
    try {
        const user = await User.findOne({ uid });
        if (user) {
            const { first_name, last_name, nickname, email } = user;
            return res.status(200).json({ user: { uid, first_name, last_name, nickname, email } });

        }
        res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Update
router.patch('/:id', async (req, res, next) => {
    const uid = req.params.id;
    const updatedUser = req.body;
    try {
        const user = await User.findOneAndUpdate({ uid }, updatedUser, { new: true });

        // Update posts
        await Post.updateMany({ uid }, { creator: user.nickname });

        if (user) {
            const { first_name, last_name, nickname, email } = user;
            return res.status(200).json({ user: { uid, first_name, last_name, nickname, email } });
        }
        res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Delete
router.delete('/:id', async (req, res, next) => {
    const uid = req.params.id;
    try {
        const deletedDbUser = await User.findOneAndDelete({ uid });
        if (deletedDbUser) {
            const { first_name, last_name, nickname, email } = deletedDbUser;
            return res.status(200).json({ user: { uid, first_name, last_name, nickname, email } });
        }
        res.status(404).json({ message: 'User not found' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Sign in
router.post('/signIn', async (req, res, next) => {
    const { uid } = req.body;
    try {
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

export default router;