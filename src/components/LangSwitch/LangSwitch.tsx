import React from 'react';

interface Props {
  currentLang: 'en' | 'ru';
  onChange: (lang: 'en' | 'ru') => void;
}

const LanguageSwitcher: React.FC<Props> = ({ currentLang, onChange }) => {
  return (
    <div >
      <button onClick={() => onChange('ru')} disabled={currentLang === 'ru'}>ru</button>
      <button onClick={() => onChange('en')} disabled={currentLang === 'en'}>en</button>
    </div>
  );
};

export default LanguageSwitcher;
