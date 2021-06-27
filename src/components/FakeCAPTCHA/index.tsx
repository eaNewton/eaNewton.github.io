import React, { useState } from 'react'
import styled from 'styled-components'

import TextField from '../TextField';
import { colors } from '../../constants/theme';
import Button from '../Button';

type FakeCAPTCHAPropsType = {
  onChange: () => void,
  value: string,
}

const FakeCAPTCHA: React.FC<FakeCAPTCHAPropsType> = ({ onChange, value }) => {
  const [firstNum, setFirstNum] = useState(Math.floor(Math.random() * 30))
  const [secondNum, setSecondNum] = useState(Math.floor(Math.random() * 30))

  const getNewQuestion = (e: Event) => {
    e.preventDefault()
    setFirstNum(Math.floor(Math.random() * 30))
    setSecondNum(Math.floor(Math.random() * 30))
  }

  return (
    <CAPTCHAContainer>
      <CAPTCHAQuestion>What's {firstNum} + {secondNum}?</CAPTCHAQuestion>
      <StyledTextField onTextChange={onChange} type={'number'} value={value} />
      <RefreshCAPTCHAButton onClick={(e: Event) => getNewQuestion(e)} text={'Newe'} />
    </CAPTCHAContainer>
)}

const CAPTCHAContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CAPTCHAQuestion = styled.span`
  margin: 0;
  color: ${colors.white}
`

const StyledTextField = styled(TextField)`
  max-width: 50px;
`

const RefreshCAPTCHAButton = styled(Button)``

export default FakeCAPTCHA
