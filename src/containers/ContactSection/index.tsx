import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

import ContactForm from '../../components/ContactForm'
import SectionHeader from '../../components/SectionHeader'

type ContactSectionPropsType = {}

const ContactSection: React.FC<ContactSectionPropsType> = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(function () {
      setIsVisible(true)
    }, 1000)
  }, [])

  const submitContactForm = (e: any) => {
    e.preventDefault()
    console.log('Submitting contact form!', e)
  }

  return (
    <div className={'container flex-container'} id={'contact-container'}>
      <div id={'contact-wrapper'}>
        <motion.div
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{
            delay: 1,
            x: { type: "spring", stiffness: 100 },
            default: { duration: .4 },
          }}
        >
          <SectionHeader style={'light'} text={'Get in Touch'} />
          <ContactForm isVisible={isVisible} onSubmit={(e: Event) => submitContactForm(e)} />
        </motion.div>
      </div>
    </div>
  )
}


export default ContactSection
