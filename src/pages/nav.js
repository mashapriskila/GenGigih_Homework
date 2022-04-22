import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navigasi/navBar.js'

export default function Layout({ children }) {
  return (
    <div>
      
      <Navbar />

      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
