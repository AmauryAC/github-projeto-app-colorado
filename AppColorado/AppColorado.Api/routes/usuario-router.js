'use strict'

const express = require('express');
const controller = require('../controllers/usuario-controller');

const router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;