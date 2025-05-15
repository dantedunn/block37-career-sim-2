const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all items
router.get('/api/items', async (req, res) => {
    try {
        const items = await db.getAllItems(); // Replace with actual DB logic
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Get a specific item by ID
router.get('/api/items/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await db.getItemById(itemId); // Replace with actual DB logic
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// Get all reviews for a specific item
router.get('/api/items/:itemId/reviews', async (req, res) => {
    try {
        const { itemId } = req.params;
        const reviews = await db.getReviewsByItemId(itemId); // Replace with actual DB logic
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Get a specific review for a specific item
router.get('/api/items/:itemId/reviews/:reviewId', async (req, res) => {
    try {
        const { itemId, reviewId } = req.params;
        const review = await db.getReviewById(itemId, reviewId); // Replace with actual DB logic
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch review' });
    }
});

// Add a new review for a specific item
router.post('/api/items/:itemId/reviews', async (req, res) => {
    try {
        const { itemId } = req.params;
        const { rating, comment } = req.body;
        const newReview = await db.addReview(itemId, rating, comment); // Replace with actual DB logic
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
    }
});

module.exports = router;
