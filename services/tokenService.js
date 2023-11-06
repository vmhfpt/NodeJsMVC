require('dotenv').config();
var jwt = require('jsonwebtoken');
const User = require('../models').User;
class tokenService {
    generateRefreshToken(data){
        const refresh_token = jwt.sign({
            data: data
        }, process.env.REFRESH_TOKEN_SECRET , { expiresIn: process.env.TIME_REFRESH_TOKEN_EXPIRED });
        return refresh_token;
    }
    generateAccessToken(data){
        const access_token = jwt.sign({
            data: data
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TIME_ACCESS_TOKEN_EXPIRED });
        return access_token;
    }
    async verifyTokenUser(id){
        try {
            const dataUser = await User.findOne({ where: { id: id } });
            const tokenVerify = dataUser.remember_token;
            if(!tokenVerify ) throw new Error('unauthoziration');
            const decoded = jwt.verify(tokenVerify, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw new Error('unauthoziration');
        }
    }
    async getNewAccessToken(refreshToken){
        
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const {id, name, email, username, role} = decoded.data;
            await this.verifyTokenUser(id);
            const access_token = this.generateAccessToken({id, name, email, username, role});
            const refresh_token = this.generateRefreshToken({id, name, email, username, role});
            return ({status : 'success', access_token, refresh_token});
         }catch {
            return ({status : 'error', message : 'refresh_token error'})
         } 
    }
}
module.exports = new tokenService();