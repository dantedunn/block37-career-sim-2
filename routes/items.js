const express = require('express');
const router = express.Router();
const db = require('../db');



GET /api/items
GET /api/items/:itemId
GET /api/items/:itemId/reviews
GET /api/items/:itemId/reviews/:reviewId
POST /api/items/:itemId/reviews
