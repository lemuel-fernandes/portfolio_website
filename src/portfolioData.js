// src/data/portfolioData.js

const portfolioData = {
    // Basic info
    personalInfo: {
      name: "Lemuel Fernandes",
      title: "UI/UX Designer | Developer",
      headline: "Creating digital experiences",
      description: "I design intuitive interfaces and create meaningful experiences that connect people with technology, products, and ideas.",
      location: "Mumbai, Maharashtra | Bengaluru, Karnataka",
      resumeLink: "https://drive.google.com/file/d/1ithew98tJuVwccAfwOeRErFvrRW-CB5m/view?usp=sharing",
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
        "I'm Lemuel Fernandes, a B.Tech student at Christ University, passionate about AI, ethical hacking, game development, UI/UX design, and digital marketing. I love crafting innovative digital experiences that merge creativity with functionality, ensuring technology serves real-world needs.",
        "With an entrepreneurial mindset, I constantly seek opportunities to innovate, solve problems, and drive impact. Whether it's designing intuitive interfaces, securing systems, or developing engaging digital products, I approach every challenge with strategic thinking and a user-first perspective.",
        "Beyond tech, I leverage digital marketing and brand strategy to bridge the gap between technology and business growth. By combining SEO, content marketing, and social media strategies, I ensure digital solutions aren’t just well-built but also effectively reach and engage the right audience. ",
      ],
      // Skills with proficiency levels (1-100)
      skills: [
        { name: "UI/UX Design", proficiency: 95 },
        { name: "React", proficiency: 60 },
        { name: "Java", proficiency: 95 },
        { name: "JavaScript", proficiency: 85 },
        { name: "HTML/CSS", proficiency: 90 },
        { name: "Python", proficiency: 70 },
        { name: "Ethical Hacking", proficiency: 85 },
      ]
    },
    
    // Projects
    projects: [
      {
        id: 1,
        title: "Finance App Redesign",
        description: "A complete redesign focusing on simplicity and data visualization.",
        image: "/candlestick.png", // Add project images to the public folder
        tags: ["UI/UX", "Mobile App", "Finance"],
        githubLink: "",
        liveLink: "https://your-finance-app.com"
      },
      {
        id: 2,
        title: "Portfolio Website",
        description: "A responsive personal website showcasing my design and development skills.",
        image: "/image.png",
        tags: ["React", "Frontend", "UI Design"],
        githubLink: "",
        liveLink: "https://lemueldev.vercel.app/"
      },
      {
        id: 3,
        title: "AI Chatbot",
        description: "An intelligent chatbot built with natural language processing capabilities.",
        image: "/chatbot.jpg",
        tags: ["AI", "Python", "NLP"],
        githubLink: "",
        liveLink: "https://your-chatbot.com"
      },
      {
        id: "canva1",
        title: "Poster Design",
        description: "Basic Poster Design Using Elements.",
        tags: ["design", "canva"],
        image: "/aceclutch.jpg", // Optional preview image
        githubLink: "", // Leave empty if not needed
        liveLink: "https://drive.google.com/file/d/1UmEpmwdGhKoFNZPo8G-fzUSzK5TTDc5Z/view?usp=sharing", // Leave empty too
        embedLink: "https://drive.google.com/file/d/1UmEpmwdGhKoFNZPo8G-fzUSzK5TTDc5Z/view?usp=sharing"
      },
      {
        id: "canva2",
        title: "Event Poster Design",
        description: "Poster displaying use of Gradients and Colour Palette.",
        tags: ["design", "canva"],
        image: "/enigma.png", // Optional preview image
        githubLink: "", // Leave empty if not needed
        liveLink: "https://drive.google.com/file/d/1ft7pVs-JiXeg7fanbg_qpYIMH7Zch8yx/view?usp=sharing", // Leave empty too
        embedLink: "https://drive.google.com/file/d/1ft7pVs-JiXeg7fanbg_qpYIMH7Zch8yx/view?usp=sharing"
      },
      {
        id: "canva3",
        title: "Event Brochure Design",
        description: "Brochure design as per colour palette.",
        tags: ["design", "canva"],
        image: "/magnovite.png", // Optional preview image
        githubLink: "", // Leave empty if not needed
        liveLink: "https://drive.google.com/file/d/18sFY-0AVBQoKBwmMNRLEzDOzCrAOuBqO/view?usp=sharing", // Leave empty too
        embedLink: "https://drive.google.com/file/d/18sFY-0AVBQoKBwmMNRLEzDOzCrAOuBqO/view?usp=sharing"
      }
    ],
    

    certificates: [
      {
        id: 1,
        title: "IBM Build your own Chatbot",
        description: "Certification in IBM's Chatbot training.",
        issuer: "IBM",
        image: "/certificate(1).jpg",
        tags: ["AI", "Chatbot"],
        certificateLink: "https://drive.google.com/file/d/14WaeahwiB0zaM7P5xpqwztyyt1etk97J/view?usp=sharing" // or update if needed
      },
      {
        id: 2,
        title: "Introduction to Data Science",
        description: "Introduction to foundational concepts in data science.",
        issuer: "CISCO Networking Academy",
        image: "/certificate(2).jpg",
        tags: ["Data Science", "Beginner"],
        certificateLink: "https://drive.google.com/file/d/1CFiQ8WUCQ8Um2_2hOGDj_a1_G-HPYczU/view?usp=sharing" // or update if needed
      },
      {
        id: 3,
        title: "Programming for Data Analytics (Python)",
        description: "Covers Python basics for analyzing and visualizing data.",
        issuer: "L&T Edutech",
        image: "/certificate(3).jpg",
        tags: ["Python", "Data Analytics"],
        certificateLink: "https://drive.google.com/file/d/18U1ciXPLnxNSS7xjCsdQVwWT2O3TZq8n/view?usp=sharing" // replace with actual link
      },
      {
        id: 4,
        title: "UX Design Introduction Job Simulation",
        description: "Covers basics of UX Design and product development.",
        issuer: "Lloyd's Banking Group- FORAGE",
        image: "/certificate(4).png",
        tags: ["UX Design", "Product"],
        certificateLink: "https://drive.google.com/file/d/1CO7IoS_Y-gyEPeQPyLmlw-FUm5F9yqat/view?usp=sharing" // replace with actual link
      }
    ],

    // Education
    education: [
      {
        institution: "Christ University",
        degree: "B.Tech in Computer Science",
        period: "2023 - 2027",
        description: "8.2 CGPA:Focused on AI & ML, web development, and cybersecurity."
      }
    ],
    
    // Experience
    experience: [
      {
        company: "Digital Marketing Startup",
        position: "Teachnical Team",
        period: "Sept - Nov 2024",
        description: "Helped the Company make websites for clients as per the requirement considering themes etc using Wordpress."
      },
      {
        company: "Freelance",
        position: "Web Developer",
        period: "2024 - Present",
        description: "Developed websites for small businesses and startups."
      }
    ]
  };
  
  export default portfolioData;