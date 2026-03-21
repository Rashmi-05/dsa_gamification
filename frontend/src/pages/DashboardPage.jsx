import React, { useState,useEffect } from 'react';
import CastleMap from '../components/CastleMap.jsx';
import GoalModal from '../components/GoalModal.jsx';
//import { mockRoadmap } from '../data/mockData.js';

const difficultyColor = {
  Easy: '#39ff8a',
  Medium: '#f0a500',
  Hard: '#ff4560',
};

function StatBar({ category, solved, total, color }) {
  const pct = Math.round((solved / total) * 100);
  return (
    <div style={barStyles.wrap}>
      <div style={barStyles.header}>
        <span style={barStyles.name}>{category}</span>
        <span style={{ ...barStyles.count, color }}>{solved}<span style={barStyles.total}>/{total}</span></span>
      </div>
      <div style={barStyles.track}>
        <div style={{ ...barStyles.fill, width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  );
}

const barStyles = {
  wrap: { display: 'flex', flexDirection: 'column', gap: '5px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', fontWeight: '600', letterSpacing: '0.5px' },
  count: { fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: '700' },
  total: { color: 'var(--text-dim)', fontSize: '11px' },
  track: { height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: '3px', transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' },
};

const CASTLE_W = 420;

export default function DashboardPage({ user, platformData, goalData, onGoalSet }) {
  // Auto-show goal modal if no goal set yet
  const [showGoalModal, setShowGoalModal] = useState(!goalData);
  const [roadmap, setRoadmap] = useState([]);
  const [activeDay, setActiveDay] = useState(0);
  
  const stats = platformData?.stats;
  const isLC = platformData?.platform === 'leetcode';

  const totalSolved = roadmap.reduce((acc, day) => acc + day.problems.filter(p => p.solved).length, 0);
  const totalProblems = roadmap.reduce((acc, day) => acc + day.problems.length, 0);
  const castlePct = totalSolved / totalProblems;

  const toggleSolved = (dayIdx, probIdx) => {
    setRoadmap(prev =>
      prev.map((d, di) =>
        di !== dayIdx ? d : {
          ...d,
          problems: d.problems.map((p, pi) =>
            pi !== probIdx ? p : { ...p, solved: !p.solved }
          ),
        }
      )
    );
    console.log(platformData.stats.rating)
  };
useEffect(() => {
  if (!showGoalModal) {
    // call your API here
    fetch("http://localhost:5000/test4")
      .then(res => res.json())
      .then(data => {
       // console.log("Roadmap:", data);
        setRoadmap(data) 
      });
  }
}, [showGoalModal]);
  const handleGoalSet = (data) => {
    onGoalSet(data);
    setShowGoalModal(false);
    //console.log(platformData)
  };

  return (
    <div style={styles.root}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', top: '-200px', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,165,0,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ===== FIXED RIGHT CASTLE PANEL ===== */}
      <div style={{ ...styles.castlePanel, width: CASTLE_W }}>
        <div style={styles.castlePanelHeader}>
          <div style={styles.castlePanelTitle}>⚔ Your Kingdom</div>
          <div style={styles.castleProgressBadge}>{totalSolved}/{totalProblems} quests</div>
        </div>

        {/* Castle fills all available space */}
        <div style={styles.castleSvgWrap}>
          <CastleMap progress={castlePct} totalSolved={totalSolved} goalProblems={totalProblems} />
        </div>

        {/* Quick stats */}
        <div style={styles.quickStats}>
          <div style={styles.qStat}>
            <div style={styles.qNum}>{totalSolved}</div>
            <div style={styles.qLabel}>Done</div>
          </div>
          <div style={styles.qDivider} />
          <div style={styles.qStat}>
            <div style={{ ...styles.qNum, color: 'var(--accent-cyan)' }}>{totalProblems - totalSolved}</div>
            <div style={styles.qLabel}>Left</div>
          </div>
          <div style={styles.qDivider} />
          <div style={styles.qStat}>
            <div style={{ ...styles.qNum, color: 'var(--accent-purple)' }}>{Math.round(castlePct * 100)}%</div>
            <div style={styles.qLabel}>Built</div>
          </div>
        </div>

        {/* Achievements */}
        <div style={styles.achieveSection}>
          <div style={styles.achieveSectionTitle}>🏅 Achievements</div>
          {/* <div style={styles.achieveList}>
            {[
              { icon: '⚔', title: 'First Blood', desc: 'Solved first problem', earned: totalSolved >= 1 },
              { icon: '🔥', title: 'On Fire', desc: '5-day streak', earned: true },
              { icon: '🏗', title: 'Architect', desc: 'Day 1 complete', earned: roadmap[0]?.problems.every(p => p.solved) },
              { icon: '🏰', title: 'Castle Builder', desc: 'Reach 50% kingdom', earned: castlePct >= 0.5 },
              { icon: '👑', title: 'Sovereign', desc: 'All quests complete', earned: castlePct >= 1 },
            ].map((a, i) => (
              <div key={i} style={{ ...styles.achieve, ...(a.earned ? styles.achieveEarned : styles.achieveLocked) }}>
                <span style={styles.achieveIcon}>{a.earned ? a.icon : '🔒'}</span>
                <div style={{ flex: 1 }}>
                  <div style={styles.achieveTitle}>{a.title}</div>
                  <div style={styles.achieveDesc}>{a.desc}</div>
                </div>
                {a.earned && <span style={styles.achieveCheck}>✓</span>}
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* ===== SCROLLABLE LEFT CONTENT ===== */}
      <div style={{ ...styles.scrollContent, marginRight: CASTLE_W }}>

        {/* Sticky nav */}
        <nav style={styles.nav}>
          <div style={styles.navLogo}>
            <span style={styles.navLogoIcon}>⚔</span>
            <span style={styles.navLogoText}>DSA Quest</span>
          </div>
          <div style={styles.navCenter}>
            <div style={styles.xpBar}><div style={styles.xpFill} /></div>
            <span style={styles.xpLabel}>LVL 12 · 2400 XP</span>
          </div>
          <div style={styles.navRight}>
            <div style={styles.streak}>🔥 5 day streak</div>
            <div style={styles.avatar}>{user?.username?.[0]?.toUpperCase()}</div>
            <div style={styles.username}>{user?.username}</div>
          </div>
        </nav>

        <div style={styles.contentPad}>

          {/* Platform stats */}
          {stats && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>
                  <span style={{ color: 'var(--accent-gold)' }}>{isLC ? '⚡ LeetCode' : '⚡ Codeforces'}</span> Profile
                </div>
                <div style={styles.platformBadge}>
                  {isLC ? (
                    <>
                      <span style={styles.badgeLabel}>Global Rank</span>
                      <span style={styles.badgeVal}>#{stats.rank?.toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <span style={styles.badgeLabel}>Rating</span>
                      <span style={styles.badgeVal}>{stats.rating}</span>
                    </>
                  )}
                </div>
              </div>
              <div style={styles.summaryRow}>
                <div style={styles.summaryTile}>
                  <div style={styles.summaryNum}>{stats.totalSolved}</div>
                  <div style={styles.summaryLbl}>Total Solved</div>
                </div>
                {isLC && (
                  <>
                    <div style={styles.summaryTile}>
                      <div style={{ ...styles.summaryNum, color: '#39ff8a' }}>{stats.easy}</div>
                      <div style={styles.summaryLbl}>Easy</div>
                    </div>
                    <div style={styles.summaryTile}>
                      <div style={{ ...styles.summaryNum, color: '#f0a500' }}>{stats.medium}</div>
                      <div style={styles.summaryLbl}>Medium</div>
                    </div>
                    <div style={styles.summaryTile}>
                      <div style={{ ...styles.summaryNum, color: '#ff4560' }}>{stats.hard}</div>
                      <div style={styles.summaryLbl}>Hard</div>
                    </div>
                  </>
                )}
                {!isLC && (
                  <div style={styles.summaryTile}>
                    <div style={{ ...styles.summaryNum, color: '#00e5ff' }}>{stats.rank}</div>
                    <div style={styles.summaryLbl}>Division</div>
                  </div>
                )}
              </div>
              <div style={styles.catTitle}>Category Breakdown</div>
              <div style={styles.catGrid}>
                {stats.categories.map(cat => (
                  <StatBar key={cat.name} category={cat.name} solved={cat.solved} total={cat.total} color={cat.color} />
                ))}
              </div>
            </div>
          )}

          {/* Roadmap */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>📅 Quest Roadmap</div>
              <button style={styles.goalBtn} onClick={() => setShowGoalModal(true)}>
                ⚑ {goalData ? 'Change Goal' : 'Set a Goal'}
              </button>
            </div>

            {goalData && (
              <div style={styles.goalSummary}>
                <span>🎯 {goalData.aim === 'fundamentals' ? 'DSA Fundamentals' : 'Contest Rating'}</span>
                <span style={styles.goalDot}>·</span>
                <span>{goalData.numProblems} problems</span>
                <span style={styles.goalDot}>·</span>
                <span>{goalData.numDays} days</span>
              </div>
            )}

            {!goalData && (
              <div style={styles.noGoalBanner}>
                <span>🎯</span>
                <span>Set a goal to get a personalized problem roadmap generated for you!</span>
                <button style={styles.noGoalCta} onClick={() => setShowGoalModal(true)}>Set Goal →</button>
              </div>
            )}

            <div style={styles.roadmapProgress}>
              <span style={styles.rpText}>{totalSolved}/{totalProblems} solved</span>
              <div style={styles.rpTrack}>
                <div style={{ ...styles.rpFill, width: `${castlePct * 100}%` }} />
              </div>
              <span style={styles.rpPct}>{Math.round(castlePct * 100)}%</span>
            </div>

            <div style={styles.dayList}>
              {roadmap.map((day, di) => {
                const daySolved = day.problems.filter(p => p.solved).length;
                const dayComplete = daySolved === day.problems.length;
                const isActive = activeDay === di;
                return (
                  <div key={di} style={{
                    ...styles.dayCard,
                    ...(isActive ? styles.dayCardActive : {}),
                    ...(dayComplete ? styles.dayCardDone : {}),
                  }}>
                    <div style={styles.dayHeader} onClick={() => setActiveDay(isActive ? null : di)}>
                      <div style={styles.dayLeft}>
                        <div style={{ ...styles.dayNum, ...(dayComplete ? styles.dayNumDone : {}) }}>
                          {dayComplete ? '✓' : `D${day.day}`}
                        </div>
                        <div>
                          <div style={styles.dayTheme}>{day.theme}</div>
                          <div style={styles.dayMeta}>{daySolved}/{day.problems.length} problems complete</div>
                        </div>
                      </div>
                      <div style={styles.dayRight}>
                        {dayComplete && <span style={styles.completeBadge}>✓ Done</span>}
                        <span style={{ color: 'var(--text-dim)', fontSize: '12px', display: 'inline-block', transition: 'transform 0.25s', transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                      </div>
                    </div>

                    {isActive && (
                      <div style={styles.problemList}>
                        {day.problems.map((prob, pi) => (
                          <div key={pi} style={{ ...styles.problemRow, ...(prob.solved ? styles.problemSolved : {}) }}>
                            <button
                              style={{ ...styles.solveBtn, ...(prob.solved ? styles.solveBtnDone : {}) }}
                              onClick={() => toggleSolved(di, pi)}
                            >
                              {prob.solved ? '✓' : '○'}
                            </button>
                            <div style={styles.probInfo}>
                              <a href={prob.link} target="_blank" rel="noopener noreferrer" style={{
                                ...styles.probLink,
                                textDecoration: prob.solved ? 'line-through' : 'none',
                                opacity: prob.solved ? 0.5 : 1,
                              }}>
                                {prob.title}
                              </a>
                              <span style={{
                                ...styles.diffBadge,
                                color: difficultyColor[prob.difficulty],
                                background: `${difficultyColor[prob.difficulty]}15`,
                                border: `1px solid ${difficultyColor[prob.difficulty]}40`,
                              }}>
                                {prob.difficulty}
                              </span>
                            </div>
                            <span style={styles.platformLabel}>{prob.platform}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ height: 40 }} />
        </div>
      </div>

      {showGoalModal && (
        <GoalModal onClose={() => setShowGoalModal(false)} onGoalSet={handleGoalSet} handle ={platformData.userId} rating={platformData.stats.rating} />
      )}

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        a { color: inherit; text-decoration: none; }
        a:hover { color: var(--accent-cyan) !important; }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    position: 'relative',
    animation: 'fadeIn 0.4s ease',
  },

  /* ── Fixed castle panel, full viewport height ── */
  castlePanel: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(180deg, #07101f 0%, #040810 100%)',
    borderLeft: '1px solid rgba(240,165,0,0.14)',
    zIndex: 50,
    overflowY: 'auto',
    boxShadow: '-12px 0 50px rgba(0,0,0,0.6)',
  },
  castlePanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px 12px',
    flexShrink: 0,
    borderBottom: '1px solid rgba(240,165,0,0.07)',
  },
  castlePanelTitle: {
    fontFamily: 'var(--font-title)',
    fontSize: '15px',
    color: 'var(--accent-gold)',
    letterSpacing: '0.5px',
  },
  castleProgressBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--accent-cyan)',
    background: 'rgba(0,229,255,0.08)',
    border: '1px solid rgba(0,229,255,0.2)',
    padding: '3px 10px',
    borderRadius: '20px',
  },
  /* Castle SVG area: grows to fill remaining height */
  castleSvgWrap: {
    flex: 1,
    minHeight: '340px',
    padding: '8px 16px 4px',
    display: 'flex',
    flexDirection: 'column',
  },

  quickStats: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '12px 16px',
    margin: '0 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(136,153,187,0.1)',
    borderRadius: '12px',
    flexShrink: 0,
  },
  qStat: { textAlign: 'center' },
  qNum: { fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: '700', color: 'var(--accent-gold)' },
  qLabel: { fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-ui)', marginTop: '2px', letterSpacing: '0.5px', textTransform: 'uppercase' },
  qDivider: { width: '1px', height: '28px', background: 'rgba(136,153,187,0.1)' },

  achieveSection: { padding: '12px 16px 20px', flexShrink: 0 },
  achieveSectionTitle: {
    fontFamily: 'var(--font-ui)',
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  achieveList: { display: 'flex', flexDirection: 'column', gap: '6px' },
  achieve: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '10px',
    transition: 'all 0.2s ease',
  },
  achieveEarned: {
    background: 'rgba(240,165,0,0.06)',
    border: '1px solid rgba(240,165,0,0.15)',
  },
  achieveLocked: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(136,153,187,0.07)',
    opacity: 0.45,
  },
  achieveIcon: { fontSize: '18px', flexShrink: 0 },
  achieveTitle: { fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' },
  achieveDesc: { fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', marginTop: '1px' },
  achieveCheck: { color: 'var(--accent-green)', fontSize: '12px', fontWeight: '700', flexShrink: 0 },

  /* ── Left scrollable area ── */
  scrollContent: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 28px',
    background: 'rgba(8,13,26,0.92)',
    borderBottom: '1px solid rgba(240,165,0,0.1)',
    backdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 40,
  },
  navLogo: { display: 'flex', alignItems: 'center', gap: '10px' },
  navLogoIcon: { fontSize: '20px' },
  navLogoText: { fontFamily: 'var(--font-title)', fontSize: '16px', color: 'var(--accent-gold)', letterSpacing: '0.5px' },
  navCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  xpBar: { width: '160px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' },
  xpFill: { height: '100%', width: '65%', background: 'linear-gradient(90deg, #f0a500, #9b4dff)', borderRadius: '2px' },
  xpLabel: { fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  streak: { fontSize: '13px', color: '#ff9f43', fontFamily: 'var(--font-ui)', fontWeight: '700', background: 'rgba(255,159,67,0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,159,67,0.2)' },
  avatar: { width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #f0a500, #9b4dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-title)', fontSize: '14px', color: '#fff', fontWeight: '700' },
  username: { fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' },

  contentPad: {
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(13,21,38,0.9) 0%, rgba(8,13,26,0.95) 100%)',
    border: '1px solid rgba(136,153,187,0.1)',
    borderRadius: '18px',
    padding: '24px',
    animation: 'fadeInUp 0.5s ease',
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  cardTitle: { fontFamily: 'var(--font-ui)', fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' },
  platformBadge: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' },
  badgeLabel: { fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'var(--font-ui)', letterSpacing: '1px', textTransform: 'uppercase' },
  badgeVal: { fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: '700', color: 'var(--accent-cyan)' },
  summaryRow: { display: 'flex', gap: '12px', marginBottom: '24px' },
  summaryTile: {
    flex: 1,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(136,153,187,0.1)',
    borderRadius: '12px',
    padding: '14px',
    textAlign: 'center',
  },
  summaryNum: { fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: '700', color: 'var(--accent-gold)' },
  summaryLbl: { fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', marginTop: '4px', letterSpacing: '0.5px' },
  catTitle: { fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-ui)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' },
  catGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },

  goalBtn: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, rgba(240,165,0,0.15), rgba(155,77,255,0.1))',
    border: '1px solid rgba(240,165,0,0.3)',
    borderRadius: '8px',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  goalSummary: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    padding: '10px 14px',
    background: 'rgba(0,229,255,0.05)',
    border: '1px solid rgba(0,229,255,0.1)',
    borderRadius: '8px',
    fontSize: '13px',
    color: 'var(--accent-cyan)',
    fontFamily: 'var(--font-ui)',
    marginBottom: '16px',
    fontWeight: '600',
  },
  goalDot: { color: 'var(--text-dim)', margin: '0 2px' },
  noGoalBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    background: 'rgba(240,165,0,0.06)',
    border: '1px dashed rgba(240,165,0,0.3)',
    borderRadius: '10px',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-ui)',
    marginBottom: '16px',
  },
  noGoalCta: {
    marginLeft: 'auto',
    padding: '6px 14px',
    background: 'rgba(240,165,0,0.15)',
    border: '1px solid rgba(240,165,0,0.35)',
    borderRadius: '7px',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-ui)',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  roadmapProgress: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  rpText: { fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' },
  rpTrack: { flex: 1, height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' },
  rpFill: { height: '100%', background: 'linear-gradient(90deg, #f0a500, #9b4dff)', borderRadius: '3px', transition: 'width 1.2s ease', boxShadow: '0 0 8px rgba(240,165,0,0.4)' },
  rpPct: { fontSize: '12px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontWeight: '700' },

  dayList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  dayCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(136,153,187,0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  },
  dayCardActive: {
    border: '1px solid rgba(240,165,0,0.25)',
    background: 'rgba(240,165,0,0.03)',
  },
  dayCardDone: {
    border: '1px solid rgba(57,255,138,0.15)',
    background: 'rgba(57,255,138,0.02)',
  },
  dayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    cursor: 'pointer',
  },
  dayLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  dayNum: {
    width: '38px', height: '38px',
    borderRadius: '9px',
    background: 'rgba(240,165,0,0.1)',
    border: '1px solid rgba(240,165,0,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--accent-gold)',
    flexShrink: 0,
  },
  dayNumDone: {
    background: 'rgba(57,255,138,0.1)',
    border: '1px solid rgba(57,255,138,0.3)',
    color: 'var(--accent-green)',
    fontSize: '16px',
  },
  dayTheme: { fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' },
  dayMeta: { fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', marginTop: '2px' },
  dayRight: { display: 'flex', alignItems: 'center', gap: '10px' },
  completeBadge: {
    fontSize: '11px',
    color: 'var(--accent-green)',
    background: 'rgba(57,255,138,0.08)',
    border: '1px solid rgba(57,255,138,0.25)',
    padding: '2px 10px',
    borderRadius: '20px',
    fontWeight: '700',
    fontFamily: 'var(--font-ui)',
  },
  problemList: {
    borderTop: '1px solid rgba(136,153,187,0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    padding: '8px',
    background: 'rgba(0,0,0,0.15)',
  },
  problemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    transition: 'background 0.2s ease',
  },
  problemSolved: { background: 'rgba(57,255,138,0.04)' },
  solveBtn: {
    width: '28px', height: '28px',
    borderRadius: '50%',
    border: '2px solid rgba(136,153,187,0.25)',
    background: 'transparent',
    color: 'var(--text-dim)',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.2s ease',
    fontWeight: '700',
  },
  solveBtnDone: {
    border: '2px solid rgba(57,255,138,0.5)',
    background: 'rgba(57,255,138,0.1)',
    color: 'var(--accent-green)',
  },
  probInfo: { flex: 1, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' },
  probLink: {
    fontSize: '13px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontWeight: '600',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
  diffBadge: {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '700',
    fontFamily: 'var(--font-ui)',
    whiteSpace: 'nowrap',
  },
  platformLabel: {
    fontSize: '11px',
    color: 'var(--text-dim)',
    fontFamily: 'var(--font-mono)',
    background: 'rgba(255,255,255,0.04)',
    padding: '2px 6px',
    borderRadius: '4px',
    flexShrink: 0,
  },
};
