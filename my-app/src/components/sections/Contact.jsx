import { useState } from 'react';
import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import Button from '../common/Button';
import { trackEvent } from '../../utils/analytics';
import Icon from '../common/Icon';
import './Contact.css';

export default function Contact() {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  const handleEmail = () => {
    trackEvent('Contact', 'send_email', profile.email);
    window.location.href = `mailto:${profile.email}`;
  };

  const copyEmail = async () => {
    trackEvent('Contact', 'copy_email', profile.email);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = profile.email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silently fail
      }
      document.body.removeChild(textArea);
    }
  };
  
  return (
    <Section 
      id="contact" 
      title={t('contact.title')} 
      subtitle={t('contact.subtitle')}
    >
      <div className="contact">
        <div className="contact__intro">
          <h3 className="contact__title">
            {t('profile.tagline')}
          </h3>
          <p className="contact__text">
            {t('contact.currently')} <strong className={`contact__status contact__status--${profile.status?.type ?? 'open-to-work'}`}>{t('hero.status.' + (profile.status?.type ?? 'open-to-work')).toLowerCase()}</strong>. {t('contact.cta')}
          </p>
        </div>
        
        <div className="contact__cards">
          <div className="contact__card">
              <a href={`mailto:${profile.email}`} className="contact__card-link" onClick={() => trackEvent('Contact', 'click_email', profile.email)}>
                <div className="contact__card-icon">
                  <Icon name="mail" size={20} />
                </div>
                <div className="contact__card-content">
                  <span className="contact__card-label">
                    {t('contact.email')}
                  </span>
                  <span className="contact__card-value">
                    {profile.email}
                  </span>
                </div>
              </a>
              <button
                type="button"
                className="contact__copy-btn"
                onClick={copyEmail}
                aria-label={t('contact.copyEmail')}
                title={t('contact.copyEmail')}
              >
                {copied
                  ? t('contact.copied')
                  : t('contact.copy')
                }
              </button>
            </div>
          
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="contact__card" onClick={() => trackEvent('Social', 'click', 'GitHub')}>
             <div className="contact__card-icon">
                <Icon name="github" size={20} />
             </div>
             <div className="contact__card-content">
               <span className="contact__card-label">
                 {t('contact.github')}
               </span>
               <span className="contact__card-value">
                 @PouDDuoP
               </span>
             </div>
           </a>
          
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact__card" onClick={() => trackEvent('Social', 'click', 'LinkedIn')}>
             <div className="contact__card-icon">
                <Icon name="linkedin" size={20} />
             </div>
             <div className="contact__card-content">
               <span className="contact__card-label">
                 {t('contact.linkedin')}
               </span>
               <span className="contact__card-value">
                 /in/kevin-alvarado-graterol
               </span>
             </div>
           </a>
        </div>
        
        <div className="contact__cta">
          <Button onClick={handleEmail} variant="primary" size="large">
            {t('contact.sendEmail')}
          </Button>
        </div>
      </div>
    </Section>
  );
}