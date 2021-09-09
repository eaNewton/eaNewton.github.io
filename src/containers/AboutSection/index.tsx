import React, { forwardRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NextArrowWhite from '../../assets/img/icons/next-white.svg'
import Headshot from '../../assets/img/headshot.jpg'
import Github from '../../assets/img/icons/github.svg'
import LinkedIn from '../../assets/img/icons/linkedin.svg'

import SectionHeader from '../../components/SectionHeader'

type AboutSectionPropsType = {
  onPressNext: () => void,
  ref: any,
}

const AboutSection: React.FC<AboutSectionPropsType> = forwardRef<any, any>(({ onPressNext }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(function () {
      setIsVisible(true)
    }, 1000)
  }, [])

  return (
    <div className={'container'} id={'about-container'} ref={ref}>
      <SectionHeader textStyle={'light'} text={'About'} />
      <div className={'headshot-container'}>
        <img alt={'headshot'} className={'headshot'} src={Headshot} />
      </div>
      <div className={'icons-container'}>
        <a className={'icon-link'} href={'https://github.com/eaNewton/'}>
          <img alt={'github'} id={'github'} className={'icon'} src={Github} />
        </a>
        <a className={'icon-link'} href={'https://www.linkedin.com/in/emmettnewton'}>
          <img alt={'linkedin'} id={'linkedin'} className={'icon'} src={LinkedIn} />
        </a>
      </div>
      <div>
        <h4>general</h4>
        <ul className={'about-list'}>
          <li>based in austin, tx</li>
          <li>6th-year web + software developer </li>
          <li>fullstack development, strongest on FE</li>
          <li>experience in a handful of industries - fintech, event management, e-commerce, etc</li>
          <li>clean code, clean architecture, happy developer</li>
        </ul>
        <h4>web/mobile stacks</h4>
        <ul className={'about-list'}>
          <li>React/React Native</li>
          <li>Redux/Redux Slices (where necessary) otherwise Context API/custom hooks</li>
          <li>REST, GraphQL</li>
          <li>Node.js</li>
          <li>TypeScript, Flow Typing</li>
          <li>Docker, AWS</li>
          <li>...wordpress + PHP</li>
        </ul>
      </div>
      <div className={`next-container ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
        <motion.button
          className={'next-button'}
          onClick={onPressNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src={NextArrowWhite} alt={'next'} />
        </motion.button>
      </div>
    </div>
  )
})

export default AboutSection
