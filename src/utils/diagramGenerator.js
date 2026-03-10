export const generateMermaidCode = (nodes, connections) => {
  if (nodes.length === 0) {
    return 'graph TD\n    A[🧜‍♀️ Start Here]';
  }

  let code = 'graph TD\n';

  // Add nodes
  nodes.forEach((node) => {
    const label = node.label || node.character;
    const escapedLabel = label.replace(/"/g, '\\"');
    code += `    ${node.id}["${node.emoji} ${escapedLabel}"]\n`;
    code += `    style ${node.id} fill:${node.fillColor},stroke:${node.strokeColor},stroke-width:2px,color:#000\n`;
  });

  // Add connections
  connections.forEach((conn) => {
    const label = conn.label ? `|${conn.label}|` : '';
    code += `    ${conn.from} -->${label} ${conn.to}\n`;
  });

  return code;
};

export const validateDiagram = (nodes, connections) => {
  if (nodes.length === 0) return false;
  if (connections.length > 0 && connections.length < nodes.length - 1) {
    console.warn('Warning: Some nodes are not connected');
  }
  return true;
};

export const exportDiagram = (code, format = 'svg') => {
  return {
    format,
    code,
    timestamp: new Date().toISOString()
  };
};