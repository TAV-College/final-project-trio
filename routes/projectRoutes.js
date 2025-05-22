const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createProject, getProjects } = require("../controllers/projectControllers");

router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.get('/dashboard', auth, (req, res) => {
  projectModel.getUserProjects(req.user.id, (err, projects) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render('dashboard', { username: req.user.role, projects });
  });
});

module.exports = router;
