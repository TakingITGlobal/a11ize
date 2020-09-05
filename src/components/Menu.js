import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FaTextHeight, FaTextWidth, FaBan } from 'react-icons/fa';
import { MdFormatLineSpacing } from 'react-icons/md';

import A11yContext from '../contexts/A11yContext';
import ColorizeFilter from './ColorizeFilter';
import Panel from './Panel';

const generateToc = (elem) => {
  const headers = Array.from(elem.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let toc = '';
  let currentHeader = 0;
  headers.forEach((header) => {
    const level = Number.parseInt(header.tagName.substring(1), 10);
    if (level > currentHeader) {
      toc += new Array(level - currentHeader + 1).join('<ul>');
    } else if (level < currentHeader) {
      toc += new Array(currentHeader - level + 1).join('</ul>');
    }

    let href = header.getAttribute('id');
    if (!href) {
      const slug = header.innerHTML.toLowerCase().replace(/[^0-9a-z]+/g, '-');
      header.setAttribute('id', slug);
      href = slug;
    }
    toc += `<li><a href="#${href}">${header.innerHTML}</a></li>`;
    currentHeader = level;
  });
  if (currentHeader) toc += new Array(currentHeader + 1).join('</ul>');
  return toc;
};

const Menu = ({ id, activePanels, contentRef }) => {
  const {
    text,
    bodyStyle,
    wrapperChild,
    wrapperClass,
    wrapperStyle,
    redraw,
  } = useContext(A11yContext);

  // font size
  const [fontScale, setFontScaleRaw] = useState(1);
  const setFontScale = (value) => {
    if (value >= 0.5 && value <= 2.0) {
      setFontScaleRaw(value);
      // modify definition of 1 rem
      bodyStyle('fontSize', `${value}rem`);
      redraw();
    }
  };
  // font family
  const [fontFamily, setFontFamilyRaw] = useState('Default');
  const setFontFamily = (value) => {
    setFontFamilyRaw(value);
    wrapperClass(`font-${value}`, 'font');
    redraw();
  };
  // line height
  const [lineSpacing, setLineSpacingRaw] = useState(1);
  const setLineSpacing = (value) => {
    if (value >= 1 && value <= 2.0) {
      setLineSpacingRaw(value);
      if (value !== 1) {
        wrapperClass('line-spaced');
        wrapperStyle('lineSpacing', value * 1.6);
      } else {
        wrapperStyle('lineSpacing', 'normal');
        wrapperClass(false, 'line-spaced');
      }
      redraw();
    }
  };
  // letter spacing
  const [letterSpacing, setLetterSpacingRaw] = useState(0);
  const setLetterSpacing = (value) => {
    if (value >= 0 && value <= 5) {
      setLetterSpacingRaw(value);
      wrapperStyle('letterSpacing', `${value}px`);
      redraw();
    }
  };
  // word spacing
  const [wordSpacing, setWordSpacingRaw] = useState(0);
  const setWordSpacing = (value) => {
    if (value >= 0 && value <= 10) {
      setWordSpacingRaw(value);
      wrapperStyle('wordSpacing', `${value}px`);
      redraw();
    }
  };
  // theme
  const [theme, setThemeRaw] = useState('Default');
  const setTheme = (value) => {
    setThemeRaw(value);
    wrapperClass(`theme-${value}`, 'theme');
  };
  // switches
  const [clickableHighlight, setClickableHighlightRaw] = useState(false);
  const setClickableHighlight = (value) => {
    setClickableHighlightRaw(value);
    if (value) wrapperClass('clickable-highlight');
    if (!value) wrapperClass(false, 'clickable-highlight');
  };
  const [tableOfContents, setTableOfContentsRaw] = useState(false);
  const setTableOfContents = (value) => {
    setTableOfContentsRaw(value);
    if (value && contentRef.current)
      wrapperChild(
        'tableOfContents',
        <section className="toc">
          <div className="row">
            <div className="small-12 columns">
              <span>{text.toc}</span>
              <ul
                dangerouslySetInnerHTML={{
                  __html: generateToc(contentRef.current),
                }}
              />
            </div>
          </div>
        </section>
      );
    if (!value) wrapperChild('tableOfContents', null);
  };

  // persist on page changes
  const restoreState = () => {
    const stateString = window.localStorage.getItem('a11y-state');
    const state = stateString ? JSON.parse(stateString) : {};

    setFontScale(state.fontScale || 1);
    setFontFamily(state.fontFamily || 'default');
    setLineSpacing(state.lineSpacing || 1);
    setLetterSpacing(state.letterSpacing || 0);
    setWordSpacing(state.wordSpacing || 0);
    setTheme(state.theme || 'default');
    setClickableHighlight(state.clickableHighlight || false);
    setTableOfContents(state.tableOfContents || false);
  };

  // initial load
  useEffect(() => {
    restoreState();
    // lazily load font
    import('../opendyslexic.css');
  }, []);

  useEffect(() => {
    if (typeof window === 'object') {
      const state = {
        fontScale,
        fontFamily,
        lineSpacing,
        letterSpacing,
        wordSpacing,
        theme,
        clickableHighlight,
        tableOfContents,
      };
      window.localStorage.setItem('a11y-state', JSON.stringify(state));
    }
  }, [
    fontScale,
    fontFamily,
    lineSpacing,
    letterSpacing,
    wordSpacing,
    theme,
    clickableHighlight,
    tableOfContents,
  ]);

  const themes = ['default', 'bw', 'wb', 'by', 'yb', 'brown'];

  // i18n helpers
  const toggleText = (what, on) =>
    `${text.toggle} ${what.toLowerCase()} (${text.currently} ${
      on ? text.toggleOn : text.toggleOff
    })`;
  const increase = (what) => `${text.up} ${what.toLowerCase()}`;
  const decrease = (what) => `${text.down} ${what.toLowerCase()}`;

  return (
    <form className="a11y-menu">
      <div className="menu-wrapper">
        <Panel
          id={`${id}-textsize`}
          activePanels={activePanels}
          heading={text.textSize}
          label={text.textSizeLabel}
        >
          <FaTextHeight
            className="icon"
            style={{ fontSize: '20px' }}
            role="presentation"
          />
          <button
            aria-label={decrease(text.textSize)}
            className="button"
            type="button"
            onClick={() => setFontScale(fontScale - 0.1)}
          >
            -
          </button>
          <input
            type="number"
            id={`${id}-textsize`}
            aria-labelledby={`${id}-textsize-label`}
            value={fontScale.toFixed(1)}
            step={0.1}
            min={0.5}
            max={2}
            onChange={(e) => setFontScale(e.currentTarget.value)}
          />
          <button
            aria-label={increase(text.textSize)}
            className="button"
            type="button"
            onClick={() => setFontScale(fontScale + 0.1)}
          >
            +
          </button>
          <FaTextHeight
            className="icon"
            style={{ fontSize: '25px' }}
            role="presentation"
          />
        </Panel>
        <Panel
          id={`${id}-fontfamily`}
          activePanels={activePanels}
          heading={text.fontFamily}
          label={text.fontFamilyLabel}
        >
          <select
            id={`${id}-fontfamily`}
            aria-labelledby={`${id}-fontfamily-label`}
            className={`font-${fontFamily}`}
            onChange={(e) => setFontFamily(e.currentTarget.value)}
            value={fontFamily}
          >
            <option value="default">{text.default}</option>
            <option value="times">Times New Roman</option>
            <option value="dyslexic">Open Dyslexic</option>
            <option value="arial">Arial</option>
            <option value="verdana">Verdana</option>
          </select>
        </Panel>
        <Panel
          id={`${id}-linespacing`}
          activePanels={activePanels}
          heading={text.lineHeight}
          label={text.lineHeightLabel}
        >
          <MdFormatLineSpacing
            className="icon"
            style={{ fontSize: '20px' }}
            role="presentation"
          />
          <button
            aria-label={decrease(text.lineHeight)}
            className="button"
            type="button"
            onClick={() => setLineSpacing(lineSpacing - 0.1)}
          >
            -
          </button>
          <input
            type="number"
            id={`${id}-linespacing`}
            aria-labelledby={`${id}-linespacing-label`}
            value={lineSpacing.toFixed(1)}
            step={0.1}
            min={1}
            max={2}
            onChange={(e) => setLineSpacing(e.currentTarget.value)}
          />
          <button
            aria-label={increase(text.lineHeight)}
            className="button"
            type="button"
            onClick={() => setLineSpacing(lineSpacing + 0.1)}
          >
            +
          </button>
          <MdFormatLineSpacing
            className="icon"
            style={{ fontSize: '25px' }}
            role="presentation"
          />
        </Panel>
        <Panel
          id={`${id}-letterspacing`}
          activePanels={activePanels}
          heading={text.letterSpacing}
          label={text.letterSpacingLabel}
        >
          <FaTextWidth
            className="icon"
            style={{ fontSize: '20px' }}
            role="presentation"
          />
          <button
            aria-label={decrease(text.lineHeight)}
            className="button"
            type="button"
            onClick={() => setLetterSpacing(letterSpacing - 0.5)}
          >
            -
          </button>
          <input
            type="number"
            id={`${id}-letterspacing`}
            aria-labelledby={`${id}-letterspacing-label`}
            value={letterSpacing}
            step={0.5}
            min={0}
            max={5}
            onChange={(e) => setLetterSpacing(e.currentTarget.value)}
          />
          <button
            aria-label={increase(text.lineHeight)}
            className="button"
            type="button"
            onClick={() => setLetterSpacing(letterSpacing + 0.5)}
          >
            +
          </button>
          <FaTextWidth
            className="icon"
            style={{ fontSize: '25px' }}
            role="presentation"
          />
        </Panel>
        <Panel
          id={`${id}-wordspacing`}
          activePanels={activePanels}
          heading={text.wordSpacing}
          label={text.wordSpacingLabel}
        >
          <button
            aria-label={decrease(text.wordSpacing)}
            className="button"
            type="button"
            onClick={() => setWordSpacing(wordSpacing - 1)}
          >
            -
          </button>
          <input
            type="number"
            id={`${id}-wordspacing`}
            aria-labelledby={`${id}-wordspacing-label`}
            value={wordSpacing}
            step={1}
            min={0}
            max={10}
            onChange={(e) => setWordSpacing(e.currentTarget.value)}
          />
          <button
            aria-label={increase(text.wordSpacing)}
            className="button"
            type="button"
            onClick={() => setWordSpacing(wordSpacing + 1)}
          >
            +
          </button>
        </Panel>
        <Panel
          id={`${id}-contrast`}
          activePanels={activePanels}
          heading={text.theme}
          label={text.themeLabel}
        >
          <div id={`${id}-contrast`}>
            {themes.map((className) => (
              <button
                key={className}
                aria-label={`${text[`theme${className}`]}${
                  theme === className ? ` (${text.toggleOn.toLowerCase()})` : ''
                }`}
                className={cx(
                  'button',
                  `theme-${className}`,
                  theme === className && 'selected'
                )}
                type="button"
                onClick={() => setTheme(className)}
              >
                {className === 'default' ? <FaBan /> : 'Aa'}
              </button>
            ))}

            {/* svg mask over the entire page go brrrr */}
            <svg
              height="0"
              width="0"
              style={{ position: 'absolute' }}
              aria-hidden="true"
            >
              <ColorizeFilter
                id="themify-image"
                dark={
                  { Bw: '#ffffff', By: '#ffff00', Brown: '#bb9966' }[theme] ||
                  '#000000'
                }
                light={
                  {
                    Bw: '#000000',
                    By: '#000000',
                    Yb: '#ffff00',
                    Brown: '#000000',
                  }[theme] || '#ffffff'
                }
                wcagClamp
              />
            </svg>
          </div>
        </Panel>
        <Panel
          id={`${id}-clickables`}
          activePanels={activePanels}
          heading={text.highlightClickables}
          label={text.highlightClickablesLabel}
        >
          {text.off}
          <button
            aria-label={toggleText(
              text.highlightClickables,
              clickableHighlight
            )}
            className={cx('button', 'switch', clickableHighlight && 'on')}
            type="button"
            onClick={() => setClickableHighlight(!clickableHighlight)}
          >
            &nbsp;
          </button>
          {text.on}
        </Panel>
        <Panel
          id={`${id}-toc`}
          activePanels={activePanels}
          heading={text.toc}
          label={text.tocLabel}
        >
          {text.off}
          <button
            aria-label={toggleText(text.toc, tableOfContents)}
            className={cx('button', 'switch', tableOfContents && 'on')}
            type="button"
            onClick={() => setTableOfContents(!tableOfContents)}
          >
            &nbsp;
          </button>
          {text.on}
        </Panel>
      </div>
    </form>
  );
};

Menu.propTypes = {
  id: PropTypes.string.isRequired,
  activePanels: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.object, PropTypes.element]),
  }).isRequired,
};

export default Menu;
