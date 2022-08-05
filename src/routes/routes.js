// DAOS
// const { ProductoDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
// let product = new ProductoDaoArchivo();

const { ProductoDaoMongoDB } = require('../daos/productos/ProductosDaoMongoDB');
let product = new ProductoDaoMongoDB();

// const { ChatDaoArchivo } = require('../daos/chat/ChatDaoArchivo');
// let chat = new ChatDaoArchivo();


const { PORT } = require('../../src/config/globals');
//INFO
const { info }= require("../../src/utils/info");

//FORK
const { fork } = require("child_process");

//LOG4JS
const log4js = require("log4js");
const { url } = require('inspector');

// EMAIL ADMIN
const { sendEmail } = require("../../src/utils/generadorEmail");
const products = require('../models/products');

//ROUTES
function getRoot(req, res) {
        res.render('pages/log', {main: true, login: false, signup : false, loginError: false, signupLogout: false , logout : false , error : false});
        //res.render('pages/log', {main: true});
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('products')
    } else {
        //res.render('pages/log', {login : true});
        res.render('pages/log', {main: false, login: true, signup : false, loginError: false, signupLogout: false, logout : false , error : false});
    }
}

function getSignup(req, res) {
    // res.render('pages/log', {signup : true});
    res.render('pages/log', {main: false, login: false, signup : true, loginError: false, signupLogout: false, logout : false , error : false});

}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('products')
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    const file = req.file;

    if(!file) {
        const error = new Error('please upload a file');
        error.httpStatusCode = 400;
        const logger = log4js.getLogger("error");
        logger.error("Log Error: " , error);
    }

    if (req.isAuthenticated()) {
        //enviar email de registro a admin
        sendEmail(req.body);
        res.redirect('products')
    } else {
        res.redirect('login')
    }
}

async function getProducts (req, res){
    if (req.isAuthenticated()) {
        let user = req.user;
        //const popularBD = await product.popular(10);
        
        const prod = product.getAll().then( (obj) =>{
            obj.length > 0 ? res.render( 'pages/index', {listExists: true, listNotExists: false, user: user, isUser : true, info: false}) : res.render('pages/index', {listNotExists: true, listExists: false, user: user, isUser : true, info: false})
        }) 
        
    } else {
        res.redirect('login')
    }
}

function getFaillogin (req, res) {
    console.log('error en login');
    //res.render('pages/log', {error: true});
    res.render('pages/log', {main: false, login: false, signup : false, loginError: true, signupLogout: false, logout : false , error : false});
}

function getFailsignup (req, res) {
    console.log('error en signup');
    //res.render('signup-error', {error: true});
    res.render('pages/log', {main: false, login: false, signup : false, loginError: false, signupLogout: true, logout : false , error : false});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            let user = req.body.name;
            //res.render('pages/log', { logout : false})
            res.render('pages/log', {main: false, login: false, signup : false, loginError: false, signupLogout: false, logout : true, name: user , error : false});
        } 
    });
}

function failRoute(req, res){
    const logger = log4js.getLogger("warn");
    logger.warn("Log Warn: ", req.url);
    logger.info("Log Info: ",req.url);

    res.status(404).render('pages/log', {main: false, login: false, signup : false, loginError: false, signupLogout: false, logout : false , error : true});
}

function getInfo(req, res) {
    const getObj  = info();
    const logger = log4js.getLogger("info");
    logger.info("Log Info: ",req.url);

    console.log(getObj);

    res.render( 'pages/info', getObj )
}
function getRandom(req, res) {
    let num = null;
    //const qtyAux = 100000000;
    const qtyAux = 100;
    req.query.qty == undefined ? num = qtyAux : num = req.query.qty;

    const child = fork("./src/utils/randomsChild");
    child.send(num);
    child.on("message", (data) => {
    try {
        let tittle = `Se han calculado en total ${num} numeros:`;
        let result = JSON.parse(data);
        res.render("pages/info", { info: false, random: true, tittle, result });
    } catch (error) {
        console.log("ERROR");
        console.log(error);
    }
    }); 
}


module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    getProducts,
    getInfo,
    getRandom
}