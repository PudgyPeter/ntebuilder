export type Element = 'Cosmos' | 'Incantation' | 'Psyche' | 'Anima' | 'Chaos' | 'Lakshana';
export type Role = 'DPS' | 'Buff' | 'Survival';
export type Rarity = 5 | 4;

export interface Character {
  id: string;
  name: string;
  rarity: Rarity;
  element: Element;
  role: Role;
  imageUrl: string;
}

export interface BuildRecommendation {
  source: 'game8' | 'neverness';
  arcs: ArcBuild[];
  cartridge: CartridgeBuild[];
  modules: ModuleBuild[];
  skills: SkillPriority[];
  teams: TeamComposition[];
}

export interface ArcBuild {
  name: string;
  rarity: number;
  description: string;
  priority: number;
}

export interface CartridgeBuild {
  name: string;
  description: string;
  priority: number;
}

export interface ModuleBuild {
  slot: string;
  mainStat: string;
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
