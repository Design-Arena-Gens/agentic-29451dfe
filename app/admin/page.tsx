"use client";
import { useEffect, useState } from 'react';
import defaultConfig from '@/data/defaultConfig.json';

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [config, setConfig] = useState<any>(null);
  const [remoteUrl, setRemoteUrl] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/me', { cache: 'no-store' });
      const j = await res.json();
      setAuthed(!!j.authenticated);
    })();
  }, []);

  useEffect(() => {
    if (!authed) return;
    const saved = localStorage.getItem('portfolio:config');
    setConfig(saved ? JSON.parse(saved) : defaultConfig);
  }, [authed]);

  useEffect(() => {
    if (config) localStorage.setItem('portfolio:config', JSON.stringify(config));
  }, [config]);

  async function loadRemote() {
    setStatus('Loading remote config?');
    try {
      const res = await fetch(remoteUrl);
      const json = await res.json();
      setConfig(json);
      setStatus('Loaded remote config');
    } catch (e: any) {
      setStatus('Failed to load remote: ' + e?.message);
    }
  }

  function resetDefault() {
    setConfig(defaultConfig);
    setStatus('Reset to default');
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) {
      setAuthed(true);
    } else {
      setStatus('Invalid password');
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
  }

  if (authed === null) return null;

  if (!authed) {
    return (
      <main className="container-width py-24">
        <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-white/70 text-sm mt-1">Enter the admin password to continue.</p>
          <form onSubmit={login} className="mt-6 grid gap-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="px-4 py-3 rounded-xl bg-black/30 border border-white/10" />
            <button className="px-4 py-3 rounded-xl bg-brand-500">Login</button>
          </form>
          {status && <p className="text-sm text-white/70 mt-3">{status}</p>}
          <p className="text-xs text-white/50 mt-4">Tip: If no ADMIN_PASSWORD is set on the server, any password works.</p>
        </div>
      </main>
    );
  }

  if (!config) return null;

  return (
    <main className="container-width py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/70">Edit content config, import/export JSON, or load from a remote URL. Changes are saved in your browser.</p>
        </div>
        <button onClick={logout} className="px-3 py-2 rounded-lg bg-white/10">Logout</button>
      </div>

      <section className="grid md:grid-cols-[1fr,380px] gap-6">
        <textarea
          className="min-h-[520px] rounded-xl bg-white/5 border border-white/10 p-4 font-mono text-sm"
          value={JSON.stringify(config, null, 2)}
          onChange={(e) => {
            try { setConfig(JSON.parse(e.target.value)); setStatus(null); }
            catch { setStatus('Invalid JSON'); }
          }}
        />
        <div className="space-y-4">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <h2 className="font-semibold">Import / Export</h2>
            <div className="flex gap-2 mt-3">
              <label className="px-3 py-2 rounded-lg bg-white/10 cursor-pointer">
                Import JSON
                <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const text = await file.text();
                  setConfig(JSON.parse(text));
                }} />
              </label>
              <button onClick={() => downloadJson('portfolio-config.json', config)} className="px-3 py-2 rounded-lg bg-brand-500">Export JSON</button>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
            <h2 className="font-semibold">Remote Config URL</h2>
            <input value={remoteUrl} onChange={(e) => setRemoteUrl(e.target.value)} placeholder="https://domain.com/config.json" className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10" />
            <div className="flex gap-2">
              <button onClick={loadRemote} className="px-3 py-2 rounded-lg bg-white/10">Load</button>
              <button onClick={resetDefault} className="px-3 py-2 rounded-lg bg-white/10">Reset Default</button>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <h2 className="font-semibold">Status</h2>
            <p className="text-white/70 text-sm mt-2">{status || '?'}</p>
          </div>
        </div>
      </section>

      <p className="text-sm text-white/60">Tip: host your exported JSON on GitHub Gist/RAW or any CDN and paste the URL above. Then update the client to fetch it if desired.</p>
    </main>
  );
}
