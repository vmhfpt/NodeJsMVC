
const tokenService = require('../../services/tokenService');
const userService = require('../../services/userService');
class UserController {
  
    async index(req, res){
        try {
            const dataItem =  await userService.findAll();
            return res.status(200).json(dataItem);
        } catch (error) {
            return res.status(500).json({
                status : 'error',
                error 
            })
        }
    }
    async getRefreshToken(req, res){
        
        //return res.status(401).json({status:'error', message : 'refresh_token error'});


        if(!req.body.refresh_token){
            return res.status(403).json({status : 'error', message : 'refresh_token is invalid'});
        }
        const dataItem = await tokenService.getNewAccessToken(req.body.refresh_token);
        if(dataItem.status == 'success') return res.status(200).json(dataItem);
        return res.status(401).json(dataItem);
        
    }
    async create(req, res){
        let payload = {
            username : req.body.username,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            role : Number(req.body.role),
            remember_token : '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        try {
            const dataInsert = await userService.create(payload);
            return res.status(201).json({status : 'success', data : dataInsert});
        } catch (error) {
            return res.status(500).json({status : 'error' , error});
        }
    }
    async getOne(req, res){
        try {
            const dataUser = await userService.getOneById(req.params.id);
            return res.status(200).json({status : 'success', data : dataUser});
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async update(req, res){
        try {
            const dataUpdate = await userService.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({status : 'update success', data : dataUpdate});
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
    async delete(req, res){

        try {
            const dataDelete = await userService.findByIdAndDelete(req.params.id);
            return res.status(200).json({status : 'delete success', data : dataDelete});
        } catch (error) {
            return res.status(500).json({status : 'error', error});
        }
    }
}

module.exports = new UserController();