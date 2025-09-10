const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

// Utility to read/write mock DB
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Get all projects
app.get("/projects", (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

// Add new project
app.post("/projects", (req, res) => {
  const db = readDB();
  const newProject = { id: uuidv4(), ...req.body, ratings: [] };
  db.projects.push(newProject);
  writeDB(db);
  res.json(newProject);
});

// Rate a project
app.post("/projects/:id/rate", (req, res) => {
  const { id } = req.params;
  const { pros, cons, score } = req.body;
  const db = readDB();

  const project = db.projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: "Project not found" });

  project.ratings.push({ pros, cons, score });
  writeDB(db);

  res.json(project);
});

app.listen(PORT, () => {
  console.log(✅ Backend running on http://localhost:${PORT});
});
