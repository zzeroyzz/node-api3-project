const express = require('express');
const helmet = require("helmet")
const morgan = require("morgan")
const server = express();
const userRouter = require('./users/users-router.js')

// remember express by default cannot parse JSON in request bodies
server.use(helmet())
server.use(morgan("dev"))
server.use(express.json())
server.use(userRouter)
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
