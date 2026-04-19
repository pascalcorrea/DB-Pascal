// Pestaña de Tareas pendientes

const tasksStyles = {
  wrap: {
    padding: '32px 40px 40px',
    maxWidth: 1100,
    margin: '0 auto',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    margin: 0,
  },
  subtitle: { fontSize: 13, color: 'var(--text-2)', marginTop: 4 },
  stats: {
    display: 'flex',
    gap: 10,
  },
  stat: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '10px 16px',
    minWidth: 90,
  },
  statNum: { fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'JetBrains Mono, monospace' },
  statLabel: { fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 },

  toolbar: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  search: {
    flex: 1,
    minWidth: 200,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    height: 38,
    padding: '0 12px 0 34px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    background: 'var(--surface)',
    fontSize: 13.5,
    transition: 'border 0.15s, box-shadow 0.15s',
  },
  searchIcon: {
    position: 'absolute',
    left: 11,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-3)',
    pointerEvents: 'none',
  },
  select: {
    height: 38,
    padding: '0 28px 0 12px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    background: `var(--surface) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%238a8680' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>") no-repeat right 12px center`,
    fontSize: 13.5,
    appearance: 'none',
    cursor: 'pointer',
    minWidth: 150,
  },
  filterPill: (active) => ({
    height: 38,
    padding: '0 14px',
    borderRadius: 8,
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    background: active ? 'var(--accent-soft)' : 'var(--surface)',
    color: active ? 'var(--accent-text)' : 'var(--text-2)',
    fontSize: 13,
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  }),
  addBtn: {
    height: 38,
    padding: '0 16px',
    borderRadius: 8,
    background: 'var(--accent)',
    color: 'white',
    fontWeight: 600,
    fontSize: 13.5,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    boxShadow: 'var(--shadow-sm)',
  },

  list: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
  },
  listHeader: {
    display: 'grid',
    gridTemplateColumns: '36px 180px 1fr 140px 120px 40px',
    gap: 12,
    padding: '12px 20px',
    borderBottom: '1px solid var(--border)',
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text-3)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    background: 'var(--surface-2)',
  },
  row: (done) => ({
    display: 'grid',
    gridTemplateColumns: '36px 180px 1fr 140px 120px 40px',
    gap: 12,
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    alignItems: 'center',
    fontSize: 13.5,
    transition: 'background 0.12s',
    opacity: done ? 0.55 : 1,
  }),
  checkbox: (checked) => ({
    width: 20,
    height: 20,
    borderRadius: 6,
    border: `1.5px solid ${checked ? 'var(--success)' : 'var(--border-strong)'}`,
    background: checked ? 'var(--success)' : 'var(--surface)',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  client: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 500,
    color: 'var(--text)',
  },
  clientDot: (color) => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: color || 'var(--accent)',
    flexShrink: 0,
  }),
  desc: (done) => ({
    color: 'var(--text)',
    textDecoration: done ? 'line-through' : 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  date: (overdue, done) => ({
    fontSize: 12.5,
    fontFamily: 'JetBrains Mono, monospace',
    color: done ? 'var(--text-3)' : (overdue ? 'var(--danger)' : 'var(--text-2)'),
    fontWeight: overdue && !done ? 600 : 500,
  }),
  dateChip: (overdue, done, soon) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 5,
    fontSize: 11,
    fontWeight: 600,
    background: done ? 'var(--surface-2)' : (overdue ? 'var(--danger-soft)' : (soon ? 'var(--warn-soft)' : 'var(--surface-2)')),
    color: done ? 'var(--text-3)' : (overdue ? 'var(--danger)' : (soon ? 'oklch(0.45 0.15 70)' : 'var(--text-2)')),
    marginTop: 2,
  }),
  delBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    color: 'var(--text-3)',
    opacity: 0,
    transition: 'opacity 0.15s, background 0.15s, color 0.15s',
  },

  empty: {
    padding: '60px 20px',
    textAlign: 'center',
    color: 'var(--text-3)',
  },
  emptyTitle: { fontSize: 15, fontWeight: 600, color: 'var(--text-2)', marginBottom: 4 },

  // Modal
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(20, 18, 15, 0.35)',
    backdropFilter: 'blur(3px)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 100,
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 460,
    background: 'var(--surface)',
    borderRadius: 14,
    boxShadow: '0 20px 60px rgba(20,18,15,0.25)',
    overflow: 'hidden',
  },
  modalHead: { padding: '20px 24px 4px' },
  modalTitle: { fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' },
  modalSub: { fontSize: 12.5, color: 'var(--text-3)', marginTop: 3 },
  modalBody: { padding: '16px 24px 8px', display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' },
  inputField: {
    border: '1px solid var(--border-strong)',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    background: 'var(--surface)',
    transition: 'border 0.15s, box-shadow 0.15s',
  },
  textareaField: {
    border: '1px solid var(--border-strong)',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    background: 'var(--surface)',
    resize: 'vertical',
    minHeight: 72,
    fontFamily: 'inherit',
  },
  modalFoot: {
    padding: '14px 24px 20px',
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end',
    borderTop: '1px solid var(--border)',
    marginTop: 8,
  },
  btnGhost: {
    padding: '0 14px',
    height: 36,
    borderRadius: 8,
    color: 'var(--text-2)',
    fontWeight: 500,
    fontSize: 13.5,
  },
  btnPrimary: {
    padding: '0 16px',
    height: 36,
    borderRadius: 8,
    background: 'var(--accent)',
    color: 'white',
    fontWeight: 600,
    fontSize: 13.5,
  },
};

function TaskModal({ open, onClose, onSave, clients, initial }) {
  const [cliente, setCliente] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [fecha, setFecha] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setCliente(initial?.cliente || (clients[0]?.name ?? ''));
      setDescripcion(initial?.descripcion || '');
      setFecha(initial?.fecha || '');
    }
  }, [open, initial, clients]);

  if (!open) return null;

  const submit = () => {
    if (!descripcion.trim()) return;
    onSave({ cliente, descripcion: descripcion.trim(), fecha });
  };

  return (
    <div style={tasksStyles.backdrop} onClick={onClose}>
      <div style={tasksStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={tasksStyles.modalHead}>
          <div style={tasksStyles.modalTitle}>{initial ? 'Editar tarea' : 'Nueva tarea'}</div>
          <div style={tasksStyles.modalSub}>Completa los datos de la tarea pendiente</div>
        </div>
        <div style={tasksStyles.modalBody}>
          <div style={tasksStyles.field}>
            <label style={tasksStyles.label}>Cliente</label>
            {clients.length > 0 ? (
              <select style={tasksStyles.inputField} value={cliente} onChange={(e) => setCliente(e.target.value)}>
                <option value="">Sin asignar</option>
                {clients.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            ) : (
              <input style={tasksStyles.inputField} placeholder="Nombre del cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
            )}
          </div>
          <div style={tasksStyles.field}>
            <label style={tasksStyles.label}>Descripción</label>
            <textarea
              style={tasksStyles.textareaField}
              placeholder="Ej: Preparar carrusel de lanzamiento para IG"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              autoFocus
            />
          </div>
          <div style={tasksStyles.field}>
            <label style={tasksStyles.label}>Fecha de entrega</label>
            <input type="date" style={tasksStyles.inputField} value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
        </div>
        <div style={tasksStyles.modalFoot}>
          <button style={tasksStyles.btnGhost} onClick={onClose}>Cancelar</button>
          <button style={tasksStyles.btnPrimary} onClick={submit}>
            {initial ? 'Guardar cambios' : 'Crear tarea'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TasksView({ tasks, setTasks, clients }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [clientFilter, setClientFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('pendiente'); // pendiente | listo | all
  const [hoverId, setHoverId] = React.useState(null);

  const pendingCount = tasks.filter((t) => !t.done).length;
  const doneCount = tasks.length - pendingCount;
  const overdueCount = tasks.filter((t) => !t.done && t.fecha && daysUntil(t.fecha) < 0).length;

  const filtered = tasks.filter((t) => {
    if (statusFilter === 'pendiente' && t.done) return false;
    if (statusFilter === 'listo' && !t.done) return false;
    if (clientFilter && t.cliente !== clientFilter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      if (!t.descripcion.toLowerCase().includes(q) && !(t.cliente || '').toLowerCase().includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    // Pendientes primero, luego por fecha más próxima
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (!a.fecha && !b.fecha) return 0;
    if (!a.fecha) return 1;
    if (!b.fecha) return -1;
    return a.fecha.localeCompare(b.fecha);
  });

  const saveTask = (data) => {
    if (editing) {
      setTasks(tasks.map((t) => t.id === editing.id ? { ...t, ...data } : t));
    } else {
      setTasks([{ id: uid(), ...data, done: false, createdAt: Date.now() }, ...tasks]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const toggleDone = (id) => {
    setTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clientColor = (name) => clients.find((c) => c.name === name)?.color || 'var(--text-3)';

  return (
    <div style={tasksStyles.wrap}>
      <div style={tasksStyles.header}>
        <div>
          <h1 style={tasksStyles.title}>Tareas pendientes</h1>
          <div style={tasksStyles.subtitle}>Agenda personal de entregas y pendientes</div>
        </div>
        <div style={tasksStyles.stats}>
          <div style={tasksStyles.stat}>
            <div style={tasksStyles.statNum}>{pendingCount}</div>
            <div style={tasksStyles.statLabel}>Pendientes</div>
          </div>
          <div style={tasksStyles.stat}>
            <div style={{ ...tasksStyles.statNum, color: overdueCount > 0 ? 'var(--danger)' : 'var(--text)' }}>{overdueCount}</div>
            <div style={tasksStyles.statLabel}>Vencidas</div>
          </div>
          <div style={tasksStyles.stat}>
            <div style={{ ...tasksStyles.statNum, color: 'var(--success)' }}>{doneCount}</div>
            <div style={tasksStyles.statLabel}>Listas</div>
          </div>
        </div>
      </div>

      <div style={tasksStyles.toolbar}>
        <div style={tasksStyles.search}>
          <svg style={tasksStyles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            style={tasksStyles.searchInput}
            placeholder="Buscar por descripción o cliente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <select style={tasksStyles.select} value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
          <option value="">Todos los clientes</option>
          {clients.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <button style={tasksStyles.filterPill(statusFilter === 'pendiente')} onClick={() => setStatusFilter('pendiente')}>Pendientes</button>
        <button style={tasksStyles.filterPill(statusFilter === 'listo')} onClick={() => setStatusFilter('listo')}>Listas</button>
        <button style={tasksStyles.filterPill(statusFilter === 'all')} onClick={() => setStatusFilter('all')}>Todas</button>
        <button
          style={tasksStyles.addBtn}
          onClick={() => { setEditing(null); setModalOpen(true); }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Nueva tarea
        </button>
      </div>

      <div style={tasksStyles.list}>
        <div style={tasksStyles.listHeader}>
          <div></div>
          <div>Cliente</div>
          <div>Descripción</div>
          <div>Entrega</div>
          <div>Estado</div>
          <div></div>
        </div>
        {filtered.length === 0 ? (
          <div style={tasksStyles.empty}>
            <div style={tasksStyles.emptyTitle}>
              {tasks.length === 0 ? 'Todavía no hay tareas' : 'No hay tareas con esos filtros'}
            </div>
            <div>{tasks.length === 0 ? 'Crea la primera con el botón "Nueva tarea".' : 'Prueba cambiando los filtros arriba.'}</div>
          </div>
        ) : filtered.map((t) => {
          const dUntil = daysUntil(t.fecha);
          const overdue = dUntil !== null && dUntil < 0 && !t.done;
          const soon = dUntil !== null && dUntil >= 0 && dUntil <= 2 && !t.done;
          return (
            <div
              key={t.id}
              style={{ ...tasksStyles.row(t.done), background: hoverId === t.id ? 'var(--surface-2)' : 'var(--surface)' }}
              onMouseEnter={() => setHoverId(t.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <div
                style={tasksStyles.checkbox(t.done)}
                onClick={() => toggleDone(t.id)}
                title={t.done ? 'Marcar como pendiente' : 'Marcar como lista'}
              >
                {t.done && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div style={tasksStyles.client}>
                <span style={tasksStyles.clientDot(clientColor(t.cliente))}></span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.cliente || <span style={{ color: 'var(--text-3)', fontStyle: 'italic' }}>sin asignar</span>}
                </span>
              </div>
              <div
                style={{ ...tasksStyles.desc(t.done), cursor: 'pointer' }}
                onClick={() => { setEditing(t); setModalOpen(true); }}
                title="Editar tarea"
              >{t.descripcion}</div>
              <div>
                <div style={tasksStyles.date(overdue, t.done)}>{t.fecha ? formatDateLong(t.fecha) : '—'}</div>
                {t.fecha && !t.done && (
                  <div style={tasksStyles.dateChip(overdue, t.done, soon)}>
                    {overdue ? `Vencida · ${Math.abs(dUntil)}d` : (dUntil === 0 ? 'Hoy' : dUntil === 1 ? 'Mañana' : `En ${dUntil}d`)}
                  </div>
                )}
              </div>
              <div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: 5,
                  background: t.done ? 'var(--success-soft)' : 'var(--accent-soft)',
                  color: t.done ? 'oklch(0.40 0.15 155)' : 'var(--accent-text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>{t.done ? 'Listo' : 'Pendiente'}</span>
              </div>
              <button
                style={{ ...tasksStyles.delBtn, opacity: hoverId === t.id ? 1 : 0 }}
                onClick={() => removeTask(t.id)}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-soft)'; e.currentTarget.style.color = 'var(--danger)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-3)'; }}
                title="Eliminar tarea"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={saveTask}
        clients={clients}
        initial={editing}
      />
    </div>
  );
}

Object.assign(window, { TasksView });
