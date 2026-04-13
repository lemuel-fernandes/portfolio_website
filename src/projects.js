import React, { useState } from "react";
import { Link } from "react-router-dom";
import portfolioData from "./portfolioData";
import * as Icons from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const allTags = ["all"];
  portfolioData.projects.forEach((project) => {
    project.tags.forEach((tag) => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });

  const filteredProjects =
    filter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((project) => project.tags.includes(filter));

  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <div className="projects-page">
      <div className="cosmic-bg" aria-hidden>
        <div className="cosmic-bg__bloom" />
        <div className="cosmic-bg__bloom cosmic-bg__bloom--2" />
        <div className="cosmic-bg__grid" />
      </div>

      <header className="page-header">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }} className="logo">
            {portfolioData.personalInfo.name.split(" ")[0]}.dev
          </Link>
          <Link to="/" className="btn btn--ghost">
            {getIcon("ArrowLeft")} Back to Home
          </Link>
        </div>
      </header>

      <main className="container" style={{ position: "relative", zIndex: 1, padding: "2rem 0 3rem" }}>
        <div className="section-title">
          <h1>My Projects</h1>
          <div className="underline" />
          <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
            Explore my latest work and side projects
          </p>
        </div>

        <div className="filter-bar">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={filter === tag ? "active" : ""}
              onClick={() => setFilter(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid-page">
          {filteredProjects.map((project) => (
            <article key={project.id} className="card">
              <img src={project.image || "/placeholder.svg"} alt={project.title} />
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="link-row">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      {getIcon("Github")}
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      {getIcon("ExternalLink")}
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h3>No projects found with the selected filter.</h3>
            <button type="button" onClick={() => setFilter("all")} className="btn" style={{ marginTop: "1rem" }}>
              Show All Projects
            </button>
          </div>
        )}
      </main>

      <footer className="page-footer" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;
