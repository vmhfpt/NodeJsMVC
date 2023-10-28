const routerBook = require("./admin/book.js");
const routerUser = require("./admin/user.js");
const routerCategory = require('./admin/category.js');
const Login = require("../auth/login.js");
const authLogin = require('../middleware/authentication.js');
const userController = require("../controllers/admin/userController.js");
function Router(app){
    app.post('/admin/users/get-refresh-token', userController.getRefreshToken);
    app.post('/admin/login', Login);
    app.use('/admin/books',authLogin, routerBook);
    app.use('/admin/users',authLogin, routerUser);
    app.use('/admin/categories',authLogin, routerCategory);
}
module.exports = Router ;
