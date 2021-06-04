/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { Header } from './Header';
import { Main } from './Main';
import { appHooks } from '../../hooksInUse';

export function App() {
  const {
    submitWasClicked,
    setSubmitWasClicked,
    newsStorage,
    queryProperties,
    setQueryProperties,
    setResetWasClicked,
  } = appHooks();
  // console.log(submitWasClicked, setSubmitWasClicked, queryProperties, setQueryProperties);
  return (
    <>
      <Header
        submitWasClicked={submitWasClicked}
        setSubmitWasClicked={setSubmitWasClicked}
        queryProperties={queryProperties}
        setQueryProperties={setQueryProperties}
        setResetWasClicked={setResetWasClicked}
      />
      <div id="main">
        <Main news={newsStorage} />
      </div>
    </>
  );
}
