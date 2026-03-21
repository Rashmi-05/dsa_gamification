import React, { useState } from 'react';
import axios from 'axios';
import { mockLeetCodeStats, mockCodeforcesStats } from '../data/mockData.js';

const LeetCodeLogo = () => (
  <svg width="36" height="36" viewBox="0 0 95 111" fill="none">
    <path d="M68.1 78.3L44 102.5c-2.2 2.2-5.1 3.5-8.1 3.5s-5.9-1.3-8.1-3.5L9.5 84.1c-4.4-4.5-4.4-11.7 0-16.2l32.9-33c.5-.5 1.3-.5 1.8 0l3.6 3.6c.5.5.5 1.3 0 1.8L15.3 73.4c-2.2 2.2-2.2 5.7 0 7.9l18.3 18.3c2.2 2.2 5.7 2.2 7.9 0l24.1-24.2c.5-.5 1.3-.5 1.8 0l1.4 1.4c.5.5.5 1.3-.7 2.5z" fill="#F0A500"/>
    <path d="M85.6 27l-19-19c-2.2-2.2-5.1-3.5-8.1-3.5H35.9c-3 0-5.9 1.3-8.1 3.5L9.5 26.3c-4.4 4.5-4.4 11.7 0 16.2l32.9 33c.5.5 1.3.5 1.8 0l3.6-3.6c.5-.5.5-1.3 0-1.8L15.3 37.1c-2.2-2.2-2.2-5.7 0-7.9l18.3-18.3c2.2-2.2 5.7-2.2 7.9 0l18 18 7.9-7.9z" fill="#00E5FF"/>
    <path d="M85.4 84.2c4.4-4.5 4.4-11.7 0-16.2L52.5 35c-.5-.5-1.3-.5-1.8 0l-3.6 3.6c-.5.5-.5 1.3 0 1.8l32.9 33c2.2 2.2 2.2 5.7 0 7.9L61.7 99.6c-2.2 2.2-5.7 2.2-7.9 0L45.4 91l-7.9 7.9 9.8 9.8c4.4 4.5 11.7 4.5 16.2 0l21.9-24.5z" fill="#9B4DFF"/>
  </svg>
);

const CodeforcesLogo = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <rect x="1" y="10" width="5" height="13" rx="1" fill="#00E5FF"/>
    <rect x="9.5" y="4" width="5" height="19" rx="1" fill="#F0A500"/>
    <rect x="18" y="7" width="5" height="16" rx="1" fill="#9B4DFF"/>
  </svg>
);

