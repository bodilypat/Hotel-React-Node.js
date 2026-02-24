//src/components/ui/Loader.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = ({ size }) => {
  const loaderSize = size === 'small' ? 'loader-small' : 'loader-large';
  return <div className={`loader ${loaderSize}`}
    style={{
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: size === 'small' ? '20px' : '40px',
      height: size === 'small' ? '20px' : '40px',
      animation: 'spin 2s linear infinite',
    }}
    />;
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
};

Loader.defaultProps = {
    size: 'large',
};

export default Loader;



