import React from 'react';
import { getAllCharacters } from '../utils/characterMap';

export default function CharacterLegend() {
  const characters = getAllCharacters();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-2 text-ocean-700">
          🧜‍♀️ Little Mermaid Character Legend
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Learn what each character represents in your diagram!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char) => (
            <div
              key={char.key}
              className={`${char.color} ${char.borderColor} border-4 rounded-lg p-4 transform hover:scale-105 transition-transform shadow-md`}
            >
              <div className="flex items-start gap-3">
                <span className="text-4xl">{char.name.split(' ')[0]}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{char.name}</h3>
                  <p className="text-sm font-semibold mb-2">{char.character}</p>
                  <div className="bg-white bg-opacity-60 rounded p-2 text-sm">
                    <p className="font-bold text-ocean-700 mb-1">📊 Mermaid Shape:</p>
                    <p className="text-gray-700 mb-2">{char.mermaidShape}</p>
                    <p className="font-bold text-ocean-700 mb-1">📍 Represents:</p>
                    <p className="text-gray-700">{char.represents}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-ocean-100 rounded-lg p-6 border-l-4 border-ocean-500">
          <h3 className="font-bold text-lg text-ocean-800 mb-3">💡 How to Use:</h3>
          <ul className="space-y-2 text-ocean-700">
            <li className="flex gap-2">
              <span>1️⃣</span>
              <span><strong>Create Nodes:</strong> Use each character to represent different parts of your process</span>
            </li>
            <li className="flex gap-2">
              <span>2️⃣</span>
              <span><strong>Connect Nodes:</strong> Draw arrows between characters to show flow</span>
            </li>
            <li className="flex gap-2">
              <span>3️⃣</span>
              <span><strong>Add Labels:</strong> Name your connections to explain relationships</span>
            </li>
            <li className="flex gap-2">
              <span>4️⃣</span>
              <span><strong>Preview:</strong> See your diagram come to life in real-time!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}