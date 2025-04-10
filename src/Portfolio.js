import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portfolioData from "./portfolioData";
import * as Icons from "lucide-react";

function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Function to get Lucide icon component
  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  // Handler for input changes
  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Success case
        setSubmitStatus("success");
        setContactData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1500);
      
      // In a real implementation, you would use fetch:
      /*
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      
      if (response.ok) {
        setSubmitStatus("success");
        setContactData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
      */
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container header-content">
          <a href="#home" className="logo">
            {portfolioData.personalInfo.name.split(" ")[0]}.design
          </a>

          {/* Mobile Menu Toggle */}
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? getIcon("X") : getIcon("Menu")}
          </button>
          {/* Nav */}
          <nav style={{ display: isMenuOpen ? "flex" : "" }}>
            {["home", "about", "skills", "projects", "Process" , "Certification" , "experience", "contact"].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                onClick={() => setIsMenuOpen(false)}
                style={{ color: activeSection === section ? "#D84040" : "" }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <a href="https://drive.google.com/file/d/1ithew98tJuVwccAfwOeRErFvrRW-CB5m/view?usp=sharing" target="_blank" className="btn">
                Resume {getIcon("ArrowRight")}
              </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero container">
          <div className="hero-text">
            <div className="btn" style={{ marginBottom: "1rem", display: "inline-block" }}>
              {portfolioData.personalInfo.title}
            </div>
            <h1>
              Creating digital experiences
            </h1>
            <p>I design intuitive interfaces and create meaningful experiences that connect people with technology, products, and ideas.</p>
            <div>
              <a href="#projects" className="btn">
                View My Work {getIcon("ArrowRight")}
              </a>
              <a href="#contact" className="btn">Get in Touch</a>
            </div>
            <div style={{ marginTop: "1rem" }}>
              {portfolioData.socialMedia.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ marginRight: "1rem", color: "#EEEEEE" }}
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <img src="/lemportrait.jpg" alt="Portrait" />
            <div className="skill-tags">
              <span className="skill-tag">UI Designer</span>
              <span className="skill-tag">UX Expert</span>
              <span className="skill-tag">Frontend Dev</span>
            </div>
            <div className="scroll-indicator">
              <span>Scroll Down</span>
              {getIcon("ArrowDown")}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about container">
          <div className="section-title">
            <h2>About Me</h2>
            <div className="underline"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              {portfolioData.about.paragraphs.map((paragraph, index) => (
                <p key={index} style={{ marginBottom: "1rem" }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <h3>2</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills container">
          <div className="section-title">
            <h2>My Skills</h2>
            <div className="underline"></div>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {portfolioData.about.skills
              .filter(skill => activeFilter === "All" || skill.category === activeFilter)
              .map((skill, index) => (
                <div key={index} style={{ flex: "1 1 250px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{skill.name}</h3>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <div style={{ 
                    height: "8px", 
                    background: "#2e2a2a", 
                    borderRadius: "4px",
                    marginTop: "0.5rem",
                    overflow: "hidden"
                  }}>
                    <div style={{ 
                      height: "100%", 
                      width: `${skill.proficiency}%`, 
                      background: "#D84040",
                      transition: "width 1s ease-in-out"
                    }}></div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects container">
          <div className="section-title">
            <h2>Featured Projects</h2>
            <div className="underline"></div>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
            {portfolioData.projects
              .filter(project => activeFilter === "All" || project.category === activeFilter)
              .map((project) => (
                <div key={project.id} className="card" style={{ width: "300px" }}>
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
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/projects" className="btn">View All Projects</Link>
          </div>
        </section>

        {/* Design Process Section */}
        <section id="process" className="process container">
          <div className="section-title">
            <h2>My Design Process</h2>
            <div className="underline"></div>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Research</h3>
              <p>Understanding user needs and business goals through research and analysis.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Ideate</h3>
              <p>Brainstorming solutions and exploring creative possibilities.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Design</h3>
              <p>Creating wireframes, mockups and high-fidelity prototypes.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Develop</h3>
              <p>Translating designs into functional interfaces with clean code.</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Test</h3>
              <p>Validating solutions through user testing and iterative feedback.</p>
            </div>
          </div>
          <div className="process-cta">
            <h3>Ready to bring your vision to life?</h3>
            <p>I combine creativity with strategy to design meaningful experiences</p>
            <a href="#contact" className="btn">Let's Talk</a>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="certificates container">
          <div className="section-title">
            <h2>My Certificates</h2>
            <div className="underline"></div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
            {portfolioData.certificates.map((certificate) => (
              <div key={certificate.id} className="card" style={{ width: "300px" }}>
                <img 
                  src={certificate.image || "/placeholder.svg"} 
                  alt={certificate.title} 
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-content">
                  <h3>{certificate.title}</h3>
                  <p style={{ margin: "0.5rem 0" }}>{certificate.description}</p>
                  <p style={{ fontStyle: "italic", fontSize: "0.85rem" }}>
                    Issued by: {certificate.issuer}
                  </p>
                  <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "0.5rem", 
                    marginTop: "0.75rem",
                    marginBottom: "1rem" 
                  }}>
                    {certificate.tags.map((tag, index) => (
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
                  {certificate.certificateLink && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <a 
                        href={certificate.certificateLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          color: "#EEEEEE",
                          textDecoration: "none"
                        }}
                      >
                        {getIcon("ExternalLink")}
                        <span style={{ marginLeft: "0.25rem" }}>View Certificate</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience container">
          <div className="section-title">
            <h2>Experience & Education</h2>
            <div className="underline"></div>
          </div>
          
          <div className="experience-filters">
            <button 
              className={activeFilter === "All" ? "active" : ""} 
              onClick={() => setActiveFilter("All")}
            >
              All
            </button>
            <button 
              className={activeFilter === "Work" ? "active" : ""} 
              onClick={() => setActiveFilter("Work")}
            >
              Work
            </button>
            <button 
              className={activeFilter === "Education" ? "active" : ""} 
              onClick={() => setActiveFilter("Education")}
            >
              Education
            </button>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {/* Experience Column */}
            <div style={{ flex: "1 1 400px" }}>
              <h3 style={{ marginBottom: "1rem", borderBottom: "2px solid #D84040", paddingBottom: "0.5rem" }}>
                Work Experience
              </h3>
              {portfolioData.experience
                .filter(exp => activeFilter === "All" || activeFilter === "Work")
                .map((exp, index) => (
                  <div key={index} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4>{exp.position}</h4>
                      <span style={{ 
                        background: "rgba(216, 64, 64, 0.2)", 
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem"
                      }}>
                        {exp.period}
                      </span>
                    </div>
                    <p style={{ color: "#D84040", marginBottom: "0.5rem" }}>{exp.company}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
            </div>
            
            {/* Education Column */}
            <div style={{ flex: "1 1 400px" }}>
              <h3 style={{ marginBottom: "1rem", borderBottom: "2px solid #D84040", paddingBottom: "0.5rem" }}>
                Education
              </h3>
              {portfolioData.education
                .filter(edu => activeFilter === "All" || activeFilter === "Education")
                .map((edu, index) => (
                  <div key={index} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4>{edu.degree}</h4>
                      <span style={{ 
                        background: "rgba(216, 64, 64, 0.2)", 
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem"
                      }}>
                        {edu.period}
                      </span>
                    </div>
                    <p style={{ color: "#D84040", marginBottom: "0.5rem" }}>{edu.institution}</p>
                    <p>{edu.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

      

        {/* Contact Section */}
        <section id="contact" className="contact container">
          <div className="section-title">
            <h2>Get in Touch</h2>
            <div className="underline"></div>
          </div>
          <div className="contact-content">
            <div style={{ flex: "1" }}>
              <h3>Contact Information</h3>
              <p>Ready to start a project? I'd love to hear from you! Reach out through any of these channels:</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${portfolioData.contactInfo.email}`} style={{ color: "white" }}>
                  {portfolioData.contactInfo.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${portfolioData.contactInfo.phone}`} style={{ color: "white" }}>
                  {portfolioData.contactInfo.phone}
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={portfolioData.contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  Connect with me
                </a>
              </p>
              <p>
                <strong>Location:</strong> {portfolioData.personalInfo.location}
              </p>
              <div className="availability">
                <span className="availability-indicator"></span>
                <p>Available for freelance projects</p>
              </div>
            </div>
            <div style={{ flex: "1" }}>
              <h3>Send Me a Message</h3>
              <p>Have a project in mind? Let's discuss how I can help.</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={contactData.subject}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={contactData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
                
                {submitStatus === "success" && (
                  <div style={{ 
                    background: "rgba(0, 128, 0, 0.2)", 
                    padding: "0.75rem", 
                    borderRadius: "4px",
                    marginBottom: "1rem" 
                  }}>
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div style={{ 
                    background: "rgba(255, 0, 0, 0.2)", 
                    padding: "0.75rem", 
                    borderRadius: "4px",
                    marginBottom: "1rem" 
                  }}>
                    There was an error sending your message. Please try again later.
                  </div>
                )}
                
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"} {getIcon("Send")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e1216] text-white py-10 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
    <div>
      <h1 className="text-xl font-bold mb-2 text-purple-400">Lemuel.design</h1>
      <p>Creating beautiful, user-centered digital experiences</p>
    </div>
    
    <div>
      <h2 className="font-bold mb-2">Navigation</h2>
      <ul className="space-y-1">
        <li><a href="#home" className="hover:text-purple-400">Home</a></li>
        <li><a href="#about" className="hover:text-purple-400">About</a></li>
        <li><a href="#skills" className="hover:text-purple-400">Skills</a></li>
        <li><a href="#projects" className="hover:text-purple-400">Projects</a></li>
        <li><a href="#experience" className="hover:text-purple-400">Experience</a></li>
        <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
      </ul>
    </div>

    <div>
      <h2 className="font-bold mb-2">Services</h2>
      <ul className="space-y-1">
        <li>UI Design</li>
        <li>UX Research</li>
        <li>Design Systems</li>
        <li>Frontend Development</li>
        <li>Interactive Prototypes</li>
      </ul>
    </div>

    <div>
      <h2 className="font-bold mb-2">Contact</h2>
      <p>lemuelwork31@gmail.com</p>
      <p>+91 9969179051</p>
      <p>Mumbai, Maharashtra</p>
      <p>Bengaluru, Karnataka</p>
    </div>
  </div>

  <div className="mt-10 text-center text-sm text-gray-400">
    <p>© 2025 Lemuel Fernandes. All rights reserved.</p>
    <p className="flex justify-center items-center gap-3 mt-2">
      Designed & Developed with ❤️
      <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin" /></a>
      <a href="https://github.com" target="_blank" rel="noreferrer"><i className="fab fa-github" /></a>
    </p>
  </div>
</footer>
    </div>
  );
}

export default Portfolio;