module.exports = function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/auth/Login');
    }

    if (req.session.user.role !== 'admin') {
        return res.redirect('/auth/Home');
    }
    next();
};