const express = require('express');
const ProgressRouter = express.Router()

const progressController = require('../controllers/progress.controller');

ProgressRouter.get('/', progressController.getProgress);
ProgressRouter.put('/', progressController.updateProgress);

module.exports = ProgressRouter;