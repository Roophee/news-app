/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

export function Option(props) {
  const { stateValue, value, text } = props;
  return (
    <option value={value} selected={stateValue === value}>
      {text}
    </option>
  );
}
