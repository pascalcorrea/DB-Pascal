// Sidebar con navegación y gestión de clientes

const sidebarStyles = {
  aside: {
    width: 260,
    minWidth: 260,
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
  },
  brand: {
    padding: '22px 20px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  brandDot: {
    width: 26,
    height: 26,
    borderRadius: 7,
    background: 'var(--accent)',
    display: 'grid',
    placeItems: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: 13,
    fontFamily: 'JetBrains Mono, monospace',
  },
  brandText: { fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' },
  brandSub: { fontSize: 11, color: 'var(--text-3)', marginTop: 1 },
  navGroup: { padding: '0 12px', marginTop: 4 },
  navLabel: {
    fontSize: 10,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text-3)',
    padding: '12px 10px 6px',
    fontWeight: 600,
  },
  navItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 10px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13.5,
    fontWeight: 500,
    color: active ? 'var(--text)' : 'var(--text-2)',
    background: active ? 'var(--surface-2)' : 'transparent',
    transition: 'background 0.15s',
    userSelect: 'none',
  }),
  navItemHover: { background: 'var(--surface-2)' },
  navIcon: { width: 16, height: 16, flexShrink: 0, opacity: 0.8 },
  badge: (active) => ({
    marginLeft: 'auto',
    fontSize: 11,
    fontWeight: 600,
    minWidth: 20,
    height: 20,
    padding: '0 6px',
    borderRadius: 10,
    background: active ? 'var(--accent)' : 'var(--border-strong)',
    color: active ? 'white' : 'var(--text-2)',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'JetBrains Mono, monospace',
  }),
  clientsSection: {
    flex: 1,
    padding: '0 12px',
    marginTop: 8,
    overflowY: 'auto',
    minHeight: 0,
  },
  clientsHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 10px 6px',
  },
  addBtn: {
    marginLeft: 'auto',
    width: 22,
    height: 22,
    borderRadius: 6,
    background: 'var(--surface-2)',
    display: 'grid',
    placeItems: 'center',
    color: 'var(--text-2)',
    fontSize: 14,
    lineHeight: 1,
    transition: 'background 0.15s, color 0.15s',
  },
  clientRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '7px 10px',
    borderRadius: 7,
    fontSize: 13,
    color: 'var(--text-2)',
  },
  clientDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--accent)',
    flexShrink: 0,
  },
  clientName: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  removeBtn: {
    opacity: 0,
    width: 20,
    height: 20,
    borderRadius: 4,
    color: 'var(--text-3)',
    fontSize: 14,
    lineHeight: 1,
    transition: 'opacity 0.15s, background 0.15s, color 0.15s',
  },
  addInputWrap: {
    display: 'flex',
    gap: 6,
    padding: '6px 10px 10px',
  },
  addInput: {
    flex: 1,
    border: '1px solid var(--border-strong)',
    borderRadius: 6,
    padding: '6px 9px',
    fontSize: 13,
    background: 'var(--surface)',
  },
  addInputSave: {
    padding: '0 10px',
    fontSize: 12,
    fontWeight: 600,
    background: 'var(--accent)',
    color: 'white',
    borderRadius: 6,
    height: 30,
  },
  empty: {
    padding: '4px 10px 10px',
    fontSize: 12,
    color: 'var(--text-3)',
    fontStyle: 'italic',
  },
  footer: {
    padding: '12px 20px 16px',
    borderTop: '1px solid var(--border)',
    fontSize: 11,
    color: 'var(--text-3)',
    fontFamily: 'JetBrains Mono, monospace',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

function NavIcon({ name }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'tasks') {
    return (
      <svg {...common}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    );
  }
  if (name === 'calendar') {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  return null;
}

function Sidebar({ activeTab, setActiveTab, pendingCount, clients, onAddClient, onRemoveClient, onToggleCalVisible }) {
  const [adding, setAdding] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [hoverId, setHoverId] = React.useState(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus();
  }, [adding]);

  const submitNew = () => {
    const name = newName.trim();
    if (!name) { setAdding(false); return; }
    onAddClient(name);
    setNewName('');
    setAdding(false);
  };

  return (
    <aside style={sidebarStyles.aside}>
      <div style={sidebarStyles.brand}>
        <div style={sidebarStyles.brandDot}>P</div>
        <div>
          <div style={sidebarStyles.brandText}>Pascal</div>
          <div style={sidebarStyles.brandSub}>Content Ops</div>
        </div>
      </div>

      <div style={sidebarStyles.navGroup}>
        <div style={sidebarStyles.navLabel}>Workspace</div>
        <div
          style={sidebarStyles.navItem(activeTab === 'tasks')}
          onClick={() => setActiveTab('tasks')}
        >
          <NavIcon name="tasks" />
          Tareas pendientes
          {pendingCount > 0 && (
            <span style={sidebarStyles.badge(activeTab === 'tasks')}>{pendingCount}</span>
          )}
        </div>
        <div
          style={sidebarStyles.navItem(activeTab === 'calendar')}
          onClick={() => setActiveTab('calendar')}
        >
          <NavIcon name="calendar" />
          Calendario
        </div>
      </div>

      <div style={sidebarStyles.clientsSection}>
        <div style={sidebarStyles.clientsHeader}>
          <div style={{ ...sidebarStyles.navLabel, padding: 0 }}>Clientes · {clients.length}</div>
          <button
            style={sidebarStyles.addBtn}
            onClick={() => setAdding(true)}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent-text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            title="Agregar cliente"
          >+</button>
        </div>

        {adding && (
          <div style={sidebarStyles.addInputWrap}>
            <input
              ref={inputRef}
              style={sidebarStyles.addInput}
              placeholder="Nombre del cliente"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitNew();
                if (e.key === 'Escape') { setAdding(false); setNewName(''); }
              }}
              onBlur={submitNew}
            />
          </div>
        )}

        {clients.length === 0 && !adding && (
          <div style={sidebarStyles.empty}>Agrega tu primer cliente con +</div>
        )}

        {clients.map((c) => {
          const calOn = c.calVisible !== false;
          return (
            <div
              key={c.id}
              style={sidebarStyles.clientRow}
              onMouseEnter={(e) => { setHoverId(c.id); e.currentTarget.style.background = 'var(--surface-2)'; }}
              onMouseLeave={(e) => { setHoverId(null); e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ ...sidebarStyles.clientDot, background: c.color || 'var(--accent)' }}></div>
              <span style={sidebarStyles.clientName}>{c.name}</span>
              <button
                onClick={() => onToggleCalVisible(c.id)}
                title={calOn ? 'Visible en calendario · click para ocultar' : 'Oculto en calendario · click para mostrar'}
                style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                  border: `1.5px solid ${calOn ? c.color || 'var(--accent)' : 'var(--border-strong)'}`,
                  background: calOn ? c.color || 'var(--accent)' : 'transparent',
                  display: 'grid', placeItems: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {calOn && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <button
                style={{
                  ...sidebarStyles.removeBtn,
                  opacity: hoverId === c.id ? 1 : 0,
                }}
                onClick={() => {
                  if (confirm(`¿Quitar cliente "${c.name}"?\n\nSus tareas y entradas de calendario no se borran, pero perderás la asociación.`)) {
                    onRemoveClient(c.id);
                  }
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-soft)'; e.currentTarget.style.color = 'var(--danger)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-3)'; }}
                title="Quitar cliente"
              >×</button>
            </div>
          );
        })}
      </div>

      <div style={sidebarStyles.footer}>
        <span>localStorage · v1.0</span>
        <a
          href="/api/logout"
          style={{ color: 'var(--text-3)', textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-3)'}
          title="Cerrar sesión"
        >salir</a>
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });
