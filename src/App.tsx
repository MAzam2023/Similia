import React, { useState } from 'react';
import { remedies } from './data/remedies';
import PersonaVisualizer from './components/PersonaVisualizer';
import { Info, Pill } from 'lucide-react';

export default function App() {
  const [selectedRemedyId, setSelectedRemedyId] = useState<string>(remedies[0].id);
  const [activeCategories, setActiveCategories] = useState({
    mental: true,
    emotional: true,
    physical: true
  });

  const handleToggleCategory = (category: keyof typeof activeCategories) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const selectedRemedy = remedies.find(r => r.id === selectedRemedyId) || remedies[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row overflow-hidden tracking-wide selection:bg-indigo-100">
      
      {/* Sidebar relative layout */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50 shrink-0 z-20">
        <div className="p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Similia <span className="text-slate-400 font-light">3D Persona</span></h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-1 bg-white/50 no-scrollbar">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Select Remedy</div>
          {remedies.map((remedy) => (
            <button
              key={remedy.id}
              onClick={() => setSelectedRemedyId(remedy.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                selectedRemedy.id === remedy.id 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <div>{remedy.name}</div>
              <div className="text-xs mt-0.5 line-clamp-1 opacity-70">{remedy.commonName}</div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="p-6 border-t border-slate-200 bg-white">
          <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">Symptom Legend</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={activeCategories.mental} onChange={() => handleToggleCategory('mental')} className="accent-blue-500 w-3 h-3" />
              <span className="text-xs font-medium text-slate-600">Mental</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={activeCategories.emotional} onChange={() => handleToggleCategory('emotional')} className="accent-emerald-500 w-3 h-3" />
              <span className="text-xs font-medium text-slate-600">Emotional</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={activeCategories.physical} onChange={() => handleToggleCategory('physical')} className="accent-red-400 w-3 h-3" />
              <span className="text-xs font-medium text-slate-600">Physical</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col md:flex-row p-4 md:p-8 overflow-hidden h-screen bg-gradient-to-b from-white to-slate-50">
        {/* Header/Info for the selected remedy */}
        <div className="relative z-30 w-full md:w-80 shrink-0 pointer-events-none mt-4 md:mt-0 flex flex-col">
          <h2 className="text-2xl font-serif italic text-slate-900 mb-2 underline underline-offset-8 decoration-slate-300">The Profile</h2>
          <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-1">{selectedRemedy.name}</h3>
          <p className="text-base font-medium text-slate-600 mb-8">{selectedRemedy.commonName}</p>
          <div className="bg-white/95 backdrop-blur-md border-2 border-slate-200 p-5 rounded-xl pointer-events-auto shadow-md">
            <p className="text-base font-medium text-slate-800 leading-relaxed">
              {selectedRemedy.description}
            </p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex-1 h-full w-full min-w-0 flex items-center justify-center transform translate-y-16 -translate-x-4 md:translate-y-24 md:-translate-x-12 overflow-visible">
          <PersonaVisualizer remedy={selectedRemedy} activeCategories={activeCategories} />
        </div>
      </main>
      
    </div>
  );
}
