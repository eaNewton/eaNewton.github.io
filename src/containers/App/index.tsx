import React, { useRef } from 'react'

import HeroSection from '../HeroSection'
import AboutSection from '../AboutSection'
import ProjectsSection from '../ProjectsSection'
import ContactSection from '../ContactSection'

const App: any = () => {
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: any) => {
    if (ref.current === null) return
    return ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={'App'}>
      <div className={'app-wrapper'}>
        <HeroSection onPressNext={() => scrollTo(aboutRef)} />
        <AboutSection onPressNext={() => scrollTo(projectsRef)} ref={aboutRef} />
        <ProjectsSection onPressNext={() => scrollTo(contactRef)} ref={projectsRef} />
        <ContactSection ref={contactRef} />
      </div>
    </div>
  )
}

export default App
