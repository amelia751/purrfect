'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import './FAQ.css';

function FAQPage() {
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState({});
  const [activeSection, setActiveSection] = useState('');

  const toggleAnswer = (section, index) => {
    const newFaqs = { ...faqs };
    newFaqs[section][index].isOpen = !newFaqs[section][index].isOpen;
    setFaqs(newFaqs);
  };

  const selectSection = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const nextFaqs = {
      [t('storerules')]: [
        { question: t('SqA'), answer: t('SaA'), isOpen: false },
        { question: t('SqB'), answer: t('SaB'), isOpen: false },
        { question: t('SqC'), answer: t('SaC'), isOpen: false },
        { question: t('SqD'), answer: t('SaD'), isOpen: false },
        { question: t('SqE'), answer: t('SaE'), isOpen: false },
        { question: t('SqF'), answer: t('SaF'), isOpen: false },
      ],
      [t('aboutcats')]: [
        { question: t('CqA'), answer: t('CaA'), isOpen: false },
        { question: t('CqB'), answer: t('CaB'), isOpen: false },
        { question: t('CqD'), answer: t('CaD'), isOpen: false },
        { question: t('CqE'), answer: t('CaE'), isOpen: false },
      ],
    };
    setFaqs(nextFaqs);
    setActiveSection(t('storerules'));
  }, [i18n.language, t]);

  return (
    <div className="faq">
      <Header />
      <div className="faq-banner">
        <img className="faq-img" src="/faq-img.png" alt="FAQ" />
        <h1>{t('menuOptions.faq')}</h1>
      </div>
      <div className="faq-tabs">
        {Object.keys(faqs).map((section) => (
          <button
            key={section}
            className={`tab-button ${activeSection === section ? 'active' : ''}`}
            onClick={() => selectSection(section)}
          >
            {section}
          </button>
        ))}
      </div>
      <div className="faq-content">
        {faqs[activeSection] && faqs[activeSection].map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(activeSection, index)}>
              {faq.question}
              <span className={`faq-icon ${faq.isOpen ? 'icon-open' : 'icon-closed'}`}>
                {faq.isOpen ? '—' : '+'}
              </span>
            </div>
            {faq.isOpen && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FAQPage;
