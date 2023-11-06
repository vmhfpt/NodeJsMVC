const routerBook = require("./admin/book.js");
const routerUser = require("./admin/user.js");
const routerCategory = require('./admin/category.js');
const {Login} = require("../auth/auth.js");
const authLogin = require('../middleware/authentication.js');
const userController = require("../controllers/admin/userController.js");
const authController = require("../controllers/post/authController.js"); 
const routerBookApi = require("./post/book.js")
const routerCategoryApi = require("./post/category.js");
function Router(app){
    app.post('/admin/users/get-refresh-token', userController.getRefreshToken);
    app.post('/admin/login', Login);
    app.use('/admin/books',authLogin, routerBook);
    app.use('/admin/users',authLogin, routerUser);
    app.use('/admin/categories',authLogin, routerCategory);

    ///////////////////////////////////////////////////
    app.use('/api/books', routerBookApi);
    app.use('/api/categories', routerCategoryApi);
    app.post('/api/login', authController.login);
    app.post('/api/register', authController.register);
}
module.exports = Router ;
