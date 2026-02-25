import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

const MAP_WIDTH = 270;
const MAP_HEIGHT = 430;
const PLAYER_SIZE = 16;
const SPEED = 4;

type Position = { x: number, y: number };

const INITIAL_POS: Position = { x: 40, y: 380 };
const GOAL_POS: Position = { x: 230, y: 85 };

// Defining light sources
const Lights = [
  { x: 50, y: 350, radius: 60, intensity: 1 },
  { x: 135, y: 280, radius: 70, intensity: 1 },
  { x: 220, y: 200, radius: 60, intensity: 0.8 },
  { x: 135, y: 120, radius: 60, intensity: 1 },
  { x: 230, y: 85, radius: 70, intensity: 1 },
];

// Defining buildings (obstacles)
const Buildings = [
  { x: 10, y: 10, w: 90, h: 80 },
  { x: 130, y: 10, w: 130, h: 60 },
  { x: 10, y: 120, w: 60, h: 100 },
  { x: 100, y: 120, w: 90, h: 60 },
  { x: 220, y: 100, w: 40, h: 60 },
  { x: 10, y: 250, w: 80, h: 70 },
  { x: 120, y: 210, w: 60, h: 120 },
  { x: 210, y: 190, w: 50, h: 140 },
  { x: 100, y: 360, w: 160, h: 60 },
];

