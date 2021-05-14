import express from 'express';

// Models
import Post from '../models/post.js';

const router = express.router();

// Create post
router.post('/', (req, res, next) => {});

// Read (Get) ALL posts
router.get('/', (req, res, next) => {});

// Read (Get) post
router.get('/:id', (req, res, next) => {});

// Edit (Update) post
router.patch('/:id', (req, res, next) => {});

// Delete post
router.delete('/:id', (req, res, next) => {});
