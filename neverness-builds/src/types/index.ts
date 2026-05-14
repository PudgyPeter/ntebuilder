export interface Character {
  id: string;
  name: string;
  rarity: number;
  element: string;
  role: string;
  imageUrl: string;
}

export interface BuildRecommendation {
  source: 'game8' | 'neverness';
  weapons: WeaponBuild[];
  artifacts: ArtifactBuild[];
  stats: StatPriority[];
  skills: SkillPriority[];
  teams: TeamComposition[];
}

export interface WeaponBuild {
  name: string;
  rarity: number;
  description: string;
  priority: number;
}

export interface ArtifactBuild {
  setName: string;
  pieces: string;
  mainStats: {
    sands?: string;
    goblet?: string;
    circlet?: string;
  };
  subStats: string[];
}

export interface StatPriority {
  stat: string;
  priority: number;
  description: string;
}

export interface SkillPriority {
  skill: string;
  priority: number;
  description: string;
}

export interface TeamComposition {
  name: string;
  members: {
    character: string;
    role: string;
  }[];
  description: string;
  synergy: string;
}

export interface CharacterBuild {
  character: Character;
  game8Build?: BuildRecommendation;
  nevernessGGBuild?: BuildRecommendation;
  lastUpdated: string;
}
