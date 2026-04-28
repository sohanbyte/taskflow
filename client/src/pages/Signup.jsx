import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.card}>
        <div className={styles.logo}>TF</div>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.sub}>Start organizing your work today</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input name="name" type="text" value={form.name} onChange={handle} placeholder="Your name" required />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
          </div>
          <div className={styles.field}>
            <label>Password <span style={{color:'var(--muted)',fontWeight:300}}>(min 6 chars)</span></label>
            <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" minLength={6} required />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className={styles.switch}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
