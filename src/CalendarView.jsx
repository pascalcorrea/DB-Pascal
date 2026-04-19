// Pestaña Calendario: fichas semanales apiladas
// - Cada ficha representa una semana (lun-dom)
// - Filas: clientes ; Columnas: 4 estados del plan (Pendiente, Diseño, Cliente, Aprobado)
// - Se hace click en una celda para avanzar el estado
// - Semanas pasadas se colapsan en "Historial"
// - Cada lunes se agrega automáticamente la nueva semana al abrir

const calStyles = {
  wrap: {
    padding: '32px 40px 60px',
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
  },
  header: {
    marginBottom: 24,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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

  monthBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    marginBottom: 18,
    boxShadow: 'var(--shadow-sm)',
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    textTransform: 'capitalize',
  },
  monthSub: { fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 7,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-2)',
    display: 'grid',
    placeItems: 'center',
    transition: 'background 0.15s',
  },
  todayBtn: {
    height: 32,
    padding: '0 12px',
    borderRadius: 7,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-2)',
    fontSize: 12,
    fontWeight: 500,
  },

  weekCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    transition: 'box-shadow 0.2s',
  },
  weekCardCurrent: {
    borderColor: 'oklch(0.85 0.08 280)',
    boxShadow: '0 0 0 2px var(--accent-soft), var(--shadow-sm)',
  },
  weekHead: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    gap: 14,
  },
  weekPill: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 9px',
    borderRadius: 5,
    fontFamily: 'JetBrains Mono, monospace',
  },
  weekTitle: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  weekMeta: {
    marginLeft: 'auto',
    display: 'flex',
    gap: 6,
    alignItems: 'center',
  },
  miniStat: (color) => ({
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 5,
    background: color.bg,
    color: color.fg,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontFamily: 'JetBrains Mono, monospace',
  }),
  miniDot: (bg) => ({ width: 5, height: 5, borderRadius: '50%', background: bg }),

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
  },
  th: {
    textAlign: 'center',
    padding: '10px 8px',
    fontSize: 10.5,
    fontWeight: 600,
    color: 'var(--text-3)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface-2)',
    borderRight: '1px solid var(--border)',
    whiteSpace: 'nowrap',
  },
  thFirst: {
    textAlign: 'left',
    padding: '10px 18px',
    width: '28%',
  },
  tr: {
    borderBottom: '1px solid var(--border)',
  },
  trLast: { borderBottom: 'none' },
  tdClient: {
    padding: '12px 18px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderRight: '1px solid var(--border)',
    background: 'var(--surface)',
  },
  tdClientDot: (color) => ({
    width: 7, height: 7, borderRadius: '50%', background: color || 'var(--accent)', flexShrink: 0,
  }),
  tdState: {
    padding: 8,
    textAlign: 'center',
    borderRight: '1px solid var(--border)',
    verticalAlign: 'middle',
  },
  tdStateLast: { borderRight: 'none' },

  stateCell: (selected, st) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 8,
    cursor: 'pointer',
    background: selected ? st.bg : 'transparent',
    border: selected ? `1.5px solid ${st.color}` : '1.5px solid transparent',
    color: selected ? st.color : 'var(--border-strong)',
    transition: 'all 0.15s',
  }),

  addRow: {
    padding: '12px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--surface-2)',
    borderTop: '1px solid var(--border)',
  },
  addRowSelect: {
    flex: 1,
    height: 32,
    padding: '0 10px',
    border: '1px solid var(--border-strong)',
    borderRadius: 6,
    fontSize: 13,
    background: 'var(--surface)',
    maxWidth: 260,
  },
  addRowBtn: {
    padding: '0 14px',
    height: 32,
    borderRadius: 6,
    background: 'var(--accent)',
    color: 'white',
    fontSize: 12,
    fontWeight: 600,
  },
  addRowGhost: {
    padding: '0 12px',
    height: 32,
    borderRadius: 6,
    color: 'var(--text-2)',
    fontSize: 12.5,
    fontWeight: 500,
    border: '1px dashed var(--border-strong)',
    background: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  removeRowBtn: {
    width: 24, height: 24, borderRadius: 5,
    color: 'var(--text-3)',
    opacity: 0,
    transition: 'opacity 0.15s, background 0.15s, color 0.15s',
  },

  historySection: {
    marginTop: 28,
  },
  historyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 4px',
    cursor: 'pointer',
    color: 'var(--text-2)',
    fontSize: 13,
    fontWeight: 600,
    userSelect: 'none',
  },
  historyLine: {
    flex: 1, height: 1, background: 'var(--border)',
  },

  legend: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    padding: '12px 0 0',
    fontSize: 11.5,
    color: 'var(--text-2)',
  },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: 6 },
  legendDot: (color, bg) => ({
    width: 12, height: 12, borderRadius: 4,
    background: bg,
    border: `1.5px solid ${color}`,
  }),

  emptyWeek: {
    padding: '30px 20px',
    textAlign: 'center',
    color: 'var(--text-3)',
    fontSize: 13,
    fontStyle: 'italic',
  },
};

