export const characterMap = {
  ariel: {
    name: '🧜‍♀️ Ariel',
    character: 'Ariel - The Mermaid Princess',
    symbol: '●',
    description: 'Start or End points in your diagram',
    mermaidShape: 'Circle/Ellipse',
    represents: 'Start/End nodes - marks the beginning or end of a process flow',
    color: 'bg-pink-300 text-pink-900',
    borderColor: 'border-pink-400'
  },
  triton: {
    name: '👑 King Triton',
    character: 'King Triton - The Sea King',
    symbol: '◆',
    description: 'Decisions and Process nodes',
    mermaidShape: 'Diamond/Rectangle',
    represents: 'Decision points or major processes - branches where choices are made',
    color: 'bg-purple-300 text-purple-900',
    borderColor: 'border-purple-400'
  },
  sebastian: {
    name: '🦀 Sebastian',
    character: 'Sebastian - The Crab Advisor',
    symbol: '◇',
    description: 'Data and Database nodes',
    mermaidShape: 'Cylinder/Database',
    represents: 'Data storage or database operations - where information is kept',
    color: 'bg-red-300 text-red-900',
    borderColor: 'border-red-400'
  },
  flounder: {
    name: '🐠 Flounder',
    character: 'Flounder - The Fish Friend',
    symbol: '▭',
    description: 'Action and Process nodes',
    mermaidShape: 'Rounded Rectangle',
    represents: 'Actions or processes - regular steps that happen sequentially',
    color: 'bg-yellow-300 text-yellow-900',
    borderColor: 'border-yellow-400'
  },
  ursula: {
    name: '🧙 Ursula',
    character: 'Ursula - The Sea Witch',
    symbol: '⬢',
    description: 'Alternative Paths or Branch nodes',
    mermaidShape: 'Hexagon/Parallelogram',
    represents: 'Alternative paths or special conditions - different routes through the diagram',
    color: 'bg-indigo-300 text-indigo-900',
    borderColor: 'border-indigo-400'
  },
  eric: {
    name: '🤴 Prince Eric',
    character: 'Prince Eric - The Land Prince',
    symbol: '◭',
    description: 'Input and Output nodes',
    mermaidShape: 'Trapezoid',
    represents: 'Inputs or outputs - where data enters or leaves the system',
    color: 'bg-blue-300 text-blue-900',
    borderColor: 'border-blue-400'
  },
  castle: {
    name: '🏰 Castle',
    character: 'Castle - External Systems',
    symbol: '☁',
    description: 'External Systems or Services',
    mermaidShape: 'Cloud',
    represents: 'External systems - services outside your main process',
    color: 'bg-cyan-300 text-cyan-900',
    borderColor: 'border-cyan-400'
  }
};

export const getCharacterByKey = (key) => characterMap[key] || null;

export const getAllCharacters = () => Object.entries(characterMap).map(([key, value]) => ({
  key,
  ...value
}));