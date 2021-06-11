// @flow
import React from 'react'
import { projects } from '../../constants/projects'
import Project from './Project'

const ProjectsSection = (): React$Element => {
  return (
    <div className={'container'}>
      <h1>projects</h1>
      <span className={'disclaimer'}>
        i do not own any of these projects.
        i was either the sole contributor, or a member of a team of contributors responsible for development
      </span>
      <div id={'projects-container'}>
        {projects.map((project, index) => {
          return <Project index={index + Math.random()} project={project} />
        })}
      </div>
    </div>
  )
}

export default ProjectsSection