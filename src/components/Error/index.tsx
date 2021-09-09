import React from 'react'

interface ErrorProps {
  text: string
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className={'error-container'}>
      <div className={'error-wrapper'}>
        <span className={'error-text'}>Encountered an error: <span className={'error-message'}>{text}</span></span>
      </div>
    </div>
  )
}

export default Error