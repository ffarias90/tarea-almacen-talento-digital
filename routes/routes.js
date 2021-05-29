const { Router } = require('express');
const { User } = require('../models/db');
const router = Router();


//middleware para validar que el usuario esta logeado
function checkLogin(req, res, next) {


    if (req.session.user == null) {
        req.flash('errors', "Tienes que estar logeado para entrar a esta parte del sistema.");
        return res.redirect('/login');
    }

    res.locals.user = req.session.user;

    next();
}

//middleware para validar admin
function checkAdmin(req, res, next) {

    if (req.session.user.rol != "ADMIN") {
        req.flash('errors', "No tienes permisos de Administrador. No puedes entrar a esta parte del sistema.");
        return res.redirect('/');
    }

    next();

}

//página de usuario
router.get("/", [checkLogin], (req, res) => {

    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");



    res.render("usuario.ejs", { errors, mensajes });
});

//pagina de admin
router.get("/admin", [checkLogin, checkAdmin], (req, res) => {


    const errors = req.flash("errors");
    const mensajes = req.flash("mensajes");

    res.render("admin.ejs", { errors, mensajes })
});

//rutas socket
router.get('/socket', async(req, res) => {
    res.render('socket.ejs');
});

router.get('/saludo', async(req, res) => {
    res.send('Hi everyone');
});

router.get('/adios', async(req, res) => {
    res.send('Arrivederci');
});





module.exports = router;