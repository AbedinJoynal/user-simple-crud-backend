const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String, required: true },
    interests: [{ type: String }],
    bio: { type: String, maxLength: 50 },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
