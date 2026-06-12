import profile from '../../data/profile.json';
import { useT } from '../../i18n/useTranslation';
import Icon from '../common/Icon';
import './Footer.css';

export default function Footer() {
  const { t } = useT();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
           <div className="footer__brand">
            <span className="footer__logo">{t('profile.fullName')}</span>
            <p className="footer__tagline">{t('profile.tagline')}</p>
          </div>
          
          <div className="footer__links">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub - ${t('common.opensInNewTab')}`}>
              <Icon name="github" size={20} />
              <span className="sr-only">{t('common.opensInNewTab')}</span>
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn - ${t('common.opensInNewTab')}`}>
              <Icon name="linkedin" size={20} />
              <span className="sr-only">{t('common.opensInNewTab')}</span>
            </a>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {t('profile.fullName')}.
          </p>
        </div>
      </div>
    </footer>
  );
}