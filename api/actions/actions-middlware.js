const Actions = require('./actions-model')

function check400 (req, res, next) {
  if (
    !("notes" in req.body) || 
    !("description" in req.body) || 
    !("project_id" in req.body) || 
    Object.keys(req.body).length === 0 ||
    (req.method !== 'POST' && !('completed' in req.body))
  ) {
    res.status(400).json({message: "Missing required fields"})
    }

  else next()
}

async function action404 (req, res, next) {
  const action = await Actions.get(req.params.id)
  if (!action) {res.status(404).json({message: "Unable to locate resource"})}
  else next()
}

module.exports = {
  check400,
  action404,
}