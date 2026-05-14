import { useState, useMemo } from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { characters } from '../data/characters';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const elements = useMemo(() => {
    const uniqueElements = new Set(characters.map(c => c.element));
    return ['all', ...Array.from(uniqueElements)];
  }, []);

  const roles = useMemo(() => {
    const uniqueRoles = new Set(characters.map(c => c.role));
    return ['all', ...Array.from(uniqueRoles)];
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesElement = selectedElement === 'all' || character.element === selectedElement;
      const matchesRole = selectedRole === 'all' || character.role === selectedRole;
      return matchesSearch && matchesElement && matchesRole;
    });
  }, [searchQuery, selectedElement, selectedRole]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Neverness to Everness
          </h1>
          <p className="text-xl text-slate-300">Character Build Guide</p>
          <p className="text-sm text-slate-400 mt-2">
            Aggregated builds from Game8 and Neverness.gg
          </p>
        </header>

        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-300 mb-2">Element</label>
              <select
                value={selectedElement}
                onChange={(e) => setSelectedElement(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                {elements.map(element => (
                  <option key={element} value={element}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 text-slate-400">
          Showing {filteredCharacters.length} of {characters.length} characters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No characters found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
