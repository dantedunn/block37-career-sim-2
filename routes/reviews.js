const express = require('express');
const router = express.Router();
const db = require('../db');



GET /api/reviews/me 
PUT /api/users/:userId/reviews/:reviewId
POST /api/items/:itemId/reviews/:reviewId/comments
GET /api/comments/me 
PUT /api/users/:userId/comments/:commentId 
DELETE /api/users/:userId/comments/:commentId 
DELETE /api/users/:userId/reviews/:reviewId