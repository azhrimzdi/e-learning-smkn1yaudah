export interface User {
  id: number;
  username: string;
  role: 'siswa' | 'guru' | 'admin';
  nama: string;
  nisn_nip?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}
