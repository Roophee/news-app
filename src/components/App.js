import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { appHooks } from '../../hooksInUse';
import SearchForm from './SearchForm';

export function App() {
  const {
    submitWasClicked,
    setSubmitWasClicked,
    newsStorage,
    queryProperties,
    setQueryProperties,
    setResetWasClicked,
  } = appHooks();

  return (
    <>
      <Header />
      <SearchForm
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
