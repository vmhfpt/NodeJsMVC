const {Login, Register} = require("../../auth/auth");

class AuthController {
  
    async register(req, res){
        return await Register(req, res);
    }
    async login(req, res){
        return await Login(req, res);
    }
}

module.exports = new AuthController();