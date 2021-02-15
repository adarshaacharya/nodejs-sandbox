module.exports = function(req, res, next) {
    if(!req.user.isAdmin) return res.status(403).send('Only admin can access'); // 403 Forbidden

    next();
}