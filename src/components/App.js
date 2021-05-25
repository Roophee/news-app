/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import { Header } from './Header';
import { Main } from './Main';
const funtionString = `export function App() {
    console.log(<Header/>)
    console.log(<Main/>)
  return (
    <>
      <Header />
      <div id="main">
      <Main />      
      </div>
    </>
  );
}`;

export function App() {
  // console.log(funtionString);
  // console.log(<Header />);
  // console.log(<Main />);
  return (
    <>
      <Header />
      <div id="main">
        <Main />
      </div>
    </>
  );
}
