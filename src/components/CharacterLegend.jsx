import React from 'react';
import { getAllCharacters } from '../utils/characterMap';

export default function CharacterLegend() {
  const characters = getAllCharacters();

  return (
    <div className="sea-card" style={{ maxWidth: 900, margin: '0 auto 1.5rem' }}>
      <h3>🧜‍♀️ Little Mermaid Character Legend</h3>
      <p className="empty-state" style={{ fontStyle: 'normal', marginBottom: '1rem' }}>
        Learn what each character represents in your diagram!
      </p>

      <div className="legend-grid">
        {characters.map((char) => (
          <div key={char.key} className="legend-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="legend-emoji">{char.name.split(' ')[0]}</span>
              <div>
                <span className="legend-name" style={{ fontWeight: 700 }}>{char.name}</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'hsl(var(--muted-foreground))' }}>{char.character}</span>
              </div>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.06)', 
              borderRadius: '8px', 
              padding: '0.5rem', 
              fontSize: '0.78rem', 
              color: 'hsl(var(--foreground))',
              width: '100%',
              marginTop: '0.25rem'
            }}>
              <p style={{ marginBottom: '0.25rem' }}><strong style={{ color: 'hsl(var(--primary))' }}>📊 Shape:</strong> {char.mermaidShape}</p>
              <p><strong style={{ color: 'hsl(var(--primary))' }}>📍 Represents:</strong> {char.represents}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.25rem',
        background: 'rgba(45,212,191,0.08)',
        borderRadius: '10px',
        padding: '1rem',
        borderLeft: '3px solid hsl(var(--primary))'
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>💡 How to Use:</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: 'hsl(var(--foreground))' }}>
          <li>1️⃣ <strong>Create Nodes:</strong> Use each character to represent different parts of your process</li>
          <li>2️⃣ <strong>Connect Nodes:</strong> Draw arrows between characters to show flow</li>
          <li>3️⃣ <strong>Add Labels:</strong> Name your connections to explain relationships</li>
          <li>4️⃣ <strong>Preview:</strong> See your diagram come to life in real-time!</li>
        </ul>
      </div>
    </div>
  );
}
