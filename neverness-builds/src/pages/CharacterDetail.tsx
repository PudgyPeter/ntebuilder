import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { CharacterBuild } from '../types';
import { fetchCharacterBuild } from '../utils/scraper';

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [build, setBuild] = useState<CharacterBuild | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetchCharacterBuild(id)
      .then(data => {
        setBuild(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading character build...</p>
        </div>
      </div>
    );
  }

  if (!build) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-300 text-xl mb-4">Character not found</p>
          <Link to="/" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { character, game8Build, nevernessGGBuild } = build;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Characters
        </Link>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-48 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex-shrink-0">
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300/6366f1/ffffff?text=' + character.name;
                }}
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{character.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-yellow-400 text-xl">{'★'.repeat(character.rarity)}</span>
                <span className="px-3 py-1 bg-purple-600/30 rounded text-purple-300">
                  {character.element}
                </span>
                <span className="px-3 py-1 bg-blue-600/30 rounded text-blue-300">
                  {character.role}
                </span>
              </div>
              <p className="text-slate-300">
                View recommended builds from multiple sources to optimize your gameplay.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BuildSection
            title="Game8 Build"
            source="game8"
            build={game8Build}
            url={`https://game8.co/games/Neverness-to-Everness/characters/${character.name.toLowerCase()}`}
          />
          
          <BuildSection
            title="Neverness.gg Build"
            source="neverness"
            build={nevernessGGBuild}
            url={`https://neverness.gg/characters/${character.name.toLowerCase()}`}
          />
        </div>
      </div>
    </div>
  );
}

interface BuildSectionProps {
  title: string;
  source: string;
  build: any;
  url: string;
}

function BuildSection({ title, source, build, url }: BuildSectionProps) {
  if (!build) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-slate-400">Build data not available</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mt-4"
        >
          Visit {source} <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
        >
          View Source <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {build.weapons && build.weapons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Recommended Weapons</h3>
          <div className="space-y-3">
            {build.weapons.map((weapon: any, idx: number) => (
              <div key={idx} className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{weapon.name}</span>
                  <span className="text-yellow-400">{'★'.repeat(weapon.rarity)}</span>
                </div>
                <p className="text-sm text-slate-300">{weapon.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {build.artifacts && build.artifacts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Artifact Sets</h3>
          <div className="space-y-3">
            {build.artifacts.map((artifact: any, idx: number) => (
              <div key={idx} className="bg-slate-700/30 rounded-lg p-3">
                <div className="font-semibold text-white mb-2">
                  {artifact.setName} ({artifact.pieces})
                </div>
                {artifact.mainStats && (
                  <div className="text-sm text-slate-300 mb-2">
                    <div><strong>Main Stats:</strong></div>
                    {artifact.mainStats.sands && <div>• Sands: {artifact.mainStats.sands}</div>}
                    {artifact.mainStats.goblet && <div>• Goblet: {artifact.mainStats.goblet}</div>}
                    {artifact.mainStats.circlet && <div>• Circlet: {artifact.mainStats.circlet}</div>}
                  </div>
                )}
                {artifact.subStats && artifact.subStats.length > 0 && (
                  <div className="text-sm text-slate-300">
                    <strong>Sub Stats:</strong> {artifact.subStats.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {build.teams && build.teams.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Team Compositions</h3>
          <div className="space-y-3">
            {build.teams.map((team: any, idx: number) => (
              <div key={idx} className="bg-slate-700/30 rounded-lg p-3">
                <div className="font-semibold text-white mb-2">{team.name}</div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {team.members.map((member: any, mIdx: number) => (
                    <div key={mIdx} className="text-sm text-slate-300">
                      <span className="text-purple-400">{member.character}</span> - {member.role}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-300 mb-1">{team.description}</p>
                <p className="text-xs text-slate-400">{team.synergy}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
