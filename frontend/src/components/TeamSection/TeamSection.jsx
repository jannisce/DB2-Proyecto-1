import React from 'react'
import TeamMember from '../TeamMember/TeamMember'
import { TEAM_INFO, TEAM_MEMBERS } from '../../data/constants'

const TeamSection = () => {
  
  return (
    <div className='p-8 bg-white rounded-lg shadow my-12'>
      <p className='text-3xl font-bold text-center text-gray-800'>
      {TEAM_INFO.name}
      </p>
      <p className='mb-12 text-xl font-normal text-center text-gray-500'>
        {TEAM_INFO.description}
      </p>
      <div className='flex flex-col items-center md:flex-row justify-evenly'>
        {TEAM_MEMBERS.map((member) => (
          <TeamMember
            key={member.name}
            name={member.name}
            role={member.role}
            imageSrc={member.imageSrc}
          />
        ))}
      </div>
    </div>
  )
}

export default TeamSection
