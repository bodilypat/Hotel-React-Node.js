//src/components/ui/Badge.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

const Badge = ({ text, variant = 'default' }) => {
    const badgeClasses = `badge badge-${variant}`;
    return <span className={badgeClasses}>{text}</span>;
};

Badge.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger']),
};

export default Badge;


