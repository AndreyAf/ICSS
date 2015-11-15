'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// TODO: rewrite name and schema
/**
 * text-chat Schema
 */


var TextChatSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    session: {
        type: Schema.ObjectId,
        ref: 'Session'
    }
});

/**
 * Validations
 */

//TODO : chech if user exists , check for session also
TextChatSchema.path('user').validate(function(user) {
   return !!user;
}, 'user cannot be null ');

TextChatSchema.path('content').validate(function(content) {
    return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */

TextChatSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username')
      .populate('session' , 'id session_id')
      .exec(cb);
};

mongoose.model('TextChat', TextChatSchema);
