const Projects = require('./projects-model')

function check400 (req, res, next) {
  if (
    !("name" in req.body) || 
    !("description" in req.body) || 
    Object.keys(req.body).length === 0 ||
    (req.method !== 'POST' && !('completed' in req.body))
  ) {
    res.status(400).json({message: "Missing required fields"})
  }

  else next()
}

async function project404 (req, res, next) {
  const project = await Projects.get(req.params.id)
  if (!project) {res.status(404).json({message: "Unable to locate project"})}
  else next()
}

module.exports = {
  check400,
  project404,
}