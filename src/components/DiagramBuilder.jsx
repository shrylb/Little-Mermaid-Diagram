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
    setNodes([...nodes, newNode]);
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

    setConnections([...connections, newConnection]);
    setFromNode(null);
    setConnectionLabel('');
  };

  const handleRemoveNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
  };

  const handleClear = () => {
    if (confirm('Clear all nodes and connections?')) {
      setNodes([]);
      setConnections([]);
      setFromNode(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-500 via-purple-500 to-coral-500 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-2">
            🧜‍♀️ Mermaid Diagram Builder
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            Create beautiful diagrams using Little Mermaid characters!
          </p>
        </div>

        {/* Toggle Legend */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="btn-secondary"
          >
            {showLegend ? '🙈 Hide' : '👀 Show'} Legend
          </button>
        </div>

        {/* Legend Section */}
        {showLegend && <CharacterLegend />}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Panel - Node Creator */}
          <div className="lg:col-span-1 space-y-4">
            <NodeCreator onNodeCreate={handleNodeCreate} />

            {/* Current Nodes */}
            <div className="card-ocean">
              <h3 className="text-lg font-bold text-ocean-900 mb-3">📍 Current Nodes ({nodes.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {nodes.length === 0 ? (
                  <p className="text-ocean-700 italic">No nodes yet. Create one above!</p>
                ) : (
                  nodes.map((node) => (
                    <div
                      key={node.id}
                      className="bg-white rounded p-2 flex items-center justify-between hover:bg-ocean-50 transition"
                    >
                      <div>
                        <span className="text-2xl">{node.emoji}</span>
                        <span className="ml-2 font-semibold text-ocean-900">{node.label}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveNode(node.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Connection Label */}
            {fromNode && (
              <div className="card-ocean">
                <h3 className="text-sm font-bold text-ocean-900 mb-2">🔗 Connecting Node</h3>
                <input
                  type="text"
                  value={connectionLabel}
                  onChange={(e) => setConnectionLabel(e.target.value)}
                  placeholder="Connection label (optional)"
                  className="w-full p-2 border-2 border-ocean-400 rounded-lg mb-2"
                />
                <button
                  onClick={() => setFromNode(null)}
                  className="btn-secondary w-full text-sm"
                >
                  Cancel Connection
                </button>
              </div>
            )}

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="btn-primary w-full"
            >
              🗑️ Clear All
            </button>
          </div>

          {/* Right Panel - Diagram Preview */}
          <div className="lg:col-span-2">
            <DiagramPreview nodes={nodes} connections={connections} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white">
          <p className="text-sm drop-shadow-md">
            Made with ❤️ for diagrams • Powered by Mermaid & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}