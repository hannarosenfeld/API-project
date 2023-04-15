const router = require('express').Router();

const { handleValidationErrors } = require('../../utils/validation.js');
const { restoreUser } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use(handleValidationErrors);
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);


module.exports = router;
