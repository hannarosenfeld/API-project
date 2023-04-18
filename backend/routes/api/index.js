const router = require('express').Router();

const { handleValidationErrors } = require('../../utils/validation.js');
const { restoreUser } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
spotsRouter = require('./spots.js')

router.use(handleValidationErrors);
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);


module.exports = router;
