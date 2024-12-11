const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Firstname is required'],
            trim: true, 
        },
        lastname: {
            type: String,
            required: [true, 'Lastname is required'],
            trim: true,  
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,  
            lowercase: true, 
            validate: {
                validator: function(v) {
                    return /\S+@\S+\.\S+/.test(v);  
                },
                message: 'Please enter a valid email address'
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        refresh_token: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('authusers', AuthSchema);
