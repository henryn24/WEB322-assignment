const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = []; 
      projectData.forEach((project) => {
        const sector = sectorData.find((s) => s.id === project.sector_id);
        if (sector) {
          projects.push({ ...project, sector: sector.sector_name });
        } else {
          projects.push({ ...project, sector: "Unknown" }); 
        }
      });
      resolve(); 
    } catch (err) {
      reject("Failed to initialize projects: " + err);
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects found. Make sure to call initialize() first.");
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const found = projects.find((proj) => proj.id === projectId);
    if (found) {
      resolve(found);
    } else {
      reject(`Unable to find project with id: ${projectId}`);
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const lowerSearch = sector.toLowerCase();
    const filtered = projects.filter((proj) =>
      proj.sector.toLowerCase().includes(lowerSearch)
    );
    if (filtered.length > 0) {
      resolve(filtered);
    } else {
      reject(`Unable to find any projects for sector: ${sector}`);
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
};
