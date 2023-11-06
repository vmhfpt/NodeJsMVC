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
        //return res.json({data : req.query});
        try {
            const type = req.query.type;
            if(type == 'title') return res.status(200).json(await bookService.searchByTitle(req.query.key));
            if(type == 'author') return res.status(200).json(await bookService.searchByNameAuhthor(req.query.key));
            if(type == 'isbn') return res.status(200).json(await bookService.searchByIsbnCode(req.query.key));
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
   
}
module.exports = new BookController();