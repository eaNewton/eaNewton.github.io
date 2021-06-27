// @flow
import React from 'react'

export type ProjectType = {
  description?: string,
  highlights?: any,
  link?: string,
  name: string,
  stack?: any,
}

type ProjectPropsType = {
  index: string | number,
  project: ProjectType,  
}

const Project: React.FC<ProjectPropsType> = ({ index, project }) => {
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
          {project.stack.map((s: string, index: number) => {
            return <li key={index + Math.random()}>{s}</li>
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
        {project.highlights.map((highlight: string, index: number) => {
          return <span className={'project-highlight'} key={index}>{highlight}</span>
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
