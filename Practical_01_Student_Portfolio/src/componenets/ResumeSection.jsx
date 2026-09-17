import React, { useState } from 'react';
import { Download, ExternalLink, FileText, ZoomIn, X } from 'lucide-react';

function ResumeSection() {
  const [modalPage, setModalPage] = useState(null);

  const handleOpenPdf = (e) => {
    e.preventDefault();
    const pdfUrl = window.location.origin + '/resume.pdf';
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="resume" style={{ padding: '2rem 0 4rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Control Bar */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.25rem 2rem', 
            marginBottom: '2.5rem', 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '1rem',
            borderLeft: '4px solid var(--accent-cyan)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={28} color="var(--accent-cyan)" />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
                Keyur Rakeshbhai Rana — Resume
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Official 2-Page Resume PDF
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {/* Primary Download Button */}
            <a 
              href="/resume.pdf" 
              download="Keyur_Rana_Resume.pdf" 
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
            >
              <Download size={18} /> Download PDF Resume
            </a>

            {/* Guaranteed Working Open PDF Button */}
            <button 
              onClick={handleOpenPdf}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.95rem' }}
              title="Open PDF in new tab"
            >
              <ExternalLink size={18} /> Open PDF in New Tab
            </button>
          </div>
        </div>

        {/* 2 High-Res Page Sheets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center' }}>
          
          {/* Page 1 */}
          <div 
            className="glass-card" 
            style={{ 
              width: '100%', 
              maxWidth: '850px',
              padding: '0',
              overflow: 'hidden',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <div style={{ background: 'var(--bg-secondary)', padding: '0.6rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>PAGE 1 OF 2</span>
              <button 
                onClick={() => setModalPage('/resume_page_1.png')} 
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}
              >
                <ZoomIn size={14} /> Fullscreen Zoom
              </button>
            </div>
            <img 
              src="/resume_page_1.png" 
              alt="Keyur Rakeshbhai Rana Resume Page 1" 
              style={{ width: '100%', display: 'block', height: 'auto', cursor: 'pointer' }}
              onClick={() => setModalPage('/resume_page_1.png')}
            />
          </div>

          {/* Page 2 */}
          <div 
            className="glass-card" 
            style={{ 
              width: '100%', 
              maxWidth: '850px',
              padding: '0',
              overflow: 'hidden',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <div style={{ background: 'var(--bg-secondary)', padding: '0.6rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>PAGE 2 OF 2</span>
              <button 
                onClick={() => setModalPage('/resume_page_2.png')} 
                style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}
              >
                <ZoomIn size={14} /> Fullscreen Zoom
              </button>
            </div>
            <img 
              src="/resume_page_2.png" 
              alt="Keyur Rakeshbhai Rana Resume Page 2" 
              style={{ width: '100%', display: 'block', height: 'auto', cursor: 'pointer' }}
              onClick={() => setModalPage('/resume_page_2.png')}
            />
          </div>

        </div>

      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {modalPage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
          onClick={() => setModalPage(null)}
        >
          <button 
            onClick={() => setModalPage(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              borderRadius: '50%',
              padding: '0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} />
          </button>
          <img 
            src={modalPage} 
            alt="Resume High Resolution Preview" 
            style={{ maxWidth: '95%', maxHeight: '95vh', objectFit: 'contain', borderRadius: 'var(--radius-sm)' }}
          />
        </div>
      )}
    </section>
  );
}

export default ResumeSection;
