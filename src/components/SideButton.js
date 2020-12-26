import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaUniversalAccess } from 'react-icons/fa';
import cx from 'classnames';

import A11yContext from '../contexts/A11yContext';

const SideButton = ({ active, setActive }) => {
  const { text } = useContext(A11yContext);
  return (
    <div className="a11y">
      <button
        className="a11y-button"
        type="button"
        onClick={() => {
          if (!active) window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setActive(true);
        }}
        aria-label={active ? text.close : text.open}
      >
        <FaUniversalAccess fontSize="40px" role="presentation" />
      </button>
      <br />
      <button
        className={cx('button', 'reset-button')}
        type="button"
        onClick={() => {
          if (typeof window === 'object')
            window.localStorage.removeItem('a11y-state');
          setActive(false);
          // TODO: trigger reset
        }}
        aria-label={text.resetLabel}
      >
        {text.reset}
      </button>
    </div>
  );
};

SideButton.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default SideButton;
