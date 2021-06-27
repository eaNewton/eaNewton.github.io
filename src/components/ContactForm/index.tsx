import React, { useState } from 'react'
import styled from 'styled-components';
import { motion } from "framer-motion"

import Button from '../../components/Button'
import TextField from '../../components/TextField'
import TextareaField from '../../components/TextareaField'
import FakeCAPTCHA from '../../components/FakeCAPTCHA'

type ContactFormPropsType = {
  errors?: any,
  isVisible: boolean,
  onSubmit: (e: any) => void,
}

const ContactForm: React.FC<ContactFormPropsType> = ({ errors, isVisible, onSubmit }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [captcha, setCaptcha] = useState('')

  return (
    <div className={'container'}>
      <StyledForm onSubmit={onSubmit}>
        <TextField
          label={'First Name *'}
          onTextChange={setFirstName}
          required
          value={firstName}
        />
        <TextField
          label={'Last Name *'}
          onTextChange={setLastName}
          required
          value={lastName}
        />
        <TextField
          label={'Email *'}
          onTextChange={setEmail}
          required
          type={'email'}
          value={email}
        />
        <TextareaField
          label={'Message *'}
          onTextChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        {/* <FakeCAPTCHA onChange={setCaptcha} value={captcha} /> */}
        <div className={`align-center ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
          <motion.button
            className={'btn-primary'}
            disabled={errors && errors.length}
            onClick={onSubmit}
            whileHover={{ scale: 1.1, boxShadow: '2px 2px 5px black' }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </motion.button>
        </div>
      </StyledForm>
    </div>
  )
}

const StyledForm = styled.form``

export default ContactForm
