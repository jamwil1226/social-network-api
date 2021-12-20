const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReactions,
    deleteReactions
  } = require('../../controllers/thoughts-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// api/thoughts/:userId
router
  .route('/:userId')
  .post(createThoughts);

// /api/thoughts/:id/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReactions);

// /api/thoughts/id/reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReactions);

module.exports = router;