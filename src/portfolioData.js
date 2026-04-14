// src/data/portfolioData.js

const portfolioData = {
  // Basic info
  personalInfo: {
    name: "Lemuel Fernandes",
    title: "Software & AI/ML Developer",
    headline: "Creating intelligent and resilient digital experiences",
    description: "I build robust full-stack applications and architect machine learning pipelines that solve real-world problems efficiently.",
    location: "Mumbai, Maharashtra | Bengaluru, Karnataka",
    resumeLink: "https://drive.google.com/file/d/1q0xSv6WRUT57I5r8WHhEmFv5CnRlNDH2/view?usp=sharing",
    profileImage: "./lemportrait.jpg",
  },

  // Contact info
  contactInfo: {
    email: "lemuelwork31@gmail.com",
    phone: "+91 9969179051",
    linkedin: "https://www.linkedin.com/in/lemuel-fernandes-881569275/e",
    github: "https://github.com/lemuel-fernandes",
  },

  // Social media links
  socialMedia: [
    { name: "Instagram", icon: "Instagram", url: "https://www.instagram.com/ent_hral.diaries/" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://www.linkedin.com/in/lemuel-fernandes-881569275/" },
    { name: "GitHub", icon: "Github", url: "https://github.com/lemuel-fernandes" }
  ],

  // About me section
  about: {
    paragraphs: [
      "I'm Lemuel Fernandes, a B.Tech student at Christ University, specializing in full-stack web development and machine learning pipelines. I love architecting intelligent systems that merge resilient backend engineering with insightful data models, ensuring technology solves tangible real-world problems.",
      "With an engineering mindset, I constantly seek opportunities to optimize performance, train efficient ML classifiers, and drive automated impact. Whether it's building role-based control systems, deploying robust cloud APIs, or constructing ensemble models for malware detection, I approach every challenge with strategic execution and scalable design.",
      "Beyond code, I focus heavily on seamless developer handoffs and comprehensive team mentoring. By standardizing backend architectures and educating juniors on core programming fundamentals, I ensure software isn't just well-built but maintainable and collaboratively driven. ",
    ],
    // Skills with proficiency levels (1-100)
    skills: [
      { name: "Python", proficiency: 95 },
      { name: "React", proficiency: 65 },
      { name: "TensorFlow & Scikit-learn", proficiency: 85 },
      { name: "HTML/CSS", proficiency: 90 },
      { name: "UI/UX Design", proficiency: 95 },
      { name: "Java", proficiency: 95 },
      { name: "JavaScript", proficiency: 60 },
      { name: "Ethical Hacking", proficiency: 85 },
      { name: "Machine learning", proficiency: 90 },
      { name: "Natural Language Process", proficiency: 85 },
      { name: "Problem solving", proficiency: 95 },
      { name: "FastAPI", proficiency: 80 },
    ]
  },

  // Projects
  projects: [
    {
      id: 1,
      title: "ML-Powered Malware Detection",
      description: "Ensemble of ML classifiers (Random Forest, SVM, TensorFlow DNN) achieving 92% accuracy in malware detection.",
      image: "/placeholder.svg", // Replaced heavy image for placeholder compression
      tags: ["Machine Learning", "Python", "TensorFlow"],
      githubLink: "#",
      liveLink: "#"
    },
    {
      id: 2,
      title: "Laboratory Information Management (LIMS)",
      description: "Full-stack Next.js and MongoDB application with robust internal role-based access control.",
      image: "/placeholder.svg",
      tags: ["Next.js", "MongoDB", "Full-Stack"],
      githubLink: "#",
      liveLink: "#"
    },
    {
      id: 3,
      title: "AI-Powered Event Management",
      description: "Built a FastAPI backend with automated post-event workflows and PDF certificate generation.",
      image: "/placeholder.svg",
      tags: ["FastAPI", "Python", "Automation"],
      githubLink: "#",
      liveLink: "#"
    }
  ],


  certificates: [
    {
      id: 1,
      title: "IBM Build your own Chatbot",
      description: "Certification in IBM's Chatbot training. (May 2024)",
      issuer: "IBM",
      image: "/certificate(1).jpg",
      tags: ["AI", "Chatbot"],
      certificateLink: "https://drive.google.com/file/d/14WaeahwiB0zaM7P5xpqwztyyt1etk97J/view?usp=sharing"
    },
    {
      id: 2,
      title: "Introduction to Data Science",
      description: "Foundational concepts in data science. (Jun 2024)",
      issuer: "CISCO Networking Academy",
      image: "/certificate(2).jpg",
      tags: ["Data Science", "Beginner"],
      certificateLink: "https://drive.google.com/file/d/1CFiQ8WUCQ8Um2_2hOGDj_a1_G-HPYczU/view?usp=sharing"
    },
    {
      id: 3,
      title: "Programming for Data Analytics (Python)",
      description: "Python basics for analyzing data. (May 2024)",
      issuer: "L&T Edutech",
      image: "/certificate(3).jpg",
      tags: ["Python", "Data Analytics"],
      certificateLink: "https://drive.google.com/file/d/18U1ciXPLnxNSS7xjCsdQVwWT2O3TZq8n/view?usp=sharing"
    },
    {
      id: 4,
      title: "UX Design Introduction",
      description: "Basics of UX Design and product development. (Jun 2024)",
      issuer: "Lloyd's Banking Group",
      image: "/certificate(4).png",
      tags: ["UX Design", "Product"],
      certificateLink: "https://drive.google.com/file/d/1CO7IoS_Y-gyEPeQPyLmlw-FUm5F9yqat/view?usp=sharing"
    }
  ],

  // Education
  education: [
    {
      institution: "Christ University",
      degree: "B.Tech in Computer Science (Honours in Cyber Security)",
      period: "2023 - 2027",
      description: "GPA 3.4/4.0: Focused on AI & ML, web development, and cybersecurity."
    }
  ],

  // Experience
  experience: [
    {
      company: "Etailed Digital Services",
      position: "UI/UX Intern",
      period: "Jun 2025 - Jul 2025",
      description: "Reduced friction in key user journeys and partnered directly with engineers for seamless design handoffs."
    },
    {
      company: "IEEE GRSS",
      position: "Jr. WebMaster",
      period: "2024 - Present",
      description: "Managed operations for InC4 and engineered an automated conference management platform."
    },
    {
      company: "Christ University",
      position: "Peer Mentor",
      period: "2024 - Present",
      description: "Mentoring juniors comprehensively in Data Structures, DBMS, and core Programming Fundamentals."
    }
  ]
};

export default portfolioData;