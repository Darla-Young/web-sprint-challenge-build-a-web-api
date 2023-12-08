const express = require('express')
const Projects = require('./projects-model')
const { check400, project404 } = require('./projects-middleware')
const router = express.Router()

router.get('/', (req, res) => {
  Projects.get()
  .then(projects => res.json(projects))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.get('/:id', project404, (req, res) => {
  Projects.get(req.params.id)
  .then(project => res.json(project))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.post('/', check400, (req, res) => {
  Projects.insert(req.body)
  .then(newProject => res.json(newProject))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.put('/:id', check400, project404, (req, res) => {
  Projects.update(req.params.id, req.body)
  .then(updatedProject => res.json(updatedProject))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.delete('/:id', project404, (req, res) => {
  Projects.remove(req.params.id)
  .then(() => res.json())
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.get('/:id/actions', project404, (req, res) => {
  Projects.getProjectActions(req.params.id)
  .then(actions => res.json(actions))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

module.exports = router