import { Link } from 'react-router-dom';
import type { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const rarityStars = '★'.repeat(character.rarity);
  
  return (
    <Link to={`/character/${character.id}`} className="block">
      <div className="card group cursor-pointer">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300/6366f1/ffffff?text=' + character.name;
            }}
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-yellow-400 text-sm font-bold">
            {rarityStars}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-1">{character.name}</h3>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-purple-600/30 rounded text-purple-300">
            {character.element}
          </span>
          <span className="px-2 py-1 bg-blue-600/30 rounded text-blue-300">
            {character.role}
          </span>
        </div>
      </div>
    </Link>
  );
}
