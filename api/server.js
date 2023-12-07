const express = require('express');
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const server = express();

server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('./api/projects', projectsRouter)

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found',
  })
})

module.exports = server;