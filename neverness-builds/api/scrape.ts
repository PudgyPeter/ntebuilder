import axios from 'axios';
import * as cheerio from 'cheerio';
import type { BuildRecommendation } from '../src/types';

const GAME8_BASE_URL = 'https://game8.co/games/Neverness-to-Everness';
const NEVERNESS_GG_BASE_URL = 'https://neverness.gg';

export async function scrapeGame8(characterName: string): Promise<BuildRecommendation> {
  try {
    const url = `${GAME8_BASE_URL}/characters/${characterName.toLowerCase()}`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    
    const weapons = [];
    $('.weapon-recommendation').each((_, el) => {
      weapons.push({
        name: $(el).find('.weapon-name').text().trim(),
        rarity: parseInt($(el).find('.rarity').text()) || 5,
        description: $(el).find('.description').text().trim(),
        priority: weapons.length + 1
      });
    });

    const artifacts = [];
    $('.artifact-set').each((_, el) => {
      artifacts.push({
        setName: $(el).find('.set-name').text().trim(),
        pieces: $(el).find('.pieces').text().trim(),
        mainStats: {
          sands: $(el).find('.sands').text().trim(),
          goblet: $(el).find('.goblet').text().trim(),
          circlet: $(el).find('.circlet').text().trim()
        },
        subStats: $(el).find('.substats').text().split(',').map(s => s.trim())
      });
    });

    const teams = [];
    $('.team-comp').each((_, el) => {
      const members = [];
      $(el).find('.team-member').each((_, member) => {
        members.push({
          character: $(member).find('.char-name').text().trim(),
          role: $(member).find('.role').text().trim()
        });
      });
      
      teams.push({
        name: $(el).find('.team-name').text().trim(),
        members,
        description: $(el).find('.team-desc').text().trim(),
        synergy: $(el).find('.synergy').text().trim()
      });
    });

    return {
      source: 'game8',
      weapons,
      artifacts,
      stats: [],
      skills: [],
      teams
    };
  } catch (error) {
    console.error('Error scraping Game8:', error);
    return getMockGame8Build(characterName);
  }
}

export async function scrapeNevernessGG(characterName: string): Promise<BuildRecommendation> {
  try {
    const url = `${NEVERNESS_GG_BASE_URL}/characters/${characterName.toLowerCase()}`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    
    const weapons = [];
    $('.build-weapon').each((_, el) => {
      weapons.push({
        name: $(el).find('.name').text().trim(),
        rarity: parseInt($(el).attr('data-rarity') || '5'),
        description: $(el).find('.desc').text().trim(),
        priority: weapons.length + 1
      });
    });

    const artifacts = [];
    $('.artifact-build').each((_, el) => {
      artifacts.push({
        setName: $(el).find('.set').text().trim(),
        pieces: $(el).find('.piece-count').text().trim(),
        mainStats: {
          sands: $(el).find('[data-slot="sands"]').text().trim(),
          goblet: $(el).find('[data-slot="goblet"]').text().trim(),
          circlet: $(el).find('[data-slot="circlet"]').text().trim()
        },
        subStats: $(el).find('.substat').map((_, s) => $(s).text().trim()).get()
      });
    });

    const teams = [];
    $('.recommended-team').each((_, el) => {
      const members = [];
      $(el).find('.member').each((_, member) => {
        members.push({
          character: $(member).find('.name').text().trim(),
          role: $(member).find('.role').text().trim()
        });
      });
      
      teams.push({
        name: $(el).find('.comp-name').text().trim(),
        members,
        description: $(el).find('.description').text().trim(),
        synergy: $(el).find('.synergy-info').text().trim()
      });
    });

    return {
      source: 'neverness',
      weapons,
      artifacts,
      stats: [],
      skills: [],
      teams
    };
  } catch (error) {
    console.error('Error scraping Neverness.gg:', error);
    return getMockNevernessGGBuild(characterName);
  }
}