export const MiniGame: React.FC = () => {
  const [player, setPlayer] = useState<Position>(INITIAL_POS);
  const [score, setScore] = useState(100);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const requestRef = useRef<number>();

  const restart = () => {
    setPlayer(INITIAL_POS);
    setScore(100);
    setGameState('playing');
    setKeys({});
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Restart on Enter if game over
      if (e.key === 'Enter' && gameState !== 'playing') {
        restart();
        return;
      }
      
      // Prevent default scrolling for arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      setKeys(prev => ({ ...prev, [e.key]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => setKeys(prev => ({ ...prev, [e.key]: false }));
    
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const update = () => {
    if (gameState !== 'playing') return;

    setPlayer(prev => {
      let dx = 0; let dy = 0;
      if (keys['ArrowUp']) dy -= SPEED;
      if (keys['ArrowDown']) dy += SPEED;
      if (keys['ArrowLeft']) dx -= SPEED;
      if (keys['ArrowRight']) dx += SPEED;

      // Normalize diagonal speed
      if (dx !== 0 && dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / length) * SPEED;
        dy = (dy / length) * SPEED;
      }

      let newX = prev.x + dx;
      let newY = prev.y + dy;

      // Map bounds
      newX = Math.max(PLAYER_SIZE/2, Math.min(MAP_WIDTH - PLAYER_SIZE/2, newX));
      newY = Math.max(PLAYER_SIZE/2, Math.min(MAP_HEIGHT - PLAYER_SIZE/2, newY));

      // Building collisions
      const playerRect = { x: newX - PLAYER_SIZE/2, y: newY - PLAYER_SIZE/2, w: PLAYER_SIZE, h: PLAYER_SIZE };
      let collision = false;
      for (const b of Buildings) {
        if (
          playerRect.x < b.x + b.w &&
          playerRect.x + playerRect.w > b.x &&
          playerRect.y < b.y + b.h &&
          playerRect.y + playerRect.h > b.y
        ) {
          collision = true;
          break;
        }
      }

      if (collision) {
        return prev; // don't move
      }

      // Check win condition
      const distToGoal = Math.hypot(newX - GOAL_POS.x, newY - GOAL_POS.y);
      if (distToGoal < 20) {
        setGameState('won');
      }

      return { x: newX, y: newY };
    });

    // Update light score
    setPlayer(currentPos => {
      let maxLight = 0;
      for (const light of Lights) {
        const dist = Math.hypot(currentPos.x - light.x, currentPos.y - light.y);
        if (dist < light.radius) {
          // Flatten light intensity curve to make it more obvious when you are 'in' vs 'out'
          const intensity = Math.pow((1 - dist / light.radius), 0.5) * light.intensity;
          maxLight = Math.max(maxLight, intensity);
        }
      }

      setScore(prev => {
        // More forgiving penalty when in the dark. 
        // ~60 frames per second. To die in ~3 seconds = lose ~0.55 per frame
        const change = maxLight > 0.3 ? 1.0 : -0.55;
        const newScore = Math.max(0, Math.min(100, prev + change));
        if (newScore === 0) setGameState('lost');
        return newScore;
      });
      return currentPos;
    });

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [keys, gameState]);

  return (
    <div className="relative w-full h-full font-centaur">
      <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-full bg-slate-800 rounded-[25px]">
        {/* Streets (Background) */}
        <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#334155" />
        
        {/* Sidewalks slightly lighter */}
        {Buildings.map((b, i) => (
          <rect key={`sw-${i}`} x={b.x - 4} y={b.y - 4} width={b.w + 8} height={b.h + 8} fill="#475569" rx="4" />
        ))}

        {/* Buildings */}
        {Buildings.map((b, i) => (
          <rect key={`b-${i}`} x={b.x} y={b.y} width={b.w} height={b.h} fill="#1e293b" stroke="#0f172a" strokeWidth="2" rx="2" />
        ))}

        {/* Light sources */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {Lights.map((l, i) => (
          <g key={`l-${i}`}>
            <circle cx={l.x} cy={l.y} r={l.radius} fill="url(#lightGrad)" opacity="0.6" />
            <circle cx={l.x} cy={l.y} r="3" fill="#FFE66D" filter="url(#glow)" />
          </g>
        ))}

        <defs>
          <radialGradient id="lightGrad">
            {/* Sharper gradient dropoff to make light circles more distinct */}
            <stop offset="0%" stopColor="#FFE66D" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#FFE66D" stopOpacity="0.5" />
            <stop offset="90%" stopColor="#FFE66D" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFE66D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Goal */}
        <g transform={`translate(${GOAL_POS.x}, ${GOAL_POS.y})`}>
          <circle cx="0" cy="0" r="16" fill="#4ECDC4" opacity="0.4" className="animate-ping" />
          <g transform="translate(0, -5)">
            <path d="M0 -8 L0 -14" stroke="#1a1a1a" strokeWidth="2" /> {/* Handle */}
            <rect x="-7" y="-8" width="14" height="18" rx="4" fill="#FF6B6B" stroke="#1a1a1a" strokeWidth="2" />
            <circle cx="0" cy="1" r="5" fill="#FFE66D" opacity="0.9" />
            <circle cx="0" cy="1" r="14" fill="#FFE66D" opacity="0.3" filter="url(#glow)" />
          </g>
        </g>

        {/* Start Pad */}
        <circle cx={INITIAL_POS.x} cy={INITIAL_POS.y} r="15" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
        <text x={INITIAL_POS.x} y={INITIAL_POS.y + 25} fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold">START</text>

        {/* Player (Top-down style matching existing characters) */}
        <g transform={`translate(${player.x}, ${player.y})`}>
          {/* Shadow */}
          <ellipse cx="0" cy="8" rx="8" ry="4" fill="#000" opacity="0.4" />
          
          {/* Head */}
          <circle cx="0" cy="-2" r="7" fill="#FFE66D" stroke="#1a1a1a" strokeWidth="2" />
          
          {/* Body/Coat */}
          <path d="M-6 2 Q0 -5 6 2 L5 10 Q0 12 -5 10 Z" fill="#FF6B6B" stroke="#1a1a1a" strokeWidth="2" />
          
          {/* Little feet */}
          <rect x="-4" y="9" width="3" height="4" rx="1" fill="#1a1a1a" />
          <rect x="1" y="9" width="3" height="4" rx="1" fill="#1a1a1a" />
        </g>
      </svg>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none">
        
        {/* Light Score Meter */}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 pb-1.5 rounded-xl border-2 border-slate-900 shadow-md flex flex-col pointer-events-auto items-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Light Score</span>
          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <div 
              className={`h-full transition-all duration-300 ${score > 50 ? 'bg-mustard' : score > 20 ? 'bg-orange-400' : 'bg-red-500'}`} 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Restart Button */}
        <button 
          onClick={restart}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-xl border-2 border-slate-900 shadow-md hover:bg-slate-100 active:scale-95 transition-all pointer-events-auto text-slate-800"
        >
          <RotateCcw size={16} strokeWidth={3} />
        </button>
      </div>

      {/* On-Screen D-Pad for Mobile / Clicking */}
      <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1.5 pointer-events-auto select-none opacity-80 hover:opacity-100 transition-opacity">
        <div />
        <button 
          onPointerDown={() => setKeys(prev => ({ ...prev, ArrowUp: true }))}
          onPointerUp={() => setKeys(prev => ({ ...prev, ArrowUp: false }))}
          onPointerLeave={() => setKeys(prev => ({ ...prev, ArrowUp: false }))}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-900 shadow-[2px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center active:translate-y-[2px] active:shadow-none transition-transform"
        >
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-transparent border-b-slate-900" />
        </button>
        <div />
        <button 
          onPointerDown={() => setKeys(prev => ({ ...prev, ArrowLeft: true }))}
          onPointerUp={() => setKeys(prev => ({ ...prev, ArrowLeft: false }))}
          onPointerLeave={() => setKeys(prev => ({ ...prev, ArrowLeft: false }))}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-900 shadow-[2px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center active:translate-y-[2px] active:shadow-none transition-transform"
        >
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-r-[10px] border-transparent border-r-slate-900" />
        </button>
        <button 
          onPointerDown={() => setKeys(prev => ({ ...prev, ArrowDown: true }))}
          onPointerUp={() => setKeys(prev => ({ ...prev, ArrowDown: false }))}
          onPointerLeave={() => setKeys(prev => ({ ...prev, ArrowDown: false }))}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-900 shadow-[2px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center active:translate-y-[2px] active:shadow-none transition-transform"
        >
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-slate-900" />
        </button>
        <button 
          onPointerDown={() => setKeys(prev => ({ ...prev, ArrowRight: true }))}
          onPointerUp={() => setKeys(prev => ({ ...prev, ArrowRight: false }))}
          onPointerLeave={() => setKeys(prev => ({ ...prev, ArrowRight: false }))}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-900 shadow-[2px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center active:translate-y-[2px] active:shadow-none transition-transform"
        >
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[10px] border-transparent border-l-slate-900" />
        </button>
      </div>

      {/* Game Over / Win Overlays */}
      {gameState !== 'playing' && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] rounded-[25px] flex items-center justify-center flex-col z-20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl border-4 border-slate-900 shadow-2xl text-center flex flex-col items-center"
          >
            {gameState === 'won' ? (
              <>
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-2xl font-bold text-teal mb-2">You Made It!</h3>
                <p className="text-slate-600 mb-4 leading-tight text-sm">You navigated the safest, brightest streets.</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2 shadow-sm">🌑</div>
                <h3 className="text-2xl font-bold text-lantern mb-2">It's Too Dark</h3>
                <p className="text-slate-600 mb-4 leading-tight text-sm">You stayed in the dark for too long!</p>
              </>
            )}
            <button 
              onClick={restart}
              className="bg-ink text-white px-6 py-2 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-md"
            >
              Play Again <span className="opacity-50 text-xs ml-1 font-normal">(Enter)</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
