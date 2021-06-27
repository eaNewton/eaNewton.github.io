import React from 'react'
import styled from 'styled-components'

import { colors } from '../../constants/theme'

type ButtonPropsType = {
  disabled?: boolean,
  onClick: (event: any) => void,
  text: string,
  variant?: string,
}

const Button: React.FC<ButtonPropsType> = ({
  disabled,
  onClick,
  text,
  variant
}) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </StyledButton>
)

const StyledButton = styled.button`
  padding: 15px 25px;
  border: none;
  border-radius: 3px;
  background-color: ${colors.darkblue};
  color: ${colors.white};
  font-family: 'PTSans';
  font-size: 24px;
  font-weight: 700;

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  &:hover {
    cursor: pointer;
  }
`

export default Button
