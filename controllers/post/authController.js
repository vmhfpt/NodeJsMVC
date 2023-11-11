const {Login, Register, Logout} = require("../../auth/auth");

class AuthController {
  
    async register(req, res){
        return await Register(req, res);
    }
    async login(req, res){
        return await Login(req, res);
    }
    async logout(req, res){
        return await Logout(req, res);
    }
}

module.exports = new AuthController();