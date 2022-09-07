const mongoose = require("mongoose");

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email Harus Diisi"],
  },
  name: {
    type: String,
    require: [true, "Nama User Harus Diisi"],
    maxlength: [225, "panjang nama harus antara 3-225 karakter"],
    minlength: [3, "panjang nama harus antara 3-225 karakter"],
  },
  username: {
    type: String,
    require: [true, "Username Harus Diisi"],
    maxlength: [225, "panjang username harus antara 3-225 karakter"],
    minlength: [3, "panjang username harus antara 3-225 karakter"],
  },
  password: {
    type: String,
    require: [true, "Password Harus Diisi"],
  },
  status: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar:{
    type: String,
  },
},{ timestamps: true });

userSchema.path('email').validate(async function (value){
  try {
    const count = await this.model('User').countDocuments({ email : value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `${attr.value} sudah terdaftar`)

userSchema.pre('save', function (next){
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model("User", userSchema);
