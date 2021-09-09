import React from 'react'

type SectionHeaderPropsType = {
  textStyle?: string,
  text: string,
}

const SectionHeader: React.FC<SectionHeaderPropsType> = ({ textStyle, text }) => {
  return (
    <div className={'section-header-container'}>
      <h2 className={`section-header-text ${textStyle && textStyle === 'light' ? 'text-light' : 'text-dark'}`}>
        {text}
      </h2>
    </div >
  )
}

export default SectionHeader
