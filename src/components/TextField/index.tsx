import React from 'react'
import styled from 'styled-components'

import { colors } from '../../constants/theme'

type TextFieldPropsType = {
  disabled?: boolean,
  label?: string,
  value: string,
  onTextChange: (text: string) => void,
  required?: boolean,
  type?: string,
}

const TextField: React.FC<TextFieldPropsType> = ({
  disabled = false,
  label = '',
  onTextChange,
  required = false,
  type = 'text',
  value = '',
}) => (
  <TextFieldContainer>
    {label ? (
      <TextFieldLabel>{label}</TextFieldLabel>
    ) : ''}
    <StyledInput
      className={`rooty-tooty-fresh-n-fruity`}
      disabled={disabled}
      onChange={e => onTextChange(e.currentTarget.value)}
      required={required}
      type={type}
      value={value}
    />
  </TextFieldContainer>
)

const TextFieldContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const TextFieldLabel = styled.label`
  flex: 0 0 100%;
  padding: 10px 0;
  color: ${colors.white}
`

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  background-color: ${colors.lightblue};
  border: 1px solid ${colors.white};
  border-radius: 3px;
  color: ${colors.white};
  font-family: 'PTSans';
  font-size: 18px;
  font-weight: 400;
  transition: background 0.1s ease-in-out;

  &:focus,
  &:active {
    background: ${colors.white};
    color: ${colors.darkblue};
    outline: none;
    transition: background 0.1s ease-in-out;
  }
`

export default TextField
