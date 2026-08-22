import React from 'react';
import { useTranslation } from 'react-i18next'; 
import rules1 from '../album/rules1.png';
import rules2 from '../album/rules2.png';
import rules3 from '../album/rules3.png';
import rules4 from '../album/rules4.png';
import rules5 from '../album/rules5.png';
import rules6 from '../album/rules6.png';
import './Rules.css';


const RulesDetail = ({ image, description }) => {
    return (
      <div>
        <img className="rules-img" src={image}></img>
        <p className="rules-description">{description}</p>
      </div>
    );
  };
function Rules() {
    const { t } = useTranslation(); 
  return (
    <div className='rules'>
        <div className='rules-frame'>
        <h1>{t('ruleTitle')}</h1>
            <div className='rules-container'>
                <RulesDetail image={rules1} description={t('ruleA')} />
                <RulesDetail image={rules2} description={t('ruleB')} />
            </div>
            <div className='rules-container'>
                <RulesDetail image={rules3} description={t('ruleC')} />
                <RulesDetail image={rules4} description={t('ruleD')} />
            </div>
            <div className='rules-container'>
                <RulesDetail image={rules5} description={t('ruleE')} />
                <RulesDetail image={rules6} description={t('ruleF')} />
            </div>
        </div>
        <div className='hykhidd-container'>
        <h2>{t('hykhidd')}</h2>
        <iframe className='hykhidd' height="560" width="315" src="https://drive.google.com/file/d/12HdJdDifuOYlTl-uX05kFaDOf1jO1mjl/preview" allow="autoplay"></iframe>        
        </div>
    </div>
  )
}

export default Rules