const Book = require('../models').books;
const Category = require('../models').categories;
const { Op } = require("sequelize");
class BookService {
    async searchByTitle(key){
        const dataItem = await Book.findAll({
            where: {
                title : { [Op.like]: `%${key}%` }
            },
            attributes: { exclude: ['content'] }
        });
        return dataItem;
    }
    async searchByNameAuhthor(name){
        const dataItem = await Book.findAll({
            where: {
                author : { [Op.like]: `%${name}%` }
            },
            attributes: { exclude: ['content'] }
        });
        return dataItem;
    }
    async searchByIsbnCode(isbn){
        const dataItem = await Book.findAll({
            where: {
                isbn : { [Op.like]: `%${isbn}%` }
            },
            attributes: { exclude: ['content'] }
        });
        return dataItem;
    }
    async findAllByCategoryId(id){
        const dataItem = await Book.findAll({
            where: {
                category_id : id
            },
            attributes: { exclude: ['content'] }
        })
        return dataItem;
    }
    async insert(payload){
        const dataInsert = await Book.create(payload);
        return dataInsert;
    }
    async findOneById(id){
        const dataItem = await Book.findOne({ where: { id: id} });
        return dataItem;
    }
    async findByIdAndUpdate(id, payload){
        const dataUpdate = await Book.update(payload, {
            where: {
                id : id
            }
        });
        return dataUpdate;
    }
    async getAll(){
        const dataItem = await Book.findAll({
            include: [
                {
                  model: Category,
                  attributes: ["name", "id"],
                }
              ],
            order: [["id", "DESC"]],
            attributes: { exclude: ['content'] }
        });
        return dataItem;
    }
    async deleteById(id){
        const dataDelete = await Book.destroy({
            where: {
                id : id
            }
        });
        return dataDelete;
    }
}
module.exports = new BookService();