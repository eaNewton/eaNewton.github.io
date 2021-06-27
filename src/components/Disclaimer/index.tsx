import React from 'react'

type DisclaimerPropsType = {
  text: string,
}

const Disclaimer: React.FC<DisclaimerPropsType> = ({ text }) => {
  return (
    <div className={'disclaimer-container'}>
      <span className={''}>
        {text}
      </span>
    </div>
  )
}

export default Disclaimer
