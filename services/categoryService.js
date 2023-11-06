const { Sequelize } = require("sequelize");
const Category = require('../models').categories;
const Book = require('../models').books;
class CategoryService {
    async getAllAndCountBook(){
        const dataItem = await Category.findAll({
            attributes: [
                "id",
                'name',
                [Sequelize.fn('COUNT', Sequelize.col('books.id')), 'book_count']
            ],
            include: [{
                model: Book,
                attributes: []
            }],
            group: ['categories.id'],
            raw: true
        });
        return dataItem;
    }
    async create(payload){
        const dataInsert = await Category.create(payload);
        return dataInsert;
    }
    async getAll(){
        const dataItem = await Category.findAll({});
        return dataItem;
    }
    async findOneById(id){
        const dataItem = await Category.findOne({ where: { id: id} });
        return dataItem;
    }
    async findByIdAndUpdate(id, payload){
        const dataUpdate = await Category.update(payload, {
            where: {
                id : id
            }
        });
        return dataUpdate;
    }
    async deleteById(id){
        const dataDelete =  await Category.destroy({
            where: {
                id : id
            }
        });
        return dataDelete;
    }
}
module.exports = new CategoryService();