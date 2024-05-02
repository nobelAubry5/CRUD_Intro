import Project from "../models/projectModel.js";
// Posting data into database
export const create = async (req, res) => {
  try {
    const projectData = new Project(req.body);
    const { title } = projectData; // Assuming title is a unique identifier for projects
    const projectExist = await Project.findOne({ title });
    if (projectExist) {
      return res.status(400).json({ message: "Project already exists" });
    }
    const savedProject = await projectData.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Getting all the projects from the database
export const fetch = async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length === 0) {
      return res.status(404).json({ message: "Projects not found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Updating the project in the database
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const projectExist = await Project.findOne({ _id: id });
    if (!projectExist) {
      return res.status(404).json({ message: "Project not found." });
    }
    const updateProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateProject);
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Deleting the Project in the database
export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const projectExist = await Project.findOne({ _id: id });
    if (!projectExist) {
      return res.status(404).json({ message: "Project not found." });
    }
    await Project.findByIdAndDelete(id);
    res.status(201).json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
};
