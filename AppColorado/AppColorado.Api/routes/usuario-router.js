'use strict'

const express = require('express');

const controller = require('../controllers/usuario-controller');
const auth = require('../middlewares/authentication');

const router = express.Router();

// Public access
router.post('/autenticar', controller.authenticate);
router.post('/registrar', controller.post);

// Token auth required
router.get('/', auth, controller.get);
router.get('/:id', auth, controller.getById);
router.post('/', auth, controller.post);
router.put('/:id', auth, controller.put);
router.delete('/:id', auth, controller.delete);

module.exports = router;