import { useState } from 'react';
import { useT } from '../../i18n/useTranslation';
import Section from '../common/Section';
import './FAQ.css';

const faqItems = [
  { key: 'faq.tech.title', contentKey: 'faq.tech.text' },
  { key: 'faq.availability.title', contentKey: 'faq.availability.text' },
  { key: 'faq.location.title', contentKey: 'faq.location.text' },
  { key: 'faq.experience.title', contentKey: 'faq.experience.text' },
  { key: 'faq.projects.title', contentKey: 'faq.projects.text' },
];

export default function FAQ() {
  const { t } = useT();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" title="FAQ" subtitle={t('faq.subtitle')}>
      <div className="faq__list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.key} className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
              <button
                type="button"
                className="faq__question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span className="faq__question-text">{t(item.key)}</span>
                <svg
                  className="faq__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="faq__answer" role="region" hidden={!isOpen}>
                <p>{t(item.contentKey)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
