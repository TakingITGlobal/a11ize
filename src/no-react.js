import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';
import getBundleURL from './getBundleUrl';
// wrapper goes here
// compile to dist/no-react.js using babel

import A11yWrapper from './components/A11yWrapper';

const language = navigator.language.split('-')[0];

const wrapper = document.getElementById('accessible-content');
const children = wrapper.innerHTML;

// const path = document.currentScript.src;
// const mydir = `${path.split('/').slice(0, -1).join('/')}/`;

// eslint-disable-next-line camelcase, no-undef
__webpack_public_path__ = getBundleURL();
console.log(`Served from ${getBundleURL()}`);

if (wrapper) {
  console.log('Wrapper found! Loading button...');
  ReactDOM.render(
    <A11yWrapper dangerouslySet={children} language={language} id="a11y-module" />,
    wrapper
  );
}
