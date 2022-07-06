const mongoose = require('mongoose');

const Profile = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },
    contact: { 
        type: String,
         required: true 
        },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = Profile