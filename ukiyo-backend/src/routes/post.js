import express, { Router } from 'express';

// Models
import Post from '../models/post.js';

const router = express.Router();

// Create post
router.post('/:id', async (req, res, next) => {
  const post = req.body;
  const uid = req.params.id;
  const newPost = new Post({ ...post, uid, createdAt: new Date().toISOString() })
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

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
// router.get('/:id', async (req, res, next) => {
//   const _id = req.params.id;
//   if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: 'No post with id' });
//   try {
//     const post = await Post.findById(_id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

// Read (Get) all user's posts for personal posts page
router.get('/:id', async (req, res, next) => {
  const uid = req.params.id;
  try {
    const posts = await Post.find({ uid });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

// Edit (Update) post
router.patch('/:id', async (req, res, next) => {
  const _id = req.params.id;
  const post = req.body;
  if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: 'No post with id' });
  try {
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res, next) => {
  const _id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: 'No post with id' });
  try {
    const post = await Post.findByIdAndDelete(_id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;