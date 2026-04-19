// Utilidades compartidas

const STORAGE_KEYS = {
  tasks: 'dbp_tasks_v1',
  clients: 'dbp_clients_v1',
  weeks: 'dbp_weeks_v1',
  activeTab: 'dbp_active_tab_v1',
};

function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

// Fecha helpers — todas usan lunes como primer día de la semana
function startOfWeek(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // 0 dom, 1 lun
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isoDate(d) {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function weekId(d) {
  // Identificador único por semana: ISO date del lunes
  return isoDate(startOfWeek(d));
}

const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTHS_ES_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DAYS_ES_SHORT = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

function formatWeekRange(mondayIso) {
  const start = new Date(mondayIso + 'T00:00:00');
  const end = addDays(start, 6);
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()} – ${end.getDate()} ${MONTHS_ES[end.getMonth()]} ${end.getFullYear()}`;
  }
  if (sameYear) {
    return `${start.getDate()} ${MONTHS_ES_SHORT[start.getMonth()]} – ${end.getDate()} ${MONTHS_ES_SHORT[end.getMonth()]} ${end.getFullYear()}`;
  }
  return `${start.getDate()} ${MONTHS_ES_SHORT[start.getMonth()]} ${start.getFullYear()} – ${end.getDate()} ${MONTHS_ES_SHORT[end.getMonth()]} ${end.getFullYear()}`;
}

function formatDateLong(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return `${d.getDate()} ${MONTHS_ES_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function daysUntil(iso) {
  if (!iso) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(iso + 'T00:00:00');
  const diff = Math.round((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

// Estados del calendario
const CAL_STATES = [
  { id: 'pendiente', label: 'Pendiente', short: 'Pend.', color: 'var(--text-3)', bg: 'var(--surface-2)' },
  { id: 'diseno',    label: 'En diseño', short: 'Diseño', color: 'oklch(0.45 0.18 280)', bg: 'var(--accent-soft)' },
  { id: 'cliente',   label: 'Con cliente', short: 'Cliente', color: 'oklch(0.45 0.15 70)', bg: 'var(--warn-soft)' },
  { id: 'aprobado',  label: 'Aprobado', short: 'Aprob.', color: 'oklch(0.40 0.15 155)', bg: 'var(--success-soft)' },
];

Object.assign(window, {
  STORAGE_KEYS, loadLS, saveLS, uid,
  startOfWeek, addDays, isoDate, weekId,
  MONTHS_ES, MONTHS_ES_SHORT, DAYS_ES_SHORT,
  formatWeekRange, formatDateLong, daysUntil,
  CAL_STATES,
});