export default function ConnectPage({ user, onSuccess }) {
  const [platform, setPlatform] = useState(null); // 'leetcode' | 'codeforces'
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    if (!userId.trim()) { setError('Please enter your user ID'); return; }
    if (!platform) { setError('Please select a platform'); return; }
    setError('');
    setLoading(true);
let data
   try {
  const response = await axios.post('http://localhost:5000/test2',{ platform, userId });
  data = response.data
  //return data;
} catch (error) {
  console.error('API call failed:', error.message);
  //throw error; // rethrow if needed
}

    // Use mock data
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    //const data = platform === 'leetcode' ? mockLeetCodeStats : mockCodeforcesStats;
    onSuccess({ platform, userId, stats: data });
  };

  return (
    <div style={styles.root}>
      <div style={{...styles.orb, ...styles.orb1}} />
      <div style={{...styles.orb, ...styles.orb2}} />

      <div style={styles.card}>
        <div style={styles.greeting}>
          <span style={styles.wave}>👋</span>
          <div>
            <div style={styles.greetTitle}>Welcome, <span style={{ color: 'var(--accent-gold)' }}>{user?.username}</span></div>
            <div style={styles.greetSub}>Connect your competitive programming account to begin</div>
          </div>
        </div>

        <div style={styles.sectionTitle}>Choose Your Platform</div>

        <div style={styles.platformGrid}>
          <button
            style={{...styles.platformCard, ...(platform === 'leetcode' ? styles.platformActive : {})}}
            onClick={() => { setPlatform('leetcode'); setError(''); }}
          >
            <div style={styles.platformLogo}><LeetCodeLogo /></div>
            <div style={styles.platformName}>LeetCode</div>
            <div style={styles.platformSub}>Problems & Contests</div>
            {platform === 'leetcode' && <div style={styles.selectedBadge}>✓ Selected</div>}
          </button>

          <button
            style={{...styles.platformCard, ...(platform === 'codeforces' ? styles.platformActive : {})}}
            onClick={() => { setPlatform('codeforces'); setError(''); }}
          >
            <div style={styles.platformLogo}><CodeforcesLogo /></div>
            <div style={styles.platformName}>Codeforces</div>
            <div style={styles.platformSub}>Competitive Rating</div>
            {platform === 'codeforces' && <div style={styles.selectedBadge}>✓ Selected</div>}
          </button>
        </div>

        <div style={styles.inputSection}>
          <label style={styles.label}>
            {platform === 'leetcode' ? 'LeetCode Username' : platform === 'codeforces' ? 'Codeforces Handle' : 'Your User ID'}
          </label>
          <div style={styles.inputRow}>
            <input
              style={{...styles.input, ...(error ? styles.inputError : {})}}
              type="text"
              placeholder={platform === 'leetcode' ? 'e.g. knight_coder' : platform === 'codeforces' ? 'e.g. tourist' : 'Select a platform first'}
              value={userId}
              onChange={e => { setUserId(e.target.value); setError(''); }}
              disabled={!platform}
            />
            <button
              style={{...styles.connectBtn, ...(loading ? styles.connectBtnLoading : {})}}
              onClick={handleConnect}
              disabled={loading || !platform}
            >
              {loading ? (
                <span style={styles.spinner}>⟳</span>
              ) : (
                '→ Connect'
              )}
            </button>
          </div>
          {error && <p style={styles.error}>{error}</p>}
        </div>

        <div style={styles.footer}>
          <div style={styles.footerIcon}>🔒</div>
          <div style={styles.footerText}>We only read public profile data. Your credentials are never stored.</div>
        </div>
      </div>

      <style>{`
        @keyframes orb-float {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-20px) scale(1.05); }
          66% { transform: translate(-15px,-35px) scale(0.95); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: var(--text-dim); }
        input:focus { outline: none; border-color: rgba(240,165,0,0.4) !important; box-shadow: 0 0 0 3px rgba(240,165,0,0.1); }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
  },
  orb: {
    position: 'fixed',
    borderRadius: '50%',
    filter: 'blur(100px)',
    pointerEvents: 'none',
    animation: 'orb-float 15s ease-in-out infinite',
  },
  orb1: {
    width: 600, height: 600,
    background: 'radial-gradient(circle, rgba(155,77,255,0.1) 0%, transparent 70%)',
    top: '-200px', right: '-200px',
  },
  orb2: {
    width: 400, height: 400,
    background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
    bottom: '-100px', left: '-100px',
    animationDelay: '-7s',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(13,21,38,0.97) 0%, rgba(8,13,26,0.99) 100%)',
    border: '1px solid rgba(240,165,0,0.15)',
    borderRadius: '24px',
    padding: '48px',
    width: '100%',
    maxWidth: '560px',
    boxShadow: '0 0 80px rgba(155,77,255,0.08), 0 24px 80px rgba(0,0,0,0.7)',
    animation: 'fadeInUp 0.5s ease forwards',
  },
  greeting: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '40px',
    padding: '20px',
    background: 'rgba(240,165,0,0.05)',
    borderRadius: '14px',
    border: '1px solid rgba(240,165,0,0.1)',
  },
  wave: { fontSize: '36px', animation: 'float 2s ease-in-out infinite' },
  greetTitle: {
    fontFamily: 'var(--font-ui)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  greetSub: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '2px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  platformGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '32px',
  },
  platformCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(136,153,187,0.15)',
    borderRadius: '16px',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    position: 'relative',
  },
  platformActive: {
    background: 'linear-gradient(135deg, rgba(240,165,0,0.1), rgba(155,77,255,0.08))',
    border: '1px solid rgba(240,165,0,0.35)',
    boxShadow: '0 0 30px rgba(240,165,0,0.1)',
    transform: 'translateY(-2px)',
  },
  platformLogo: { marginBottom: '4px' },
  platformName: {
    fontFamily: 'var(--font-ui)',
    fontWeight: '700',
    fontSize: '16px',
    color: 'var(--text-primary)',
  },
  platformSub: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  selectedBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(57,255,138,0.15)',
    border: '1px solid rgba(57,255,138,0.3)',
    color: 'var(--accent-green)',
    fontSize: '11px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '24px',
  },
  label: {
    fontFamily: 'var(--font-ui)',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
  },
  inputRow: {
    display: 'flex',
    gap: '12px',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(136,153,187,0.2)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  inputError: { borderColor: 'rgba(255,69,96,0.5)' },
  connectBtn: {
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #f0a500, #9b4dff)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontFamily: 'var(--font-ui)',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 20px rgba(240,165,0,0.25)',
  },
  connectBtnLoading: { opacity: 0.7 },
  spinner: {
    display: 'inline-block',
    animation: 'spin 0.8s linear infinite',
    fontSize: '18px',
  },
  error: {
    fontSize: '12px',
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-ui)',
    fontWeight: '500',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 18px',
    background: 'rgba(0,229,255,0.04)',
    border: '1px solid rgba(0,229,255,0.1)',
    borderRadius: '10px',
  },
  footerIcon: { fontSize: '16px' },
  footerText: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-ui)',
  },
};
