const slug = require('slug');
const bookService = require('../../services/bookService');
const { uploadImage } = require('../../config/cloudinary');
const { deleteImage } = require('../../config/cloudinary');
class BookController {
    
    async index(req, res){
        try {
            const dataItem = await bookService.getAll();
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async findOne(req, res){
        try {
            const dataItem = await bookService.findOneById(req.params.id);
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async update(req, res){
        
        const dataItem = await bookService.findOneById(req.params.id);
        return Promise.all([
            deleteImage(dataItem.image, req.file ? true : false),
            uploadImage(req.file ? req.file.path : false)
        ])
        .then(async ([dataDelete, dataUpload]) => {
            try {
                let payload = {
                    ...req.body,
                    slug : slug(req.body.title),
                    image : dataUpload.status == 'error' ? dataItem.image : dataUpload.url
                }
                const dataUpdate = await bookService.findByIdAndUpdate(req.params.id, payload);
                return res.status(200).json({status : 'success', data : dataUpdate});
            } catch (error) {
                return res.status(500).json({status : 'error', error});
            }
        })
        
    }
    async create(req, res, next){
        
        return uploadImage(req.file.path)
        .then(async (dataImage) => {
            try {
                let payload = {
                    ...req.body,
                    slug : slug(req.body.title),
                    image : dataImage.url,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                const dataInsert = await bookService.insert(payload);
                return res.status(201).json({status : 'success', data : dataInsert});
            } catch (error) {
                return res.status(500).json({status : 'error', error});
            }
           
        })
        .catch((error) => {
            return res.status(500).json({status : 'error', error});
        })
        
    }
    async delete(req, res){
        return bookService.findOneById(req.params.id)
        .then(async (data) => {
            try {
                const removeImage = await deleteImage(data.image);
                const removeItem = await bookService.deleteById(data.id);
                return res.status(200).json({status : 'success', data : removeItem});
            } catch (error) {
                return res.status(500).json({status : 'error', error});
            }
        })
    }
}
module.exports = new BookController();