'use strict';
//TODO : DEFINE PERSMISSION FOR TEXTCHAT CRUD

// TextChat authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.article.user._id.equals(req.user._id)) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
        var permission = req.body.permissions[i];
        if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(TextChats, app, auth) {

    var textChats = require('../controllers/textChats')(TextChats);

    app.route('/api/textChats')
        .get(textChats.all)
        .post(auth.requiresLogin, hasPermissions, textChats.create);
    app.route('/api/textChats/:id')
        .get(auth.isMongoId, textChats.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, textChats.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, textChats.destroy);

    // Finish with setting up the articleId param
    app.param('id', textChats.textChat);
};
