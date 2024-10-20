const express = require('express');
const Projects = require('./projects-model');
const {
  checkId_projects,
  checkPost_projects,
  checkPut_projects
} = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:id', checkId_projects, (req, res, next) => {
  try {
    res.status(200).json(req.project);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkPost_projects, (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(next)
});

router.put('/:id', checkId_projects, checkPut_projects, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.delete('/:id', checkId_projects, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.project);
    }) 
    .catch(next);
});

router.get('/:id/actions', checkId_projects, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(next);
});

module.exports = router;