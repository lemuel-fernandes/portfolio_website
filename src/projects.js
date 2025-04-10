import React, { useState } from "react";
import { Link } from "react-router-dom";
import portfolioData from "./portfolioData";
import * as Icons from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  
  // Get all unique tags from projects
  const allTags = ["all"];
  portfolioData.projects.forEach(project => {
    project.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  
  // Filter projects based on selected tag
  const filteredProjects = filter === "all" 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.tags.includes(filter));
  
  // Function to get icon component
  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <div style={{ background: "#1D1616", color: "#EEEEEE", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #444", padding: "1rem 0" }}>
        <div className="container" style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <Link to="/" style={{ textDecoration: "none", color: "#EEEEEE", fontSize: "1.5rem", fontWeight: "bold" }}>
            {portfolioData.personalInfo.name.split(" ")[0]}.dev
          </Link>
          <Link to="/" className="btn">
            {getIcon("ArrowLeft")} Back to Home
          </Link>
        </div>
      </header>
      
      <main className="container" style={{ padding: "2rem 0" }}>
        <div className="section-title">
          <h1>My Projects</h1>
          <div className="underline"></div>
          <p style={{ marginTop: "1rem" }}>Explore my latest work and side projects</p>
        </div>
        
        {/* Filter buttons */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "0.5rem", 
          marginTop: "2rem",
          marginBottom: "2rem",
          justifyContent: "center" 
        }}>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setFilter(tag)}
              style={{
                background: filter === tag ? "#D84040" : "transparent",
                border: filter === tag ? "none" : "1px solid #444",
                color: "#EEEEEE",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "2rem" 
        }}>
          {filteredProjects.map(project => (
            <div key={project.id} className="card">
              <img 
                src={project.image || "/placeholder.svg"} 
                alt={project.title} 
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "0.5rem", 
                  marginTop: "0.75rem",
                  marginBottom: "1rem" 
                }}>
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{ 
                        background: "rgba(216, 64, 64, 0.2)", 
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        color: "#EEEEEE",
                        textDecoration: "none" 
                      }}
                    >
                      {getIcon("Github")}
                      <span style={{ marginLeft: "0.25rem" }}>Code</span>
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        color: "#EEEEEE",
                        textDecoration: "none",
                        marginLeft: "1rem"
                      }}
                    >
                      {getIcon("ExternalLink")}
                      <span style={{ marginLeft: "0.25rem" }}>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h3>No projects found with the selected filter.</h3>
            <button 
              onClick={() => setFilter("all")} 
              className="btn"
              style={{ marginTop: "1rem" }}
            >
              Show All Projects
            </button>
          </div>
        )}
      </main>
      
      <footer style={{ borderTop: "1px solid #444", padding: "1.5rem 0", textAlign: "center" }}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;