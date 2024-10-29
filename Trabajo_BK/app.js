var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://2120100403:PEHGpOSWhEEzGh3T@cluster1.6y37m.mongodb.net/');

//lista de modelos
require('./model/sensores');
require('./model/empleado');
require('./model/producto');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sensorRouter = require('./routes/sensor');
var empleadoRouter = require('./routes/empleados');
var productoRouter = require('./routes/productos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/foto',express.static(__dirname +'/almacen/img'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  "origin": ["http://localhost:4200", "htpp://localhost:80"],
  // "origin": "*",
  "methods": "GET, PUT, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sensor',sensorRouter);
app.use('/empleado',empleadoRouter);
app.use('/producto', productoRouter);

// catch 404 and forward to error handler
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

module.exports = app;
