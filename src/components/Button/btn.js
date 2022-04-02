import React from 'react'
import PropTypes from 'prop-types'
import "../../App.css"

export default function Btn ({ children, type, variant, className, onClick, href }) {
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

  return (
    <button type={type} className={classButton.join(' ')} onClick={onClick}>{children}</button>
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