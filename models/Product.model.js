const { Schema, model } = require('mongoose');
  
const productSchema = new Schema({
  name:String,
  description: String,
  pictures: {
    type: [String],
    default: 'https://aqt.cl/wp-content/uploads/2020/09/sin_imagen.jpg'
  },
  price: Number,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: Number,
}, {
  timestamps: true
});

module.exports = model('Product', productSchema);