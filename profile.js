const mongoose = require('mongoose');

const Profile = mongoose.model('User', {
    email: {
        type: String,
    },

    name: {
        type: String,
    },
    contact: { 
        type: String,
    }
});


module.exports = Profile