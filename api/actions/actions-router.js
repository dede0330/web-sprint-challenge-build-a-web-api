const express = require('express');
const Actions = require('./actions-model');
const {
  checkId_actions,
  checkPost_actions,
  checkPut_actions
} = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(next);
});

router.get('/:id', checkId_actions, (req, res, next) => {
  try {
    res.status(200).json(req.action);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkPost_actions, (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put('/:id', checkId_actions, checkPut_actions, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next);
});

router.delete('/:id', checkId_actions, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.action);
    })
    .catch(next);
});

module.exports = router;