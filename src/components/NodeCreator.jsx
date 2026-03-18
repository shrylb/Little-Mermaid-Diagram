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
      emoji: character.name.split(' ')[0],
      character: character.character,
      fillColor: character.color.replace('bg-', '').replace('-300', ''),
      strokeColor: character.borderColor.replace('border-', '').replace('-400', ''),
      type: selectedCharacter
    };

    onNodeCreate(newNode);
    setNodeLabel('');
    setSelectedCharacter('');
  };

  const selectedChar = characters.find(c => c.key === selectedCharacter);

  return (
    <div className="sea-card">
      <h3>✨ Create New Node</h3>

      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))', marginBottom: '0.35rem', display: 'block', letterSpacing: '0.05em' }}>
        Choose Character:
      </label>
      <select
        className="sea-select"
        value={selectedCharacter}
        onChange={(e) => setSelectedCharacter(e.target.value)}
      >
        <option value="">Select a character...</option>
        {characters.map((c) => (
          <option key={c.key} value={c.key}>
            {c.name} - {c.represents}
          </option>
        ))}
      </select>

      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))', marginBottom: '0.35rem', display: 'block', letterSpacing: '0.05em' }}>
        Node Label:
      </label>
      <input
        type="text"
        className="sea-input"
        value={nodeLabel}
        onChange={(e) => setNodeLabel(e.target.value)}
        placeholder="Enter node description..."
        onKeyDown={(e) => e.key === 'Enter' && handleCreateNode()}
      />

      <button className="btn-create" onClick={handleCreateNode}>
        ✨ Create Node
      </button>

      {selectedCharacter && nodeLabel && selectedChar && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.65rem',
          background: 'rgba(45,212,191,0.08)',
          borderRadius: '10px',
          border: '1px solid rgba(45,212,191,0.15)',
          fontSize: '0.85rem',
          color: 'hsl(var(--foreground))'
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))', marginBottom: '0.3rem' }}>Preview:</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{selectedChar.name.split(' ')[0]}</span>
            <span style={{ fontWeight: 600 }}>{nodeLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
}
