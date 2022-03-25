const homePage = (req, res) => res.render('home');

const loginPage = (req,res) => res.render('login');

const signupPage = (req,res) => res.render('signup');

const todosPage = (req,res) => res.render('todos');

module.exports = {
    homePage,
    loginPage,
    signupPage,
    todosPage,
}
