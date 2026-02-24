//src/components/ui/Button.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/forms.css';

function Button({ children, type="button", className="", ...props }) {
    return (
        <button type={type} className={`btn ${className}`} {...props}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
};

export default Button;

