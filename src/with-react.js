import React from 'react';
import ReactDOM from 'react-dom';
import getBundleURL from './getBundleUrl';
import A11yWrapper from './components/A11yWrapper';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

const language = navigator.language ? navigator.language.split('-')[0] : 'en';

const userSettings = {
  wrapperId: 'accessible-content',
  ...window.A11ySettings, // override user settings
};

const wrapper = document.getElementById(userSettings.wrapperId);
const children = wrapper.innerHTML;

// Set Webpack's public path dynamically
// eslint-disable-next-line camelcase, no-undef
__webpack_public_path__ = getBundleURL();

// eslint-disable-next-line no-console
console.log(`Served from ${getBundleURL()}`);

if (wrapper) {
  // eslint-disable-next-line no-console
  console.log('Wrapper element found! Loading button...');
  ReactDOM.render(
    <A11yWrapper
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...userSettings}
      dangerouslySet={children}
      language={language}
      id="a11y-module"
    />,
    wrapper
  );
} else {
  // eslint-disable-next-line no-console
  console.log(
    'No wrapper element found! Make sure you have a wrapper element with id `accessible-content` around the content you want A11ize to process!'
  );
}
