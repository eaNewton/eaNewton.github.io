import React from 'react'
import styled from 'styled-components'

import { colors } from '../../constants/theme'

type TextareaFieldPropsType = {
  label?: string,
  onTextChange: (event: any) => void,
  value?: string,
}

const TextareaField: React.FC<TextareaFieldPropsType> = ({ label, onTextChange, value }) => {
  return (
    <TextareaFieldContainer>
      {label ? (
        <TextareaFieldLabel>{label}</TextareaFieldLabel>
      ) : ''}
      <StyledTextarea onChange={onTextChange} value={value}></StyledTextarea>
    </TextareaFieldContainer>
  )
}

const TextareaFieldContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const TextareaFieldLabel = styled.label`
  flex: 0 0 100%;
  padding: 10px 0;
  color: ${colors.white}
`

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 10px 15px;
  background-color: ${colors.lightblue};
  border: 1px solid ${colors.white};
  border-radius: 3px;
  color: ${colors.white};
  font-family: 'PTSans';
  font-size: 18px;
  font-weight: 400;
  resize: none;
  transition: background 0.1s ease-in-out;

  &:active,
  &:focus {
    background: ${colors.white};
    color: ${colors.darkblue};
    outline: none;
    transition: background 0.1s ease-in-out;
  }
`

export default TextareaField