function WeekCard({ week, weekClients, allClients, onToggleState, onAddClient, onRemoveClient, isCurrent, isPast }) {
  const [addingRow, setAddingRow] = React.useState(false);
  const [newClientId, setNewClientId] = React.useState('');
  const [hoverRow, setHoverRow] = React.useState(null);

  const availableToAdd = allClients.filter((c) => !weekClients.some((wc) => wc.clientId === c.id));

  const counts = CAL_STATES.reduce((acc, st) => {
    acc[st.id] = weekClients.filter((wc) => wc.state === st.id).length;
    return acc;
  }, {});

  const clientById = (id) => allClients.find((c) => c.id === id);

  const pillStyle = isCurrent
    ? { background: 'var(--accent)', color: 'white' }
    : isPast
      ? { background: 'var(--surface-2)', color: 'var(--text-3)' }
      : { background: 'var(--accent-soft)', color: 'var(--accent-text)' };

  return (
    <div style={{ ...calStyles.weekCard, ...(isCurrent ? calStyles.weekCardCurrent : {}) }}>
      <div style={calStyles.weekHead}>
        <div style={{ ...calStyles.weekPill, ...pillStyle }}>
          {isCurrent ? 'Esta semana' : isPast ? 'Pasada' : 'Próxima'}
        </div>
        <div style={calStyles.weekTitle}>{formatWeekRange(week.id)}</div>
        <div style={calStyles.weekMeta}>
          {CAL_STATES.map((st) => (
            counts[st.id] > 0 && (
              <span key={st.id} style={calStyles.miniStat({ bg: st.bg, fg: st.color })}>
                <span style={calStyles.miniDot(st.color)}></span>
                {counts[st.id]} {st.short}
              </span>
            )
          ))}
          {weekClients.length === 0 && (
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontStyle: 'italic' }}>Sin clientes</span>
          )}
        </div>
      </div>

      {weekClients.length === 0 ? (
        <div style={calStyles.emptyWeek}>
          No hay clientes en esta semana todavía.
        </div>
      ) : (
        <table style={calStyles.table}>
          <thead>
            <tr>
              <th style={{ ...calStyles.th, ...calStyles.thFirst }}>Cliente</th>
              {CAL_STATES.map((st) => (
                <th key={st.id} style={calStyles.th}>{st.label}</th>
              ))}
              <th style={{ ...calStyles.th, width: 40, borderRight: 'none' }}></th>
            </tr>
          </thead>
          <tbody>
            {weekClients.map((wc, idx) => {
              const client = clientById(wc.clientId);
              return (
                <tr
                  key={wc.clientId}
                  style={{ ...calStyles.tr, ...(idx === weekClients.length - 1 ? calStyles.trLast : {}) }}
                  onMouseEnter={() => setHoverRow(wc.clientId)}
                  onMouseLeave={() => setHoverRow(null)}
                >
                  <td style={calStyles.tdClient}>
                    <span style={calStyles.tdClientDot(client?.color)}></span>
                    <span style={{ color: client ? 'var(--text)' : 'var(--text-3)' }}>
                      {client?.name || 'Cliente eliminado'}
                    </span>
                  </td>
                  {CAL_STATES.map((st, i) => {
                    const selected = wc.state === st.id;
                    return (
                      <td key={st.id} style={{ ...calStyles.tdState, ...(i === CAL_STATES.length - 1 ? {} : {}) }}>
                        <div
                          style={calStyles.stateCell(selected, st)}
                          onClick={() => onToggleState(week.id, wc.clientId, st.id)}
                          onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = st.color; } }}
                          onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--border-strong)'; } }}
                          title={selected ? `Estado actual: ${st.label}` : `Marcar como ${st.label}`}
                        >
                          {selected ? (
                            st.id === 'aprobado' ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                            ) : (
                              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'currentColor' }}></div>
                            )
                          ) : (
                            <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid currentColor' }}></div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  <td style={{ ...calStyles.tdState, borderRight: 'none', width: 40 }}>
                    <button
                      style={{ ...calStyles.removeRowBtn, opacity: hoverRow === wc.clientId ? 1 : 0 }}
                      onClick={() => onRemoveClient(week.id, wc.clientId)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-soft)'; e.currentTarget.style.color = 'var(--danger)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-3)'; }}
                      title="Quitar de esta semana"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div style={calStyles.addRow}>
        {addingRow ? (
          <>
            <select
              style={calStyles.addRowSelect}
              value={newClientId}
              onChange={(e) => setNewClientId(e.target.value)}
              autoFocus
            >
              <option value="">Elegir cliente…</option>
              {availableToAdd.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button
              style={calStyles.addRowBtn}
              onClick={() => {
                if (newClientId) { onAddClient(week.id, newClientId); setNewClientId(''); setAddingRow(false); }
              }}
            >Agregar</button>
            <button style={{ ...calStyles.addRowGhost, border: 'none' }} onClick={() => { setAddingRow(false); setNewClientId(''); }}>Cancelar</button>
          </>
        ) : (
          availableToAdd.length > 0 ? (
            <button
              style={calStyles.addRowGhost}
              onClick={() => setAddingRow(true)}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--accent-text)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              Agregar cliente a esta semana
            </button>
          ) : (
            <span style={{ fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic' }}>
              Todos los clientes ya están en esta semana
            </span>
          )
        )}
      </div>
    </div>
  );
}

function CalendarView({ weeks, setWeeks, clients }) {
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [viewMonth, setViewMonth] = React.useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const currentWeekId = weekId(new Date());

  // Asegurar que la semana actual siempre exista
  React.useEffect(() => {
    if (!weeks.find((w) => w.id === currentWeekId)) {
      setWeeks([...weeks, { id: currentWeekId, clients: [] }]);
    }
  }, []);

  // Filtrar semanas visibles para el mes seleccionado + todas las futuras del mes
  // Pero siempre mostrar SIEMPRE la semana actual si el mes incluye hoy
  const viewMonthStart = new Date(viewMonth.y, viewMonth.m, 1);
  const viewMonthEnd = new Date(viewMonth.y, viewMonth.m + 1, 0);

  const weeksInMonth = weeks.filter((w) => {
    const start = new Date(w.id + 'T00:00:00');
    const end = addDays(start, 6);
    return end >= viewMonthStart && start <= viewMonthEnd;
  }).sort((a, b) => a.id.localeCompare(b.id));

  const pastWeeks = weeksInMonth.filter((w) => w.id < currentWeekId);
  const currentAndFuture = weeksInMonth.filter((w) => w.id >= currentWeekId);

  const toggleState = (wId, clientId, stateId) => {
    setWeeks(weeks.map((w) => {
      if (w.id !== wId) return w;
      return {
        ...w,
        clients: w.clients.map((wc) =>
          wc.clientId === clientId ? { ...wc, state: wc.state === stateId ? 'pendiente' : stateId } : wc
        ),
      };
    }));
  };

  const addClientToWeek = (wId, clientId) => {
    setWeeks(weeks.map((w) => {
      if (w.id !== wId) return w;
      if (w.clients.some((wc) => wc.clientId === clientId)) return w;
      return { ...w, clients: [...w.clients, { clientId, state: 'pendiente' }] };
    }));
  };

  const removeClientFromWeek = (wId, clientId) => {
    setWeeks(weeks.map((w) => {
      if (w.id !== wId) return w;
      return { ...w, clients: w.clients.filter((wc) => wc.clientId !== clientId) };
    }));
  };

  const addNextWeek = () => {
    const last = weeks.map((w) => w.id).sort().pop() || currentWeekId;
    const lastDate = new Date(last + 'T00:00:00');
    const nextId = isoDate(addDays(lastDate, 7));
    if (!weeks.find((w) => w.id === nextId)) {
      setWeeks([...weeks, { id: nextId, clients: [] }]);
    }
  };

  const goMonth = (delta) => {
    setViewMonth((vm) => {
      const d = new Date(vm.y, vm.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  const goToday = () => {
    const d = new Date();
    setViewMonth({ y: d.getFullYear(), m: d.getMonth() });
  };

  const thisMonth = new Date();
  const isCurrentMonth = viewMonth.y === thisMonth.getFullYear() && viewMonth.m === thisMonth.getMonth();

  return (
    <div style={calStyles.wrap}>
      <div style={calStyles.header}>
        <div>
          <h1 style={calStyles.title}>Calendario de entregas</h1>
          <div style={calStyles.subtitle}>Planes de contenido por semana · seguimiento de flujo</div>
        </div>
        <button
          style={{ ...calStyles.addRowBtn, height: 38, padding: '0 16px', fontSize: 13.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          onClick={addNextWeek}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Agregar próxima semana
        </button>
      </div>

      <div style={calStyles.monthBar}>
        <button
          style={calStyles.navBtn}
          onClick={() => goMonth(-1)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface)'}
          title="Mes anterior"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div>
          <div style={calStyles.monthLabel}>{MONTHS_ES[viewMonth.m]} {viewMonth.y}</div>
          <div style={calStyles.monthSub}>
            {weeksInMonth.length} semana{weeksInMonth.length !== 1 ? 's' : ''} · {weeksInMonth.reduce((acc, w) => acc + w.clients.length, 0)} entregas
          </div>
        </div>
        <button
          style={calStyles.navBtn}
          onClick={() => goMonth(1)}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface)'}
          title="Mes siguiente"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        {!isCurrentMonth && (
          <button
            style={calStyles.todayBtn}
            onClick={goToday}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent-text)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >Ir a hoy</button>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <div style={calStyles.legend}>
            {CAL_STATES.map((st) => (
              <div key={st.id} style={calStyles.legendItem}>
                <span style={calStyles.legendDot(st.color, st.bg)}></span>
                {st.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {clients.length === 0 && (
        <div style={{
          padding: '40px 20px', textAlign: 'center', background: 'var(--surface)',
          border: '1px dashed var(--border-strong)', borderRadius: 12, color: 'var(--text-2)',
          marginBottom: 14,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Primero agrega clientes</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Usa el botón <strong>+</strong> en el panel lateral para empezar.</div>
        </div>
      )}

      {/* Semana actual y futuras del mes seleccionado */}
      {currentAndFuture.length === 0 && weeksInMonth.length === 0 && clients.length > 0 && (
        <div style={{
          padding: '40px 20px', textAlign: 'center', background: 'var(--surface)',
          border: '1px dashed var(--border-strong)', borderRadius: 12, color: 'var(--text-3)',
          marginBottom: 14, fontSize: 13,
        }}>
          No hay semanas en este mes. Usa <strong>"Agregar próxima semana"</strong> arriba.
        </div>
      )}

      {currentAndFuture.map((w) => (
        <WeekCard
          key={w.id}
          week={w}
          weekClients={w.clients}
          allClients={clients}
          onToggleState={toggleState}
          onAddClient={addClientToWeek}
          onRemoveClient={removeClientFromWeek}
          isCurrent={w.id === currentWeekId}
          isPast={false}
        />
      ))}

      {/* Historial / semanas pasadas */}
      {pastWeeks.length > 0 && (
        <div style={calStyles.historySection}>
          <div
            style={calStyles.historyHeader}
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transform: historyOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              <path d="M9 6l6 6-6 6" />
            </svg>
            Historial · {pastWeeks.length} semana{pastWeeks.length !== 1 ? 's' : ''} archivada{pastWeeks.length !== 1 ? 's' : ''}
            <div style={calStyles.historyLine}></div>
          </div>
          {historyOpen && pastWeeks.slice().reverse().map((w) => (
            <WeekCard
              key={w.id}
              week={w}
              weekClients={w.clients}
              allClients={clients}
              onToggleState={toggleState}
              onAddClient={addClientToWeek}
              onRemoveClient={removeClientFromWeek}
              isCurrent={false}
              isPast={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CalendarView });
