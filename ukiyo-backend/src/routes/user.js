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
    console.log(req.body);
    try {
        // Create user in Firebase, Firebase auth will check if user exists
        const response = await auth.createUserWithEmailAndPassword(email, password);
        const uid = response.user.uid;
        // Create and save user to DB
        await User.create({ uid, first_name, last_name, nickname, email, password });
        res.status(200).json({ user: { uid, first_name, last_name, nickname, email } });
    } catch (error) {
        res.status(412);
        res.json(error.message);
    }
})


export default router;