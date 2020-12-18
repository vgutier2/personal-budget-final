const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt')
const userData = require('../models/userModels')
const budgetData = require('../models/budgetModels')

dotenv.config()

const secretKey = 'My secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
})

router.post('/signup', (req, res) => {
  mongoose.connect(process.env.DATABASE_ACCESS_USER, () => {
    console.log("User database connected")
  })
    const signedUpUser = new userData({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    })
    signedUpUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
})

router.post('/login', (req, res) => {
    mongoose.connect(process.env.DATABASE_ACCESS_USER, () => {
      console.log("User database connected")
    })
    userData.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        if (user.email == req.body.email && user.password == req.body.password) {
          let token = jwt.sign({ email: user.email, password: user.password }, secretKey, { expiresIn: "7d" });
          console.log(token);
          res.json ({
            login: true,
            user: user.email,
            token: token,
            userID: user._id,
          })
          console.log("logged in");
        }
      }
    });
  });

router.get('/dashboard', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true,
    })
});

router.get('/budget/:userId', (req, res) => {
  mongoose.connect(process.env.DATABASE_ACCESS_BUDGET, () => {
    console.log("Budget database connected")
  })
  budgetData.findOne({ userId: req.body.userId})
})

router.post('/addCategory', jwtMW, (req, res) => {
  mongoose.connect(process.env.DATABASE_ACCESS_BUDGET, () => {
    console.log("Budget database connected")
  })
    const addBudgetData = new budgetData({
      userId:req.body.userId,
      category:req.body.category,
      amount:req.body.amount,
      color:req.body.color
    })
    addBudgetData.save()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
})



module.exports = router