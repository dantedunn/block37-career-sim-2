const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all reviews made by the authenticated user
router.get('/api/reviews/me', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const reviews = await db.getReviewsByUserId(userId); // Replace with actual DB logic
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user reviews' });
    }
});

// Update a specific review by a user
router.put('/api/users/:userId/reviews/:reviewId', async (req, res) => {
    try {
        const { userId, reviewId } = req.params;
        const { rating, comment } = req.body;
        const updatedReview = await db.updateReview(userId, reviewId, rating, comment); // Replace with actual DB logic
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
});

// Add a comment to a specific review for an item
router.post('/api/items/:itemId/reviews/:reviewId/comments', async (req, res) => {
    try {
        const { itemId, reviewId } = req.params;
        const { comment } = req.body;
        const newComment = await db.addCommentToReview(itemId, reviewId, comment); // Replace with actual DB logic
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Get all comments made by the authenticated user
router.get('/api/comments/me', async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is attached to the request
        const comments = await db.getCommentsByUserId(userId); // Replace with actual DB logic
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user comments' });
    }
});

// Update a specific comment by a user
router.put('/api/users/:userId/comments/:commentId', async (req, res) => {
    try {
        const { userId, commentId } = req.params;
        const { comment } = req.body;
        const updatedComment = await db.updateComment(userId, commentId, comment); // Replace with actual DB logic
        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

// Delete a specific comment by a user
router.delete('/api/users/:userId/comments/:commentId', async (req, res) => {
    try {
        const { userId, commentId } = req.params;
        await db.deleteComment(userId, commentId); // Replace with actual DB logic
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// Delete a specific review by a user
router.delete('/api/users/:userId/reviews/:reviewId', async (req, res) => {
    try {
        const { userId, reviewId } = req.params;
        await db.deleteReview(userId, reviewId); // Replace with actual DB logic
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
});

module.exports = router;