const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('../middleware/verifyToken');

const MessageController = require('../controllers/MessageController');

const messageRoutes = express.Router();

messageRoutes.get('/', 
    MessageController.index
);

messageRoutes.post('/', 
    // verify,
    MessageController.store        
);

module.exports = messageRoutes;
