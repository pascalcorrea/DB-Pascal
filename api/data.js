export default async function handler(req, res) {
  const SUPA_URL = process.env.SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPA_URL || !SUPA_KEY) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const base = `${SUPA_URL}/rest/v1/user_data`;
  const headers = {
    apikey: SUPA_KEY,
    Authorization: `Bearer ${SUPA_KEY}`,
    'Content-Type': 'application/json',
  };

  if (req.method === 'GET') {
    const r = await fetch(`${base}?id=eq.default&select=clients,tasks,weeks`, { headers });
    if (!r.ok) return res.status(500).json({ error: await r.text() });
    const rows = await r.json();
    const row = rows[0] ?? { clients: null, tasks: null, weeks: null };
    return res.json(row);
  }

  if (req.method === 'POST') {
    const { clients, tasks, weeks } = req.body ?? {};
    const r = await fetch(base, {
      method: 'POST',
      headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ id: 'default', clients, tasks, weeks, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return res.status(500).json({ error: await r.text() });
    return res.json({ ok: true });
  }

  res.status(405).end();
}
