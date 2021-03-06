var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Index = require('../app/controllers/index');
var Comment = require('../app/controllers/comment');
var Catetory = require('../app/controllers/catetory');
module.exports = function(app) {
    app.use(function(req, res, next) {
        var _user = req.session.user;
        res.locals.user = _user;
        console.log(res.locals.user);
        next();
    })
    // index page
    app.get('/', Index.index);
    // User
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/logout', User.logout);
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);

    // Movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save);
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);

    // Comment
    app.post('/user/comment', User.signinRequired,Comment.save);

    // catetory
    app.get('/admin/catetory/new', User.signinRequired,Catetory.new);
    app.post('/admin/catetory', User.signinRequired, User.adminRequired, Catetory.save);
    app.get('/admin/catetory/list', User.signinRequired, User.adminRequired, Catetory.list);
    // results
    app.get('/results', Index.search);
}
