// @flow
import React from 'react'

type ProjectType = {|
  description: string,
  stack: [],
|}

type ProjectPropsType = {|
  index: string | Number,
  project: ProjectType,  
|}

const Project = ({ index, project }: ProjectPropsType): React$Element => {
  const getDescription = () => {
    if (!project.description) return ''
    return (
      <p className={'project-description'}>
        {project.description}
      </p>
    )
  }

  const getStack = () => {
    if (!project.stack) return ''
    return (
      <div className={'project-stack-container'}>
        <span className={'project-stack-header'}>stack: </span>
        <ul>
          {project.stack.map((p, index) => {
            return <li key={index + Math.random()}>{p}</li>
          })}
        </ul>
      </div>
    )
  }

  const getHighlights = () => {
    if (!project.highlights || !project.highlights.length) return ''
    return (
      <div className={'project-highlights-container'}>
        <span className={'project-highlights-header'}>highlights: </span>
        {project.highlights.map((highlight) => {
          return <span className={'project-highlight'}>{highlight}</span>
        })}
      </div>
    )
  }

  return (
    <div className={'container project-wrapper'} key={index}>
      <a href={project.link} target={'_blank'} rel="noreferrer">
        <h3 className={'project-name'}>{project.name}</h3>
      </a>
      {getDescription()}
      {getStack()}
      {getHighlights()}
    </div>
  )
}

export default Project