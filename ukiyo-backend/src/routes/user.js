import express from 'express';
import jwt from 'jsonwebtoken'

// Models
import User from '../models/user.js'

// Auth
import firebase from '../firebase/firebase.js'
const auth = firebase.default.auth();

const router = express.Router();

// Create user
router.post('/', async (req, res, next) => {
    const { first_name, last_name, nickname, email, password } = req.body;
    try {
        // Create user in Firebase, Firebase auth will check if user exists
        const response = await auth.createUserWithEmailAndPassword(email, password);
        const uid = response.user.uid;
        // Create and save user to DB
        await User.create({ uid, first_name, last_name, nickname, email, password });
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
        res.status(404).json('User not found');
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// Update
router.patch('/:id', async (req, res, next) => {
    const uid = req.params.id;
    const updatedUser = req.body;
    try {
        const user = await User.findOneAndUpdate({ uid }, updatedUser, { new: true });
        if (user) {
            const { first_name, last_name, nickname, email } = user;
            return res.status(200).json({ user: { uid, first_name, last_name, nickname, email } });
        }
        res.status(404).json('User not found');
    } catch (error) {
        res.status(400).json(error.message);
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
        res.status(404).json('User not found');
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// Sign in
router.post('/signIn', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const response = await auth.signInWithEmailAndPassword(email, password);
        const uid = response.user.uid;
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json('Unable to login at the moment...try again later');
    }
})

export default router;