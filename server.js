/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Hoang Nguyen Student ID: 142017235 Date: 15/6/2025
*
********************************************************************************/

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;


app.use(express.static(__dirname + '/public'));


// Initialize the project data
projectData.initialize().then(() => {
  
  // Serve home.html for "/"
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
  });

  // Serve about.html for "/about"
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
  });

  // GET all projects or filter by sector
  app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;

    if (sector) {
      projectData.getProjectsBySector(sector)
        .then((projects) => res.json(projects))
        .catch((err) => res.status(404).send(err));
    } else {
      projectData.getAllProjects()
        .then((projects) => res.json(projects))
        .catch((err) => res.status(404).send(err));
    }
  });

  // GET project by id
  app.get("/solutions/projects/:id", (req, res) => {
    const id = parseInt(req.params.id);
    projectData.getProjectById(id)
      .then((project) => res.json(project))
      .catch((err) => res.status(404).send(err));
  });

  // Catch-all for undefined routes – serve 404.html
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
  });

  // Start the server
  app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
  });

}).catch((err) => {
  console.error("Data initialization failed:", err);
});
