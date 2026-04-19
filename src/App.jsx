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

function App() {
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
