//src/components/layout/PageWrapper.jsx

import React from 'react';
import './Layout.css';

const PageWrapper = ({ children }) => {
    return <div className="page-wrapper">{children}</div>;
};

export default PageWrapper;

