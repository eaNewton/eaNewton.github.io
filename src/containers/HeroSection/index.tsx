import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NextArrow from '../../assets/img/icons/next.svg'

type HeroSectionPropsType = {
  onPressNext: () => void,  
}

const HeroSection = ({ onPressNext }: HeroSectionPropsType) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(function () {
      setIsVisible(true)
    }, 1000)
  }, [])

  return (
    <div className={'container'} id={'hero-container'}>
      <div id={'hero-wrapper'}>
        <motion.div
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{
            delay: 1,
            x: { type: "spring", stiffness: 100 },
            default: { duration: .4 },
          }}
        >
          <h1 id={'hero-header'}>hey, i'm emmett. i'm a full-stack web and mobile developer</h1>
        </motion.div>
        <div className={`next-container ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
          <motion.button
            className={'next-button'}
            onClick={onPressNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={NextArrow} alt={'next'} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}


export default HeroSection
