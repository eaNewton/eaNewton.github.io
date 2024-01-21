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
          <li>based in los angeles, ca</li>
          <li>fullstack mobile + web developer</li>
          <li>experience in real estate, fintech, event management, e-commerce, etc</li>
        </ul>
        <h4>stack</h4>
        <ul className={'about-list'}>
          <li>React/React Native</li>
          <li>TypeScript</li>
          <li>Redux (for complex state), useReducer (for simpler state)</li>
          <li>React Navigation, expo-router</li>
          <li>GraphQL, REST</li>
          <li>Jest, React Testing Library</li>
          <li>Node.js or Python for backend</li>
          <li>circle-ci, eas for CI/CD</li>
          <li>Docker, AWS</li>
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
