import React from 'react';

export function Option(props) {
  const { stateValue, value, text } = props;
  return <option value={value}>{text}</option>;
}