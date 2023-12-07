const express = require('express')
const Actions = require('./actions-model')
/*
  get - id || null - project || [projects]
  insert - project - newProject
  update - id, changes - updatedResource || null (if no id found)
  remove - id - # of records deleted
*/

// const {  } = require('./projects-middleware')

const router = express.Router()

router.get('/api/projects', (req, res) => {
  Actions.get()
  .then(projects => res.json(projects))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.get('/api/projects/:id', (req, res) => {
  Actions.get(req.params.id)
  .then(project => {
    if (!project) res.status(404)
    else res.json(project)
  })
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.post('/api/projects', (req, res) => {
  const {name, description} = req.body
  if (!name || !description || Object.keys(req.body).length === 0) res.status(400)
  else {
    Actions.insert(req.body)
    .then(newProject => res.json(newProject))
    .catch(err => {
      res.status(500).json({
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

router.put('/api/projects/:id', async (req, res) => {
  const {name, description} = req.body
  const existing = await Actions.get(res.params.id)
  if (!name || !description || Object.keys(req.body).length === 0) res.status(400)
  else if (!existing) res.status(404)
  else {
    Actions.update(req.params.id, req.body)
    .then(updatedProject => res.json(updatedProject))
    .catch(err => {
      res.status(500).json({
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

router.delete('/api/projects/:id', async (req, res) => {
  const existing = await Actions.get(res.params.id)
  if (!existing) res.status(404)
  else {
    Actions.remove(req.params.id)
    .then(() => res.status(200))
    .catch(err => {
      res.status(500).json({
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

module.exports = router