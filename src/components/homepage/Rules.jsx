'use client';

import { useTranslation } from 'react-i18next';
import './Rules.css';

const RulesDetail = ({ image, description }) => {
  return (
    <div>
      <img className="rules-img" src={image} alt="" />
      <p className="rules-description">{description}</p>
    </div>
  );
};

function Rules() {
  const { t } = useTranslation();
  return (
    <div className="rules">
      <div className="rules-frame">
        <h1>{t('ruleTitle')}</h1>
        <div className="rules-container">
          <RulesDetail image="/album/rules1.png" description={t('ruleA')} />
          <RulesDetail image="/album/rules2.png" description={t('ruleB')} />
        </div>
        <div className="rules-container">
          <RulesDetail image="/album/rules3.png" description={t('ruleC')} />
          <RulesDetail image="/album/rules4.png" description={t('ruleD')} />
        </div>
        <div className="rules-container">
          <RulesDetail image="/album/rules5.png" description={t('ruleE')} />
          <RulesDetail image="/album/rules6.png" description={t('ruleF')} />
        </div>
      </div>
      <div className="hykhidd-container">
        <h2>{t('hykhidd')}</h2>
        <iframe
          className="hykhidd"
          height="560"
          width="315"
          src="https://drive.google.com/file/d/12HdJdDifuOYlTl-uX05kFaDOf1jO1mjl/preview"
          allow="autoplay"
          title="Hy Khi Duong Duong guide"
        />
      </div>
    </div>
  );
}

export default Rules;
