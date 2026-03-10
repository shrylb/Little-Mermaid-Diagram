import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { generateMermaidCode } from '../utils/diagramGenerator';

export default function DiagramPreview({ nodes, connections }) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
    mermaid.contentLoaded();
  }, [nodes, connections]);

  const mermaidCode = generateMermaidCode(nodes, connections);

  return (
    <div className="w-full">
      <div className="card">
        <h3 className="text-2xl font-bold text-ocean-700 mb-4">📊 Your Mermaid Diagram</h3>
        
        <div className="mermaid-container overflow-auto max-h-96 flex items-center justify-center">
          <div className="mermaid">
            {mermaidCode}
          </div>
        </div>

        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h4 className="font-bold text-gray-800 mb-2">📝 Mermaid Code:</h4>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{mermaidCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}