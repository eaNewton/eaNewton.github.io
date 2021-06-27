import React, { forwardRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NextArrowWhite from '../../assets/img/icons/next-white.svg'

import SectionHeader from '../../components/SectionHeader'

type AboutSectionPropsType = {
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
      <SectionHeader style={'light'} text={'About'} />
      <div>
        <ul>
          <li>based in austin, tx</li>
          <li>react + node.js for web</li>
          <li>react native + node.js for mobile</li>
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
