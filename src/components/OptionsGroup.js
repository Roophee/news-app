import React from 'react';
import { Option } from './Option';

export default function OptionsGroup(props) {
  const optionsGroups = {
    topicOptions: {
      default: 'Any',
      business: 'Business',
      beauty: 'Beauty',
      entertainment: 'Entertainment',
      economics: 'Economics',
      finance: 'Finance',
      food: 'Food',
      news: 'General',
      music: 'Music',
      politics: 'Politics',
      science: 'Science',
      sport: 'Sport',
      tech: 'Technology',
      travel: 'Travel',
      world: 'World',
    },
    languageOptions: {
      default: 'Any',
      uk: 'Ukrainian',
      de: 'German',
      en: 'English',
      ru: 'Russian',
      it: 'Italian',
      lt: 'Lithuanian',
      pt: 'Portuguese',
      es: 'Spanish',
      cn: 'Chinese',
    },
    countryOptions: {
      default: 'Any',
      ua: 'Ukraine',
      us: 'USA',
      ru: 'Russia',
      de: 'Germany',
      gb: 'Great Britain',
      it: 'Italy',
      lt: 'Lithuania',
      pt: 'Portugal',
      sp: 'Spain',
      ch: 'China',
    },
  };
  const { optionsType } = props;
  return Object.entries(optionsGroups[optionsType]).map(([value, text], index) => {
    const optionProperties = {
      value,
      text,
    };
    return <Option key={index} {...optionProperties} />;
  });
}
