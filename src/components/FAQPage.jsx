'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import FadeImage from './FadeImage';
import Reveal from './Reveal';
import { fetchFaq } from '@/lib/content';
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
    const localFaqs = {
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

    let cancelled = false;
    setFaqs(localFaqs);
    setActiveSection(t('storerules'));

    fetchFaq(i18n.language === 'en' ? 'en' : 'vi')
      .then((sections) => {
        if (cancelled || !sections.length) return;
        const nextFaqs = {};
        sections.forEach((section) => {
          nextFaqs[section.title] = section.items;
        });
        setFaqs(nextFaqs);
        setActiveSection((current) => (
          sections.some((section) => section.title === current)
            ? current
            : sections[0].title
        ));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [i18n.language, t]);

  return (
    <div className="faq">
      <Header />
      <div className="faq-banner">
        <FadeImage className="faq-img" src="/faq-img.png" alt="FAQ" priority optimizeWidth={1920} sizes="100vw" fit="cover" />
        <h1>{t('menuOptions.faq')}</h1>
      </div>
      <Reveal className="faq-tabs">
        {Object.keys(faqs).map((section) => (
          <button
            key={section}
            className={`tab-button ${activeSection === section ? 'active' : ''}`}
            onClick={() => selectSection(section)}
            type="button"
          >
            {section}
          </button>
        ))}
      </Reveal>
      <Reveal className="faq-content">
        {faqs[activeSection] && faqs[activeSection].map((faq, index) => (
          <div key={index} className={`faq-item ${faq.isOpen ? 'open' : ''}`}>
            <div className="faq-question" onClick={() => toggleAnswer(activeSection, index)}>
              {faq.question}
              <span className={`faq-icon ${faq.isOpen ? 'icon-open' : 'icon-closed'}`}>
                {faq.isOpen ? '—' : '+'}
              </span>
            </div>
            <div className={`faq-answer ${faq.isOpen ? 'open' : ''}`}>{faq.answer}</div>
          </div>
        ))}
      </Reveal>
      <Footer />
    </div>
  );
}

export default FAQPage;
