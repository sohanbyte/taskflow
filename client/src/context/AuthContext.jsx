import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('tf_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${API}/api/auth/me`)
        .then(res => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/api/auth/login`, { email, password });
    localStorage.setItem('tf_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setToken(data.token); setUser(data.user);
    return data;
  };

  const signup = async (name, email, password) => {
    const { data } = await axios.post(`${API}/api/auth/signup`, { name, email, password });
    localStorage.setItem('tf_token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setToken(data.token); setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('tf_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null); setUser(null); setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
