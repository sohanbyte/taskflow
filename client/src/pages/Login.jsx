import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.card}>
        <div className={styles.logo}>TF</div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.sub}>Sign in to your TaskFlow account</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" required />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.switch}>
          No account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
