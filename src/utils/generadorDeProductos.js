let faker = require('faker');
faker.locale = 'es';

function generarProducto(id) {
    return {
        //id: id,
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.random.alpha(5),
        thumbnail: faker.image.abstract(),
        price: faker.commerce.price(3),
        stock: faker.datatype.number(100),
    }
}

module.exports = { generarProducto }
