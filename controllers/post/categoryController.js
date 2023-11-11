const categoryService = require("../../services/categoryService");
class CategoryController {
    async index(req, res){
       try {
            const dataItem = await categoryService.getAllAndCountBook();
            return res.status(200).json(dataItem);
       } catch (error) {
            return res.status(500).json({status : 'error', error});
       }
    }
   
}
module.exports = new CategoryController();