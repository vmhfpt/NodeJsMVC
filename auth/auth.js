const User = require('../models').User;
const tokenService = require('../services/tokenService');
const userService = require('../services/userService');
const Login = async (req, res) => {
   return await User.findOne({ where: { email: req.body.email } })
   .then(async (user) => {
        if (!user) return res.json({ status: "error", message : "Email chưa được đăng ký" });
        const checkPassWord = user.authenticate(req.body.password);
        if (!checkPassWord) return res.json({ status :"error", message: "Mật khẩu không chính xác !" });
        const {id, name, email, username, role} = user;
        const refresh_token = tokenService.generateRefreshToken({id, name, email, username, role});
        const access_token = tokenService.generateAccessToken({id, name, email, username, role});

        await User.update({ remember_token: refresh_token }, {
            where: {
              id : user.id
            }
        });
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

            await User.update({ remember_token: refresh_token }, {
                where: {
                  id : dataInsert.id
                }
            });
            return res.status(200).json({status : 'success', refresh_token, access_token});
        } catch (error) {
            return res.status(500).json({status : 'error' , error});
        }
}
module.exports = {Login, Register};