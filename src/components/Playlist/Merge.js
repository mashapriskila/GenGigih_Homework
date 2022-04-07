import React from 'react';
import PropTypes from 'prop-types';

export default function Merge ({ children }) {
  return (
    <div className="Merge">
      {children}
    </div>
  )
}

Merge.propTypes = {
  children: PropTypes.node.isRequired,
}