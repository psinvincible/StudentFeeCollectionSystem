const requireLogin = (req, res, next) => {
    if(!res.locals.user){
        return res.redirect("/user/login");
    }
    next();
}

module.exports = {
    requireLogin,
}