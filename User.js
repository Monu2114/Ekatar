// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.methods.isValidPassword = async function (password) {
  try {
    // Use bcrypt.compare to compare the provided password with the hashed password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
