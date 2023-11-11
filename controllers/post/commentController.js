const commentService = require("../../services/commentService");
class CommentController {
   async create(req, res){
      try {
        let payload = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
         const dataInsert = await commentService.create(payload);
         return res.status(201).json(dataInsert);
      } catch (error) {
         return res.status(500).json({status : 'error', error});
      }
   }
}
module.exports = new CommentController();