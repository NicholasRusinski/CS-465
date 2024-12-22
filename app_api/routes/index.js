const express = require('express'); //express app
const router = express.Router(); //router logic

const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader == null) {
    console.log("Authorization header required, but not provided");
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');

  if (headers.length < 2) {
    console.log("Not enough tokens in the header");
    return res.sendStatus(501);
  }

  const token = headers[1];

  if (token == null) {
    console.log("No Bearer token found");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    req.auth = user;
    next();
  });
}

module.exports = authenticateJWT;


// this is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const { token } = require('morgan');

// define route for our trips endpoint
router
    .post('/register', ctrlAuth.register)
    .post('/login', ctrlAuth.login);
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);
    
module.exports = router;  
