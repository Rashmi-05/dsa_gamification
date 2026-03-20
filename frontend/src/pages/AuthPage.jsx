import React, { useState } from 'react';
import axios from 'axios';

const EyeIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7L12 2z" stroke="var(--accent-gold)"/>
    <path d="M9 12l2 2 4-4" stroke="var(--accent-gold)"/>
  </svg>
);

export default function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const errs = {};
    if (mode === 'signup') {
      if (!form.username) errs.username = 'Username is required';
      else if (form.username.length < 5 || form.username.length > 10)
        errs.username = 'Username must be 5–10 characters';
      if (!form.email) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = 'Enter a valid email address';
    } else {
      if (!form.username) errs.username = 'Username is required';
      else if (form.username.length < 5 || form.username.length > 10)
        errs.username = 'Username must be 5–10 characters';
    }
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 5 || form.password.length > 10)
      errs.password = 'Password must be 5–10 characters';
    if (mode === 'signup') {
      if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
      else if (form.password !== form.confirmPassword)
        errs.confirmPassword = 'Passwords do not match';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      if (mode === 'signup') {
        await axios.post('/api/signup', {
          username: form.username,
          email: form.email,
          password: form.password,
        }).catch(() => {}); 
      } else {
        await axios.post('/api/login', {
          username: form.username,
          password: form.password,
        }).catch(() => {}); 
      }
    } catch (_) {}
    setLoading(false);
    onSuccess({ username: form.username, email: form.email });
  };

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: undefined }));
  };

  return (
    <div style={styles.root}>
      {/* Animated background orbs */}
      <div style={{...styles.orb, ...styles.orb1}} />
      <div style={{...styles.orb, ...styles.orb2}} />
      <div style={{...styles.orb, ...styles.orb3}} />

      <div style={styles.card} className={shake ? 'shake' : ''}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}><ShieldIcon /></div>
          <div>
            <div style={styles.logoTitle}>DSA Quest</div>
            <div style={styles.logoSub}>Level Up Your Coding Journey</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={styles.tabs}>
          <button style={{...styles.tab, ...(mode === 'signup' ? styles.tabActive : {})}} onClick={() => { setMode('signup'); setErrors({}); }}>
            Create Account
          </button>
          <button style={{...styles.tab, ...(mode === 'login' ? styles.tabActive : {})}} onClick={() => { setMode('login'); setErrors({}); }}>
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          {/* Username */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>⚔</span>
              <input
                style={{...styles.input, ...(errors.username ? styles.inputError : {})}}
                type="text"
                placeholder="5–10 characters"
                value={form.username}
                onChange={handleChange('username')}
                maxLength={10}
              />
              <span style={styles.charCount}>{form.username.length}/10</span>
            </div>
            {errors.username && <p style={styles.error}>{errors.username}</p>}
          </div>

          {/* Email (signup only) */}
          {mode === 'signup' && (
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>✦</span>
                <input
                  style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </div>
              {errors.email && <p style={styles.error}>{errors.email}</p>}
            </div>
          )}

          {/* Password */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                style={{...styles.input, ...(errors.password ? styles.inputError : {})}}
                type={showPass ? 'text' : 'password'}
                placeholder="5–10 characters"
                value={form.password}
                onChange={handleChange('password')}
                maxLength={10}
              />
              <button type="button" style={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>
                <EyeIcon open={showPass} />
              </button>
            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          {/* Confirm Password (signup only) */}
          {mode === 'signup' && (
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  style={{...styles.input, ...(errors.confirmPassword ? styles.inputError : {})}}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  maxLength={10}
                />
                <button type="button" style={styles.eyeBtn} onClick={() => setShowConfirm(v => !v)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
            </div>
          )}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span style={styles.loadingDots}>
                <span>●</span><span>●</span><span>●</span>
              </span>
            ) : (
              mode === 'signup' ? '⚔  Begin Your Quest' : '⚔  Enter the Arena'
            )}
          </button>

          <div style={styles.switchWrap}>
            {mode === 'signup' ? (
              <>
                <span style={styles.switchText}>Already have an account?</span>
                <button type="button" style={styles.switchLink} onClick={() => { setMode('login'); setErrors({}); }}>Sign In</button>
              </>
            ) : (
              <>
                <span style={styles.switchText}>New adventurer?</span>
                <button type="button" style={styles.switchLink} onClick={() => { setMode('signup'); setErrors({}); }}>Create Account</button>
              </>
            )}
          </div>
        </form>
      </div>

      <style>{`
        @keyframes orb-float {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-20px) scale(1.05); }
          66% { transform: translate(-15px,-35px) scale(0.95); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes dots {
          0%,100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .shake { animation: shake 0.5s ease; }
        input::placeholder { color: var(--text-dim); }
        input:focus { outline: none; }
        button:hover { cursor: pointer; }
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
    overflow: 'hidden',
  },
  orb: {
    position: 'fixed',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'orb-float 12s ease-in-out infinite',
  },
  orb1: {
    width: 400, height: 400,
    background: 'radial-gradient(circle, rgba(240,165,0,0.15) 0%, transparent 70%)',
    top: '-100px', left: '-100px',
    animationDelay: '0s',
  },
  orb2: {
    width: 500, height: 500,
    background: 'radial-gradient(circle, rgba(155,77,255,0.12) 0%, transparent 70%)',
    bottom: '-150px', right: '-100px',
    animationDelay: '-5s',
  },
  orb3: {
    width: 300, height: 300,
    background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)',
    top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)',
    animationDelay: '-8s',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(13,21,38,0.95) 0%, rgba(8,13,26,0.98) 100%)',
    border: '1px solid rgba(240,165,0,0.2)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    position: 'relative',
    boxShadow: '0 0 60px rgba(240,165,0,0.08), 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(240,165,0,0.1)',
    animation: 'fadeInUp 0.6s ease forwards',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
  },
  logoIcon: {
    width: 56, height: 56,
    background: 'linear-gradient(135deg, rgba(240,165,0,0.15), rgba(155,77,255,0.1))',
    borderRadius: '14px',
    border: '1px solid rgba(240,165,0,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'pulse-glow 3s ease-in-out infinite',
  },
  logoTitle: {
    fontFamily: 'var(--font-title)',
    fontSize: '22px',
    color: 'var(--accent-gold)',
    letterSpacing: '1px',
    lineHeight: 1.2,
  },
  logoSub: {
    fontFamily: 'var(--font-ui)',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    letterSpacing: '0.5px',
    marginTop: '2px',
  },
  tabs: {
    display: 'flex',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '28px',
    border: '1px solid var(--border-subtle)',
  },
  tab: {
    flex: 1,
    padding: '10px',
    background: 'transparent',
    border: 'none',
    borderRadius: '7px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-ui)',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  tabActive: {
    background: 'linear-gradient(135deg, rgba(240,165,0,0.2), rgba(155,77,255,0.15))',
    color: 'var(--accent-gold)',
    boxShadow: '0 2px 12px rgba(240,165,0,0.15)',
    border: '1px solid rgba(240,165,0,0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: 'var(--font-ui)',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '14px',
    color: 'var(--text-dim)',
    zIndex: 1,
    pointerEvents: 'none',
    userSelect: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 44px 12px 40px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(136,153,187,0.2)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  inputError: {
    borderColor: 'rgba(255,69,96,0.5)',
    boxShadow: '0 0 0 2px rgba(255,69,96,0.1)',
  },
  charCount: {
    position: 'absolute',
    right: '12px',
    fontSize: '11px',
    color: 'var(--text-dim)',
    fontFamily: 'var(--font-mono)',
    pointerEvents: 'none',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    cursor: 'pointer',
    transition: 'color 0.2s',
    zIndex: 1,
  },
  error: {
    fontSize: '12px',
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-ui)',
    fontWeight: '500',
    paddingLeft: '4px',
  },
  submitBtn: {
    marginTop: '8px',
    padding: '15px',
    background: 'linear-gradient(135deg, #f0a500 0%, #c07800 50%, #9b4dff 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontFamily: 'var(--font-ui)',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 24px rgba(240,165,0,0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  loadingDots: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    fontSize: '10px',
  },
  switchWrap: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    alignItems: 'center',
    paddingTop: '4px',
  },
  switchText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-ui)',
  },
  switchLink: {
    background: 'transparent',
    border: 'none',
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(240,165,0,0.4)',
  },
};
