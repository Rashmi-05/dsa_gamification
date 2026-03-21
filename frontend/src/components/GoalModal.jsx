import React, { useState } from 'react';
import axios from 'axios';

export default function GoalModal({ onClose, onGoalSet,handle ,rating}) {
  const [step, setStep] = useState(1); // 1: aim, 2: problems, 3: days
  const [aim, setAim] = useState(null);
  const [numProblems, setNumProblems] = useState(14);
  const [numDays, setNumDays] = useState(7);
  const [loading, setLoading] = useState(false);
 
  const handleAimSelect = (choice) => {
    setAim(choice);
    setTimeout(() => setStep(2), 250);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/test3', { aim, numProblems, numDays ,handle,rating}).catch(() => {});
    } catch (_) {}
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onGoalSet({ aim, numProblems, numDays });
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        {/* Step indicator */}
        <div style={styles.stepRow}>
          {[1,2,3].map(s => (
            <React.Fragment key={s}>
              <div style={{ ...styles.stepDot, ...(step >= s ? styles.stepDotActive : {}), ...(step === s ? styles.stepDotCurrent : {}) }}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div style={{ ...styles.stepLine, ...(step > s ? styles.stepLineActive : {}) }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 - Aim */}
        {step === 1 && (
          <div style={styles.content}>
            <div style={styles.emoji}>🎯</div>
            <h2 style={styles.title}>What is your aim?</h2>
            <p style={styles.subtitle}>Choose your quest objective to get a personalized roadmap</p>
            <div style={styles.aimGrid}>
              <button
                style={{ ...styles.aimCard, ...(aim === 'fundamentals' ? styles.aimCardActive : {}) }}
                onClick={() => handleAimSelect('fundamentals')}
              >
                <div style={styles.aimIcon}>🏗</div>
                <div style={styles.aimTitle}>Improve DSA Fundamentals</div>
                <div style={styles.aimDesc}>Master core data structures & algorithms from ground up</div>
                <div style={styles.aimTag}>Beginner → Intermediate</div>
              </button>
              <button
                style={{ ...styles.aimCard, ...(aim === 'contest' ? styles.aimCardActive : {}) }}
                onClick={() => handleAimSelect('contest')}
              >
                <div style={styles.aimIcon}>🏆</div>
                <div style={styles.aimTitle}>Increase Contest Rating</div>
                <div style={styles.aimDesc}>Sharpen speed, problem recognition & competitive strategies</div>
                <div style={styles.aimTag}>Intermediate → Expert</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - Number of problems */}
        {step === 2 && (
          <div style={styles.content}>
            <div style={styles.emoji}>📚</div>
            <h2 style={styles.title}>Set your problem target</h2>
            <p style={styles.subtitle}>How many problems do you want to solve in your quest?</p>

            <div style={styles.sliderWrap}>
              <div style={styles.sliderValue}>{numProblems}</div>
              <div style={styles.sliderLabel}>problems</div>
              <input
                type="range"
                min="5"
                max="50"
                value={numProblems}
                onChange={e => setNumProblems(Number(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>5</span>
                <span style={{ color: 'var(--accent-gold)' }}>Recommended: 14–21</span>
                <span>50</span>
              </div>
            </div>

            <div style={styles.presets}>
              {[7, 14, 21, 30].map(n => (
                <button key={n} style={{ ...styles.preset, ...(numProblems === n ? styles.presetActive : {}) }} onClick={() => setNumProblems(n)}>
                  {n}
                </button>
              ))}
            </div>

            <button style={styles.nextBtn} onClick={() => setStep(3)}>Next →</button>
          </div>
        )}

        {/* Step 3 - Number of days */}
        {step === 3 && (
          <div style={styles.content}>
            <div style={styles.emoji}>📅</div>
            <h2 style={styles.title}>Set your timeline</h2>
            <p style={styles.subtitle}>How many days to complete your quest?</p>

            <div style={styles.sliderWrap}>
              <div style={styles.sliderValue}>{numDays}</div>
              <div style={styles.sliderLabel}>days</div>
              <input
                type="range"
                min="3"
                max="60"
                value={numDays}
                onChange={e => setNumDays(Number(e.target.value))}
                style={styles.slider}
              />
              <div style={styles.sliderRange}>
                <span>3 days</span>
                <span style={{ color: 'var(--accent-gold)' }}>~{(numProblems / numDays).toFixed(1)} problems/day</span>
                <span>60 days</span>
              </div>
            </div>

            <div style={styles.presets}>
              {[7, 14, 21, 30].map(n => (
                <button key={n} style={{ ...styles.preset, ...(numDays === n ? styles.presetActive : {}) }} onClick={() => setNumDays(n)}>
                  {n}d
                </button>
              ))}
            </div>

            <div style={styles.summary}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Objective</span>
                <span style={styles.summaryVal}>{aim === 'fundamentals' ? '🏗 DSA Fundamentals' : '🏆 Contest Rating'}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Problems</span>
                <span style={styles.summaryVal}>{numProblems}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Timeline</span>
                <span style={styles.summaryVal}>{numDays} days</span>
              </div>
            </div>

            <button style={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
              {loading ? '⟳ Generating Roadmap...' : '⚔ Launch My Quest'}
            </button>
          </div>
        )}

        <button style={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: linear-gradient(to right, #f0a500 0%, #f0a500 ${((numProblems-5)/(50-5))*100}%, rgba(255,255,255,0.1) ${((numProblems-5)/(50-5))*100}%, rgba(255,255,255,0.1) 100%);
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #f0a500, #9b4dff);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(240,165,0,0.5);
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '24px',
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    background: 'linear-gradient(135deg, #0d1526 0%, #080d1a 100%)',
    border: '1px solid rgba(240,165,0,0.2)',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '560px',
    position: 'relative',
    boxShadow: '0 0 80px rgba(240,165,0,0.1), 0 40px 100px rgba(0,0,0,0.8)',
    animation: 'fadeInUp 0.35s ease forwards',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px', right: '16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    width: '32px', height: '32px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
  },
  stepRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
    gap: 0,
  },
  stepDot: {
    width: '32px', height: '32px',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px',
    fontFamily: 'var(--font-ui)',
    fontWeight: '700',
    background: 'rgba(255,255,255,0.05)',
    border: '2px solid rgba(136,153,187,0.2)',
    color: 'var(--text-dim)',
    transition: 'all 0.3s ease',
  },
  stepDotActive: {
    background: 'rgba(240,165,0,0.15)',
    border: '2px solid rgba(240,165,0,0.5)',
    color: 'var(--accent-gold)',
  },
  stepDotCurrent: {
    background: 'linear-gradient(135deg, rgba(240,165,0,0.3), rgba(155,77,255,0.2))',
    border: '2px solid var(--accent-gold)',
    color: 'var(--accent-gold)',
    boxShadow: '0 0 16px rgba(240,165,0,0.3)',
  },
  stepLine: {
    height: '2px',
    width: '60px',
    background: 'rgba(136,153,187,0.15)',
    transition: 'all 0.4s ease',
  },
  stepLineActive: {
    background: 'linear-gradient(90deg, var(--accent-gold), rgba(155,77,255,0.5))',
    boxShadow: '0 0 6px rgba(240,165,0,0.3)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    animation: 'fadeInUp 0.3s ease',
  },
  emoji: { fontSize: '48px' },
  title: {
    fontFamily: 'var(--font-title)',
    fontSize: '22px',
    color: 'var(--accent-gold)',
    textAlign: 'center',
    letterSpacing: '0.5px',
  },
  subtitle: {
    fontFamily: 'var(--font-ui)',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    maxWidth: '380px',
  },
  aimGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    width: '100%',
    marginTop: '8px',
  },
  aimCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(136,153,187,0.15)',
    borderRadius: '16px',
    padding: '24px 18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textAlign: 'center',
  },
  aimCardActive: {
    background: 'linear-gradient(135deg, rgba(240,165,0,0.12), rgba(155,77,255,0.08))',
    border: '1px solid rgba(240,165,0,0.4)',
    boxShadow: '0 0 30px rgba(240,165,0,0.12)',
    transform: 'translateY(-2px)',
  },
  aimIcon: { fontSize: '32px' },
  aimTitle: {
    fontFamily: 'var(--font-ui)',
    fontWeight: '700',
    fontSize: '14px',
    color: 'var(--text-primary)',
    lineHeight: 1.3,
  },
  aimDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  aimTag: {
    fontSize: '11px',
    color: 'var(--accent-cyan)',
    background: 'rgba(0,229,255,0.08)',
    border: '1px solid rgba(0,229,255,0.2)',
    padding: '2px 10px',
    borderRadius: '20px',
    fontWeight: '600',
    fontFamily: 'var(--font-ui)',
  },
  sliderWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px',
    background: 'rgba(240,165,0,0.04)',
    border: '1px solid rgba(240,165,0,0.1)',
    borderRadius: '16px',
  },
  sliderValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '52px',
    fontWeight: '900',
    color: 'var(--accent-gold)',
    lineHeight: 1,
    textShadow: '0 0 30px rgba(240,165,0,0.5)',
  },
  sliderLabel: {
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginTop: '-8px',
  },
  slider: { width: '100%' },
  sliderRange: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--text-dim)',
    fontFamily: 'var(--font-ui)',
  },
  presets: {
    display: 'flex',
    gap: '8px',
  },
  preset: {
    padding: '8px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(136,153,187,0.15)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  presetActive: {
    background: 'rgba(240,165,0,0.15)',
    border: '1px solid rgba(240,165,0,0.4)',
    color: 'var(--accent-gold)',
  },
  nextBtn: {
    padding: '14px 40px',
    background: 'linear-gradient(135deg, rgba(240,165,0,0.2), rgba(155,77,255,0.15))',
    border: '1px solid rgba(240,165,0,0.4)',
    borderRadius: '12px',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-ui)',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  summary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(136,153,187,0.12)',
    borderRadius: '12px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-ui)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  summaryVal: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontWeight: '700',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #f0a500 0%, #c07800 50%, #9b4dff 100%)',
    border: 'none',
    borderRadius: '14px',
    color: '#fff',
    fontFamily: 'var(--font-ui)',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(240,165,0,0.3)',
    transition: 'all 0.2s ease',
  },
};
