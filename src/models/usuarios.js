const mongoose = require('mongoose');
require('dotenv').config();
//dotenv.config();
const { MONGO_URI } = require('../config/globals')
const usuariosCollection = 'usuarios';
try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }, () => console.log('Base de datos conectada'))
} catch (error) {
  console.log(error);
}



const UsuarioSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    address: {type: String, required: true, max: 100},
    age: {type: Number, required: true, max: 100},
    phone: {type: Number, required: true, max: 100},
    avatar: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})

module.exports = mongoose.model(usuariosCollection, UsuarioSchema)