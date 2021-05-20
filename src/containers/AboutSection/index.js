// @flow
import React, { forwardRef } from 'react'

const AboutSection = forwardRef(({ testProp }, ref): React$Element => {
  return (
    <div className={'container'} id={'about-container'} ref={ref}>
      <h1>about</h1>
      <div>
        <ul>
          <li>based in austin, tx</li>
          <li>react + node.js for web</li>
          <li>react native + node.js for mobile</li>
        </ul>
      </div>
    </div>
  )
})

export default AboutSection