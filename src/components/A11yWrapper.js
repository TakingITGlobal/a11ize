// react button goes here
import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import {
  FaTextHeight,
  FaTextWidth,
  FaUniversalAccess,
  FaBan,
} from 'react-icons/fa';

import { MdFormatLineSpacing } from 'react-icons/md';
import styles from './A11yWrapper.module.scss';
import ColorizeFilter from '../ColorizeFilter';

const i18n = {
  en: require('../i18n/en.yml'),
  fr: require('../i18n/fr.yml'),
};

const AccessibilityButton = ({ id, children, dangerouslySet, lang = 'en' }) => {
  const AccessibilityPanel = ({ id, heading, label, children }) => {
    return (
      <div className={styles.option}>
        <h2>{heading}</h2>
        <label htmlFor={id} id={`${id}-label`}>
          {label}
        </label>
        <div className={styles.input}>{children}</div>
      </div>
    );
  };

  const [active, setActive] = useState(false);
  const contentRef = useRef();
  // font size
  const [fontScale, setFontScaleRaw] = useState(1);
  const setFontScale = (value) => {
    if (value >= 0.5 && value <= 2.0) {
      setFontScaleRaw(value);
    }
  };
  // font family
  const [fontFamily, setFontFamily] = useState('Default');
  // line height
  const [lineSpacing, setLineSpacingRaw] = useState(1);
  const setLineSpacing = (value) => {
    if (value >= 1 && value <= 2.0) {
      setLineSpacingRaw(value);
    }
  };
  // letter spacing
  const [letterSpacing, setLetterSpacingRaw] = useState(0);
  const setLetterSpacing = (value) => {
    if (value >= 0 && value <= 5) {
      setLetterSpacingRaw(value);
    }
  };
  // word spacing
  const [wordSpacing, setWordSpacingRaw] = useState(0);
  const setWordSpacing = (value) => {
    if (value >= 0 && value <= 10) {
      setWordSpacingRaw(value);
    }
  };
  // theme
  const [theme, setTheme] = useState('Default');
  // switches
  const [clickableHighlight, setClickableHighlight] = useState(false);
  const [tableOfContents, setTableOfContents] = useState(false);

  useEffect(() => {
    if (typeof document === 'object') {
      // modify definition of 1 rem
      document.documentElement.style.fontSize = `${fontScale}rem`;
      // push window resize event for polyfills
      if (typeof window === 'object') {
        const evt = document.createEvent('Event');
        evt.initEvent('resize', true, false);
        window.dispatchEvent(evt);
      }
    }
  }, [fontScale, fontFamily, lineSpacing, letterSpacing, wordSpacing]);

  // persist on page changes
  const restoreState = () => {
    if (typeof window === 'object') {
      const stateString = window.localStorage.getItem('a11y-state');
      const state = stateString ? JSON.parse(stateString) : {};
      console.log(state);
      setActive(false);
      setFontScaleRaw(state.fontScale || 1);
      setFontFamily(state.fontFamily || 'Default');
      setLineSpacingRaw(state.lineSpacing || 1);
      setLetterSpacingRaw(state.letterSpacing || 0);
      setWordSpacingRaw(state.wordSpacing || 0);
      setTheme(state.theme || 'Default');
      setClickableHighlight(state.clickableHighlight || false);
      setTableOfContents(state.tableOfContents || false);
    }
  };
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

  // initial load
  const text = i18n[lang] ? i18n[lang] : i18n['en'];
  useEffect(async () => {
    restoreState();
    // lazily load font
    await import('../opendyslexic.scss');
  }, []);
  // i18n helpers
  const toggleText = (what, on) =>
    `${text.toggle} ${what.toLowerCase()} (${text.currently} ${
      on ? text.toggleOn : text.toggleOff
    })`;
  const increase = (what) => `${text.up} ${what.toLowerCase()}`;
  const decrease = (what) => `${text.down} ${what.toLowerCase()}`;

  const themes = ['Default', 'Bw', 'Wb', 'By', 'Yb', 'Brown'];

  const headers = contentRef.current
    ? Array.from(contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    : [];
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
    toc += `
      <li>
        <a href="#${href}">${header.innerHTML}</a>
      </li>
    `;
    currentHeader = level;
  });
  if (currentHeader) toc += new Array(currentHeader + 1).join('</ul>');

  return (
    // menu
    <div className={cx(active && styles.active)}>
      <form className={styles.a11yMenu}>
        <div className={styles.menuWrapper}>
          <AccessibilityPanel
            id={`${id}-textsize`}
            heading={text.textSize}
            label={text.textSizeLabel}
          >
            <FaTextHeight
              className={styles.icon}
              style={{ fontSize: '20px' }}
              role="presentation"
            />
            <button
              aria-label={decrease(text.textSize)}
              className={styles.button}
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
              className={styles.button}
              type="button"
              onClick={() => setFontScale(fontScale + 0.1)}
            >
              +
            </button>
            <FaTextHeight
              className={styles.icon}
              style={{ fontSize: '25px' }}
              role="presentation"
            />
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-fontfamily`}
            heading={text.fontFamily}
            label={text.fontFamilyLabel}
          >
            <select
              id={`${id}-fontfamily`}
              aria-labelledby={`${id}-fontfamily-label`}
              className={styles[`font${fontFamily}`]}
              onChange={(e) => setFontFamily(e.currentTarget.value)}
              value={fontFamily}
            >
              <option value="Default">{text.default}</option>
              <option value="Times">Times New Roman</option>
              <option value="Dyslexic">Open Dyslexic</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
            </select>
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-linespacing`}
            heading={text.lineHeight}
            label={text.lineHeightLabel}
          >
            <MdFormatLineSpacing
              className={styles.icon}
              style={{ fontSize: '20px' }}
              role="presentation"
            />
            <button
              aria-label={decrease(text.lineHeight)}
              className={styles.button}
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
              className={styles.button}
              type="button"
              onClick={() => setLineSpacing(lineSpacing + 0.1)}
            >
              +
            </button>
            <MdFormatLineSpacing
              className={styles.icon}
              style={{ fontSize: '25px' }}
              role="presentation"
            />
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-letterspacing`}
            heading={text.letterSpacing}
            label={text.letterSpacingLabel}
          >
            <FaTextWidth
              className={styles.icon}
              style={{ fontSize: '20px' }}
              role="presentation"
            />
            <button
              aria-label={decrease(text.lineHeight)}
              className={styles.button}
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
              className={styles.button}
              type="button"
              onClick={() => setLetterSpacing(letterSpacing + 0.5)}
            >
              +
            </button>
            <FaTextWidth
              className={styles.icon}
              style={{ fontSize: '25px' }}
              role="presentation"
            />
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-wordspacing`}
            heading={text.wordSpacing}
            label={text.wordSpacingLabel}
          >
            <button
              aria-label={decrease(text.wordSpacing)}
              className={styles.button}
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
              className={styles.button}
              type="button"
              onClick={() => setWordSpacing(wordSpacing + 1)}
            >
              +
            </button>
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-contrast`}
            heading={text.theme}
            label={text.themeLabel}
          >
            <div id={`${id}-contrast`}>
              {themes.map((className) => (
                <button
                  key={className}
                  aria-label={`${text[`theme${className}`]}${
                    theme === className
                      ? ` (${text.toggleOn.toLowerCase()})`
                      : ''
                  }`}
                  className={cx(
                    styles.button,
                    styles[`theme${className}`],
                    theme === className && styles.selected
                  )}
                  type="button"
                  onClick={() => setTheme(className)}
                >
                  {className === 'Default' ? <FaBan /> : 'Aa'}
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
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-clickables`}
            heading={text.highlightClickables}
            label={text.highlightClickablesLabel}
          >
            {text.off}
            <button
              aria-label={toggleText(
                text.highlightClickables,
                clickableHighlight
              )}
              className={cx(
                styles.button,
                styles.switch,
                clickableHighlight && styles.on
              )}
              type="button"
              onClick={() => setClickableHighlight(!clickableHighlight)}
            >
              &nbsp;
            </button>
            {text.on}
          </AccessibilityPanel>
          <AccessibilityPanel
            id={`${id}-toc`}
            heading={text.toc}
            label={text.tocLabel}
          >
            {text.off}
            <button
              aria-label={toggleText(text.toc, tableOfContents)}
              className={cx(
                styles.button,
                styles.switch,
                tableOfContents && styles.on
              )}
              type="button"
              onClick={() => setTableOfContents(!tableOfContents)}
            >
              &nbsp;
            </button>
            {text.on}
          </AccessibilityPanel>
        </div>
      </form>
      <div className={styles.a11y}>
        <button
          className={cx(styles.a11yButton)}
          type="button"
          onClick={() => {
            if (typeof window === 'object' && !active)
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setActive(!active);
          }}
          aria-label={active ? text.close : text.open}
        >
          <FaUniversalAccess fontSize="40px" role="presentation" />
        </button>
        <br />
        <button
          className={cx('button', styles.resetButton)}
          type="button"
          onClick={() => {
            if (typeof window === 'object')
              window.localStorage.removeItem('a11y-state');
            restoreState();
          }}
          aria-label={text.resetLabel}
        >
          {text.reset}
        </button>
      </div>
      <div
        className={cx(
          styles.wrapper,
          styles[`font${fontFamily}`],
          lineSpacing !== 1 && styles.lineSpaced,
          styles[`theme${theme}`],
          clickableHighlight && styles.clickableHighlight
        )}
        id={`${id}-content`}
        style={{
          wordSpacing: `${wordSpacing}px`,
          letterSpacing: `${letterSpacing}px`,
          lineHeight: lineSpacing > 1 ? `${lineSpacing * 1.6}` : 'normal',
        }}
        ref={contentRef}
      >
        {tableOfContents && (
          <section className={styles.toc}>
            <div className="row">
              <div className="small-12 columns">
                <span>{text.toc}</span>
                <ul dangerouslySetInnerHTML={{ __html: toc }} />
              </div>
            </div>
          </section>
        )}
        {children}
        {dangerouslySet && (
          <div dangerouslySetInnerHTML={{ __html: dangerouslySet }} />
        )}
      </div>
    </div>
  );
};

export default AccessibilityButton;
