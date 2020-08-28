import React from 'react';
import ReactDOM from 'react-dom';
import getBundleURL from './getBundleUrl';
import A11yWrapper from './components/A11yWrapper';
import '@babel/polyfill';

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
    <A11yWrapper
      dangerouslySet={children}
      language={language}
      id="a11y-module"
    />,
    wrapper
  );
}
