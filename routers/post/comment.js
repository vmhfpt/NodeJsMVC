const express = require('express');
const commentController = require("../../controllers/post/commentController");
const routerCommentApi = express.Router();
routerCommentApi.post('/', commentController.create);
module.exports = routerCommentApi;