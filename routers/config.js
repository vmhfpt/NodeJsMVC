const routerBook = require("./admin/book.js");
const routerUser = require("./admin/user.js");
const routerCategory = require('./admin/category.js');
const {Login} = require("../auth/auth.js");
const authLogin = require('../middleware/authentication.js');
const userController = require("../controllers/admin/userController.js");
const authController = require("../controllers/post/authController.js"); 
const routerBookApi = require("./post/book.js")
const routerCategoryApi = require("./post/category.js");
const routerCommentApi = require("./post/comment.js");
function Router(app){
    app.post('/admin/users/get-refresh-token', userController.getRefreshToken);
    app.post('/admin/login', Login);
    app.use('/admin/books',authLogin('admin'), routerBook);
    app.use('/admin/users',authLogin('admin'), routerUser);
    app.use('/admin/categories',authLogin('admin'), routerCategory);

    ///////////////////////////////////////////////////
    app.use('/api/comments',authLogin('user'), routerCommentApi);
    app.use('/api/books', authLogin('user'),routerBookApi);
    app.use('/api/categories', authLogin('user'),routerCategoryApi);
    
    app.post('/api/login', authController.login);
    app.post('/api/register', authController.register);
    app.post('/api/logout', authController.logout);
}
module.exports = Router ;
