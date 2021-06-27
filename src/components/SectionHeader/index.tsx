import React from 'react'

type SectionHeaderPropsType = {
  style?: string,
  text: string,
}

const SectionHeader: React.FC<SectionHeaderPropsType> = ({ style, text }) => {
  return (
    <div className={'section-header-container'}>
      <h2 className={`section-header-text ${style && style === 'light' ? 'text-light' : 'text-dark'}`}>
        {text}
      </h2>
    </div >
  )
}

export default SectionHeader
