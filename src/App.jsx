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
  syncDot: {
    position: 'fixed',
    bottom: 12,
    right: 14,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--text-3)',
    opacity: 0.5,
    transition: 'background 0.3s, opacity 0.3s',
    zIndex: 9999,
  },
  syncDotSaving: {
    background: 'oklch(0.65 0.15 155)',
    opacity: 1,
  },
  syncDotError: {
    background: 'var(--danger)',
    opacity: 1,
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
  { id: uid(), name: 'Café Lunares', color: CLIENT_COLORS[0], calVisible: true },
  { id: uid(), name: 'Estudio Norte', color: CLIENT_COLORS[1], calVisible: true },
  { id: uid(), name: 'Bruma Swim', color: CLIENT_COLORS[2], calVisible: true },
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

// Sync status: 'idle' | 'saving' | 'error'
function App() {
  const [activeTab, setActiveTab] = React.useState(() => loadLS(STORAGE_KEYS.activeTab, 'tasks'));

  // Init from localStorage for instant load; API fetch will overwrite with cloud data
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

  const [syncStatus, setSyncStatus] = React.useState('idle');
  const initialized = React.useRef(false);
  const saveTimer = React.useRef(null);

  // On mount: pull latest data from Supabase via API
  React.useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.clients)) setClients(data.clients);
        if (Array.isArray(data.tasks))   setTasks(data.tasks);
        if (Array.isArray(data.weeks))   setWeeks(data.weeks);
        // DB vacío — subir datos locales por primera vez
        if (!Array.isArray(data.clients) && !Array.isArray(data.tasks) && !Array.isArray(data.weeks)) {
          initialized.current = true;
          const localClients = loadLS(STORAGE_KEYS.clients, SEED_CLIENTS);
          const localTasks   = loadLS(STORAGE_KEYS.tasks, []);
          const localWeeks   = loadLS(STORAGE_KEYS.weeks, []);
          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clients: localClients, tasks: localTasks, weeks: localWeeks }),
          }).catch(() => {});
          return;
        }
        initialized.current = true;
      })
      .catch(() => { initialized.current = true; /* red failure — keep localStorage data */ });
  }, []);

  // Persist activeTab locally only
  React.useEffect(() => { saveLS(STORAGE_KEYS.activeTab, activeTab); }, [activeTab]);

  // On any data change: cache locally + debounced save to Supabase
  React.useEffect(() => {
    if (!initialized.current) return;

    saveLS(STORAGE_KEYS.clients, clients);
    saveLS(STORAGE_KEYS.tasks, tasks);
    saveLS(STORAGE_KEYS.weeks, weeks);

    setSyncStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clients, tasks, weeks }),
      })
        .then(r => r.ok ? setSyncStatus('idle') : setSyncStatus('error'))
        .catch(() => setSyncStatus('error'));
    }, 1200);
  }, [clients, tasks, weeks]);

  const addClient = (name) => {
    const color = CLIENT_COLORS[clients.length % CLIENT_COLORS.length];
    setClients([...clients, { id: uid(), name, color, calVisible: true }]);
  };

  const toggleCalVisible = (id) => {
    setClients(clients.map((c) => c.id === id ? { ...c, calVisible: c.calVisible === false ? true : false } : c));
  };

  const removeClient = (id) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  const pendingCount = tasks.filter((t) => !t.done).length;

  const dotStyle = {
    ...appStyles.syncDot,
    ...(syncStatus === 'saving' ? appStyles.syncDotSaving : {}),
    ...(syncStatus === 'error'  ? appStyles.syncDotError  : {}),
  };

  return (
    <div style={appStyles.shell}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        clients={clients}
        onAddClient={addClient}
        onRemoveClient={removeClient}
        onToggleCalVisible={toggleCalVisible}
      />
      <main style={appStyles.main} data-screen-label={activeTab === 'tasks' ? 'Tareas' : 'Calendario'}>
        {activeTab === 'tasks' ? (
          <TasksView tasks={tasks} setTasks={setTasks} clients={clients} onAddClient={addClient} />
        ) : (
          <CalendarView weeks={weeks} setWeeks={setWeeks} clients={clients} />
        )}
      </main>
      <div style={dotStyle} title={syncStatus === 'error' ? 'Error al guardar' : syncStatus === 'saving' ? 'Guardando…' : 'Sincronizado'} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
