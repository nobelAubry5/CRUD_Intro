import express from "express";
import {
  create,
  fetch,
  update,
  deleteProject,
} from "../controllers/projectController.js";
const route = express.Router();
route.get("/getAllProjects", fetch);
route.post("/create", create);
route.put("/updateProject/:id", update);
route.delete("/deleteProject/:id", deleteProject);
export default route;
