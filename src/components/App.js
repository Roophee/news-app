import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
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
      <Main news={newsStorage} />
      <Footer />
    </>
  );
}
