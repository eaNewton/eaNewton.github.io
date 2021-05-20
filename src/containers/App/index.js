// @flow
import React, { useRef } from 'react'

import HeroSection from '../HeroSection'
import AboutSection from '../AboutSection'
import ProjectsSection from '../ProjectsSection'

const App = (): $React$Element => {
  const aboutRef = useRef(null)

  const scrollToAbout = () => aboutRef.current.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={'App'}>
      <div className={'app-wrapper'}>
        <HeroSection onPressNext={scrollToAbout} />
        <AboutSection ref={aboutRef} />
        <ProjectsSection />
      </div>
    </div>
  )
}

export default App
