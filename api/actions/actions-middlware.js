const Actions = require('./actions-model')

function check400 (req, res, next) {
  if (
    !("notes" in req.body) || 
    !("description" in req.body) || 
    !("project_id" in req.body) || 
    Object.keys(req.body).length === 0
  ) {
    if (req.method !== 'POST' && !('completed' in req.body)) {
      res.status(400).json({message: "Missing 'notes', 'description', 'project_id', or 'completed'"})
    }
    else {
      res.status(400).json({message: "Missing 'notes', 'description', or 'project_id'"})
    }
  }

  else next()
}

async function action404 (req, res, next) {
  const action = await Actions.get(req.params.id)
  if (!action) {res.status(404).json({message: "cannot find action"})}
  else next()
}

module.exports = {
  check400,
  action404,
}