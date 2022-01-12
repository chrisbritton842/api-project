const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Tweet } = db;

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const tweetNotFoundError = (tweetId) => {
  const error = new Error(`Tweet with id ${tweetId} not found.`);
  error.title = 'Tweet not found.';
  error.status = 404;
  return error;
}

router.get("/", asyncHandler(async (req, res) => {
  const tweets = await Tweet.findAll();
  res.json({ tweets })
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const tweetId = parseInt(req.params.id);
  const tweet = await Tweet.findByPk(tweetId);

  if (tweet) {
    res.json({ tweet })
  }
  else {
    next(tweetNotFoundError)
  }
}));



module.exports = router;
