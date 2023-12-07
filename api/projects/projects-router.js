const express = require('express')
const Projects = require('./projects-model')
/*
  get - id || null - project || [projects]
  insert - project - newProject
  update - id, changes - updatedResource || null (if no id found)
  remove - id - # of records deleted
  getProjectActions - projectId - actions
*/

// const {  } = require('./projects-middleware')

const router = express.Router()

router.get('/api/projects', (req, res) => {
  Projects.get()
  .then(projects => res.json(projects))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.get('/api/projects/:id', (req, res) => {
  Projects.get(req.params.id)
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
    Projects.insert(req.body)
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
  const existing = await Projects.get(res.params.id)
  if (!name || !description || Object.keys(req.body).length === 0) res.status(400)
  else if (!existing) res.status(404)
  else {
    Projects.update(req.params.id, req.body)
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
  const existing = await Projects.get(res.params.id)
  if (!existing) res.status(404)
  else {
    Projects.remove(req.params.id)
    .then(() => res.status(200))
    .catch(err => {
      res.status(500).json({
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

router.get('/api/projects/:id/actions', async (req, res) => {
  const project = await Projects.get(req.params.id)
  if (!project) res.status(404)
  else {
    Projects.getProjectActions(req.params.id)
    .then(actions => res.json(actions))
    .catch(err => {
      res.status(500).json({
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

module.exports = router