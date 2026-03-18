import React, { useState } from 'react';
import NodeCreator from './NodeCreator';
import DiagramPreview from './DiagramPreview';
import CharacterLegend from './CharacterLegend';

export default function DiagramBuilder() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [fromNode, setFromNode] = useState(null);
  const [connectionLabel, setConnectionLabel] = useState('');
  const [showLegend, setShowLegend] = useState(true);

  const handleNodeCreate = (newNode) => {
    setNodes((prev) => [...prev, newNode]);
  };

  const handleConnect = (toNodeId) => {
    if (!fromNode) {
      setFromNode(toNodeId);
      return;
    }
    if (fromNode === toNodeId) {
      alert('Cannot connect a node to itself!');
      return;
    }
    const newConnection = {
      from: fromNode,
      to: toNodeId,
      label: connectionLabel,
      id: `conn_${Date.now()}`
    };
    setConnections((prev) => [...prev, newConnection]);
    setFromNode(null);
    setConnectionLabel('');
  };

  const handleRemoveNode = (nodeId) => {
    setNodes((prev) => prev.filter(n => n.id !== nodeId));
    setConnections((prev) => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
  };

  const handleClear = () => {
    if (confirm('Clear all nodes and connections?')) {
      setNodes([]);
      setConnections([]);
      setFromNode(null);
    }
  };

  return (
    <div className="diagram-root">
      {/* Ambient bubbles */}
      <div className="bubbles" aria-hidden="true">
        {[...Array(10)].map((_, i) => <div key={i} className="bubble" />)}
      </div>

      {/* Seaweed SVG left */}
      <svg className="seaweed-left" viewBox="0 0 80 300" fill="none" aria-hidden="true">
        <path d="M40 300 Q20 260 40 220 Q60 180 40 140 Q20 100 40 60 Q55 30 45 0" stroke="rgba(45,212,191,0.25)" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M25 280 Q5 240 25 200 Q45 165 28 130" stroke="rgba(45,212,191,0.15)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>
      <svg className="seaweed-right" viewBox="0 0 80 300" fill="none" aria-hidden="true">
        <path d="M40 300 Q20 260 40 220 Q60 180 40 140 Q20 100 40 60 Q55 30 45 0" stroke="rgba(45,212,191,0.25)" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <path d="M25 280 Q5 240 25 200 Q45 165 28 130" stroke="rgba(45,212,191,0.15)" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>

      <div className="content-wrap">
        {/* Header */}
        <header className="site-header">
          <h1>🧜‍♀️ Mermaid Diagram Builder</h1>
          <div className="crown-divider">
            <span className="line" />
            <span style={{ fontSize: '1.1rem', color: 'hsl(52 97% 63%)' }}>✦</span>
            <span className="line right" />
          </div>
          <p>Create enchanted diagrams beneath the sea</p>
        </header>

        {/* Legend Toggle */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button className="btn-legend" onClick={() => setShowLegend(!showLegend)}>
            {showLegend ? 'Hide' : 'Show'} Character Legend
          </button>
        </div>

        {/* Legend */}
        {showLegend && <CharacterLegend />}

        {/* Main Grid */}
        <div className="main-grid" style={{ marginTop: '1.5rem' }}>
          {/* Left Panel */}
          <div className="left-panel">
            <NodeCreator onNodeCreate={handleNodeCreate} />

            {/* Current Nodes */}
            <div className="sea-card">
              <h3>
                Current Nodes
                <span className="count-pill">{nodes.length}</span>
              </h3>
              {nodes.length > 0 && (
                <p className="empty-state" style={{ marginBottom: '0.5rem', fontStyle: 'normal', opacity: 0.7 }}>
                  {fromNode ? 'Select another node to connect, or cancel below.' : 'Click a node to start a connection.'}
                </p>
              )}
              <div className="node-list">
                {nodes.length === 0
                  ? <p className="empty-state">No nodes yet — create one above.</p>
                  : nodes.map(node => (
                      <div
                        key={node.id}
                        className={`node-item${fromNode === node.id ? ' node-item--active' : ''}`}
                        onClick={() => handleConnect(node.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.3rem' }}>{node.emoji}</span>
                          <span className="node-name">{node.label}</span>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={(e) => { e.stopPropagation(); handleRemoveNode(node.id); }}
                          title="Remove node"
                        >✕</button>
                      </div>
                    ))
                }
              </div>
            </div>

            {fromNode && (
              <div className="sea-card">
                <div className="connecting-badge">
                  <span className="pulse-dot" />
                  Connecting from "{nodes.find(n => n.id === fromNode)?.label}"
                </div>
                <input
                  type="text"
                  className="sea-input"
                  value={connectionLabel}
                  onChange={e => setConnectionLabel(e.target.value)}
                  placeholder="Connection label (optional)"
                />
                <button className="btn-secondary" onClick={() => setFromNode(null)}>
                  Cancel Connection
                </button>
              </div>
            )}

            {/* Clear All */}
            <button className="btn-primary" onClick={handleClear}>
              Clear All
            </button>
          </div>

          {/* Right Panel */}
          <div>
            <DiagramPreview nodes={nodes} connections={connections} />
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          ✦ &nbsp; Part of your world — powered by Mermaid &amp; Tailwind CSS &nbsp; ✦
        </footer>
      </div>
    </div>
  );
}
