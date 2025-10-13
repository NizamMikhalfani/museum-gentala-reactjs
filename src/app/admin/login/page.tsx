'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Password from '@/components/Password';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        // Prefer server redirect, but fallback to client-side navigation
        router.replace('/admin'); // client redirect fallback
      } else {
        const data = await res.json().catch(() => ({} as { error?: string }));
        setError((data as { error?: string })?.error ?? 'Login failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.card} onSubmit={onSubmit} noValidate>
        <h1 className={styles.title}>Admin Login</h1>

        <div className={styles.control}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="username"
            inputMode="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={styles.input}
          />
        </div>

        <Password
          name="password"
          onInput={(name, value) => update(name, value)}
        />

        {error && <p role="alert" className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.submit}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
