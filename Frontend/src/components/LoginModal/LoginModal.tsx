import { useState } from 'react';
import { login } from '../../services/auth';
import { useAuth } from '../../context/authContext';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await login(username, password);
      setAuth({ token: res.token, user: res.user });
      onClose();
    } catch {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-panel">
      <div className="modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Iniciar sesión</h2>
          <button className="btn" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <label htmlFor="username">Usuario</label>
          <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label htmlFor="password">Contraseña</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <div className="muted" style={{ color: '#ef4444', marginTop: 8 }}>{error}</div>}
          <button type="submit" className="btn btn--primary btn--save" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
