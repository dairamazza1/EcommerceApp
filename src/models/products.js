/* --------------------------------------- */
/*                MONGO DB                 */
/* --------------------------------------- */

const mongoose = require('mongoose')

const productsCollection = 'products';

const prodSchema = new mongoose.Schema({
    name: {type: String, max: 100},
    description: {type: String, max: 10000},
    code: {type: String, max: 100},  
    thumbnail: {type: String},
    price: {type: Number},
    stock: {type: Number}
    /*
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    code: {type: String, required: true, max: 100},  
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
    */
})

const products = mongoose.model(productsCollection, prodSchema);
module.exports = products;
