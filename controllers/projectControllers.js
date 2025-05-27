const projectModel = require('../models/projectModel');

const getProjects = (req, res) => {
  const userId = req.user.id;
  console.log("userId ", userId)

  projectModel.getUserProjects(userId, (err, projects) => {
    if (err) return res.status(500).send('Error loading projects');
    console.log('Projects fetched:', projects.length);
    res.render('dashboard', {
      username: req.user.username,
      projects
    });
  });
};

const createProject = (req, res) => {
  console.log('User in req:', req.user);  
  const { name, description } = req.body;
  const user_id = req.user.id;


  projectModel.createProject({ name, description, user_id }, (err) => {
    if (err) return res.status(500).send('Failed to create project');
    res.redirect('/projects/dashboard');
  });
};

module.exports = {
  createProject,
  getProjects
};
