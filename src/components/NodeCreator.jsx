import React, { useState } from 'react';
import { getAllCharacters } from '../utils/characterMap';

export default function NodeCreator({ onNodeCreate }) {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [nodeLabel, setNodeLabel] = useState('');
  const characters = getAllCharacters();

  const handleCreateNode = () => {
    if (!selectedCharacter || !nodeLabel.trim()) {
      alert('Please select a character and enter a label!');
      return;
    }

    const character = characters.find(c => c.key === selectedCharacter);
    if (!character) return;

    const newNode = {
      id: `${selectedCharacter}_${Date.now()}`,
      label: nodeLabel.trim(),
      emoji: character.name.split(' ')[0], // Extract emoji from name
      character: character.character,
      fillColor: character.color.replace('bg-', '').replace('-300', ''),
      strokeColor: character.borderColor.replace('border-', '').replace('-400', ''),
      type: selectedCharacter
    };

    onNodeCreate(newNode);
    setNodeLabel('');
    setSelectedCharacter('');
  };

  return (
    <div className="card-ocean">
      <h3 className="text-lg font-bold text-ocean-900 mb-4">🆕 Create New Node</h3>

      <div className="space-y-4">
        {/* Character Selection */}
        <div>
          <label className="block text-sm font-medium text-ocean-800 mb-2">
            Choose Character:
          </label>
          <select
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            className="w-full p-2 border border-ocean-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
          >
            <option value="">Select a character...</option>
            {characters.map((char) => (
              <option key={char.key} value={char.key}>
                {char.name} - {char.represents}
              </option>
            ))}
          </select>
        </div>

        {/* Node Label */}
        <div>
          <label className="block text-sm font-medium text-ocean-800 mb-2">
            Node Label:
          </label>
          <input
            type="text"
            value={nodeLabel}
            onChange={(e) => setNodeLabel(e.target.value)}
            placeholder="Enter node description..."
            className="w-full p-2 border border-ocean-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateNode()}
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreateNode}
          disabled={!selectedCharacter || !nodeLabel.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✨ Create Node
        </button>

        {/* Preview */}
        {selectedCharacter && nodeLabel && (
          <div className="mt-4 p-3 bg-ocean-50 rounded-md border border-ocean-200">
            <p className="text-sm font-medium text-ocean-800">Preview:</p>
            <div className="flex items-center mt-1">
              <span className="text-2xl mr-2">
                {characters.find(c => c.key === selectedCharacter)?.name.split(' ')[0]}
              </span>
              <span className="font-semibold text-ocean-900">{nodeLabel}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
