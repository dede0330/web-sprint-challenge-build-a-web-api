const Projects = require('./projects-model');

module.exports = {
  checkId_projects,
  checkPost_projects,
  checkPut_projects
}

function checkId_projects(req, res, next) {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      if (!project) {
        res.status(404).json({ message: `Project with ID ${id} not found` });
      } else {
        req.project = project;
        next();
      }
    })
    .catch(next);
}

function checkPost_projects(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: 'name and description are required' });
  } else {
    next();
  }
}

function checkPut_projects(req, res, next) {
  const { name, description } = req.body;
  const completed = req.body.completed !== undefined;
  if (!name || !description || !completed) {
    res.status(400).json({ message: 'name, description, and completed are required' });
  } else {
    next();
  }
}