const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes');
const usersRoutes = require('./users-routes');

// add prefix of `/thoughts` to routes created in `thoughts-routes.js`
router.use('/thoughts', thoughtsRoutes);

// add prefix of '/users' to routes created in 'users-routes.js'
router.use('/users', usersRoutes);

module.exports = router;