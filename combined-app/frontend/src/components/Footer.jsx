import React from 'react';
import { Award, BookOpen, ExternalLink, GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <GraduationCap size={18} color="var(--accent-primary)" />
          <span>
            <strong>Advanced Web Development Frameworks (ITUE301)</strong> — CHARUSAT CSPIT (IT)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={15} color="var(--accent-amber)" />
            Student: <strong>Ranak (Ranakeyur-31525)</strong>
          </span>
          <span style={{ color: 'var(--border-subtle)' }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BookOpen size={15} color="var(--accent-cyan)" />
            Semester 5 • 6 Practicals Integrated
          </span>
        </div>
      </div>
    </footer>
  );
}
