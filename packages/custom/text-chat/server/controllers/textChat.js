'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TextChat = mongoose.model('TextChat'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(TextChats) {

    return {
        /**
         * Find textChat by id
         */
        textChat: function(req, res, next, id) {
            TextChat.load(id, function(err, textChat) {
                if (err) return next(err);
                if (!textChat) return next(new Error('Failed to load textChat ' + id));
                req.textChat = textChat;
                next();
            });
        },
        /**
         * Create an textChat
         */
        create: function(req, res) {
            var textChat = new TextChat(req.body);
            textChat.user = req.user;

            textChat.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the textChat'
                    });
                }

                TextChats.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/textChats/' + textChat._id,
                    name: textChat.title
                });

                res.json(textChat);
            });
        },
        /**
         * Update an textChat
         */
        update: function(req, res) {
            var textChat = req.textChat;

            textChat = _.extend(textChat, req.body);


            textChat.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the textChat'
                    });
                }

                TextChats.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: textChat.title,
                    url: config.hostname + '/textChats/' + textChat._id
                });

                res.json(textChat);
            });
        },
        /**
         * Delete an textChat
         */
        destroy: function(req, res) {
            var textChat = req.textChat;


            textChat.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the textChat'
                    });
                }

                TextChats.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: textChat.title
                });

                res.json(textChat);
            });
        },
        /**
         * Show an textChat
         */
        show: function(req, res) {

            TextChats.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.textChat.title,
                url: config.hostname + '/textChats/' + req.textChat._id
            });

            res.json(req.textChat);
        },
        /**
         * List of TextChats
         */
        all: function(req, res) {
            var query = req.acl.query('TextChat');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, textChats) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the textChats'
                    });
                }

                res.json(textChats)
            });

        }
    };
};