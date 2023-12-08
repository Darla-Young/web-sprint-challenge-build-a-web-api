const express = require('express')
const Actions = require('./actions-model')
const { check400, action404 } = require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res) => {
  Actions.get()
  .then(actions => res.json(actions))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.get('/:id', action404, (req, res) => {
  Actions.get(req.params.id)
  .then(action => res.json(action))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.post('/', check400, action404, async (req, res) => {
  console.log(req.body)
  Actions.insert(req.body)
  .then(newAction => res.json(newAction))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.put('/:id', check400, action404, (req, res) => {
  Actions.update(req.params.id, req.body)
  .then(updatedProject => res.json(updatedProject))
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

router.delete('/:id', action404, async (req, res) => {
  Actions.remove(req.params.id)
  .then(() => res.json())
  .catch(err => {
    res.status(500).json({
      err: err.message,
      stack: err.stack,
    })
  })
})

module.exports = router