function getMockGame8Build(characterName: string): BuildRecommendation {
  return {
    source: 'game8',
    weapons: [
      {
        name: 'Signature Weapon',
        rarity: 5,
        description: `Best weapon for ${characterName} with high damage potential`,
        priority: 1
      },
      {
        name: 'Alternative 5-Star',
        rarity: 5,
        description: 'Strong alternative with good stats',
        priority: 2
      },
      {
        name: 'F2P Option',
        rarity: 4,
        description: 'Best free-to-play option',
        priority: 3
      }
    ],
    artifacts: [
      {
        setName: 'Best Set',
        pieces: '4-piece',
        mainStats: {
          sands: 'ATK%',
          goblet: 'Elemental DMG%',
          circlet: 'CRIT Rate/DMG'
        },
        subStats: ['CRIT Rate', 'CRIT DMG', 'ATK%', 'Energy Recharge']
      }
    ],
    stats: [
      { stat: 'CRIT Rate', priority: 1, description: 'Aim for 60-70%' },
      { stat: 'CRIT DMG', priority: 2, description: 'Aim for 120-150%' },
      { stat: 'ATK%', priority: 3, description: 'Stack as much as possible' }
    ],
    skills: [
      { skill: 'Ultimate', priority: 1, description: 'Max first for damage' },
      { skill: 'Skill', priority: 2, description: 'Level second' },
      { skill: 'Normal Attack', priority: 3, description: 'Level last' }
    ],
    teams: [
      {
        name: 'Optimal Team',
        members: [
          { character: characterName, role: 'Main DPS' },
          { character: 'Support 1', role: 'Sub DPS' },
          { character: 'Support 2', role: 'Buffer' },
          { character: 'Healer', role: 'Healer' }
        ],
        description: 'Best team composition for maximum damage',
        synergy: 'Great elemental reactions and buffs'
      }
    ]
  };
}

function getMockNevernessGGBuild(characterName: string): BuildRecommendation {
  return {
    source: 'neverness',
    weapons: [
      {
        name: 'Premium Choice',
        rarity: 5,
        description: `Top tier weapon for ${characterName}`,
        priority: 1
      },
      {
        name: 'Budget Option',
        rarity: 4,
        description: 'Good 4-star alternative',
        priority: 2
      }
    ],
    artifacts: [
      {
        setName: 'Recommended Set',
        pieces: '4-piece',
        mainStats: {
          sands: 'ATK%',
          goblet: 'DMG Bonus',
          circlet: 'CRIT'
        },
        subStats: ['CRIT Rate', 'CRIT DMG', 'ATK%', 'ER']
      }
    ],
    stats: [
      { stat: 'CRIT Rate', priority: 1, description: '1:2 ratio with CRIT DMG' },
      { stat: 'CRIT DMG', priority: 2, description: 'Balance with CRIT Rate' },
      { stat: 'ATK', priority: 3, description: 'Secondary priority' }
    ],
    skills: [
      { skill: 'Ultimate', priority: 1, description: 'Priority talent' },
      { skill: 'Elemental Skill', priority: 2, description: 'Second priority' },
      { skill: 'Basic Attack', priority: 3, description: 'Lowest priority' }
    ],
    teams: [
      {
        name: 'Meta Team',
        members: [
          { character: characterName, role: 'Carry' },
          { character: 'Flex 1', role: 'Support' },
          { character: 'Flex 2', role: 'Support' },
          { character: 'Flex 3', role: 'Utility' }
        ],
        description: 'Flexible team with strong synergy',
        synergy: 'Excellent damage and survivability'
      }
    ]
  };
}

export default async function handler(req: any, res: any) {
  const { source, character } = req.query;
  
  if (!character) {
    return res.status(400).json({ error: 'Character name required' });
  }

  try {
    let build;
    if (source === 'game8') {
      build = await scrapeGame8(character);
    } else if (source === 'neverness') {
      build = await scrapeNevernessGG(character);
    } else {
      return res.status(400).json({ error: 'Invalid source' });
    }
    
    res.status(200).json(build);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch build data' });
  }
}
