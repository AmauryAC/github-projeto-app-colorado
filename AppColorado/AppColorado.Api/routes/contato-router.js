'use strict'

const express = require('express');

const controller = require('../controllers/contato-controller');
const auth = require('../middlewares/authentication');

const router = express.Router();

// Token auth required
router.get('/', auth, controller.get);
router.get('/:id', auth, controller.getById);
router.post('/', auth, controller.post);
router.put('/:id', auth, controller.put);
router.delete('/:id', auth, controller.delete);

module.exports = router;