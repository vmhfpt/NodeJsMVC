const Comment = require('../models').comments;
class CommentService {
    async create(payload){
        const dataItem = await Comment.create(payload);
        return dataItem;
    }
}
module.exports = new CommentService();