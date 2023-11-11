const bookService = require('../../services/bookService');
class BookController {
    async index(req, res){
        try {
            const dataItem = await bookService.getAll();
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async findAllByCategory(req, res){
        try {
            const dataItem = await bookService.findAllByCategoryId(req.params.id);
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async handleFilter(req, res){
        try {
            const type = req.query.type;
            if(type == 'title') return res.status(200).json(await bookService.searchByTitle(req.query.key));
            if(type == 'author') return res.status(200).json(await bookService.searchByNameAuhthor(req.query.key));
            if(type == 'isbn') return res.status(200).json(await bookService.searchByIsbnCode(req.query.key));
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async findOneBySlug(req, res){
        //const data = await bookService.findOneBySlug(req.params.slug);
        //return res.json(data);
        try {
            const dataItem = await bookService.findOneBySlug(req.params.slug);
            if(!dataItem)  return res.status(404).json({message : '404 not found'});
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async getRelateBookByCategoryId(req, res){
        try {
            const dataItem = await bookService.getRelateBook(req.body.id);
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
   
}
module.exports = new BookController();