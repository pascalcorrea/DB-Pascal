// App principal: tabs + persistencia + estado raíz

const appStyles = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--bg)',
  },
  main: {
    flex: 1,
    minWidth: 0,
    overflowY: 'auto',
    height: '100vh',
  },
};

// Paleta de colores asignada rotativamente a clientes nuevos
const CLIENT_COLORS = [
  'oklch(0.65 0.18 280)', // violeta (accent)
  'oklch(0.70 0.15 200)', // turquesa
  'oklch(0.72 0.16 70)',  // ámbar
  'oklch(0.65 0.18 25)',  // coral
  'oklch(0.65 0.15 155)', // verde
  'oklch(0.60 0.18 330)', // magenta
  'oklch(0.65 0.15 240)', // azul
  'oklch(0.70 0.14 110)', // lima
];

const SEED_CLIENTS = [
  { id: uid(), name: 'Café Lunares', color: CLIENT_COLORS[0] },
  { id: uid(), name: 'Estudio Norte', color: CLIENT_COLORS[1] },
  { id: uid(), name: 'Bruma Swim', color: CLIENT_COLORS[2] },
];

function todayIso() { return isoDate(new Date()); }
function plusDays(n) { return isoDate(addDays(new Date(), n)); }

function makeSeedTasks(clients) {
  return [
    { id: uid(), cliente: clients[0].name, descripcion: 'Preparar carrusel de lanzamiento de temporada', fecha: plusDays(1), done: false, createdAt: Date.now() },
    { id: uid(), cliente: clients[1].name, descripcion: 'Guión para reel sobre el nuevo servicio', fecha: plusDays(3), done: false, createdAt: Date.now() },
    { id: uid(), cliente: clients[2].name, descripcion: 'Revisar copys aprobados y agendar publicaciones', fecha: plusDays(-1), done: false, createdAt: Date.now() },
    { id: uid(), cliente: clients[0].name, descripcion: 'Sesión de fotos del menú de otoño', fecha: plusDays(6), done: false, createdAt: Date.now() },
    { id: uid(), cliente: clients[1].name, descripcion: 'Entregar plan mensual de mayo', fecha: plusDays(-3), done: true, createdAt: Date.now() - 86400000 * 5 },
  ];
}

function makeSeedWeeks(clients) {
  const thisWeek = weekId(new Date());
  const lastWeek = isoDate(addDays(new Date(thisWeek + 'T00:00:00'), -7));
  return [
    {
      id: lastWeek,
      clients: [
        { clientId: clients[0].id, state: 'aprobado' },
        { clientId: clients[1].id, state: 'aprobado' },
        { clientId: clients[2].id, state: 'cliente' },
      ],
    },
    {
      id: thisWeek,
      clients: [
        { clientId: clients[0].id, state: 'diseno' },
        { clientId: clients[1].id, state: 'cliente' },
        { clientId: clients[2].id, state: 'pendiente' },
      ],
    },
  ];
}

const AUTH = { email: 'pascal@brootal.cl', password: 'Pecv1998@' };

function LoginScreen({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === AUTH.email && password === AUTH.password) {
      onLogin();
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{
        width: '100%', maxWidth: 380, padding: 40,
        background: 'var(--surface)', borderRadius: 16,
        border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
      }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Brootal Dashboard
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Ingresá tus credenciales para continuar</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.02em' }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="tu@email.cl"
              autoFocus
              style={{
                height: 40, padding: '0 12px', borderRadius: 8,
                border: `1px solid ${error ? 'var(--danger)' : 'var(--border-strong)'}`,
                background: 'var(--surface)', fontSize: 14,
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border-strong)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.02em' }}>
              CONTRASEÑA
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                style={{
                  width: '100%', height: 40, padding: '0 40px 0 12px', borderRadius: 8,
                  border: `1px solid ${error ? 'var(--danger)' : 'var(--border-strong)'}`,
                  background: 'var(--surface)', fontSize: 14,
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border-strong)'}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--text-3)', padding: 4,
                }}
              >
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 12.5, color: 'var(--danger)', fontWeight: 500 }}>{error}</div>
          )}

          <button
            type="submit"
            style={{
              marginTop: 6, height: 42, borderRadius: 8,
              background: 'var(--accent)', color: 'white',
              fontSize: 14, fontWeight: 600,
              transition: 'filter 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [authed, setAuthed] = React.useState(() => sessionStorage.getItem('brootal_auth') === '1');
  const [activeTab, setActiveTab] = React.useState(() => loadLS(STORAGE_KEYS.activeTab, 'tasks'));
  const [clients, setClients] = React.useState(() => loadLS(STORAGE_KEYS.clients, SEED_CLIENTS));
  const [tasks, setTasks] = React.useState(() => {
    const saved = loadLS(STORAGE_KEYS.tasks, null);
    if (saved !== null) return saved;
    const c = loadLS(STORAGE_KEYS.clients, SEED_CLIENTS);
    return makeSeedTasks(c);
  });
  const [weeks, setWeeks] = React.useState(() => {
    const saved = loadLS(STORAGE_KEYS.weeks, null);
    if (saved !== null) return saved;
    const c = loadLS(STORAGE_KEYS.clients, SEED_CLIENTS);
    return makeSeedWeeks(c);
  });

  React.useEffect(() => { saveLS(STORAGE_KEYS.activeTab, activeTab); }, [activeTab]);
  React.useEffect(() => { saveLS(STORAGE_KEYS.clients, clients); }, [clients]);
  React.useEffect(() => { saveLS(STORAGE_KEYS.tasks, tasks); }, [tasks]);
  React.useEffect(() => { saveLS(STORAGE_KEYS.weeks, weeks); }, [weeks]);

  const addClient = (name) => {
    const color = CLIENT_COLORS[clients.length % CLIENT_COLORS.length];
    setClients([...clients, { id: uid(), name, color }]);
  };

  const removeClient = (id) => {
    setClients(clients.filter((c) => c.id !== id));
    // No borramos tasks/weeks para preservar historial, sólo queda "sin asignar" o "cliente eliminado"
  };

  const pendingCount = tasks.filter((t) => !t.done).length;

  const handleLogin = () => {
    sessionStorage.setItem('brootal_auth', '1');
    setAuthed(true);
  };

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div style={appStyles.shell}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        clients={clients}
        onAddClient={addClient}
        onRemoveClient={removeClient}
      />
      <main style={appStyles.main} data-screen-label={activeTab === 'tasks' ? 'Tareas' : 'Calendario'}>
        {activeTab === 'tasks' ? (
          <TasksView tasks={tasks} setTasks={setTasks} clients={clients} />
        ) : (
          <CalendarView weeks={weeks} setWeeks={setWeeks} clients={clients} />
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
