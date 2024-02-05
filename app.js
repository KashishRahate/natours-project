// 127.0.0.1:3000/api/v1/tours

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
console.log(process.env.NODE_ENV);
// 1) MiddleWares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //express.json() is a middleware(function that can modify the incoming request data, it stands b/w request and response)
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middleware 🙋‍♂️🙋‍♀️');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter); //mounting of the router
app.use('/api/v1/users', userRouter);

module.exports = app;
