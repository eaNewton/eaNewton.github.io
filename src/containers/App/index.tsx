import React, { useRef } from 'react'

import HeroSection from '../HeroSection'
import AboutSection from '../AboutSection'
import ProjectsSection from '../ProjectsSection'
import ContactSection from '../ContactSection'

const App: any = () => {
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToAbout = () => {
    if (aboutRef.current === null) return
    aboutRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {}
  const scrollToContact = () => {}

  return (
    <div className={'App'}>
      <div className={'app-wrapper'}>
        <HeroSection onPressNext={scrollToAbout} />
        <AboutSection onPressNext={scrollToProjects} ref={aboutRef} />
        <ProjectsSection onPressNext={scrollToContact} ref={projectsRef} />
        <ContactSection ref={contactRef} />
      </div>
    </div>
  )
}

export default App
