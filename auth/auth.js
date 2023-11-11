const tokenService = require('../services/tokenService');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Login = async (req, res) => {
   return await userService.login(req.body.email)
   .then(async (user) => {
        if (!user) return res.status(200).json({ status: "error", message : "Email chưa được đăng ký" });
        const checkPassWord = user.authenticate(req.body.password);
        if (!checkPassWord) return res.status(200).json({ status :"error", message: "Mật khẩu không chính xác !" });
        const {id, name, email, username, role} = user;
        const refresh_token = tokenService.generateRefreshToken({id, name, email, username, role});
        const access_token = tokenService.generateAccessToken({id, name, email, username, role});

        await userService.findByIdAndUpdateToken(user.id, { remember_token: refresh_token });
        return res.status(200).json({status : 'success', refresh_token, access_token});
   })
}
const Register = async (req, res) => {
        let payload = {
            ...req.body,
            role : 0,
            remember_token : '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        try {
            const dataInsert = await userService.create(payload);
            const {id, name, email, username, role} = dataInsert;
            const refresh_token = tokenService.generateRefreshToken({id, name, email, username, role});
            const access_token = tokenService.generateAccessToken({id, name, email, username, role});

            await userService.findByIdAndUpdateToken(dataInsert.id, { remember_token: refresh_token });
            return res.status(200).json({status : 'success', refresh_token, access_token});
        } catch (error) {
            return res.status(500).json({status : 'error' , error});
        }
}
const Logout = async (req, res) => {
    try {
        const token = req.body.refresh_token;
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const idUser = decoded.data.id;
        await userService.findByIdAndUpdateToken(idUser, { remember_token: '' });
        return  res.status(200).json({status : 'success', message : 'logout success'});
     }catch {
        return  res.status(200).json({status : 'error', message : 'token invalid or logout before'});
     } 
}
module.exports = {Login, Register, Logout};