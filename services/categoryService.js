const Category = require('../models').categories;
class CategoryService {
    async create(payload){
        const dataInsert = await Category.create(payload);
        return dataInsert;
    }
}
module.exports = new CategoryService();