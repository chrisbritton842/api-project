const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Tweet } = db;
const { check, validationResult } = require('express-validator')

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const tweetNotFoundError = (tweetId) => {
  const error = new Error(`Tweet with id ${tweetId} not found.`);
  error.title = 'Tweet not found.';
  error.status = 404;
  return error;
}

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    // TODO: Generate error object and invoke next middleware function
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
      }
      next();
  };

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
    next(tweetNotFoundError(tweetId))
  }
}));

router.post('/',handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { message } = req.body;
    const tweet = await Tweet.create({ message });
    
}));


module.exports = router;
