import { useState } from 'react'
import './App.css'
import { login } from './api';
import { User } from './types';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.message || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
  };

  if (user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="user-profile">
            <h2>Selamat Datang, <span className="user-name">{user.nama}</span></h2>
            <p>Anda login sebagai: <span className={`role-badge ${user.role}`}>{user.role}</span></p>
            {user.nisn_nip && <p>ID: {user.nisn_nip}</p>}
          </div>

          <div className="dashboard-content">
            {user.role === 'siswa' && (
              <div className="siswa-dashboard">
                <h3>Menu Siswa</h3>
                <ul>
                  <li>Lihat Materi Pelajaran</li>
                  <li>Kerjakan Tugas</li>
                  <li>Lihat Nilai</li>
                </ul>
                {/* HTML khusus siswa */}
                <div className="code-example">
                  <pre>{`
<!-- Ini adalah siswa -->
<div class="student-profile">
  <h4>Profil Siswa</h4>
  <p>Nama: ${user.nama}</p>
  <p>NISN: ${user.nisn_nip}</p>
</div>
                  `}</pre>
                </div>
              </div>
            )}

            {user.role === 'guru' && (
              <div className="guru-dashboard">
                <h3>Menu Guru</h3>
                <ul>
                  <li>Upload Materi</li>
                  <li>Buat Tugas</li>
                  <li>Input Nilai</li>
                </ul>
                {/* HTML khusus guru */}
                <div className="code-example">
                  <pre>{`
<!-- Ini adalah guru -->
<div class="teacher-profile">
  <h4>Profil Guru</h4>
  <p>Nama: ${user.nama}</p>
  <p>NIP: ${user.nisn_nip}</p>
</div>
                  `}</pre>
                </div>
              </div>
            )}

            {user.role === 'admin' && (
              <div className="admin-dashboard">
                <h3>Menu Admin</h3>
                <ul>
                  <li>Kelola User</li>
                  <li>Kelola Kelas</li>
                  <li>Generate Laporan</li>
                </ul>
                {/* HTML khusus admin */}
                <div className="code-example">
                  <pre>{`
<!-- Ini adalah admin -->
<div class="admin-panel">
  <h4>Panel Administrasi</h4>
  <p>Selamat datang di sistem admin</p>
</div>
                  `}</pre>
                </div>
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="school-brand">
          <img src="/logo.png" alt="Logo SMKN 1 YAUDAH" className="school-logo" />
          <div className="school-info">
            <h2>E-Learning</h2>
            <h1>SMKN 1 YAUDAH</h1>
          </div>
        </div>

        <div className="welcome-message">
          <h3>Selamat Datang</h3>
          <p>Silakan masuk dengan akun Anda</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="username">Nama Pengguna</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;
