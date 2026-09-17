export const resumeData = {
  personalInfo: {
    fullName: "KEYUR RAKESHBHAI RANA",
    displayName: "Keyur Rana",
    tagline: "Hardware & Embedded Systems Engineer | IoT & Full-Stack Developer",
    phone: "9023506609",
    email: "ranakeyur38@gmail.com",
    location: "Ahmedabad, Gujarat - 382443",
    linkedin: "https://linkedin.com/in/keyur-rana-0645ba386",
    linkedinUsername: "keyur-rana-0645ba386",
    github: "https://github.com/Ranakeyur-31525",
    githubUsername: "Ranakeyur-31525",
    summary: "Hardware and Embedded Systems Engineer specializing in IoT solutions, microcontrollers, PCB integration, and embedded UI design (LVGL/DGUS). Experienced in developing autonomous robotics and full-stack IoT mobile/web applications."
  },

  skills: {
    languagesAndDomains: [
      "Python", "C++", "C", "IoT", "Embedded Systems", 
      "LVGL Library", "DGUS", "Embedded C", "React Native", "MERN Stack"
    ],
    hardwareAndSensors: [
      "ESP32", "8051", "Microcontrollers", "ToF LiDAR", 
      "IR Arrays", "Relay Modules", "Actuators", "PCB Testing"
    ],
    toolsAndPlatforms: [
      "Git", "GitHub", "VS Code", "Antigravity", "Cursor", 
      "Docker", "Arduino IDE", "Proteus"
    ],
    softSkills: [
      "Problem Solving", "Leadership", "Creative Thinking", 
      "Brainstorming", "Project Execution"
    ]
  },

  experience: [
    {
      id: 1,
      role: "Embedded & IoT Engineer Intern",
      company: "TECHYMONK",
      location: "Ahmedabad",
      period: "May 2026 – July 2026",
      highlights: [
        "Engineered an IR Blaster module and developed a low-cost water temperature measurement device for real-time monitoring.",
        "Designed and prototyped a multi-planetary weight measurement system using embedded sensor modules.",
        "Mastered the LVGL graphics library and DGUS software to build interactive HMI screen interfaces for embedded displays.",
        "Tested, debugged, and integrated custom hardware components on production-ready PCB circuits."
      ]
    },
    {
      id: 2,
      role: "Embedded Systems Intern",
      company: "Porji System and Technology",
      location: "Ahmedabad",
      period: "June 2024 – August 2024",
      highlights: [
        "Programmed microcontrollers using Embedded C and Arduino framework for real-world hardware control applications.",
        "Interfaced 8051 microprocessors with various electronic components, sensors, and actuators.",
        "Conducted hardware troubleshooting, schematic validation, and hands-on component testing."
      ]
    },
    {
      id: 3,
      role: "Python Programmer Intern",
      company: "Spyderwave Technology",
      location: "Ahmedabad",
      period: "August 2023 – August 2023",
      highlights: [
        "Developed and optimized 100+ Python scripts focused on core data structures, algorithms, and logical problem-solving.",
        "Strengthened foundational knowledge in Python programming paradigms and modular code development."
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "MediBot: Autonomous Medical Capsule for Hospital Logistics & Safety",
      techStack: ["ESP32", "C++", "ToF LiDAR", "React Native", "MERN Stack", "WebSockets"],
      highlights: [
        "Developed an autonomous robotic transport system for secure medical logistics using ESP32, 5-channel IR array, and TF-Luna ToF LiDAR for 100Hz real-time obstacle detection.",
        "Authored deterministic C++ firmware for sub-millisecond emergency braking (≤30 cm) and intersection-based navigation.",
        "Built a full-stack IoT dashboard (MERN & React Native) with WebSockets, Role-Based Access Control (5 roles), and dynamic PDF invoice generation.",
        "Integrated an electronic deadbolt cargo lock with metal-gear servo actuation and delivered a functional prototype under a budget of ₹4,590."
      ]
    },
    {
      id: 2,
      title: "IoT-Based Smart Agriculture Monitoring and Control System",
      techStack: ["ESP32", "React Native (Expo Go)", "Python (Pandas, Matplotlib)", "Relay Module", "Sensors (DHT11, MQ-135, TDS)"],
      highlights: [
        "Designed an IoT prototype integrating ESP32 with Soil Moisture, DHT11, MQ-135, LDR, and TDS sensors for real-time environmental tracking.",
        "Developed a React Native mobile application for real-time sensor visualization and remote automated irrigation control.",
        "Automated pump operation based on live soil moisture telemetry and conducted unit/integration testing for sensor accuracy.",
        "Performed Python-based data analysis (Pandas, Matplotlib) to lay the groundwork for predictive ML-based irrigation."
      ]
    }
  ],

  education: [
    {
      id: 1,
      degree: "B.Tech in Computer Engineering (pursuing)",
      institution: "CHARUSAT",
      period: "2025 – 2028",
      score: "CGPA: 6.68"
    },
    {
      id: 2,
      degree: "Diploma in Computer Engineering",
      institution: "Government Polytechnic Kheda",
      period: "2022 – 2025",
      score: "CPI: 7.91"
    },
    {
      id: 3,
      degree: "SSC (Secondary School Certificate)",
      institution: "Best Secondary School",
      period: "2022",
      score: "Percentage: 62.52%"
    }
  ]
};
