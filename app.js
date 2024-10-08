const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Configuracion del motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesiones
app.use(session({
  secret: 'mi_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

 // usar las rutas 
 app.use('/', indexRouter);
 app.use('/users', usersRouter);

// manejo de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// En tu archivo de rutas o controlador en Express
app.post('/procesar-codigo', (req, res) => {
  const codigo = req.body.codigo;
  // Procesar el código recibido
  res.send(`Código recibido: ${codigo}`);
});

app.use(express.static('public'));


module.exports = app;
