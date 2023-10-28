var jwt = require('jsonwebtoken');
const User = require('../models').User;
const tokenService = require('../services/tokenService');
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
        return res.json({status : 'success', refresh_token, access_token});
   })
}
module.exports = Login;