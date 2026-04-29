import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Heart, Activity, X } from 'lucide-react';
import { Remedy, Symptom, SymptomCategory } from '../data/remedies';
import { cn } from '../lib/utils';

export default function PersonaVisualizer({ 
  remedy,
  activeCategories
}: { 
  remedy: Remedy;
  activeCategories: Record<SymptomCategory, boolean>;
}) {
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);

  const visibleSymptoms = remedy.symptoms.filter(s => activeCategories[s.category]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-transparent">
      
      <div 
        className="relative h-[75vh] max-h-[750px] z-10 flex items-center justify-center -ml-8 md:-ml-0"
        style={{ aspectRatio: '200 / 460' }}
      >
        {/* Instructional text box */}
        <div className="absolute right-[75%] md:right-[100%] top-1/2 -translate-y-1/2 z-20 pointer-events-none w-28 md:w-36 mr-2 md:mr-8 -mt-20 md:mt-0">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-300 p-2 md:p-3 rounded-xl shadow-md text-center">
            <p className="text-xs md:text-sm font-bold text-slate-800 leading-snug">
              Click on circles to see the symptoms
            </p>
          </div>
        </div>

        {/* Human Silhouette SVG Minimalist */}
        <div className="absolute inset-0 text-slate-300 opacity-60 pointer-events-none drop-shadow-sm">
            <svg viewBox="0 0 200 460" className="w-full h-full" fill="currentColor">
              <circle cx="100" cy="45" r="32" />
              <path d="M 100 80
                C 110 80, 115 82, 125 85
                C 150 90, 165 100, 170 120
                L 185 240
                C 188 260, 162 260, 155 240
                L 140 150
                C 140 180, 145 200, 135 240
                C 135 300, 145 380, 130 430
                C 128 445, 102 445, 105 430
                C 105 380, 100 300, 100 250
                C 100 300, 95 380, 95 430
                C 98 445, 72 445, 70 430
                C 55 380, 65 300, 65 240
                C 55 200, 60 180, 60 150
                L 45 240
                C 38 260, 12 260, 15 240
                L 30 120
                C 35 100, 50 90, 75 85
                C 85 82, 90 80, 100 80
                Z" />
            </svg>
        </div>

        {/* Symptoms Hotspots */}
        {visibleSymptoms.map((symptom) => (
          <div 
            key={symptom.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ top: symptom.top, left: symptom.left }}
          >
            <Hotspot 
              symptom={symptom}
              isActive={activeSymptom === symptom.id}
              onClick={() => setActiveSymptom(activeSymptom === symptom.id ? null : symptom.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hotspot({ symptom, isActive, onClick }: { symptom: Symptom, isActive: boolean, onClick: () => void }) {
  // Map categories to tailwind text colors for the active state icon
  const iconColor = symptom.category === 'mental' ? 'text-blue-600' :
                    symptom.category === 'emotional' ? 'text-emerald-600' : 'text-red-500';

  return (
    <div className="relative group">
      {/* Interaction Dot */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center rounded-full cursor-pointer z-30 transition-shadow border-2 border-white",
          symptom.category === 'physical' ? "w-4 h-4 opacity-70" : "w-6 h-6",
          symptom.color,
          symptom.shadow
        )}
      >
      </motion.button>

      {/* Label on Hover */}
      {!isActive && (
        <div className={cn(
          "absolute -top-8 left-1/2 -translate-x-1/2 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50",
          symptom.color
        )}>
          {symptom.category}
        </div>
      )}

      {/* Popup Dialog Active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={cn(
               "absolute left-1/2 -translate-x-1/2 mt-4 md:left-10 md:-translate-y-1/2 w-64 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border-2 border-slate-200 z-50"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
               <div className={cn("w-2 h-2 rounded-full", symptom.color)}></div>
               <span className={cn("text-xs uppercase tracking-wider font-bold", iconColor)}>{symptom.category} Sphere</span>
               <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="ml-auto text-slate-500 hover:text-slate-800 transition-colors">
                 <X size={16} />
               </button>
            </div>
            
            <h3 className="font-bold text-slate-900 mb-2">{symptom.title}</h3>
            
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {symptom.description}
            </p>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
