'use client'

// /app/components/SkillWizard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPaintBrush, faMusic } from '@fortawesome/free-solid-svg-icons';

const skillsData = [
  {
    tier: 1,
    skills: [
      { id: 'coding', name: 'Coding', icon: faCode },
      { id: 'design', name: 'Design', icon: faPaintBrush },
      { id: 'music', name: 'Music', icon: faMusic },
    ],
  },
  {
    tier: 2,
    skills: [
      { id: 'frontend', name: 'Frontend', parent: 'coding', icon: faCode },
      { id: 'backend', name: 'Backend', parent: 'coding', icon: faCode },
      { id: 'uiux', name: 'UI/UX', parent: 'design', icon: faPaintBrush },
    ],
  },
  // Add more tiers as needed
];

const SkillWizard = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentTier, setCurrentTier] = useState<number>(1);

  const handleSkillClick = (skillId: string) => {
    setSelectedSkills([...selectedSkills, skillId]);
    setCurrentTier(currentTier + 1);
  };

  const renderSkills = (tier: number) => {
    const currentSkills = skillsData.find((data) => data.tier === tier)?.skills || [];
    const relevantSkills = currentSkills.filter(skill => selectedSkills.length === 0 || selectedSkills.includes(skill.parent || ''));

    return relevantSkills.map((skill) => (
      <motion.button
        key={skill.id}
        onClick={() => handleSkillClick(skill.id)}
        className={`relative rounded-full p-4 m-2 text-white bg-violet-500 transition-colors ${selectedSkills.includes(skill.id) ? 'bg-violet-100' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={skill.icon} size="2x" />
        <span className="absolute bottom-0 left-0 right-0 text-xs">{skill.name}</span>
      </motion.button>
    ));
  };

  return (
    <div className="flex flex-col items-center">
      {selectedSkills.map((skillId, index) => (
        <div key={index} className="relative flex items-center">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -index * 30 }}
            className="z-10"
          >
            {renderSkills(index + 1)}
          </motion.div>
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-wrap justify-center"
      >
        {renderSkills(currentTier)}
      </motion.div>
    </div>
  );
};

export default SkillWizard;
