//src/components/ui/Card.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/global.css';


const Card = ({ title, content }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default Card;



