import express from 'express';

// Models
import Post from '../models/post.js';

const router = express.router();

// Create post
router.post('/', (req, res, next) => { });

// Read (Get) ALL posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Read (Get) post
router.get('/:id', async (req, res, next) => { });

// Read (Get) all user's posts for personal posts page
router.get('/:uid', (req, res, next) => {
  const uid = req.params.uid;
  try {
    const posts = await Post.find({ uid });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// Edit (Update) post
router.patch('/:id', (req, res, next) => { });

// Delete post
router.delete('/:id', (req, res, next) => { });
