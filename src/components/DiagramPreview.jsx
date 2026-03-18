import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { generateMermaidCode } from '../utils/diagramGenerator';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#0f172a',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#2dd4bf',
    lineColor: '#2dd4bf',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    fontFamily: 'Quicksand, sans-serif',
  },
});

export default function DiagramPreview({ nodes, connections }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const mermaidCode = generateMermaidCode(nodes, connections);

  useEffect(() => {
    if (!containerRef.current) return;

    const render = async () => {
      try {
        setError(null);
        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, mermaidCode);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        setError(err.message);
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      }
    };

    render();
  }, [mermaidCode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="sea-card">
        <h3 className="section-title">Diagram Preview</h3>
        <div className="mermaid-container" style={{ minHeight: 200 }}>
          {nodes.length === 0 ? (
            <p className="empty-state">Add nodes on the left to build your diagram.</p>
          ) : error ? (
            <p style={{ color: 'hsl(350 95% 72%)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
              Render error: {error}
            </p>
          ) : (
            <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center' }} />
          )}
        </div>
      </div>

      <div className="sea-card">
        <h3 className="section-title">Mermaid Code</h3>
        <pre className="code-block">
          <code>{mermaidCode}</code>
        </pre>
      </div>
    </div>
  );
}
