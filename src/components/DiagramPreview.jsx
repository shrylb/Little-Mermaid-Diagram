// DiagramPreview.jsx
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { generateMermaidCode } from '../utils/diagramGenerator';

mermaid.initialize({ startOnLoad: false, theme: 'default' });

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
    <div className="w-full">
      <div className="sea-card">
        <h3>Diagram Preview</h3>

        <div className="mermaid-container" style={{ minHeight: '200px' }}>
          {nodes.length === 0 ? (
            <p style={{ color: 'rgba(176,230,240,0.45)', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>
              Add nodes on the left to build your diagram.
            </p>
          ) : error ? (
            <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>Render error: {error}</p>
          ) : (
            <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center' }} />
          )}
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Mermaid Code</h3>
          <pre style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0,201,200,0.15)',
            borderRadius: '10px',
            padding: '1rem',
            overflowX: 'auto',
            fontSize: '0.8rem',
            color: '#b8f0f5',
            lineHeight: 1.6,
            fontFamily: "'Fira Code', 'Cascadia Code', monospace"
          }}>
            <code>{mermaidCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}