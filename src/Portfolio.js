import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import portfolioData from "./portfolioData";
import * as Icons from "lucide-react";

/** Softer scroll reveal: springs feel more alive; respects reduced-motion. */
const viewportReveal = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -40px 0px",
};

function Portfolio() {
  const reduceMotion = useReducedMotion();

  // Pointer position for futuristic grid mask
  const pointerX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const pointerY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  
  // Smoothing the mouse movement for fluent transition with a highly relaxed spring
  const mouseX = useSpring(pointerX, { stiffness: 40, damping: 25, mass: 0.5 });
  const mouseY = useSpring(pointerY, { stiffness: 40, damping: 25, mass: 0.5 });
  
  // Generate dynamic mask string that updates when mouseXY changes
  const bgMaskImage = useMotionTemplate`radial-gradient(circle 750px at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`;

  // Secondary delayed spring for cursor aura ring
  const auraX = useSpring(pointerX, { stiffness: 150, damping: 25, mass: 0.5 });
  const auraY = useSpring(pointerY, { stiffness: 150, damping: 25, mass: 0.5 });
  const ringX = useTransform(auraX, x => x - 20); // 40px width centered
  const ringY = useTransform(auraY, y => y - 20); // 40px height centered

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handlePointerMove = (e) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  const fadeUp = useMemo(
    () =>
      reduceMotion
        ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
          }
        : {
            hidden: { opacity: 0, y: 40, scale: 0.98, filter: "blur(5px)" },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            },
          },
    [reduceMotion]
  );

  const stagger = useMemo(
    () =>
      reduceMotion
        ? { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }
        : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          },
    [reduceMotion]
  );

  const heroVisualTransition = useMemo(
    () =>
      reduceMotion ? { duration: 0.35, ease: "easeOut" } : { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    [reduceMotion]
  );

  // Futuristic interactive hover scale + lift uses smooth tween instead of jerky spring
  const cardHover = useMemo(
    () => (reduceMotion ? undefined : { 
      y: -12, 
      scale: 1.03, 
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
    }),
    [reduceMotion]
  );

  const cardTap = useMemo(() => (reduceMotion ? undefined : { scale: 0.96 }), [reduceMotion]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
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

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handler for smooth scrolling and offset for fixed header
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const section = document.getElementById(sectionId);
    if (section) {
      // Get header height for offset
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      
      // Calculate position with offset
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.pageYOffset - headerHeight - 20; // Extra 20px padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
      setIsSubmitting(false);
    }
  };

  // Navigation sections with consistent casing
  const navigationSections = ["home", "about", "skills", "projects", "certificates", "experience", "contact"];

  // Add scroll padding to the root element to prevent section titles from being hidden
  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "80px"; // Adjust based on header height
    return () => {
      document.documentElement.style.scrollPaddingTop = "0";
    };
  }, []);

  return (
    <div className="portfolio-page">
      <div className="cosmic-bg" aria-hidden>
        <div className="cosmic-bg__bloom" />
        <div className="cosmic-bg__bloom cosmic-bg__bloom--2" />
        <div className="cosmic-bg__bloom cosmic-bg__bloom--3" />
        <motion.div 
          className="cosmic-bg__grid" 
          style={{ WebkitMaskImage: bgMaskImage, maskImage: bgMaskImage }}
        />
      </div>

      {/* Global Scroll Progress Bar */}
      <motion.div className="scroll-tracker" style={{ scaleX: scrollYProgress }} />

      {/* Custom Mouse Aura */}
      {!reduceMotion && (
        <motion.div 
          className="cursor-aura" 
          style={{ x: ringX, y: ringY }} 
          aria-hidden="true" 
        />
      )}

      <header
        className={`site-header${headerScrolled ? " site-header--scrolled" : ""}${
          isMenuOpen ? " nav-open" : ""
        }`}
      >
        <div className="header-content">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, "home")}>
            {portfolioData.personalInfo.name.split(" ")[0]}.design
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? getIcon("X") : getIcon("Menu")}
          </button>
          <nav>
            {navigationSections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={activeSection === section ? "nav-link--active" : ""}
                onClick={(e) => handleNavClick(e, section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1ithew98tJuVwccAfwOeRErFvrRW-CB5m/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Resume {getIcon("ArrowRight")}
            </a>
          </nav>
        </div>
      </header>

      <main className="portfolio-main">
        <section id="home" className="hero container">
          <motion.div
            className="hero-text"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div className="hero-kicker" variants={fadeUp}>
              <span className="hero-kicker__dot" />
              {portfolioData.personalInfo.title}
            </motion.div>
            <motion.h1 variants={fadeUp}>
              <span className="gradient-text">{portfolioData.personalInfo.headline}</span>
            </motion.h1>
            <motion.p variants={fadeUp}>{portfolioData.personalInfo.description}</motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href="#projects" className="btn" onClick={(e) => handleNavClick(e, "projects")}>
                View My Work {getIcon("ArrowRight")}
              </a>
              <a
                href="#contact"
                className="btn btn--ghost"
                onClick={(e) => handleNavClick(e, "contact")}
              >
                Get in Touch
              </a>
            </motion.div>
            <motion.div className="hero-social" variants={fadeUp}>
              {portfolioData.socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={heroVisualTransition}
          >
            <div className="hero-frame">
              <img src="/lemportrait.jpg" alt="Portrait" />
              <div className="skill-tags">
                <span className="skill-tag">UI Designer</span>
                <span className="skill-tag">UX Expert</span>
                <span className="skill-tag">Frontend Dev</span>
              </div>
            </div>
            <div className="hero-orbit" aria-hidden />
            <div className="scroll-indicator">
              <span>Scroll Down</span>
              {getIcon("ArrowDown")}
            </div>
          </motion.div>
        </section>

        <section id="about" className="about container">
          <motion.div
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
          >
            <h2>About Me</h2>
            <div className="underline" />
          </motion.div>
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={stagger}
          >
            <motion.div className="about-text glass-panel" variants={fadeUp} style={{ padding: "1.5rem" }}>
              {portfolioData.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>
            <motion.div className="about-stats" variants={fadeUp}>
              <div className="stat-item">
                <h3>2</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Projects Completed</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="skills" className="skills container">
          <motion.div
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
          >
            <h2>My Skills</h2>
            <div className="underline" />
          </motion.div>

          <div className="skills-grid">
            {portfolioData.about.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-row"
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                variants={fadeUp}
              >
                <div className="skill-row-head">
                  <h3>{skill.name}</h3>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: `${skill.proficiency}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="projects container">
          <motion.div
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
          >
            <h2>Featured Projects</h2>
            <div className="underline" />
          </motion.div>

          <div className="projects-grid">
            {portfolioData.projects.map((project) => (
              <motion.article
                key={project.id}
                className="card"
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                variants={fadeUp}
                whileHover={cardHover}
                whileTap={cardTap}
              >
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
              </motion.article>
            ))}
          </div>
          <div className="projects-cta">
            <Link to="/projects" className="btn">
              View All Projects {getIcon("ArrowRight")}
            </Link>
          </div>
        </section>

        <section id="certificates" className="certificates container">
          <motion.div
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
          >
            <h2>My Certificates</h2>
            <div className="underline" />
          </motion.div>
          <div className="cert-grid">
            {portfolioData.certificates.map((certificate) => (
              <motion.article
                key={certificate.id}
                className="card"
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                variants={fadeUp}
                whileHover={cardHover}
                whileTap={cardTap}
              >
                <img src={certificate.image || "/placeholder.svg"} alt={certificate.title} />
                <div className="card-content">
                  <h3>{certificate.title}</h3>
                  <p style={{ margin: "0.5rem 0" }}>{certificate.description}</p>
                  <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Issued by: {certificate.issuer}
                  </p>
                  <div className="tag-row">
                    {certificate.tags.map((tag, index) => (
                      <span key={index} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {certificate.certificateLink && (
                    <div className="link-row" style={{ marginTop: "0.5rem" }}>
                      <a href={certificate.certificateLink} target="_blank" rel="noopener noreferrer">
                        {getIcon("ExternalLink")}
                        <span>View Certificate</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience container">
          <motion.div
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
          >
            <h2>Experience & Education</h2>
            <div className="underline" />
          </motion.div>

          <div className="experience-filters">
            <button
              type="button"
              className={experienceFilter === "All" ? "active" : ""}
              onClick={() => setExperienceFilter("All")}
            >
              All
            </button>
            <button
              type="button"
              className={experienceFilter === "Work" ? "active" : ""}
              onClick={() => setExperienceFilter("Work")}
            >
              Work
            </button>
            <button
              type="button"
              className={experienceFilter === "Education" ? "active" : ""}
              onClick={() => setExperienceFilter("Education")}
            >
              Education
            </button>
          </div>

          <div className="experience-columns">
            <div className="experience-col">
              <h3>Work Experience</h3>
              {portfolioData.experience
                .filter((exp) => experienceFilter === "All" || experienceFilter === "Work")
                .map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-item-head">
                      <h4>{exp.position}</h4>
                      <span className="period-pill">{exp.period}</span>
                    </div>
                    <p className="company-line">{exp.company}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
            </div>

            <div className="experience-col">
              <h3>Education</h3>
              {portfolioData.education
                .filter((edu) => experienceFilter === "All" || experienceFilter === "Education")
                .map((edu, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-item-head">
                      <h4>{edu.degree}</h4>
                      <span className="period-pill">{edu.period}</span>
                    </div>
                    <p className="company-line">{edu.institution}</p>
                    <p>{edu.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact container">
          <motion.div
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUp}
          >
            <h2>Get in Touch</h2>
            <div className="underline" />
          </motion.div>
          <div className="contact-content">
            <motion.div className="glass-panel" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportReveal} style={{ padding: "1.5rem" }}>
              <h3>Contact Information</h3>
              <p>Ready to start a project? I'd love to hear from you! Reach out through any of these channels:</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${portfolioData.contactInfo.email}`}>{portfolioData.contactInfo.email}</a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${portfolioData.contactInfo.phone.replace(/\s/g, "")}`}>
                  {portfolioData.contactInfo.phone}
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={portfolioData.contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  Connect with me
                </a>
              </p>
              <p>
                <strong>Location:</strong> {portfolioData.personalInfo.location}
              </p>
              <div className="availability">
                <span className="availability-indicator" />
                <p>Available for freelance projects</p>
              </div>
            </motion.div>
            <motion.div className="glass-panel" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportReveal} style={{ padding: "1.5rem" }}>
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
                  <div className="alert alert--success">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="alert alert--error">
                    There was an error sending your message. Please try again later.
                  </div>
                )}

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"} {getIcon("Send")}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <p className="site-footer__brand">Lemuel.design</p>
            <p>Creating beautiful, user-centered digital experiences</p>
          </div>

          <div>
            <h2>Navigation</h2>
            <ul>
              {navigationSections.map((section) => (
                <li key={section}>
                  <a href={`#${section}`} onClick={(e) => handleNavClick(e, section)}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Services</h2>
            <ul>
              <li>UI Design</li>
              <li>UX Research</li>
              <li>Design Systems</li>
              <li>Frontend Development</li>
              <li>Interactive Prototypes</li>
            </ul>
          </div>

          <div>
            <h2>Contact</h2>
            <p>lemuelwork31@gmail.com</p>
            <p>+91 9969179051</p>
            <p>Mumbai, Maharashtra</p>
            <p>Bengaluru, Karnataka</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Lemuel Fernandes. All rights reserved.</p>
          <p className="site-footer__social">
            Designed &amp; developed with care — find me on{" "}
            <a href="https://www.instagram.com/ent_hral.diaries/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            ,{" "}
            <a href={portfolioData.contactInfo.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            ,{" "}
            <a href={portfolioData.contactInfo.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;