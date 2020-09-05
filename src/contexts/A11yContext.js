/* eslint-disable no-unused-vars */
import React from 'react';

// default to English
const A11yContext = React.createContext({
  text: {},
  bodyStyle: (prop, val) => {},
  wrapperStyle: (prop, val) => {},
  wrapperClass: (cname, prefix) => {},
  restore: () => {},
  reset: () => {},
});

export default A11yContext;
