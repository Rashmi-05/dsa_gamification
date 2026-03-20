import React, { useEffect, useState } from 'react';

// Castle progress: 0-1 float
export default function CastleMap({ progress = 0, totalSolved = 0, goalProblems = 14 }) {
  const [animProg, setAnimProg] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimProg(progress), 300);
    return () => clearTimeout(timer);
  }, [progress]);

  // Layers unlocked based on progress
  const pct = animProg; // 0 to 1
  const showFoundation = pct >= 0;
  const showWalls = pct >= 0.1;
  const showTowers = pct >= 0.25;
  const showGate = pct >= 0.35;
  const showBattlements = pct >= 0.5;
  const showInnerTower = pct >= 0.65;
  const showFlags = pct >= 0.8;
  const showGlow = pct >= 0.9;

  const stars = Array.from({ length: 18 }, (_, i) => ({
    cx: 15 + (i * 23) % 290,
    cy: 10 + (i * 17) % 60,
    r: 0.8 + (i % 3) * 0.4,
    delay: i * 0.3,
  }));

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>⚔ Your Kingdom</div>
        <div style={styles.progressBadge}>{totalSolved} / {goalProblems} quests</div>
      </div>

      {/* Progress bar */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${Math.round(pct * 100)}%` }} />
        <span style={styles.progressLabel}>{Math.round(pct * 100)}% built</span>
      </div>

      {/* SVG Castle */}
      <div style={styles.castleWrap}>
        <svg
          viewBox="0 0 320 280"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.svg}
        >
          {/* Sky gradient */}
          <defs>
            <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a1040" />
              <stop offset="100%" stopColor="#050811" />
            </radialGradient>
            <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f0a500" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f0a500" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a3a5a" />
              <stop offset="100%" stopColor="#141e30" />
            </linearGradient>
            <linearGradient id="stoneGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e2d45" />
              <stop offset="100%" stopColor="#0d1626" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="320" height="280" fill="url(#skyGrad)" />

          {/* Stars */}
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="#fff"
              opacity="0.6"
              style={{ animation: `twinkle ${2 + s.delay}s ease-in-out infinite`, animationDelay: `${s.delay}s` }}
            />
          ))}

          {/* Moon */}
          <circle cx="272" cy="30" r="18" fill="#1a2640" />
          <circle cx="265" cy="24" r="18" fill="#f0e8c8" opacity="0.9" filter="url(#glow)" />

          {/* Mountains */}
          <polygon points="0,200 60,130 120,200" fill="#0e1828" />
          <polygon points="40,200 110,110 180,200" fill="#0a1420" />
          <polygon points="150,200 220,120 290,200" fill="#0e1828" />
          <polygon points="250,200 310,140 320,200" fill="#0a1420" />

          {/* Ground */}
          <rect x="0" y="198" width="320" height="82" fill="#060e1c" />
          <ellipse cx="160" cy="200" rx="160" ry="8" fill="#0a1525" />

          {/* Glow base (unlocked late) */}
          {showGlow && (
            <ellipse cx="160" cy="205" rx="100" ry="20" fill="url(#glowGold)" style={{ animation: 'pulse-glow-svg 3s ease-in-out infinite' }} />
          )}

          {/* ====== FOUNDATION ====== */}
          {showFoundation && (
            <g style={{ animation: 'castle-build 0.8s ease forwards' }}>
              <rect x="70" y="185" width="180" height="18" rx="2" fill="url(#stoneGrad)" stroke="#f0a50022" strokeWidth="0.5" />
              {/* Stone texture lines */}
              {[0,1,2,3,4,5].map(i => (
                <rect key={i} x={75 + i * 28} y="188" width="24" height="6" rx="1" fill="none" stroke="#f0a50015" strokeWidth="0.5" />
              ))}
              {[0,1,2,3,4,5].map(i => (
                <rect key={i+10} x={89 + i * 28} y="197" width="24" height="5" rx="1" fill="none" stroke="#f0a50015" strokeWidth="0.5" />
              ))}
            </g>
          )}

          {/* ====== MAIN WALLS ====== */}
          {showWalls && (
            <g style={{ animation: 'castle-build 0.9s ease 0.1s both' }}>
              {/* Left wall */}
              <rect x="80" y="145" width="45" height="42" fill="url(#stoneGrad2)" stroke="#f0a50018" strokeWidth="0.5" />
              {/* Right wall */}
              <rect x="195" y="145" width="45" height="42" fill="url(#stoneGrad2)" stroke="#f0a50018" strokeWidth="0.5" />
              {/* Center wall */}
              <rect x="115" y="155" width="90" height="32" fill="url(#stoneGrad)" stroke="#f0a50018" strokeWidth="0.5" />
              {/* Stone block details */}
              {[0,1,2].map(i => (
                <rect key={i} x={84 + 0} y={150 + i * 11} width="37" height="8" rx="1" fill="none" stroke="#f0a50010" strokeWidth="0.5" />
              ))}
              {[0,1,2].map(i => (
                <rect key={i+10} x={199} y={150 + i * 11} width="37" height="8" rx="1" fill="none" stroke="#f0a50010" strokeWidth="0.5" />
              ))}
            </g>
          )}

          {/* ====== GATE ====== */}
          {showGate && (
            <g style={{ animation: 'castle-build 0.7s ease 0.2s both' }}>
              {/* Gate arch */}
              <path d="M135 187 L135 165 Q160 150 185 165 L185 187 Z" fill="#060d1a" stroke="#f0a50030" strokeWidth="1" />
              {/* Gate details */}
              <line x1="160" y1="155" x2="160" y2="187" stroke="#f0a50025" strokeWidth="0.5" />
              {/* Portcullis bars */}
              {[0,1,2,3].map(i => (
                <line key={i} x1={142 + i * 11} y1="165" x2={142 + i * 11} y2="187" stroke="#f0a50030" strokeWidth="0.5" />
              ))}
              {[0,1,2].map(i => (
                <line key={i+10} x1="135" y1={170 + i * 8} x2="185" y2={170 + i * 8} stroke="#f0a50020" strokeWidth="0.5" />
              ))}
              {/* Lanterns */}
              <circle cx="133" cy="163" r="3" fill="#f0a500" opacity="0.8" filter="url(#glow)" />
              <circle cx="187" cy="163" r="3" fill="#f0a500" opacity="0.8" filter="url(#glow)" />
            </g>
          )}

          {/* ====== TOWERS ====== */}
          {showTowers && (
            <g style={{ animation: 'castle-build 1s ease 0.15s both' }}>
              {/* Left tower */}
              <rect x="68" y="120" width="50" height="67" fill="url(#stoneGrad2)" stroke="#f0a50020" strokeWidth="0.5" />
              {/* Right tower */}
              <rect x="202" y="120" width="50" height="67" fill="url(#stoneGrad2)" stroke="#f0a50020" strokeWidth="0.5" />
              {/* Tower windows */}
              <path d="M86 135 L93 135 L93 148 Q89.5 153 86 148 Z" fill="#00e5ff" opacity="0.4" filter="url(#glow)" />
              <path d="M227 135 L234 135 L234 148 Q230.5 153 227 148 Z" fill="#00e5ff" opacity="0.4" filter="url(#glow)" />
              {/* Window glow */}
              <ellipse cx="89.5" cy="143" rx="5" ry="6" fill="url(#glowCyan)" />
              <ellipse cx="230.5" cy="143" rx="5" ry="6" fill="url(#glowCyan)" />
            </g>
          )}

          {/* ====== BATTLEMENTS ====== */}
          {showBattlements && (
            <g style={{ animation: 'castle-build 0.7s ease 0.25s both' }}>
              {/* Left tower battlements */}
              {[0,1,2,3].map(i => (
                <rect key={i} x={68 + i * 14} y="110" width="9" height="12" rx="1" fill="url(#stoneGrad2)" stroke="#f0a50020" strokeWidth="0.5" />
              ))}
              {/* Right tower battlements */}
              {[0,1,2,3].map(i => (
                <rect key={i+10} x={202 + i * 14} y="110" width="9" height="12" rx="1" fill="url(#stoneGrad2)" stroke="#f0a50020" strokeWidth="0.5" />
              ))}
              {/* Center wall battlements */}
              {[0,1,2,3,4,5].map(i => (
                <rect key={i+20} x={115 + i * 16} y="147" width="10" height="10" rx="1" fill="url(#stoneGrad)" stroke="#f0a50015" strokeWidth="0.5" />
              ))}
            </g>
          )}

          {/* ====== INNER/CENTER TOWER ====== */}
          {showInnerTower && (
            <g style={{ animation: 'castle-build 1s ease 0.3s both' }}>
              {/* Inner tower body */}
              <rect x="135" y="90" width="50" height="67" fill="url(#stoneGrad2)" stroke="#f0a50025" strokeWidth="0.5" />
              {/* Inner tower battlements */}
              {[0,1,2,3].map(i => (
                <rect key={i} x={135 + i * 13} y="80" width="9" height="12" rx="1" fill="url(#stoneGrad2)" stroke="#f0a50025" strokeWidth="0.5" />
              ))}
              {/* Center tower window */}
              <path d="M152 110 L168 110 L168 130 Q160 138 152 130 Z" fill="#9b4dff" opacity="0.5" filter="url(#glow)" />
              <ellipse cx="160" cy="120" rx="9" ry="10" fill="url(#glowGold)" />
              {/* Decorative horizontal bands */}
              <rect x="135" y="115" width="50" height="2" fill="#f0a50018" />
              <rect x="135" y="130" width="50" height="2" fill="#f0a50018" />
            </g>
          )}

          {/* ====== FLAGS ====== */}
          {showFlags && (
            <g style={{ animation: 'castle-build 0.6s ease 0.4s both' }}>
              {/* Left tower flag */}
              <line x1="92" y1="90" x2="92" y2="110" stroke="#c07800" strokeWidth="1.5" />
              <polygon points="92,90 108,96 92,102" fill="#f0a500" filter="url(#glow)" style={{ animation: 'flag-wave 2s ease-in-out infinite' }} />
              {/* Right tower flag */}
              <line x1="227" y1="90" x2="227" y2="110" stroke="#c07800" strokeWidth="1.5" />
              <polygon points="227,90 243,96 227,102" fill="#f0a500" filter="url(#glow)" style={{ animation: 'flag-wave 2.3s ease-in-out infinite', animationDelay: '0.3s' }} />
              {/* Center tower flag */}
              <line x1="160" y1="58" x2="160" y2="80" stroke="#c07800" strokeWidth="2" />
              <polygon points="160,58 182,66 160,74" fill="#f0a500" filter="url(#strongGlow)" style={{ animation: 'flag-wave 1.8s ease-in-out infinite', animationDelay: '0.1s' }} />
            </g>
          )}

          {/* Under construction hint if not complete */}
          {pct < 1 && pct > 0 && (
            <g>
              <rect x="80" y="270" width="160" height="8" rx="4" fill="rgba(240,165,0,0.1)" />
              <rect x="80" y="270" width={160 * pct} height="8" rx="4" fill="rgba(240,165,0,0.5)" style={{ transition: 'width 1.2s ease' }} />
            </g>
          )}

          {/* Completion sparkles */}
          {pct >= 1 && (
            <g>
              {[{x:90,y:80},{x:230,y:80},{x:160,y:50},{x:70,y:140},{x:250,y:140}].map((p, i) => (
                <g key={i} style={{ animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                  <circle cx={p.x} cy={p.y} r="3" fill="#f0a500" filter="url(#strongGlow)" />
                  <line x1={p.x-6} y1={p.y} x2={p.x+6} y2={p.y} stroke="#f0a500" strokeWidth="0.8" opacity="0.7" />
                  <line x1={p.x} y1={p.y-6} x2={p.x} y2={p.y+6} stroke="#f0a500" strokeWidth="0.8" opacity="0.7" />
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Milestone labels */}
      <div style={styles.milestones}>
        {[
          { label: 'Foundation', threshold: 0.1, icon: '🏗' },
          { label: 'Walls', threshold: 0.25, icon: '🧱' },
          { label: 'Towers', threshold: 0.5, icon: '🏰' },
          { label: 'Flags', threshold: 0.8, icon: '⚑' },
          { label: 'Kingdom', threshold: 1.0, icon: '👑' },
        ].map(m => (
          <div key={m.label} style={{ ...styles.milestone, ...(pct >= m.threshold ? styles.milestoneActive : {}) }}>
            <span>{m.icon}</span>
            <span style={styles.milestoneLabel}>{m.label}</span>
            {pct >= m.threshold && <span style={styles.milestoneCheck}>✓</span>}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes castle-build {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flag-wave {
          0%,100% { transform-origin: left center; transform: skewY(0deg); }
          50% { transform-origin: left center; transform: skewY(8deg); }
        }
        @keyframes pulse-glow-svg {
          0%,100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '100%',
    flex: 1,
    minHeight: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'var(--font-title)',
    fontSize: '14px',
    color: 'var(--accent-gold)',
    letterSpacing: '0.5px',
  },
  progressBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--accent-cyan)',
    background: 'rgba(0,229,255,0.08)',
    border: '1px solid rgba(0,229,255,0.2)',
    padding: '3px 10px',
    borderRadius: '20px',
  },
  progressTrack: {
    height: '6px',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'visible',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #f0a500, #9b4dff)',
    borderRadius: '3px',
    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 0 10px rgba(240,165,0,0.5)',
  },
  progressLabel: {
    position: 'absolute',
    right: 0,
    top: '-18px',
    fontSize: '11px',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-mono)',
  },
  castleWrap: {
    flex: 1,
    minHeight: '200px',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(240,165,0,0.1)',
    background: 'rgba(5,8,17,0.8)',
  },
  svg: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  milestones: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  milestone: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontFamily: 'var(--font-ui)',
    fontWeight: '600',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(136,153,187,0.12)',
    color: 'var(--text-dim)',
    transition: 'all 0.4s ease',
  },
  milestoneActive: {
    background: 'rgba(240,165,0,0.1)',
    border: '1px solid rgba(240,165,0,0.3)',
    color: 'var(--accent-gold)',
  },
  milestoneLabel: { fontSize: '11px' },
  milestoneCheck: {
    color: 'var(--accent-green)',
    fontSize: '10px',
    fontWeight: '700',
  },
};
