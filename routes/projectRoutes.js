const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const { createProject, getProjects } = require("../controllers/projectControllers");

router.post('/', auth, createProject);
router.get('/dashboard', auth, getProjects);
router.get('/', auth, (req, res) => {
  res.render('projects',{
    username : req.user.username
  }); 
});
module.exports = router;
