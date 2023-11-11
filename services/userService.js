const User = require('../models').User;
class userService {
    async create(payload){
        const insertUser = await User.create(payload);
        return insertUser;
    }
    async findAll(){
        return await User.findAll({});
    }
    async getOneById(id){
        const dataItem = await User.findOne({ where: { id: id} });
        return dataItem;
      
    }
    async findByIdAndUpdate(id,payload){
        const updateUser = await User.update(payload, {
            where: {
                id : id
            }
        });
        return updateUser;
    }
    async findByIdAndDelete(id){
        const deleteUser =  await User.destroy({
            where: {
                id : id
            }
        });
        return deleteUser;
    }
    async findByIdAndUpdateToken(id, payload){
        const update = await User.update(payload , {
            where: {
              id : id
            }
        });
        return update;
    }
    async login(email){
        const login = await User.findOne({ where: { email: email } });
        return login;
    }
}
module.exports = new userService();