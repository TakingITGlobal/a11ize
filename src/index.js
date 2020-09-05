// react button goes here
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import A11yContext from './contexts/A11yContext';
import Menu from './components/Menu';
import './components/A11yWrapper.scss';

// TODO: dynamic require to minimize bundle size
import en from './i18n/en.yml';
import fr from './i18n/fr.yml';
import SideButton from './components/SideButton';

const i18n = { en, fr };

const A11yWrapper = ({
  id,
  children,
  dangerouslySet,
  lang = 'en',
  primaryColor = '#921d5b',
  secondaryColor = '#01364c',
  buttonColor = '#fff',
  activePanels,
}) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef();
  const [wrapperClasses, setWrapperClasses] = useState(['wrapper']);
  const [wrapperStyles, setWrapperStyles] = useState({});
  const [wrapperChildren, setWrapperChildren] = useState({});

  /*
    CHANGE HANDLERS
    bodyX affects all elements on page
    wrapperX affects only wrapped elements
    xStyle can change CSS inline style properties
      Call with (CSS property, CSS value)
    xClass can add/remove families of classes
      Call with (class, prefix of classes), i.e. (theme-blue, theme) to activate
      theme-blue and remove all other theme-* classes.
      To disable a prefixless class, use (false, class) since "class" starts
      with "class".
    xChild can prepend renderable objects
      Call with (unique key, object). To clear, just do (unique key, null).
  */
  const bodyStyle = (prop, val) => {
    document.documentElement.style[prop] = val;
  };
  const wrapperStyle = (prop, val) => {
    setWrapperStyles({
      ...wrapperStyles,
      [prop]: val,
    });
  };
  const wrapperClass = (cname, prefix = null) => {
    let newClassList = wrapperClasses;
    if (prefix) {
      newClassList = newClassList.filter((c) => !c.includes(prefix));
    }
    if (cname && !wrapperClasses.includes(cname)) {
      newClassList.push(cname);
    }
    setWrapperClasses(newClassList);
  };
  const wrapperChild = (key, child) => {
    setWrapperChildren({
      ...wrapperChildren,
      [key]: child,
    });
  };

  // push window resize event for polyfills
  const redraw = () => {
    const evt = document.createEvent('Event');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
  };

  return (
    <A11yContext.Provider
      value={{
        text: i18n[lang],
        bodyStyle,
        wrapperStyle,
        wrapperClass,
        wrapperChild,
        redraw,
      }}
    >
      <div
        className={cx(active && 'active')}
        style={{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
          '--a11y-button-color': buttonColor,
        }}
      >
        <Menu
          id={`${id}-menu`}
          activePanels={activePanels}
          contentRef={contentRef}
        />
        <SideButton active={active} setActive={setActive} />
        {/* wrapper */}
        <div
          className={cx(...wrapperClasses)}
          id={`${id}-content`}
          style={wrapperStyles}
          ref={contentRef}
        >
          {Object.values(wrapperChildren)}
          {children}
          {dangerouslySet && (
            <div dangerouslySetInnerHTML={{ __html: dangerouslySet }} />
          )}
        </div>
      </div>
    </A11yContext.Provider>
  );
};

A11yWrapper.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  dangerouslySet: PropTypes.string,
  lang: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  buttonColor: PropTypes.string,
  activePanels: PropTypes.arrayOf(PropTypes.string),
};

A11yWrapper.defaultProps = {
  id: 'a11ize',
  children: undefined,
  dangerouslySet: undefined,
  lang: 'en',
  primaryColor: '#921d5b',
  secondaryColor: '#01364c',
  buttonColor: '#fff',
  activePanels: [
    'textsize',
    'fontfamily',
    'linespacing',
    'letterspacing',
    'wordspacing',
    'contrast',
    'clickables',
    'toc',
  ],
};

export default A11yWrapper;
