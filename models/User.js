const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
},
  carritoDeCompras: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['ADMIN', 'VENDEDOR', 'COMPRADOR'],
    default: 'USUARIO'
},
    location: String,
    facebookID: String,
    googleID: String,
    microsoftID: String

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
