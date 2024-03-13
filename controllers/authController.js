const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id } /*Payload*/, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body); // here anyone can specify the role as admin -- very serious security flaw
  const newUser = await User.create({
    // here role is not stored, we only allow data that we actually need to be put into the new user(email, password), manually enter data is not stored for the new user
    name: req.body.name,
    email: req.body.email,
    password: req.ubody.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please Provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  // console.log(user);
  // const correct = await user.correctPassword(password, user.password);
  // ('password) === '$2a$12$jSj0fWbpLO2X2EnFCbAlmuFnWBuqBRBtSg5L4/CAYoxK/kaTQQ16W'

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
