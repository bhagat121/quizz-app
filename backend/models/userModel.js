const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },

    },
    {
        timestamps: true
    }

);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.equalPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model('users', userSchema);
module.exports = User;
// module.exports = mongoose.model('User', userSchema);