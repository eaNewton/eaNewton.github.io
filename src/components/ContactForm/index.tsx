import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { motion } from "framer-motion"
import * as Yup from 'yup'
import emailjs from 'emailjs-com'

import Error from '../../components/Error'
import TextField from '../../components/TextField'
import TextareaField from '../../components/TextareaField'

type ContactFormPropsType = {
  isVisible: boolean,
}

const ContactForm: React.FC<ContactFormPropsType> = ({ isVisible }) => {
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }, [error])

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  }

  const schema = Yup.object().shape({
    firstName: Yup.string().min(2).max(16).required().matches(/^[aA-zZ\s]+$/),
    lastName: Yup.string().min(2).max(24).required().matches(/^[aA-zZ\s]+$/),
    email: Yup.string().email().required(),
    message: Yup.string().min(12).max(300).required(),
  })

  const handleSubmit = async (e: any) => {
    try {
      await emailjs.send('service_zv0qwkg', 'template_8s1n45x', e, 'user_oBpWkfg8R85ntK9FOeqsZ')
        .then(() => {
          setIsSubmitted(true)
        }, (emailjsError) => {
          console.log(emailjsError)
        })
    } catch (errorMessage) {
      console.log(errorMessage)
      setError(`${errorMessage}`)
    }
  }

  return (
    <div className={'container'}>
      {error && error !== '' && <Error text={error} />}
      {isSubmitted ? (
        <div className={'thanks-container'}>
          <h3>Thanks for submitting!</h3>
        </div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
          {({ isValid, setFieldValue, submitForm, values }) => (
            <div className={`form-wrapper ${error !== '' ? 'has-error' : 'no-error'}`}>
              <TextField
                label={'First Name *'}
                onTextChange={(text) => setFieldValue('firstName', text)}
                required
                value={values.firstName}
              />
              <TextField
                label={'Last Name *'}
                onTextChange={(text) => setFieldValue('lastName', text)}
                required
                value={values.lastName}
              />
              <TextField
                label={'Email *'}
                onTextChange={(text) => setFieldValue('email', text)}
                required
                type={'email'}
                value={values.email}
              />
              <TextareaField
                label={'Message *'}
                onTextChange={(e) => setFieldValue('message', e.target.value)}
                value={values.message}
              />
              <div className={`align-center ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
                <motion.button
                  className={'btn-primary'}
                  disabled={!isValid}
                  onClick={submitForm}
                  whileHover={{ scale: 1.1, boxShadow: '2px 2px 5px black' }}
                  whileTap={{ scale: 0.9 }}
                >
                  Submit
                </motion.button>
              </div>
            </div>
          )}
        </Formik>
      )}
    </div>
  )
}

export default ContactForm
