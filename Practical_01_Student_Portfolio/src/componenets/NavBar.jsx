import React from 'react';
import { Cpu, User, Briefcase, Rocket, GraduationCap, FileText, Download } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function NavBar({ showOnlyResume, setShowOnlyResume }) {
  return (
    <nav className="navbar" role="navigation">
      <div className="container nav-flex">
        <a 
          href="#hero" 
          className="brand-logo" 
          onClick={(e) => {
            if (showOnlyResume) setShowOnlyResume(false);
          }}
        >
          <Cpu size={26} color="var(--accent-cyan)" />
          <span>{resumeData.personalInfo.displayName}<span className="gradient-text">.Dev</span></span>
        </a>

        <ul className="nav-links">
          {!showOnlyResume ? (
            <>
              <li><a href="#about" className="nav-link"><User size={15} /> About</a></li>
              <li><a href="#skills" className="nav-link"><Cpu size={15} /> Skills</a></li>
              <li><a href="#experience" className="nav-link"><Briefcase size={15} /> Experience</a></li>
              <li><a href="#projects" className="nav-link"><Rocket size={15} /> Projects</a></li>
              <li><a href="#education" className="nav-link"><GraduationCap size={15} /> Education</a></li>
              <li>
                <button 
                  onClick={() => setShowOnlyResume(true)}
                  className="nav-link" 
                  style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(6, 182, 212, 0.3)', cursor: 'pointer' }}
                >
                  <FileText size={15} /> Resume Only Mode
                </button>
              </li>
            </>
          ) : (
            <li>
              <button 
                onClick={() => setShowOnlyResume(false)}
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              >
                ← Back to Full Portfolio
              </button>
            </li>
          )}

          <li>
            <a 
              href="/resume.pdf" 
              download="Keyur_Rana_Resume.pdf" 
              className="btn btn-primary" 
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              <Download size={14} /> Download PDF
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;