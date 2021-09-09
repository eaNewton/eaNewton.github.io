// @flow
import React, { forwardRef } from 'react'

import Project from './Project'

import Disclaimer from '../../components/Disclaimer'

import { ProjectsDisclaimer } from '../../constants/disclaimers'
import { projects } from '../../constants/projects'
import SectionHeader from '../../components/SectionHeader';

type ProjectsSectionPropsType = {
  onPressNext: () => void,
  ref: any,
}

const ProjectsSection: React.FC<ProjectsSectionPropsType> = forwardRef<any, any>(({ onPressNext }, ref) => {
  return (
    <div id={'projects-container'} className={'container'} ref={ref}>
      <SectionHeader text={'Projects'} />
      <Disclaimer text={ProjectsDisclaimer} />
      <div id={'projects-wrapper'}>
        {projects.map((project, index) => {
          return <Project index={index} key={project.id} project={project} />
        })}
      </div>
    </div>
  )
})

export default ProjectsSection
