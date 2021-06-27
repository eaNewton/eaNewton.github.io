import React from 'react'

type FooterPropsType = {}

const Footer: React.FC<FooterPropsType> = () => {
  return (
    <div className={'footer container'}>
      <div className={'footer-wrapper'}>
        <div className={'footer-inner'}>
          <h1>Footer</h1>
        </div>
      </div>
    </div>
  )
}

export default Footer
