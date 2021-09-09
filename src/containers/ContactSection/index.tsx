import React, { forwardRef, useEffect, useState } from 'react'
import { motion } from "framer-motion"

import ContactForm from '../../components/ContactForm'
import SectionHeader from '../../components/SectionHeader'

type ContactSectionPropsType = {
  ref: any,
}

const ContactSection: React.FC<ContactSectionPropsType> = forwardRef<any, any>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(function () {
      setIsVisible(true)
    }, 1000)
  }, [])

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
          <SectionHeader textStyle={'light'} text={'Get in Touch'} />
            <ContactForm isVisible={isVisible} />
        </motion.div>
      </div>
    </div>
  )
})


export default ContactSection
