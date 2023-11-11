const Book = require('../models').books;
const Category = require('../models').categories;
const Comment = require("../models").comments;
const User = require("../models").User;
const { Op } = require("sequelize");
class BookService {
    async getRelateBook(id){
        const dataItem = await Book.findAll({
            where: {
                category_id : id
            },
            offset: 0,
            limit: 5,
            order: [["id", "DESC"]],
            attributes: { exclude: ['content'] },
            
        });
        return dataItem;
    }
    async findOneBySlug(slug){
        return  await Book.findOne({
            where: { slug: slug },
            include: [
              {
                model: Comment,
                attributes: ['id', 'content', 'vote', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: ['name'],
                  }
                ],
              },
              {
                model: Category,
                attributes: ['name']
              }
            ],
            order: [
                [ Comment, 'id', 'DESC' ], 
            ]
          })
          .then(async (data) => {
                
                let averageVote = false;
                const filteredComments = data.comments.filter((comment) => comment.vote !== 0);
                if (filteredComments.length > 0) {
                    const totalVotes = filteredComments.reduce((sum, comment) => sum + comment.vote, 0);
                    averageVote = totalVotes / filteredComments.length;
                } 

                const {id, title ,year, slug, author, isbn, image, content, category,category_id, createdAt, updatedAt,  comments} = data;
                return {
                    ...{id, title ,year, slug, author, isbn, image, content,category, category_id, createdAt, updatedAt,  comments},
                    total_comment : data.comments.length,
                    average_vote : averageVote ? averageVote : null
                }
          })
          .catch(() => {
              return null;
          })

    }
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