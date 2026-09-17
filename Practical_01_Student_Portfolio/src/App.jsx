import React, { useState } from 'react';
import NavBar from './componenets/NavBar';
import Header from './componenets/header';
import About from './componenets/about';
import Skills from './componenets/skills';
import Experience from './componenets/experience';
import Projects from './componenets/projects';
import Education from './componenets/education';
import ResumeSection from './componenets/ResumeSection';
import Footer from './componenets/footer';
import { resumeData } from './data/resumeData';
import './App.css';

function App() {
  const [showOnlyResume, setShowOnlyResume] = useState(false);

  const skillsArray = [
    ...resumeData.skills.languagesAndDomains,
    ...resumeData.skills.hardwareAndSensors,
    ...resumeData.skills.toolsAndPlatforms
  ];

  return (
    <div className="app-container">
      <NavBar 
        showOnlyResume={showOnlyResume} 
        setShowOnlyResume={setShowOnlyResume} 
      />
      
      <main className="main-content">
        {showOnlyResume ? (
          // ONLY 2-Page Resume PDF & Download Button View
          <ResumeSection />
        ) : (
          // Full Portfolio View with embedded Resume section
          <>
            <Header 
              name={resumeData.personalInfo.fullName} 
              tagline={resumeData.personalInfo.tagline} 
              onViewResume={() => setShowOnlyResume(true)}
            />
            
            <About />
            
            <Skills skillList={skillsArray} />

            <Experience />

            <Projects />

            <Education />

            <ResumeSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
