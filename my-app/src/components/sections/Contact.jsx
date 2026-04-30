import profile from '../../data/profile.json';
import { useLanguage } from '../../context/LanguageContext';
import Section from '../common/Section';
import Button from '../common/Button';
import './Contact.css';

export default function Contact() {
  const { lang } = useLanguage();
  const handleEmail = () => {
    window.location.href = `mailto:${profile.email}`;
  };
  
  return (
    <Section 
      id="contact" 
      title={lang === 'es' ? 'Contacto' : 'Contact'} 
      subtitle={lang === 'es' ? 'Hablemos' : 'Let\'s talk'}
    >
      <div className="contact">
        <div className="contact__intro">
          <h3 className="contact__title">
            {lang === 'es' ? profile.tagline : profile.tagline_en}
          </h3>
          <p className="contact__text">
            {lang === 'es' ? 'Actualmente estoy' : 'I am currently'} <strong>{lang === 'es' ? profile.availability.toLowerCase() : profile.availability_en.toLowerCase()}</strong>. 
            {lang === 'es' 
              ? 'Si tienes un proyecto en mente o simplemente quieres charlar sobre tecnología, no dudes en contactarme.'
              : 'If you have a project in mind or just want to chat about technology, don\'t hesitate to reach out.'
            }
          </p>
        </div>
        
        <div className="contact__cards">
          <a href={`mailto:${profile.email}`} className="contact__card">
             <div className="contact__card-icon">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                 <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
               </svg>
             </div>
             <div className="contact__card-content">
               <span className="contact__card-label">
                 {lang === 'es' ? 'Email' : 'Email'}
               </span>
               <span className="contact__card-value">
                 {profile.email}
               </span>
             </div>
           </a>
          
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="contact__card">
             <div className="contact__card-icon">
               <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                 <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.705-3.63-1.305-3.63-1.305-.54-1.38-1.335-1.755-1.335-1.755-1.095-.75.09-.735.09-.735 1.2.09 1.83 1.245 1.83 1.245 1.08 1.86 2.805 1.32 3.495 1.005.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
               </svg>
             </div>
             <div className="contact__card-content">
               <span className="contact__card-label">
                 {lang === 'es' ? 'GitHub' : 'GitHub'}
               </span>
               <span className="contact__card-value">
                 @PouDDuoP
               </span>
             </div>
           </a>
          
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact__card">
             <div className="contact__card-icon">
               <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
             </div>
             <div className="contact__card-content">
               <span className="contact__card-label">
                 {lang === 'es' ? 'LinkedIn' : 'LinkedIn'}
               </span>
               <span className="contact__card-value">
                 /in/kevin-alvarado-graterol
               </span>
             </div>
           </a>
        </div>
        
        <div className="contact__cta">
          <Button onClick={handleEmail} variant="primary" size="large">
            {lang === 'es' ? 'Enviar Email' : 'Send Email'}
          </Button>
        </div>
      </div>
    </Section>
  );
}