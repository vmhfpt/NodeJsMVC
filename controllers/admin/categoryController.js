const slug = require('slug');
const categoryService = require('../../services/categoryService');
class CategoryController {
   async index(req, res){
      return res.send('get list');
   }
   async create(req, res){
        const payload = {
            ...req.body,
            slug : slug(req.body.name),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        try {
            const dataCreate = await categoryService.create(payload);
            return res.status(201).json({status: 'success', data : dataCreate});
        } catch (error) {
            return res.status(500).json({status: 'error',  error});
        }
   }
   async update(req, res){
    return res.send('update category');
   }
   async delete(req, res){
    return res.send('delete category');
   }
   async findOne(req, res){
    return res.send('find a category by id');
   }
}
module.exports = new CategoryController();