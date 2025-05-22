const projectModel= require('../models/projectModel');

const createProject = (req, res) => {
  const { name, description } = req.body;
  const user_id = req.user.id;

 projectModel.createProject({ name, description, user_id }, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Project created' });
  });
};

const getProjects = (req, res) => {
 projectModel.getUserProjects(req.user.id, (err, projects) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(projects);
  });
};

module.exports={
    createProject,getProjects
}