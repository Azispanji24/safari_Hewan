import React from 'react';
import { ElephantSvg } from './ElephantSvg';
import { RabbitSvg } from './RabbitSvg';
import { DuckSvg } from './DuckSvg';
import { BirdSvg } from './BirdSvg';
import { SafariGateSvg } from './SafariGateSvg';
import { SafariFriendsSvg } from './SafariFriendsSvg';
import { JungleCanopySvg } from './JungleCanopySvg';
import { SavannahHillsSvg } from './SavannahHillsSvg';
import type { AnimalId } from '../../types';

export {
  ElephantSvg,
  RabbitSvg,
  DuckSvg,
  BirdSvg,
  SafariGateSvg,
  SafariFriendsSvg,
  JungleCanopySvg,
  SavannahHillsSvg,
};

interface AnimalIllustrationProps {
  animalId: AnimalId;
  className?: string;
  size?: number | string;
  highlightPart?: 'trunk' | 'ears' | 'legs' | 'feet' | 'wings' | 'beak' | 'all' | null;
}

export const AnimalIllustration: React.FC<AnimalIllustrationProps> = ({
  animalId,
  className = '',
  size = '100%',
  highlightPart = null,
}) => {
  switch (animalId) {
    case 'gajah':
      return <ElephantSvg className={className} size={size} highlightPart={highlightPart as 'trunk' | 'ears' | 'all' | null} />;
    case 'kelinci':
      return <RabbitSvg className={className} size={size} highlightPart={highlightPart as 'ears' | 'legs' | 'feet' | 'all' | null} />;
    case 'bebek':
      return <DuckSvg className={className} size={size} highlightPart={highlightPart as 'beak' | 'feet' | 'wings' | 'all' | null} />;
    case 'burung':
      return <BirdSvg className={className} size={size} highlightPart={highlightPart as 'wings' | 'beak' | 'all' | null} />;
    default:
      return null;
  }
};
