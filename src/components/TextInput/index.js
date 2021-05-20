// @flow
import React from 'react'
import styled from 'styled-components'

const TextInputBase = ({ disabled, label = '' }): React$Element => {
  return (
    <div className={'input-container'}>
      <label>{label}</label>
      <input disabled={disabled} type={'text'} />
    </div>
  )
}

const TextInput = styled(TextInputBase)`
  .input-container {
    display: flex;
  }

  input {
    font-family: 'Papyrus';
  }
`

export default TextInput