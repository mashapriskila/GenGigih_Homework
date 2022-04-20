import React from 'react'
import "../../App.css"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default function Btn ({ children, type, variant, className, onClick, href, external }) {
  const classButton = ['btn']

  
  if (variant !== 'primary') {
    classButton.push(`btn--${variant}`)
  }

  if (className !== '') {
    classButton.push(className)
  }

  if (href) {
    classButton.push('btn--link')

    return (
      <a href={href} className={classButton.join(' ')}>{children}</a>
    )
  }

  if (external){
    return (
      <a href={href} className={classButton.join(' ')}>{children}</a>
    )
  }

  return(
    <Link to={href} className={classButton.join(' ')} >{children}</Link>
  )

  return (
    <button type={type} className={classButton.join(' ')} onClick={onClick}>{children} </button>
  )
}

Btn.defaultProps = {
  type: 'button',
  className: '',
  variant: 'primary',
  onClick: null,
  href: null,
}

Btn.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  onClick: PropTypes.func,
  href: PropTypes.string,
}