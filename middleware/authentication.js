const jwt = require('jsonwebtoken');
require('dotenv').config();
function authLogin(role = 'admin'){
   return (req, res, next) => {
      //   next();
      //   return true;
      const authHeader = req.header('authorization');
      const token = authHeader && authHeader.split(' ')[1];
      if(token == null){
         return res.status(403).json({status : 'error' , message : 'Token is empty or invalid'});
      }
      try {
         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
         
         if(decoded.data.role == 0 && role == 'admin'){
            return res.status(403).json({status : 'error' , message : 'You don`t have authorization'});
         }
         req.userId = decoded.data.id;
         req.name = decoded.data.name;
         req.email = decoded.data.email;
         next();
      }catch {
         return  res.status(401).json({status : 'error', message : 'Unauthorized'});
      } 
   }
  
}
module.exports = authLogin;