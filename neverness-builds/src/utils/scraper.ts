import type { BuildRecommendation, CharacterBuild } from '../types';
import { characters } from '../data/characters';

export async function fetchGame8Build(characterName: string): Promise<BuildRecommendation | null> {
  try {
    const response = await fetch(`/api/scrape/game8/${characterName.toLowerCase()}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching Game8 build:', error);
    return null;
  }
}

export async function fetchNevernessGGBuild(characterName: string): Promise<BuildRecommendation | null> {
  try {
    const response = await fetch(`/api/scrape/neverness/${characterName.toLowerCase()}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching Neverness.gg build:', error);
    return null;
  }
}

export async function fetchCharacterBuild(characterId: string): Promise<CharacterBuild | null> {
  const character = characters.find(c => c.id === characterId);
  if (!character) return null;

  const [game8Build, nevernessGGBuild] = await Promise.all([
    fetchGame8Build(character.name),
    fetchNevernessGGBuild(character.name)
  ]);

  return {
    character,
    game8Build: game8Build || undefined,
    nevernessGGBuild: nevernessGGBuild || undefined,
    lastUpdated: new Date().toISOString()
  };
}

export async function fetchAllCharacterBuilds(): Promise<CharacterBuild[]> {
  const builds = await Promise.all(
    characters.map(char => fetchCharacterBuild(char.id))
  );
  return builds.filter((build): build is CharacterBuild => build !== null);
}
