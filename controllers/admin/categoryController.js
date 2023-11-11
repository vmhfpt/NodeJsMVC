const slug = require('slug');
const categoryService = require('../../services/categoryService');
class CategoryController {
   async index(req, res){
      try {
        const dataItem = await categoryService.getAll();
        return res.status(200).json(dataItem);
      } catch (error) {
        return res.status(500).json({status : 'error', error});
      }
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
   
   async findOne(req, res){
        try {
            const dataItem = await categoryService.findOneById(req.params.id);
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
   }
   async update(req, res){
        try {
            let payload = {
                ...req.body,
                slug : slug(req.body.name)
            };
            const dataUpdate = await categoryService.findByIdAndUpdate(req.params.id, payload);
            return res.status(200).json({status : 'success', data : dataUpdate});
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
   }
   async delete(req, res){
        try {
            const dataDelete = await categoryService.deleteById(req.params.id);
            return res.status(200).json({status : 'success', data : dataDelete});
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
   }
}
module.exports = new CategoryController();