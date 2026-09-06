/* ==========================================================================
   WHUSNET INSTALLER — application logic
   Vanilla JS SPA. No build step: open index.html or host the folder.
   Data lives in localStorage (stand-in for the Room local DB in the native
   spec) and syncs out to a Google Apps Script Web App acting as the
   Sheets-backed API. See google-apps-script.gs + README.md.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* Icons                                                                   */
/* ---------------------------------------------------------------------- */
const ICON = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.2a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  bars: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 8-6-16-3 8H2"/></svg>',
  sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M3 21v-5h5M16 3h5v5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>',
  navArrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-8-8 18-2-8-8-2Z"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14 15.5 9"/><path d="M3.5 19a10 10 0 0 1 17 0"/><circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M13 5v2M13 17v2M13 10.5v3"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V7"/><path d="m7 12 5-5 5 5"/><path d="M4 20h16"/></svg>',
};

/* ---------------------------------------------------------------------- */
/* Storage layer                                                          */
/* ---------------------------------------------------------------------- */
const DB = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('whusnet_' + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('whusnet_' + key, JSON.stringify(value)); }
    catch (e) { console.error('Gagal menyimpan data lokal', e); }
  }
};

const DEFAULT_SETTINGS = {
  darkMode: true,
  notifications: true,
  autoSync: true,
  wifiOnlySync: false,
  language: 'id',
  appsScriptUrl: '',
  thresholds: {
    rxPower: { warnLow: -25, badLow: -27, warnHigh: -8, badHigh: -6 },
    redaman: { warnMax: 3, badMax: 5 },
    ping: { warnMax: 50, badMax: 100 },
    jitter: { warnMax: 20, badMax: 50 },
    packetLoss: { warnMax: 1, badMax: 5 },
  }
};

function seedIfEmpty() {
  if (!DB.get('psb', null)) {
    const today = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const seed = [
      { id: 'PSB-2026-0091', customerId: 'CUST-10233', name: 'Andi Prasetyo', phone: '0812-3344-5566', address: 'Jl. Melati No. 12, RT03/RW05', kecamatan: 'Cimahi Utara', desa: 'Citeureup', package: 'Home 30 Mbps', cost: 300000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(today), time: '09:00', status: 'progress', lat: -6.8735, lng: 107.5423 },
      { id: 'PSB-2026-0092', customerId: 'CUST-10234', name: 'Sri Wulandari', phone: '0813-2211-9987', address: 'Jl. Kenanga Raya No. 5', kecamatan: 'Cimahi Tengah', desa: 'Baros', package: 'Home 50 Mbps', cost: 350000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(today), time: '11:00', status: 'scheduled', lat: -6.8812, lng: 107.5301 },
      { id: 'PSB-2026-0093', customerId: 'CUST-10235', name: 'Budi Santoso', phone: '0857-6612-0034', address: 'Perum Griya Asri Blok C2', kecamatan: 'Cimahi Selatan', desa: 'Leuwigajah', package: 'Home 20 Mbps', cost: 250000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(today), time: '13:30', status: 'pending', lat: -6.9021, lng: 107.5188 },
      { id: 'PSB-2026-0094', customerId: 'CUST-10236', name: 'Dewi Anggraini', phone: '0821-4455-7788', address: 'Jl. Cihanjuang No. 88', kecamatan: 'Parongpong', desa: 'Cihanjuang', package: 'Business 100 Mbps', cost: 750000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(today), time: '15:00', status: 'done', lat: -6.8321, lng: 107.5822 },
      { id: 'PSB-2026-0095', customerId: 'CUST-10237', name: 'Hendra Kusuma', phone: '0878-3321-0099', address: 'Jl. Sangkuriang No. 21', kecamatan: 'Coblong', desa: 'Dago', package: 'Home 30 Mbps', cost: 300000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(tomorrow), time: '10:00', status: 'scheduled', lat: -6.8698, lng: 107.6098 },
      { id: 'PSB-2026-0096', customerId: 'CUST-10238', name: 'Lina Marlina', phone: '0812-9987-1123', address: 'Jl. Terusan Jakarta No. 45', kecamatan: 'Antapani', desa: 'Antapani Kidul', package: 'Home 50 Mbps', cost: 350000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(today), time: '08:00', status: 'problem', lat: -6.9145, lng: 107.6533 },
      { id: 'PSB-2026-0097', customerId: 'CUST-10239', name: 'Fajar Nugroho', phone: '0898-1122-3344', address: 'Jl. Soekarno Hatta No. 210', kecamatan: 'Buahbatu', desa: 'Cijaura', package: 'Home 20 Mbps', cost: 250000, technician: 'Rizky Ramadhan', technicianId: 'TCH-002', date: iso(today), time: '16:00', status: 'cancelled', lat: -6.9502, lng: 107.6421 },
    ];
    DB.set('psb', seed);
  }
  if (!DB.get('installations', null)) DB.set('installations', []);
  if (!DB.get('settings', null)) DB.set('settings', DEFAULT_SETTINGS);
  if (!DB.get('session', null)) DB.set('session', null);
  if (!DB.get('tickets', null)) DB.set('tickets', []);
  if (!DB.get('speedtests', null)) DB.set('speedtests', []);
}
seedIfEmpty();

/* ---------------------------------------------------------------------- */
/* App state                                                              */
/* ---------------------------------------------------------------------- */
const state = {
  route: 'login',
  params: {},
  history: [],
  psbFilter: { query: '', chip: 'today' },
  draft: null, // in-progress installation form object
  step: 0,
};

function session() { return DB.get('session', null); }
function settings() { return DB.get('settings', DEFAULT_SETTINGS); }
function saveSettings(s) { DB.set('settings', s); }

/* ---------------------------------------------------------------------- */
/* Toast                                                                  */
/* ---------------------------------------------------------------------- */
function toast(message, kind = 'default', ms = 2600) {
  const host = document.getElementById('toast-host');
  const el = document.createElement('div');
  el.className = 'toast' + (kind !== 'default' ? ' ' + kind : '');
  el.innerHTML = message;
  host.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; setTimeout(() => el.remove(), 260); }, ms);
}

/* ---------------------------------------------------------------------- */
/* Modal                                                                  */
/* ---------------------------------------------------------------------- */
function showModal({ title, body, actions }) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-sheet" id="modalSheet">
        <h2>${title}</h2>
        <p>${body}</p>
        <div class="modal-actions" id="modalActions"></div>
      </div>
    </div>`;
  const actionsEl = document.getElementById('modalActions');
  actions.forEach(a => {
    const btn = document.createElement('button');
    btn.className = 'btn ' + (a.cls || 'btn-secondary');
    btn.textContent = a.label;
    btn.onclick = () => { closeModal(); a.onClick && a.onClick(); };
    actionsEl.appendChild(btn);
  });
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
}
function closeModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const sheet = document.getElementById('modalSheet');
  if (!backdrop) return;
  backdrop.classList.add('closing');
  if (sheet) sheet.classList.add('closing');
  setTimeout(() => { document.getElementById('modal-root').innerHTML = ''; }, 200);
}

/* ---------------------------------------------------------------------- */
/* Router                                                                 */
/* ---------------------------------------------------------------------- */
function goTo(route, params = {}, { replace = false } = {}) {
  if (!replace) state.history.push({ route: state.route, params: state.params });
  state.route = route;
  state.params = params;
  render();
  document.getElementById('view').scrollTo(0, 0);
}
function goBack(fallback = 'dashboard') {
  const prev = state.history.pop();
  if (prev) { state.route = prev.route; state.params = prev.params; }
  else { state.route = fallback; state.params = {}; }
  render();
}

const NAV_ITEMS = [
  { route: 'dashboard', label: 'Dashboard', icon: ICON.home },
  { route: 'instalasi', label: 'Instalasi', icon: ICON.wrench },
  { route: 'riwayat', label: 'Riwayat', icon: ICON.clock },
  { route: 'profil', label: 'Profil', icon: ICON.user },
];
const TOP_LEVEL_ROUTES = NAV_ITEMS.map(n => n.route);

/* ---------------------------------------------------------------------- */
/* Formatting helpers                                                     */
/* ---------------------------------------------------------------------- */
function fmtDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtDateTime(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function fmtRupiah(n) { return 'Rp' + Number(n || 0).toLocaleString('id-ID'); }
function isToday(iso) { return iso === new Date().toISOString().slice(0, 10); }
function isTomorrow(iso) { const t = new Date(); t.setDate(t.getDate() + 1); return iso === t.toISOString().slice(0, 10); }
function isThisWeek(iso) {
  const d = new Date(iso + 'T00:00:00'); const now = new Date();
  const start = new Date(now); start.setDate(now.getDate() - now.getDay());
  const end = new Date(start); end.setDate(start.getDate() + 7);
  return d >= start && d < end;
}

const STATUS_META = {
  pending: { label: 'Pending', cls: 'pending' },
  scheduled: { label: 'Dijadwalkan', cls: 'scheduled' },
  progress: { label: 'Dalam Proses', cls: 'progress' },
  done: { label: 'Selesai', cls: 'done' },
  problem: { label: 'Bermasalah', cls: 'problem' },
  cancelled: { label: 'Dibatalkan', cls: 'cancelled' },
};
function statusBadge(status) {
  const m = STATUS_META[status] || STATUS_META.pending;
  return `<span class="badge ${m.cls}"><span class="dot"></span>${m.label}</span>`;
}

/* ---------------------------------------------------------------------- */
/* Sync engine                                                            */
/* ---------------------------------------------------------------------- */
let syncing = false;

function queuedCount() {
  return DB.get('installations', []).filter(i => i.status === 'menunggu_sinkron' || i.status === 'gagal_sinkron').length;
}

async function flushQueue(showFeedback = false) {
  if (syncing) return;
  const cfg = settings();
  if (!navigator.onLine) return;
  if (cfg.wifiOnlySync && navigator.connection && navigator.connection.type && navigator.connection.type !== 'wifi') return;
  const list = DB.get('installations', []);
  const pending = list.filter(i => i.status === 'menunggu_sinkron' || i.status === 'gagal_sinkron');
  if (!pending.length) { if (showFeedback) toast('Tidak ada data yang perlu disinkronkan.'); return; }
  if (!cfg.appsScriptUrl) {
    if (showFeedback) toast('URL Google Apps Script belum diatur di Pengaturan.', 'danger');
    return;
  }
  syncing = true;
  renderTopbar();
  let successCount = 0, failCount = 0;
  for (const inst of pending) {
    try {
      const res = await fetch(cfg.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(toSheetRow(inst)),
      });
      if (res.ok) { inst.status = 'tersinkron'; inst.syncedAt = Date.now(); successCount++; }
      else { inst.status = 'gagal_sinkron'; failCount++; }
    } catch (e) {
      inst.status = 'gagal_sinkron'; failCount++;
    }
  }
  DB.set('installations', list);
  syncing = false;
  if (successCount) toast(`${successCount} data berhasil disinkronkan ke Google Sheets.`, 'success');
  if (failCount) toast(`${failCount} data gagal dikirim, akan dicoba lagi otomatis.`, 'danger');
  if (!successCount && !failCount && showFeedback) toast('Sinkronisasi selesai.');
  render();
}

function toSheetRow(inst) {
  const di = inst.dataInstalasi, pk = inst.pengukuran, gps = inst.gps || {};
  return {
    idInstalasi: inst.laporanId,
    timestamp: new Date(inst.createdAt).toISOString(),
    idPSB: inst.psbId, idPelanggan: inst.customer.customerId, namaPelanggan: inst.customer.name,
    nomorHp: inst.customer.phone, alamat: inst.customer.address, paket: inst.customer.package,
    teknisi: di.namaTeknisi, tanggalInstalasi: di.tanggal, jamMulai: di.jamMulai, jamSelesai: di.jamSelesai,
    latitude: gps.lat || '', longitude: gps.lng || '', odp: di.odp, portOdp: di.portOdp, core: di.coreFiber,
    panjangFiber: di.panjangFiber, ont: di.jenisONT, serialNumberOnt: di.serialONT, macAddress: di.macONT,
    rxPower: pk.rxPower, txPower: pk.txPower, redaman: pk.redaman, download: pk.download, upload: pk.upload,
    ping: pk.ping, jitter: pk.jitter, packetLoss: pk.packetLoss, statusInstalasi: inst.status,
    catatanTeknisi: inst.catatanTeknisi || '', konfirmasiPelanggan: inst.konfirmasi.setuju ? 'Ya' : 'Tidak',
    timestampKonfirmasi: inst.konfirmasi.timestampConfirm ? new Date(inst.konfirmasi.timestampConfirm).toISOString() : '',
    // Base64 payloads — the Apps Script backend uploads these to Drive and
    // writes back share links into the "Link Foto" / "Link Tanda Tangan"
    // columns. Left empty if the technician skipped optional photos.
    fotos: Object.entries(inst.photos || {}).map(([jenis, p]) => ({ jenis, dataBase64: p.dataUrl })),
    tandaTanganBase64: inst.konfirmasi.signatureDataUrl || '',
  };
}

window.addEventListener('online', () => { renderTopbar(); if (settings().autoSync) flushQueue(); });
window.addEventListener('offline', () => renderTopbar());
setInterval(() => { if (settings().autoSync) flushQueue(); }, 45000);

/* ---------------------------------------------------------------------- */
/* Topbar + Bottom nav rendering                                          */
/* ---------------------------------------------------------------------- */
const SCREEN_TITLES = {
  dashboard: ['Dashboard', ''],
  instalasi: ['Instalasi', 'PSB & pekerjaan berjalan'],
  riwayat: ['Riwayat', 'Instalasi selesai'],
  profil: ['Profil', ''],
  'psb-detail': ['Detail PSB', ''],
  'form': ['Form Instalasi', ''],
  'riwayat-detail': ['Detail Instalasi', ''],
  laporan: ['Laporan', 'Ringkasan performa'],
  diagnosa: ['Diagnosa Jaringan', ''],
  pengaturan: ['Pengaturan', ''],
  admin: ['Admin', 'WHUSNET'],
  tiket: ['Tiket', 'Bantuan & kendala lapangan'],
  'tiket-form': ['Buat Tiket', ''],
  'tiket-detail': ['Detail Tiket', ''],
  speedtest: ['Speed Test', 'Uji kecepatan jaringan'],
};

function renderTopbar() {
  const top = document.getElementById('topbar');
  if (!top) return;
  const isTopLevel = TOP_LEVEL_ROUTES.includes(state.route);
  const [title, sub] = SCREEN_TITLES[state.route] || ['WHUSNET', ''];
  const online = navigator.onLine;
  top.innerHTML = `
    ${isTopLevel ? '' : `<button class="topbar-back" id="btnBack">${ICON.chevronLeft}</button>`}
    <div class="topbar-title"><h1>${title}</h1>${sub ? `<span>${sub}</span>` : ''}</div>
    <div class="online-pill ${online ? 'on' : 'off'}">
      <span class="dot"></span>${online ? (syncing ? 'Menyinkron…' : 'Online') : 'Offline'}
    </div>`;
  if (!isTopLevel) document.getElementById('btnBack').onclick = () => goBack();
}

function renderBottomNav() {
  const nav = document.getElementById('bottomnav');
  if (!session()) { nav.innerHTML = ''; nav.style.display = 'none'; return; }
  nav.style.display = 'flex';
  nav.innerHTML = NAV_ITEMS.map(item => `
    <button class="nav-item ${state.route === item.route ? 'active' : ''}" data-route="${item.route}">
      ${item.icon}<span>${item.label}</span>
    </button>`).join('');
  nav.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => { state.history = []; goTo(btn.dataset.route, {}, { replace: true }); };
  });
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Login                                                          */
/* ---------------------------------------------------------------------- */
function screenLogin() {
  return `
  <div class="login-wrap">
    <div class="login-head">
      <div class="login-logo">${ICON.wifi.replace('currentColor', '#fff')}</div>
      <h1>WHUSNET INSTALLER</h1>
      <p>Masuk untuk melanjutkan pekerjaan lapangan</p>
    </div>
    <div class="field">
      <label>Nomor HP / Username</label>
      <input type="text" id="loginUser" placeholder="Contoh: 0812xxxxxxx" autocomplete="username">
    </div>
    <div class="field" id="pwField">
      <label>Password</label>
      <div class="pw-wrap">
        <input type="password" id="loginPass" placeholder="Kata sandi" autocomplete="current-password">
        <button type="button" class="pw-toggle" id="pwToggle">LIHAT</button>
      </div>
      <div class="error-msg" id="loginError">Nomor HP/Username atau password salah.</div>
    </div>
    <div class="check-row" style="border:none; padding-left:0;">
      <input type="checkbox" id="rememberMe" checked>
      <span>Ingat saya di perangkat ini</span>
    </div>
    <div class="spacer-8"></div>
    <button class="btn btn-primary" id="btnLogin">Masuk</button>
    <div class="spacer-8"></div>
    <button class="btn btn-ghost" style="margin:0 auto;" id="btnForgot">Lupa password?</button>
    <div class="login-foot">© WHUSNET · v1.0</div>
  </div>`;
}
function wireLogin() {
  document.getElementById('pwToggle').onclick = (e) => {
    const inp = document.getElementById('loginPass');
    const showing = inp.type === 'text';
    inp.type = showing ? 'password' : 'text';
    e.target.textContent = showing ? 'LIHAT' : 'SEMBUNYIKAN';
  };
  document.getElementById('btnForgot').onclick = () => showModal({
    title: 'Lupa password?',
    body: 'Hubungi admin WHUSNET di kantor cabang Anda untuk mengatur ulang password teknisi.',
    actions: [{ label: 'Mengerti', cls: 'btn-primary' }]
  });
  document.getElementById('btnLogin').onclick = () => {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const remember = document.getElementById('rememberMe').checked;
    const btn = document.getElementById('btnLogin');
    document.getElementById('pwField').classList.remove('invalid');
    if (!user || !pass) {
      document.getElementById('pwField').classList.add('invalid');
      document.getElementById('loginError').textContent = 'Nomor HP/Username dan password wajib diisi.';
      return;
    }
    btn.disabled = true; btn.textContent = 'Memeriksa…';
    setTimeout(() => {
      const isAdmin = user.toLowerCase().includes('admin');
      DB.set('session', {
        name: isAdmin ? 'Admin WHUSNET' : 'Rizky Ramadhan',
        role: isAdmin ? 'admin' : 'teknisi',
        technicianId: 'TCH-002',
        phone: user,
        region: 'Cimahi & Sekitarnya',
        remember,
        loginAt: Date.now(),
      });
      btn.disabled = false; btn.textContent = 'Masuk';
      state.history = [];
      goTo('dashboard', {}, { replace: true });
      toast('Selamat datang kembali!', 'success');
    }, 650);
  };
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Dashboard                                                      */
/* ---------------------------------------------------------------------- */
function screenDashboard() {
  const s = session();
  const psb = DB.get('psb', []);
  const today = psb.filter(p => isToday(p.date));
  const counts = {
    today: today.length,
    progress: psb.filter(p => p.status === 'progress').length,
    done: today.filter(p => p.status === 'done').length,
    pending: psb.filter(p => p.status === 'pending').length,
    problem: psb.filter(p => p.status === 'problem').length,
  };
  const pct = today.length ? Math.round((counts.done / today.length) * 100) : 0;
  const queued = queuedCount();

  return `
    <div class="card" style="background:linear-gradient(160deg, var(--accent-wash), var(--surface)); border-color:rgba(47,143,255,0.35);">
      <div class="row-between">
        <div>
          <div class="small muted">Selamat datang,</div>
          <div style="font-size:17px; font-weight:700; margin-top:2px;">${s.name}</div>
        </div>
        <span class="badge done"><span class="dot"></span>${s.role === 'admin' ? 'Admin' : 'Online'}</span>
      </div>
    </div>

    ${queued > 0 ? `
    <div class="banner warn" style="margin-top:12px;">
      ${ICON.sync}
      <div>${queued} data instalasi menunggu sinkronisasi ke Google Sheets.
        <button class="btn-ghost" style="padding:2px 0; display:inline; width:auto;" id="btnSyncNow">Sinkron sekarang</button>
      </div>
    </div>` : ''}

    <div class="section-title">Ringkasan Hari Ini</div>
    <div class="stat-grid">
      <div class="stat-card accent"><div class="stat-value">${counts.today}</div><div class="stat-label">PSB Hari Ini</div></div>
      <div class="stat-card warn"><div class="stat-value">${counts.progress}</div><div class="stat-label">Dalam Proses</div></div>
      <div class="stat-card ok"><div class="stat-value">${counts.done}</div><div class="stat-label">Selesai</div></div>
      <div class="stat-card"><div class="stat-value">${counts.pending}</div><div class="stat-label">Pending</div></div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="row-between"><span class="small" style="font-weight:600;">Progress Instalasi Hari Ini</span><span class="mono small muted">${pct}%</span></div>
      <div class="spacer-8"></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>

    <div class="section-title">Akses Cepat</div>
    <div class="stat-grid">
      <button class="stat-card tap" style="text-align:left; cursor:pointer;" id="qDiagnosa">
        <div style="color:var(--accent-strong); margin-bottom:6px;">${ICON.activity}</div>
        <div class="stat-label" style="color:var(--text);">Diagnosa Jaringan</div>
      </button>
      <button class="stat-card tap" style="text-align:left; cursor:pointer;" id="qSpeedtest">
        <div style="color:var(--accent-strong); margin-bottom:6px;">${ICON.gauge}</div>
        <div class="stat-label" style="color:var(--text);">Speed Test</div>
      </button>
      <button class="stat-card tap" style="text-align:left; cursor:pointer;" id="qTiket">
        <div style="color:var(--accent-strong); margin-bottom:6px;">${ICON.ticket}</div>
        <div class="stat-label" style="color:var(--text);">Buat Tiket</div>
      </button>
      <button class="stat-card tap" style="text-align:left; cursor:pointer;" id="qLaporan">
        <div style="color:var(--accent-strong); margin-bottom:6px;">${ICON.bars}</div>
        <div class="stat-label" style="color:var(--text);">Laporan</div>
      </button>
    </div>

    <div class="section-title">Perlu Perhatian</div>
    ${counts.problem > 0 ? `
    <div class="card">
      <div class="row-between">
        <div class="row-between" style="gap:8px;"><span style="color:var(--danger);">${ICON.alert}</span><span>${counts.problem} instalasi bermasalah</span></div>
        <button class="btn-ghost" id="btnLihatBermasalah">Lihat</button>
      </div>
    </div>` : `<div class="card"><div class="row-between" style="gap:8px; color:var(--text-dim);">${ICON.check}<span class="small">Tidak ada masalah yang perlu ditindaklanjuti.</span></div></div>`}
  `;
}
function wireDashboard() {
  const sync = document.getElementById('btnSyncNow');
  if (sync) sync.onclick = () => flushQueue(true);
  document.getElementById('qDiagnosa').onclick = () => goTo('diagnosa');
  document.getElementById('qLaporan').onclick = () => goTo('laporan');
  document.getElementById('qSpeedtest').onclick = () => goTo('speedtest');
  document.getElementById('qTiket').onclick = () => goTo('tiket');
  const lb = document.getElementById('btnLihatBermasalah');
  if (lb) lb.onclick = () => { state.psbFilter = { query: '', chip: 'problem' }; state.history = []; goTo('instalasi', {}, { replace: true }); };
}

/* ---------------------------------------------------------------------- */
/* SCREEN: PSB list (also reused for "Instalasi" tab with a fixed filter) */
/* ---------------------------------------------------------------------- */
const PSB_FILTER_CHIPS = [
  { key: 'today', label: 'Hari Ini' },
  { key: 'tomorrow', label: 'Besok' },
  { key: 'week', label: 'Minggu Ini' },
  { key: 'pending', label: 'Pending' },
  { key: 'progress', label: 'Dalam Proses' },
  { key: 'done', label: 'Selesai' },
  { key: 'problem', label: 'Bermasalah' },
];

function filterPsb(list, filter) {
  let out = list;
  if (filter.chip === 'today') out = out.filter(p => isToday(p.date));
  else if (filter.chip === 'tomorrow') out = out.filter(p => isTomorrow(p.date));
  else if (filter.chip === 'week') out = out.filter(p => isThisWeek(p.date));
  else if (['pending', 'progress', 'done', 'problem'].includes(filter.chip)) out = out.filter(p => p.status === filter.chip);
  if (filter.query) {
    const q = filter.query.toLowerCase();
    out = out.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.phone.includes(q));
  }
  return out.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

function psbCardHtml(p) {
  return `
    <div class="card psb-card tap" data-psb="${p.id}">
      <div class="psb-top">
        <div>
          <div class="psb-name">${p.name}</div>
          <div class="psb-id mono">${p.id}</div>
        </div>
        ${statusBadge(p.status)}
      </div>
      <div class="psb-meta">
        <div class="row">${ICON.phone}<span>${p.phone}</span></div>
        <div class="row">${ICON.pin}<span>${p.address}, ${p.desa}, ${p.kecamatan}</span></div>
        <div class="row">${ICON.clock}<span>${fmtDate(p.date)} · ${p.time}</span></div>
      </div>
      <div class="divider"></div>
      <div class="row-between">
        <span class="small muted">${p.package}</span>
        <span class="small" style="color:var(--accent-strong); display:flex; align-items:center; gap:4px;">Detail ${ICON.chevronRight}</span>
      </div>
    </div>`;
}
function emptyState(title, body) {
  return `<div class="empty-state">${ICON.list}<h3>${title}</h3><p>${body}</p></div>`;
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Instalasi tab — drafts berjalan + seluruh daftar PSB           */
/* (Menggantikan tab "PSB" yang terpisah; semua PSB kini diakses di sini) */
/* ---------------------------------------------------------------------- */
function screenInstalasi() {
  const drafts = DB.get('installations', []).filter(i => i.status === 'draft');
  const list = filterPsb(DB.get('psb', []), state.psbFilter);
  return `
    ${drafts.length ? `
    <div class="section-title">Draft Belum Selesai</div>
    ${drafts.map(d => `
      <div class="card psb-card tap" data-draft="${d.id}">
        <div class="psb-top">
          <div><div class="psb-name">${d.customer.name}</div><div class="psb-id mono">${d.psbId}</div></div>
          <span class="badge progress"><span class="dot"></span>Draft · Langkah ${d.stepReached + 1}/7</span>
        </div>
        <div class="spacer-8"></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.round(((d.stepReached + 1) / 7) * 100)}%"></div></div>
      </div>`).join('')}` : ''}

    <div class="section-title">Semua PSB</div>
    <div class="search-bar">
      ${ICON.search}
      <input type="text" id="psbSearch" placeholder="Cari nama / ID PSB / nomor HP" value="${state.psbFilter.query}">
    </div>
    <div class="filter-chips">
      ${PSB_FILTER_CHIPS.map(c => `<div class="chip tap ${state.psbFilter.chip === c.key ? 'active' : ''}" data-chip="${c.key}">${c.label}</div>`).join('')}
    </div>
    ${list.length ? list.map(psbCardHtml).join('') : emptyState('Tidak ada data', 'Tidak ada PSB yang cocok dengan pencarian/filter ini.')}
  `;
}
function wireInstalasi() {
  document.querySelectorAll('[data-draft]').forEach(c => c.onclick = () => {
    const d = DB.get('installations', []).find(x => x.id === c.dataset.draft);
    state.draft = d; state.step = d.stepReached || 0;
    goTo('form', { psbId: d.psbId });
  });
  document.getElementById('psbSearch').oninput = (e) => { state.psbFilter.query = e.target.value; renderView(); };
  document.querySelectorAll('.chip').forEach(c => c.onclick = () => { state.psbFilter.chip = c.dataset.chip; renderView(); });
  document.querySelectorAll('.psb-card[data-psb]').forEach(c => c.onclick = () => goTo('psb-detail', { psbId: c.dataset.psb }));
}

/* ---------------------------------------------------------------------- */
/* SCREEN: PSB detail                                                     */
/* ---------------------------------------------------------------------- */
function screenPsbDetail() {
  const p = DB.get('psb', []).find(x => x.id === state.params.psbId);
  if (!p) return emptyState('Data tidak ditemukan', 'PSB ini mungkin sudah dihapus.');
  const hasDraft = DB.get('installations', []).some(i => i.psbId === p.id && i.status === 'draft');
  return `
    <div class="card">
      <div class="row-between"><h2 style="margin:0; font-size:17px;">${p.name}</h2>${statusBadge(p.status)}</div>
      <div class="psb-id mono" style="margin-top:2px;">${p.id} · ${p.customerId}</div>
    </div>

    <div class="section-title">Data Pelanggan</div>
    <div class="card">
      ${infoRow('Nomor HP', p.phone)}
      ${infoRow('WhatsApp', p.phone)}
      ${infoRow('Alamat Lengkap', p.address)}
      ${infoRow('Kecamatan', p.kecamatan)}
      ${infoRow('Desa', p.desa)}
      ${infoRow('Koordinat GPS', `${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}`, true)}
      ${infoRow('Paket', p.package)}
      ${infoRow('Biaya Pemasangan', fmtRupiah(p.cost))}
      ${infoRow('Teknisi', p.technician)}
      ${infoRow('Jadwal', `${fmtDate(p.date)} · ${p.time}`)}
    </div>

    <button class="btn btn-secondary" style="margin-top:12px;" id="btnNavigate">${ICON.pin} Buka Navigasi</button>

    <div class="spacer-16"></div>
    <button class="btn btn-primary" id="btnMulaiInstalasi">${hasDraft ? 'Lanjutkan Instalasi' : 'Mulai Instalasi'}</button>
  `;
}
function infoRow(label, value, mono = false) {
  return `<div class="row-between" style="padding:7px 0; align-items:flex-start;"><span class="small muted" style="flex-shrink:0; width:44%;">${label}</span><span class="small ${mono ? 'mono' : ''}" style="text-align:right;">${value}</span></div>`;
}
function wirePsbDetail() {
  const p = DB.get('psb', []).find(x => x.id === state.params.psbId);
  if (!p) return;
  document.getElementById('btnNavigate').onclick = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`, '_blank');
  };
  document.getElementById('btnMulaiInstalasi').onclick = () => {
    let draft = DB.get('installations', []).find(i => i.psbId === p.id && i.status === 'draft');
    if (!draft) draft = createDraft(p);
    state.draft = draft; state.step = draft.stepReached || 0;
    goTo('form', { psbId: p.id });
  };
}

function createDraft(psb) {
  const s = session();
  const draft = {
    id: 'draft_' + Date.now(),
    psbId: psb.id,
    customer: { customerId: psb.customerId, name: psb.name, phone: psb.phone, address: psb.address, package: psb.package },
    dataInstalasi: {
      tanggal: new Date().toISOString().slice(0, 10), jamMulai: '', jamSelesai: '',
      namaTeknisi: s.name, idTeknisi: s.technicianId, jenisInstalasi: 'Baru (PSB)',
      panjangFiber: '', jumlahSambungan: '', jenisONT: '', serialONT: '', macONT: '',
      usernamePPPoE: '', vlan: '', odp: '', portOdp: '', coreFiber: '', jarakOdp: '',
    },
    pengukuran: { rxPower: '', txPower: '', redaman: '', opticalPower: '', otdr: '', download: '', upload: '', ping: '', jitter: '', packetLoss: '' },
    checklist: {
      infra: { fiber: false, odp: false, port: false, tiang: false, jalurAman: false, tanpaHambatan: false },
      instal: { fiberTerpasang: false, connector: false, ontTerpasang: false, powerNormal: false, internetAktif: false, wifiAktif: false, speedtestBerhasil: false },
    },
    photos: {},
    gps: null,
    konfirmasi: { setuju: false, signatureDataUrl: null, timestampConfirm: null },
    catatanTeknisi: '',
    status: 'draft',
    stepReached: 0,
    laporanId: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const list = DB.get('installations', []);
  list.push(draft);
  DB.set('installations', list);
  const psbList = DB.get('psb', []);
  const idx = psbList.findIndex(x => x.id === psb.id);
  if (idx > -1 && psbList[idx].status === 'pending') { psbList[idx].status = 'progress'; DB.set('psb', psbList); }
  return draft;
}
function persistDraft() {
  state.draft.updatedAt = Date.now();
  const list = DB.get('installations', []);
  const idx = list.findIndex(x => x.id === state.draft.id);
  if (idx > -1) list[idx] = state.draft; else list.push(state.draft);
  DB.set('installations', list);
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Installation form (multi-step)                                 */
/* ---------------------------------------------------------------------- */
const PHOTO_SLOTS = [
  { key: 'rumah', label: 'Rumah Pelanggan', required: true },
  { key: 'ont', label: 'ONT', required: true },
  { key: 'odp', label: 'ODP', required: true },
  { key: 'sambungan', label: 'Sambungan Fiber', required: true },
  { key: 'jalur', label: 'Jalur Kabel', required: false },
  { key: 'modem', label: 'Modem / Router', required: false },
  { key: 'pengukuranFoto', label: 'Hasil Pengukuran', required: false },
  { key: 'keseluruhan', label: 'Instalasi Keseluruhan', required: true },
];
const CHECKLIST_INFRA = [
  ['fiber', 'Jalur fiber tersedia'], ['odp', 'ODP tersedia'], ['port', 'Port ODP tersedia'],
  ['tiang', 'Tiang tersedia'], ['jalurAman', 'Jalur aman'], ['tanpaHambatan', 'Tidak ada hambatan'],
];
const CHECKLIST_INSTAL = [
  ['fiberTerpasang', 'Fiber sudah terpasang'], ['connector', 'Connector sudah dipasang'], ['ontTerpasang', 'ONT sudah terpasang'],
  ['powerNormal', 'Power ONT normal'], ['internetAktif', 'Internet aktif'], ['wifiAktif', 'WiFi aktif'], ['speedtestBerhasil', 'Speed test berhasil'],
];
const FORM_STEPS = ['Pelanggan & GPS', 'Data Instalasi', 'Pengukuran', 'Checklist', 'Dokumentasi', 'Konfirmasi', 'Review'];

function evalThreshold(value, thresholds, kind) {
  if (value === '' || value === null || value === undefined || isNaN(value)) return 'idle';
  const v = Number(value);
  const t = thresholds;
  if (kind === 'rxPower') {
    if (v <= t.badLow || v >= t.badHigh) return 'bad';
    if (v <= t.warnLow || v >= t.warnHigh) return 'warn';
    return 'ok';
  }
  if (kind === 'redaman') { if (v > t.badMax) return 'bad'; if (v > t.warnMax) return 'warn'; return 'ok'; }
  if (kind === 'ping') { if (v > t.badMax) return 'bad'; if (v > t.warnMax) return 'warn'; return 'ok'; }
  if (kind === 'jitter') { if (v > t.badMax) return 'bad'; if (v > t.warnMax) return 'warn'; return 'ok'; }
  if (kind === 'packetLoss') { if (v > t.badMax) return 'bad'; if (v > t.warnMax) return 'warn'; return 'ok'; }
  return 'idle';
}
function flagChip(flag) {
  const map = { ok: ['Normal', 'ok'], warn: ['Perlu diperiksa', 'warn'], bad: ['Tidak normal', 'bad'], idle: ['—', 'idle'] };
  const [label, cls] = map[flag];
  return `<span class="measure-flag ${cls}">${label}</span>`;
}

function screenForm() {
  const d = state.draft;
  if (!d) return emptyState('Tidak ada draft aktif', 'Mulai instalasi dari halaman detail PSB.');
  const step = state.step;
  return `
    <div class="steps-bar">
      ${FORM_STEPS.map((s, i) => `<div class="step-pill ${i === step ? 'active' : i < step ? 'complete' : ''}">${i + 1}. ${s}</div>`).join('')}
    </div>
    <div id="formStepBody">${renderFormStep(step, d)}</div>
    <div class="spacer-16"></div>
    <div style="display:flex; gap:10px;">
      ${step > 0 ? `<button class="btn btn-secondary" id="btnStepBack">Kembali</button>` : ''}
      ${step < FORM_STEPS.length - 1 ? `<button class="btn btn-primary" id="btnStepNext">Lanjut</button>` : ''}
    </div>
  `;
}

function renderFormStep(step, d) {
  if (step === 0) return stepPelangganGps(d);
  if (step === 1) return stepDataInstalasi(d);
  if (step === 2) return stepPengukuran(d);
  if (step === 3) return stepChecklist(d);
  if (step === 4) return stepDokumentasi(d);
  if (step === 5) return stepKonfirmasi(d);
  if (step === 6) return stepReview(d);
  return '';
}

function stepPelangganGps(d) {
  const g = d.gps;
  return `
    <div class="card">
      ${infoRow('Nama Pelanggan', d.customer.name)}
      ${infoRow('Nomor HP', d.customer.phone)}
      ${infoRow('Alamat', d.customer.address)}
      ${infoRow('Paket', d.customer.package)}
      ${infoRow('ID Pelanggan', d.customer.customerId, true)}
      ${infoRow('ID PSB', d.psbId, true)}
    </div>
    <div class="section-title">Lokasi GPS <span class="req">*</span></div>
    <div class="gps-box">
      <div class="gps-map">${g ? `<span class="gps-pin">${ICON.pin}</span>` : `<span class="muted small">Lokasi belum diambil</span>`}</div>
      ${g ? `<div class="gps-data">
        <div>LAT: ${g.lat.toFixed(6)}</div><div>LNG: ${g.lng.toFixed(6)}</div>
        <div>AKURASI: ${Math.round(g.accuracy)} m</div><div>${new Date(g.timestamp).toLocaleTimeString('id-ID')}</div>
      </div>` : ''}
    </div>
    ${g && g.accuracy > 50 ? `<div class="banner warn" style="margin-top:12px;">${ICON.alert}<div>Akurasi GPS rendah (${Math.round(g.accuracy)} m). Coba ambil ulang di area terbuka untuk hasil lebih presisi.</div></div>` : ''}
    <button class="btn btn-secondary" style="margin-top:12px;" id="btnAmbilGps">${ICON.pin} Ambil Lokasi Saat Ini</button>
  `;
}

function stepDataInstalasi(d) {
  const f = d.dataInstalasi;
  const inp = (key, label, type = 'text', required = false, opts = null) => `
    <div class="field">
      <label>${label}${required ? '<span class="req">*</span>' : ''}</label>
      ${opts ? `<select data-f="${key}">${opts.map(o => `<option ${f[key] === o ? 'selected' : ''}>${o}</option>`).join('')}</select>` :
      `<input type="${type}" data-f="${key}" value="${f[key] ?? ''}">`}
    </div>`;
  return `
    <div class="section-title">Waktu Pengerjaan</div>
    ${inp('tanggal', 'Tanggal Instalasi', 'date', true)}
    <div style="display:flex; gap:12px;">
      <div style="flex:1;">${inp('jamMulai', 'Jam Mulai', 'time', true)}</div>
      <div style="flex:1;">${inp('jamSelesai', 'Jam Selesai', 'time')}</div>
    </div>
    <div class="section-title">Teknisi</div>
    ${inp('namaTeknisi', 'Nama Teknisi')}
    ${inp('idTeknisi', 'ID Teknisi')}
    <div class="section-title">Detail Instalasi</div>
    ${inp('jenisInstalasi', 'Jenis Instalasi', 'text', false, ['Baru (PSB)', 'Perbaikan', 'Upgrade', 'Pindah Lokasi'])}
    ${inp('panjangFiber', 'Panjang Kabel Fiber (m)', 'number', true)}
    ${inp('jumlahSambungan', 'Jumlah Titik Sambungan', 'number')}
    ${inp('jenisONT', 'Jenis ONT', 'text', true)}
    ${inp('serialONT', 'Serial Number ONT', 'text', true)}
    ${inp('macONT', 'MAC Address ONT', 'text', true)}
    ${inp('usernamePPPoE', 'Username PPPoE')}
    ${inp('vlan', 'VLAN')}
    <div class="section-title">Jalur ODP</div>
    ${inp('odp', 'ODP', 'text', true)}
    ${inp('portOdp', 'Port ODP', 'text', true)}
    ${inp('coreFiber', 'Nomor Core Fiber')}
    ${inp('jarakOdp', 'Jarak ODP ke Pelanggan (m)', 'number')}
  `;
}
function wireDataInstalasiInputs() {
  document.querySelectorAll('[data-f]').forEach(el => el.onchange = (e) => {
    state.draft.dataInstalasi[e.target.dataset.f] = e.target.value;
    persistDraft();
  });
}

function stepPengukuran(d) {
  const p = d.pengukuran;
  const th = settings().thresholds;
  const row = (key, label, unit, kind) => `
    <div class="field">
      <label>${label}</label>
      <div class="measure-row">
        <div class="measure-input"><input type="number" step="0.1" data-m="${key}" data-kind="${kind || ''}" value="${p[key] ?? ''}" placeholder="0"><span class="small muted">${unit}</span></div>
        ${kind ? `<span id="flag-${key}">${flagChip(evalThreshold(p[key], th[kind], kind))}</span>` : ''}
      </div>
    </div>`;
  return `
    <div class="section-title">Optik</div>
    ${row('rxPower', 'Power RX', 'dBm', 'rxPower')}
    ${row('txPower', 'Power TX', 'dBm')}
    ${row('redaman', 'Redaman', 'dB', 'redaman')}
    ${row('opticalPower', 'Optical Power', 'dBm')}
    <div class="field"><label>Hasil OTDR (jika tersedia)</label><textarea data-m="otdr">${p.otdr || ''}</textarea></div>
    <div class="section-title">Kecepatan Jaringan</div>
    ${row('download', 'Speed Test Download', 'Mbps')}
    ${row('upload', 'Speed Test Upload', 'Mbps')}
    ${row('ping', 'Ping', 'ms', 'ping')}
    ${row('jitter', 'Jitter', 'ms', 'jitter')}
    ${row('packetLoss', 'Packet Loss', '%', 'packetLoss')}
    <div class="banner info" style="margin-top:6px;">${ICON.info}<div>Ambang batas nilai dapat disesuaikan admin di menu Diagnosa &amp; Pengaturan.</div></div>
  `;
}
function wirePengukuranInputs() {
  document.querySelectorAll('[data-m]').forEach(el => el.oninput = (e) => {
    const key = e.target.dataset.m;
    state.draft.pengukuran[key] = e.target.value;
    persistDraft();
    const kind = e.target.dataset.kind;
    if (kind) {
      const th = settings().thresholds[kind];
      document.getElementById('flag-' + key).innerHTML = flagChip(evalThreshold(e.target.value, th, kind));
    }
  });
}

function stepChecklist(d) {
  const row = (group, key, label) => `
    <label class="check-row"><input type="checkbox" data-c="${group}.${key}" ${d.checklist[group][key] ? 'checked' : ''}><span>${label}</span></label>`;
  return `
    <div class="section-title">Infrastruktur</div>
    <div class="card">${CHECKLIST_INFRA.map(([k, l]) => row('infra', k, l)).join('')}</div>
    <div class="section-title">Instalasi</div>
    <div class="card">${CHECKLIST_INSTAL.map(([k, l]) => row('instal', k, l)).join('')}</div>
  `;
}
function wireChecklistInputs() {
  document.querySelectorAll('[data-c]').forEach(el => el.onchange = (e) => {
    const [group, key] = e.target.dataset.c.split('.');
    state.draft.checklist[group][key] = e.target.checked;
    persistDraft();
  });
}

function stepDokumentasi(d) {
  return `
    <div class="banner info">${ICON.camera}<div>Ambil foto langsung dari kamera HP. Setiap foto otomatis diberi label waktu dan jenis dokumentasi.</div></div>
    <div class="photo-grid">
      ${PHOTO_SLOTS.map(s => {
        const ph = d.photos[s.key];
        return `
        <div class="photo-slot ${ph ? 'filled' : ''}" data-slot="${s.key}">
          ${s.required && !ph ? `<span class="req-star">*</span>` : ''}
          ${ph ? `<img src="${ph.dataUrl}"><span class="check">${ICON.check}</span><span class="retake">Ambil ulang</span>` :
          `${ICON.camera}<span>${s.label}${s.required ? ' *' : ''}</span>`}
        </div>`;
      }).join('')}
    </div>
    <input type="file" accept="image/*" capture="environment" id="photoInput" style="display:none;">
  `;
}
function downscaleImage(dataUrl, maxWidth = 1280, quality = 0.72) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
function wireDokumentasi() {
  const input = document.getElementById('photoInput');
  document.querySelectorAll('.photo-slot').forEach(slot => {
    slot.onclick = () => { input.dataset.target = slot.dataset.slot; input.click(); };
  });
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const compact = await downscaleImage(reader.result);
      state.draft.photos[input.dataset.target] = { dataUrl: compact, timestamp: Date.now(), keterangan: '' };
      persistDraft();
      renderView();
    };
    reader.readAsDataURL(file);
    input.value = '';
  };
}

let sigDrawing = false, sigCtx = null, sigHasStroke = false;
function stepKonfirmasi(d) {
  return `
    <div class="card">
      <p style="margin:0; line-height:1.6; font-size:14px;">"Saya menyatakan bahwa instalasi layanan WHUSNET telah selesai dilakukan dan layanan telah diterima dengan baik."</p>
      <div class="divider"></div>
      ${infoRow('Nama Pelanggan', d.customer.name)}
      ${infoRow('ID Pelanggan', d.customer.customerId, true)}
      ${infoRow('Paket', d.customer.package)}
      ${infoRow('Tanggal Instalasi', fmtDate(d.dataInstalasi.tanggal))}
      ${infoRow('Teknisi', d.dataInstalasi.namaTeknisi)}
    </div>
    <div class="section-title">Tanda Tangan Pelanggan <span class="req">*</span></div>
    <div class="sig-wrap"><canvas id="sigCanvas"></canvas></div>
    <div class="row-between" style="margin-top:8px;">
      <span class="small muted">${d.konfirmasi.signatureDataUrl ? 'Tanda tangan tersimpan' : 'Belum ada tanda tangan'}</span>
      <button class="btn-ghost" id="btnClearSig">Hapus</button>
    </div>
    <label class="check-row" style="margin-top:8px;">
      <input type="checkbox" id="chkSetuju" ${d.konfirmasi.setuju ? 'checked' : ''}>
      <span>Pelanggan menyetujui hasil instalasi</span>
    </label>
  `;
}
function wireKonfirmasi() {
  const canvas = document.getElementById('sigCanvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
  sigCtx = canvas.getContext('2d'); sigCtx.scale(dpr, dpr);
  sigCtx.strokeStyle = '#0A1628'; sigCtx.lineWidth = 2.2; sigCtx.lineCap = 'round'; sigCtx.lineJoin = 'round';
  sigHasStroke = false;
  if (state.draft.konfirmasi.signatureDataUrl) {
    const img = new Image();
    img.onload = () => sigCtx.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
    img.src = state.draft.konfirmasi.signatureDataUrl;
    sigHasStroke = true;
  }
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  };
  const start = (e) => { e.preventDefault(); sigDrawing = true; const { x, y } = pos(e); sigCtx.beginPath(); sigCtx.moveTo(x, y); };
  const move = (e) => { if (!sigDrawing) return; e.preventDefault(); const { x, y } = pos(e); sigCtx.lineTo(x, y); sigCtx.stroke(); sigHasStroke = true; };
  const end = () => {
    if (!sigDrawing) return;
    sigDrawing = false;
    state.draft.konfirmasi.signatureDataUrl = sigHasStroke ? canvas.toDataURL('image/png') : null;
    persistDraft();
  };
  canvas.onmousedown = start; canvas.onmousemove = move; window.addEventListener('mouseup', end);
  canvas.ontouchstart = start; canvas.ontouchmove = move; canvas.ontouchend = end;

  document.getElementById('btnClearSig').onclick = () => {
    sigCtx.clearRect(0, 0, canvas.width, canvas.height);
    sigHasStroke = false;
    state.draft.konfirmasi.signatureDataUrl = null;
    persistDraft();
    renderView();
  };
  document.getElementById('chkSetuju').onchange = (e) => { state.draft.konfirmasi.setuju = e.target.checked; persistDraft(); };
}

function validateDraft(d) {
  const missing = [];
  if (!d.customer.name) missing.push('Nama pelanggan belum diisi');
  if (!d.gps) missing.push('GPS belum diambil');
  if (!d.dataInstalasi.jamMulai) missing.push('Jam mulai instalasi belum diisi');
  if (!d.dataInstalasi.panjangFiber) missing.push('Panjang kabel fiber belum diisi');
  if (!d.dataInstalasi.jenisONT) missing.push('Jenis ONT belum diisi');
  if (!d.dataInstalasi.serialONT) missing.push('Serial Number ONT belum diisi');
  if (!d.dataInstalasi.macONT) missing.push('MAC Address ONT belum diisi');
  if (!d.dataInstalasi.odp) missing.push('ODP belum diisi');
  if (!d.dataInstalasi.portOdp) missing.push('Port ODP belum diisi');
  PHOTO_SLOTS.filter(s => s.required).forEach(s => { if (!d.photos[s.key]) missing.push(`Foto ${s.label} belum ada`); });
  if (!d.konfirmasi.signatureDataUrl) missing.push('Tanda tangan pelanggan belum ada');
  if (!d.konfirmasi.setuju) missing.push('Persetujuan pelanggan belum dicentang');
  return missing;
}

function stepReview(d) {
  const missing = validateDraft(d);
  return `
    ${missing.length ? `
    <div class="banner danger">${ICON.alert}<div><strong style="display:block; margin-bottom:4px;">Data belum lengkap</strong>
      ${missing.map(m => `❌ ${m}`).join('<br>')}
    </div></div>` : `<div class="banner success">${ICON.check}<div><strong>Form siap dikirim</strong></div></div>`}

    <div class="section-title">Catatan Teknisi</div>
    <div class="field"><textarea id="catatanTeknisi" placeholder="Catatan tambahan (opsional)">${d.catatanTeknisi || ''}</textarea></div>

    <div class="section-title">Ringkasan</div>
    <div class="card">
      ${infoRow('Pelanggan', d.customer.name)}
      ${infoRow('ONT / Serial', `${d.dataInstalasi.jenisONT || '-'} / ${d.dataInstalasi.serialONT || '-'}`, true)}
      ${infoRow('RX Power', d.pengukuran.rxPower ? d.pengukuran.rxPower + ' dBm' : '-', true)}
      ${infoRow('Download / Upload', `${d.pengukuran.download || '-'} / ${d.pengukuran.upload || '-'} Mbps`, true)}
      ${infoRow('Foto Terlampir', `${Object.keys(d.photos).length} / ${PHOTO_SLOTS.length}`)}
      ${infoRow('Tanda Tangan', d.konfirmasi.signatureDataUrl ? 'Ada' : 'Belum ada')}
    </div>

    <button class="btn btn-primary" style="margin-top:16px;" id="btnSubmitForm" ${missing.length ? 'disabled' : ''}>Konfirmasi &amp; Selesaikan Instalasi</button>
  `;
}
function wireReview() {
  const ta = document.getElementById('catatanTeknisi');
  if (ta) ta.oninput = (e) => { state.draft.catatanTeknisi = e.target.value; persistDraft(); };
  const btn = document.getElementById('btnSubmitForm');
  if (btn) btn.onclick = () => showModal({
    title: 'Kirim data instalasi?',
    body: 'Data akan disimpan dan dikirim ke Google Sheets. Anda tetap bisa membuka riwayat instalasi ini setelah dikirim.',
    actions: [
      { label: 'Batal', cls: 'btn-secondary' },
      { label: 'Ya, Kirim', cls: 'btn-primary', onClick: submitDraft },
    ]
  });
}

function generateLaporanId() {
  const today = new Date();
  const ymd = today.toISOString().slice(0, 10).replace(/-/g, '');
  const list = DB.get('installations', []);
  const countToday = list.filter(i => i.laporanId && i.laporanId.includes(ymd)).length + 1;
  return `WHU-${ymd}-${String(countToday).padStart(4, '0')}`;
}

function submitDraft() {
  const d = state.draft;
  d.laporanId = generateLaporanId();
  d.status = navigator.onLine ? 'menunggu_sinkron' : 'menunggu_sinkron';
  d.submittedAt = Date.now();
  persistDraft();
  const psbList = DB.get('psb', []);
  const idx = psbList.findIndex(x => x.id === d.psbId);
  if (idx > -1) { psbList[idx].status = 'done'; DB.set('psb', psbList); }
  toast(`Instalasi dikirim. Nomor laporan ${d.laporanId}`, 'success', 3600);
  if (settings().autoSync) flushQueue();
  state.draft = null; state.step = 0;
  state.history = [];
  goTo('riwayat-detail', { instId: d.id }, { replace: true });
}

function wireForm() {
  const back = document.getElementById('btnStepBack');
  const next = document.getElementById('btnStepNext');
  if (back) back.onclick = () => { state.step--; renderView(); };
  if (next) next.onclick = () => {
    state.step++;
    state.draft.stepReached = Math.max(state.draft.stepReached, state.step);
    persistDraft();
    renderView();
  };
  const step = state.step;
  if (step === 0) {
    const btnGps = document.getElementById('btnAmbilGps');
    if (btnGps) btnGps.onclick = () => {
      btnGps.disabled = true; btnGps.textContent = 'Mengambil lokasi…';
      if (!navigator.geolocation) { toast('Perangkat tidak mendukung GPS.', 'danger'); btnGps.disabled = false; return; }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          state.draft.gps = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy, timestamp: Date.now() };
          persistDraft(); renderView();
        },
        (err) => { toast('Gagal mengambil lokasi: ' + err.message, 'danger'); btnGps.disabled = false; btnGps.textContent = 'Ambil Lokasi Saat Ini'; },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    };
  } else if (step === 1) wireDataInstalasiInputs();
  else if (step === 2) wirePengukuranInputs();
  else if (step === 3) wireChecklistInputs();
  else if (step === 4) wireDokumentasi();
  else if (step === 5) wireKonfirmasi();
  else if (step === 6) wireReview();
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Riwayat                                                        */
/* ---------------------------------------------------------------------- */
const SYNC_META = {
  draft: { label: 'Draft', cls: 'pending' },
  menunggu_sinkron: { label: 'Menunggu Sinkron', cls: 'progress' },
  tersinkron: { label: 'Tersinkron', cls: 'done' },
  gagal_sinkron: { label: 'Gagal Sinkron', cls: 'problem' },
};
function screenRiwayat() {
  const list = DB.get('installations', []).filter(i => i.status !== 'draft').sort((a, b) => b.submittedAt - a.submittedAt);
  return `
    ${list.length ? list.map(i => {
      const m = SYNC_META[i.status];
      return `
      <div class="card psb-card" data-inst="${i.id}">
        <div class="psb-top">
          <div><div class="psb-name">${i.customer.name}</div><div class="psb-id mono">${i.laporanId || i.psbId}</div></div>
          <span class="badge ${m.cls}"><span class="dot"></span>${m.label}</span>
        </div>
        <div class="psb-meta"><div class="row">${ICON.clock}<span>${fmtDateTime(i.submittedAt)}</span></div></div>
      </div>`;
    }).join('') : emptyState('Belum ada riwayat', 'Instalasi yang sudah dikirim akan muncul di sini.')}
  `;
}
function wireRiwayat() {
  document.querySelectorAll('[data-inst]').forEach(c => c.onclick = () => goTo('riwayat-detail', { instId: c.dataset.inst }));
}

function screenRiwayatDetail() {
  const i = DB.get('installations', []).find(x => x.id === state.params.instId);
  if (!i) return emptyState('Tidak ditemukan', 'Data instalasi ini tidak tersedia.');
  const m = SYNC_META[i.status];
  return `
    <div class="card">
      <div class="row-between"><span class="mono" style="font-weight:700;">${i.laporanId || '-'}</span><span class="badge ${m.cls}"><span class="dot"></span>${m.label}</span></div>
    </div>
    <div class="section-title">Pelanggan</div>
    <div class="card">
      ${infoRow('Nama', i.customer.name)}${infoRow('ID PSB', i.psbId, true)}${infoRow('Paket', i.customer.package)}
      ${infoRow('Alamat', i.customer.address)}
    </div>
    <div class="section-title">Data Instalasi</div>
    <div class="card">
      ${infoRow('Tanggal', fmtDate(i.dataInstalasi.tanggal))}${infoRow('Jam', `${i.dataInstalasi.jamMulai} - ${i.dataInstalasi.jamSelesai || '-'}`)}
      ${infoRow('ONT', i.dataInstalasi.jenisONT)}${infoRow('Serial ONT', i.dataInstalasi.serialONT, true)}
      ${infoRow('MAC', i.dataInstalasi.macONT, true)}${infoRow('ODP / Port', `${i.dataInstalasi.odp} / ${i.dataInstalasi.portOdp}`, true)}
    </div>
    <div class="section-title">Hasil Pengukuran</div>
    <div class="card">
      ${infoRow('RX / TX Power', `${i.pengukuran.rxPower || '-'} / ${i.pengukuran.txPower || '-'} dBm`, true)}
      ${infoRow('Download / Upload', `${i.pengukuran.download || '-'} / ${i.pengukuran.upload || '-'} Mbps`, true)}
      ${infoRow('Ping / Jitter / Loss', `${i.pengukuran.ping || '-'}ms / ${i.pengukuran.jitter || '-'}ms / ${i.pengukuran.packetLoss || '-'}%`, true)}
    </div>
    <div class="section-title">Dokumentasi Foto (${Object.keys(i.photos).length})</div>
    <div class="photo-grid">
      ${Object.entries(i.photos).map(([k, ph]) => `<div class="photo-slot filled"><img src="${ph.dataUrl}"></div>`).join('') || `<span class="small muted">Tidak ada foto</span>`}
    </div>
    ${i.konfirmasi.signatureDataUrl ? `<div class="section-title">Tanda Tangan Pelanggan</div><div class="sig-wrap"><img src="${i.konfirmasi.signatureDataUrl}" style="width:100%; display:block;"></div>` : ''}
    ${i.catatanTeknisi ? `<div class="section-title">Catatan Teknisi</div><div class="card small">${i.catatanTeknisi}</div>` : ''}
    ${i.status === 'gagal_sinkron' ? `<button class="btn btn-secondary" style="margin-top:16px;" id="btnRetrySync">${ICON.sync} Coba Sinkron Lagi</button>` : ''}
  `;
}
function wireRiwayatDetail() {
  const btn = document.getElementById('btnRetrySync');
  if (btn) btn.onclick = () => flushQueue(true);
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Laporan                                                        */
/* ---------------------------------------------------------------------- */
function screenLaporan() {
  const psb = DB.get('psb', []);
  const inst = DB.get('installations', []).filter(i => i.status !== 'draft');
  const total = psb.length;
  const done = psb.filter(p => p.status === 'done').length;
  const pending = psb.filter(p => p.status === 'pending').length;
  const problem = psb.filter(p => p.status === 'problem').length;
  const cancelled = psb.filter(p => p.status === 'cancelled').length;
  const durations = inst.filter(i => i.dataInstalasi.jamMulai && i.dataInstalasi.jamSelesai).map(i => {
    const [h1, m1] = i.dataInstalasi.jamMulai.split(':').map(Number);
    const [h2, m2] = i.dataInstalasi.jamSelesai.split(':').map(Number);
    return (h2 * 60 + m2) - (h1 * 60 + m1);
  }).filter(m => m > 0);
  const avgMin = durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

  const week = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const counts = week.map((_, i) => psb.filter(p => new Date(p.date + 'T00:00:00').getDay() === (i + 1) % 7).length);
  const max = Math.max(1, ...counts);

  return `
    <div class="stat-grid">
      <div class="stat-card accent"><div class="stat-value">${total}</div><div class="stat-label">Total PSB</div></div>
      <div class="stat-card ok"><div class="stat-value">${done}</div><div class="stat-label">Selesai</div></div>
      <div class="stat-card"><div class="stat-value">${pending}</div><div class="stat-label">Pending</div></div>
      <div class="stat-card bad"><div class="stat-value">${problem}</div><div class="stat-label">Bermasalah</div></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="row-between"><span class="small" style="font-weight:600;">Dibatalkan</span><span class="mono">${cancelled}</span></div>
      <div class="divider"></div>
      <div class="row-between"><span class="small" style="font-weight:600;">Rata-rata Waktu Instalasi</span><span class="mono">${avgMin > 0 ? avgMin + ' menit' : '-'}</span></div>
    </div>
    <div class="section-title">PSB per Hari (Minggu Ini)</div>
    <div class="card">
      <div class="report-bar-wrap">
        ${counts.map(c => `<div class="report-bar" style="height:${Math.max(6, (c / max) * 100)}%;"><span>${c}</span></div>`).join('')}
      </div>
      <div class="report-bar-labels">${week.map(w => `<span>${w}</span>`).join('')}</div>
    </div>
  `;
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Diagnosa                                                       */
/* ---------------------------------------------------------------------- */
function screenDiagnosa() {
  return `
    <div class="banner info">${ICON.activity}<div>Masukkan hasil pengukuran untuk mendapatkan rekomendasi otomatis berbasis ambang batas yang berlaku.</div></div>
    <div class="field"><label>RX Power (dBm)</label><input type="number" step="0.1" id="dxRx" placeholder="Contoh: -19"></div>
    <div class="field"><label>Redaman (dB)</label><input type="number" step="0.1" id="dxRedaman" placeholder="Contoh: 2.1"></div>
    <div class="field"><label>Ping (ms)</label><input type="number" id="dxPing" placeholder="Contoh: 24"></div>
    <div class="field"><label>Jitter (ms)</label><input type="number" id="dxJitter" placeholder="Contoh: 6"></div>
    <div class="field"><label>Packet Loss (%)</label><input type="number" step="0.1" id="dxLoss" placeholder="Contoh: 0"></div>
    <button class="btn btn-primary" id="btnDiagnosa">Analisa</button>
    <div id="dxResult" class="spacer-16"></div>
  `;
}
const DX_ADVICE = {
  rxPower: 'Periksa redaman jalur fiber, konektor, sambungan, dan kondisi ODP.',
  redaman: 'Periksa sambungan splicing, konektor kotor, atau kabel tertekuk berlebihan.',
  ping: 'Periksa beban jaringan pada OLT/ODP dan kualitas sinyal optik pelanggan.',
  jitter: 'Periksa stabilitas jalur dan interferensi pada perangkat aktif.',
  packetLoss: 'Periksa redaman berlebih, konektor longgar, atau gangguan pada core fiber.',
};
function wireDiagnosa() {
  document.getElementById('btnDiagnosa').onclick = () => {
    const th = settings().thresholds;
    const items = [
      ['rxPower', 'RX Power', document.getElementById('dxRx').value, 'dBm'],
      ['redaman', 'Redaman', document.getElementById('dxRedaman').value, 'dB'],
      ['ping', 'Ping', document.getElementById('dxPing').value, 'ms'],
      ['jitter', 'Jitter', document.getElementById('dxJitter').value, 'ms'],
      ['packetLoss', 'Packet Loss', document.getElementById('dxLoss').value, '%'],
    ].filter(([, , v]) => v !== '');
    if (!items.length) { toast('Isi minimal satu nilai untuk dianalisa.', 'danger'); return; }
    const html = items.map(([key, label, value, unit]) => {
      const flag = evalThreshold(value, th[key], key);
      const box = flag === 'ok' ? 'success' : flag === 'warn' ? 'warn' : 'danger';
      return `<div class="banner ${box}">${flag === 'ok' ? ICON.check : ICON.alert}
        <div><strong>${label}: ${value} ${unit} — ${flag === 'ok' ? 'NORMAL' : flag === 'warn' ? 'PERLU DIPERIKSA' : 'TIDAK NORMAL'}</strong>
        ${flag !== 'ok' ? `<br><span class="small">Rekomendasi: ${DX_ADVICE[key]}</span>` : ''}</div></div>`;
    }).join('');
    document.getElementById('dxResult').innerHTML = html;
  };
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Profil                                                         */
/* ---------------------------------------------------------------------- */
function screenProfil() {
  const s = session();
  const inst = DB.get('installations', []).filter(i => i.status !== 'draft' && i.dataInstalasi.namaTeknisi === s.name);
  return `
    <div class="card center">
      <div class="login-logo" style="margin:0 auto 12px;">${ICON.user.replace('currentColor', '#fff')}</div>
      <div style="font-weight:700; font-size:16px;">${s.name}</div>
      <div class="small muted mono">${s.technicianId}</div>
      ${s.role === 'admin' ? `<span class="badge scheduled" style="margin-top:8px;"><span class="dot"></span>Admin</span>` : ''}
    </div>
    <div class="card" style="margin-top:12px;">
      ${infoRow('Nomor HP', s.phone)}
      ${infoRow('Wilayah Kerja', s.region)}
      ${infoRow('Total Instalasi', inst.length)}
      ${infoRow('Instalasi Selesai', inst.filter(i => i.status === 'tersinkron').length)}
    </div>
    <div class="section-title">Menu</div>
    <div class="card" style="padding:4px 16px;">
      ${menuRow(ICON.edit, 'Edit Profil', 'menuEdit')}
      ${menuRow(ICON.ticket, 'Tiket Bantuan', 'menuTiket')}
      ${menuRow(ICON.gauge, 'Speed Test', 'menuSpeedtest')}
      ${menuRow(ICON.gear, 'Pengaturan', 'menuSettings')}
      ${menuRow(ICON.sync, 'Sinkronisasi', 'menuSync')}
      ${s.role === 'admin' ? menuRow(ICON.shield, 'Panel Admin', 'menuAdmin') : ''}
      ${menuRow(ICON.info, 'Bantuan', 'menuHelp')}
    </div>
    <button class="btn btn-danger tap" style="margin-top:16px;" id="btnLogout">${ICON.logout} Keluar</button>
  `;
}
function menuRow(icon, label, id) {
  return `<div class="row-between menu-row tap" id="${id}" style="padding:13px 0; border-bottom:1px solid var(--border); cursor:pointer;">
    <div class="row-between" style="gap:10px; justify-content:flex-start;"><span class="muted menu-row-icon">${icon}</span><span class="small">${label}</span></div>
    <span class="muted">${ICON.chevronRight}</span>
  </div>`;
}
function wireProfil() {
  document.getElementById('menuSettings').onclick = () => goTo('pengaturan');
  document.getElementById('menuSync').onclick = () => flushQueue(true);
  document.getElementById('menuTiket').onclick = () => goTo('tiket');
  document.getElementById('menuSpeedtest').onclick = () => goTo('speedtest');
  document.getElementById('menuEdit').onclick = () => showModal({ title: 'Edit Profil', body: 'Perubahan data profil dikelola oleh admin WHUSNET. Hubungi admin untuk pembaruan data.', actions: [{ label: 'Mengerti', cls: 'btn-primary' }] });
  document.getElementById('menuHelp').onclick = () => showModal({ title: 'Bantuan', body: 'Untuk kendala teknis aplikasi atau instalasi, hubungi supervisor lapangan atau NOC WHUSNET.', actions: [{ label: 'Tutup', cls: 'btn-primary' }] });
  const admin = document.getElementById('menuAdmin');
  if (admin) admin.onclick = () => goTo('admin');
  document.getElementById('btnLogout').onclick = () => showModal({
    title: 'Keluar dari aplikasi?', body: 'Anda perlu login kembali untuk mengakses aplikasi.',
    actions: [{ label: 'Batal', cls: 'btn-secondary' }, { label: 'Keluar', cls: 'btn-danger', onClick: () => { DB.set('session', null); state.history = []; goTo('login', {}, { replace: true }); } }]
  });
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Pengaturan                                                     */
/* ---------------------------------------------------------------------- */
function screenPengaturan() {
  const s = settings();
  const toggle = (id, label, checked) => `
    <div class="row-between" style="padding:13px 0; border-bottom:1px solid var(--border);">
      <span class="small">${label}</span>
      <label style="position:relative; display:inline-block; width:44px; height:26px;">
        <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} style="opacity:0; width:0; height:0;">
        <span id="${id}Track" style="position:absolute; inset:0; background:${checked ? 'var(--accent)' : 'var(--surface-3)'}; border-radius:999px; transition:.15s;"></span>
        <span id="${id}Knob" style="position:absolute; top:3px; left:${checked ? '21px' : '3px'}; width:20px; height:20px; background:#fff; border-radius:50%; transition:.15s;"></span>
      </label>
    </div>`;
  return `
    <div class="section-title">Umum</div>
    <div class="card" style="padding:0 16px;">
      ${toggle('setNotif', 'Notifikasi', s.notifications)}
      ${toggle('setAutoSync', 'Auto Sync', s.autoSync)}
      ${toggle('setWifiOnly', 'Sinkronisasi hanya via WiFi', s.wifiOnlySync)}
    </div>
    <div class="section-title">Integrasi Google Sheets</div>
    <div class="field"><label>URL Google Apps Script Web App</label>
      <input type="text" id="setAppsScript" value="${s.appsScriptUrl}" placeholder="https://script.google.com/macros/s/…/exec">
      <div class="hint">Deploy google-apps-script.gs sebagai Web App lalu tempel URL-nya di sini. Lihat README.md.</div>
    </div>
    <button class="btn btn-secondary" id="btnSaveAppsScript">Simpan URL</button>

    <div class="section-title">Ambang Batas Diagnosa (Admin)</div>
    <div class="card">
      <div class="small muted" style="margin-bottom:10px;">Nilai di luar ambang ini akan ditandai "Perlu diperiksa" / "Tidak normal" pada form pengukuran dan menu diagnosa.</div>
      ${thresholdField('RX Power — batas rendah waspada (dBm)', 'th_rxPower_warnLow', s.thresholds.rxPower.warnLow)}
      ${thresholdField('RX Power — batas rendah kritis (dBm)', 'th_rxPower_badLow', s.thresholds.rxPower.badLow)}
      ${thresholdField('Redaman — maksimal waspada (dB)', 'th_redaman_warnMax', s.thresholds.redaman.warnMax)}
      ${thresholdField('Redaman — maksimal kritis (dB)', 'th_redaman_badMax', s.thresholds.redaman.badMax)}
      ${thresholdField('Ping — maksimal waspada (ms)', 'th_ping_warnMax', s.thresholds.ping.warnMax)}
      ${thresholdField('Packet Loss — maksimal waspada (%)', 'th_packetLoss_warnMax', s.thresholds.packetLoss.warnMax)}
    </div>
    <button class="btn btn-secondary" id="btnSaveThresholds">Simpan Ambang Batas</button>

    <div class="section-title">Lainnya</div>
    <div class="card" style="padding:0 16px;">
      <div class="row-between" style="padding:13px 0;"><span class="small">Bahasa</span><span class="small muted">Bahasa Indonesia</span></div>
    </div>
    <div class="spacer-16"></div>
    <div class="small muted center">WHUSNET Installer v1.0 · © WHUSNET</div>
  `;
}
function thresholdField(label, id, value) {
  return `<div class="field" style="margin-bottom:10px;"><label>${label}</label><input type="number" step="0.1" id="${id}" value="${value}"></div>`;
}
function wirePengaturan() {
  const wireToggle = (id, onChange) => {
    document.getElementById(id).addEventListener('change', (e) => {
      document.getElementById(id + 'Track').style.background = e.target.checked ? 'var(--accent)' : 'var(--surface-3)';
      document.getElementById(id + 'Knob').style.left = e.target.checked ? '21px' : '3px';
      onChange(e.target.checked);
    });
  };
  wireToggle('setNotif', (v) => { const s = settings(); s.notifications = v; saveSettings(s); });
  wireToggle('setAutoSync', (v) => { const s = settings(); s.autoSync = v; saveSettings(s); });
  wireToggle('setWifiOnly', (v) => { const s = settings(); s.wifiOnlySync = v; saveSettings(s); });
  document.getElementById('btnSaveAppsScript').onclick = () => {
    const s = settings(); s.appsScriptUrl = document.getElementById('setAppsScript').value.trim(); saveSettings(s);
    toast('URL Google Apps Script disimpan.', 'success');
  };
  document.getElementById('btnSaveThresholds').onclick = () => {
    const s = settings();
    s.thresholds.rxPower.warnLow = Number(document.getElementById('th_rxPower_warnLow').value);
    s.thresholds.rxPower.badLow = Number(document.getElementById('th_rxPower_badLow').value);
    s.thresholds.redaman.warnMax = Number(document.getElementById('th_redaman_warnMax').value);
    s.thresholds.redaman.badMax = Number(document.getElementById('th_redaman_badMax').value);
    s.thresholds.ping.warnMax = Number(document.getElementById('th_ping_warnMax').value);
    s.thresholds.packetLoss.warnMax = Number(document.getElementById('th_packetLoss_warnMax').value);
    saveSettings(s);
    toast('Ambang batas diagnosa diperbarui.', 'success');
  };
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Admin                                                          */
/* ---------------------------------------------------------------------- */
function screenAdmin() {
  const psb = DB.get('psb', []);
  const inst = DB.get('installations', []);
  return `
    <div class="banner info">${ICON.shield}<div>Tampilan ringkas admin. Kelola PSB, penugasan teknisi, dan ekspor data lengkap dilakukan melalui Google Sheets terhubung.</div></div>
    <div class="stat-grid">
      <div class="stat-card accent"><div class="stat-value">${psb.length}</div><div class="stat-label">Total PSB</div></div>
      <div class="stat-card ok"><div class="stat-value">${inst.filter(i => i.status === 'tersinkron').length}</div><div class="stat-label">Tersinkron</div></div>
      <div class="stat-card warn"><div class="stat-value">${inst.filter(i => i.status === 'menunggu_sinkron').length}</div><div class="stat-label">Menunggu Sinkron</div></div>
      <div class="stat-card bad"><div class="stat-value">${inst.filter(i => i.status === 'gagal_sinkron').length}</div><div class="stat-label">Gagal Sinkron</div></div>
    </div>
    <div class="section-title">Semua PSB</div>
    ${psb.map(psbCardHtml).join('')}
  `;
}
function wireAdmin() {
  document.querySelectorAll('.psb-card[data-psb]').forEach(c => c.onclick = () => goTo('psb-detail', { psbId: c.dataset.psb }));
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Tiket — teknisi bisa membuat tiket kendala/bantuan sendiri     */
/* ---------------------------------------------------------------------- */
const TICKET_CATEGORIES = ['Gangguan Jaringan', 'Perangkat Rusak', 'PSB Bermasalah', 'Permintaan Alat/Material', 'Lainnya'];
const TICKET_PRIORITIES = ['Rendah', 'Sedang', 'Tinggi'];
const TICKET_STATUS_META = {
  baru: { label: 'Baru', cls: 'pending' },
  menunggu_sinkron: { label: 'Menunggu Sinkron', cls: 'progress' },
  tersinkron: { label: 'Terkirim', cls: 'done' },
  gagal_sinkron: { label: 'Gagal Kirim', cls: 'problem' },
};

function generateTicketId() {
  const today = new Date();
  const ymd = today.toISOString().slice(0, 10).replace(/-/g, '');
  const list = DB.get('tickets', []);
  const countToday = list.filter(t => t.ticketId && t.ticketId.includes(ymd)).length + 1;
  return `TCK-${ymd}-${String(countToday).padStart(4, '0')}`;
}

function screenTiket() {
  const list = DB.get('tickets', []).sort((a, b) => b.createdAt - a.createdAt);
  return `
    <div class="banner info">${ICON.ticket}<div>Buat tiket untuk kendala, permintaan material, atau eskalasi PSB bermasalah — akan diteruskan ke tim terkait.</div></div>
    ${list.length ? list.map(t => {
      const m = TICKET_STATUS_META[t.status];
      return `
      <div class="card psb-card tap" data-ticket="${t.id}">
        <div class="psb-top">
          <div><div class="psb-name">${t.subject}</div><div class="psb-id mono">${t.ticketId}</div></div>
          <span class="badge ${m.cls}"><span class="dot"></span>${m.label}</span>
        </div>
        <div class="psb-meta">
          <div class="row">${ICON.doc}<span>${t.category} · Prioritas ${t.priority}</span></div>
          <div class="row">${ICON.clock}<span>${fmtDateTime(t.createdAt)}</span></div>
        </div>
      </div>`;
    }).join('') : emptyState('Belum ada tiket', 'Tiket yang Anda buat akan muncul di sini.')}
  `;
}
function wireTiket() {
  document.querySelectorAll('[data-ticket]').forEach(c => c.onclick = () => goTo('tiket-detail', { ticketId: c.dataset.ticket }));
}

function screenTiketForm() {
  const psb = DB.get('psb', []);
  return `
    <div class="field">
      <label>Judul Tiket<span class="req">*</span></label>
      <input type="text" id="tkSubject" placeholder="Contoh: ODP penuh di Jl. Melati">
    </div>
    <div class="field">
      <label>Kategori<span class="req">*</span></label>
      <select id="tkCategory">${TICKET_CATEGORIES.map(c => `<option>${c}</option>`).join('')}</select>
    </div>
    <div class="field">
      <label>Prioritas<span class="req">*</span></label>
      <select id="tkPriority">${TICKET_PRIORITIES.map(p => `<option ${p === 'Sedang' ? 'selected' : ''}>${p}</option>`).join('')}</select>
    </div>
    <div class="field">
      <label>PSB Terkait (opsional)</label>
      <select id="tkPsb"><option value="">— Tidak terkait PSB tertentu —</option>${psb.map(p => `<option value="${p.id}">${p.id} · ${p.name}</option>`).join('')}</select>
    </div>
    <div class="field">
      <label>Deskripsi<span class="req">*</span></label>
      <textarea id="tkDesc" placeholder="Jelaskan kendala secara detail…"></textarea>
    </div>
    <div class="field">
      <label>Lampiran Foto (opsional)</label>
      <div class="photo-slot" id="tkPhotoSlot" style="aspect-ratio:16/7;">${ICON.camera}<span>Ambil Foto</span></div>
      <input type="file" accept="image/*" capture="environment" id="tkPhotoInput" style="display:none;">
    </div>
    <button class="btn btn-primary tap" id="btnKirimTiket">${ICON.send} Kirim Tiket</button>
  `;
}
function wireTiketForm() {
  let photoDataUrl = null;
  const slot = document.getElementById('tkPhotoSlot');
  const input = document.getElementById('tkPhotoInput');
  slot.onclick = () => input.click();
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      photoDataUrl = await downscaleImage(reader.result);
      slot.classList.add('filled');
      slot.innerHTML = `<img src="${photoDataUrl}"><span class="check">${ICON.check}</span>`;
    };
    reader.readAsDataURL(file);
  };
  document.getElementById('btnKirimTiket').onclick = () => {
    const subject = document.getElementById('tkSubject').value.trim();
    const desc = document.getElementById('tkDesc').value.trim();
    if (!subject || !desc) { toast('Judul dan deskripsi wajib diisi.', 'danger'); return; }
    const s = session();
    const ticket = {
      id: 'tk_' + Date.now(),
      ticketId: generateTicketId(),
      subject, desc,
      category: document.getElementById('tkCategory').value,
      priority: document.getElementById('tkPriority').value,
      relatedPsbId: document.getElementById('tkPsb').value || null,
      photo: photoDataUrl,
      createdBy: s.name, technicianId: s.technicianId,
      status: 'menunggu_sinkron',
      createdAt: Date.now(),
    };
    const list = DB.get('tickets', []);
    list.push(ticket);
    DB.set('tickets', list);
    toast(`Tiket ${ticket.ticketId} dibuat.`, 'success');
    if (settings().autoSync) flushTicketQueue();
    state.history = [];
    goTo('tiket-detail', { ticketId: ticket.id }, { replace: true });
  };
}

function screenTiketDetail() {
  const t = DB.get('tickets', []).find(x => x.id === state.params.ticketId);
  if (!t) return emptyState('Tidak ditemukan', 'Tiket ini tidak tersedia.');
  const m = TICKET_STATUS_META[t.status];
  return `
    <div class="card">
      <div class="row-between"><span class="mono" style="font-weight:700;">${t.ticketId}</span><span class="badge ${m.cls}"><span class="dot"></span>${m.label}</span></div>
    </div>
    <div class="section-title">${t.subject}</div>
    <div class="card">
      ${infoRow('Kategori', t.category)}
      ${infoRow('Prioritas', t.priority)}
      ${infoRow('PSB Terkait', t.relatedPsbId || '-', true)}
      ${infoRow('Dibuat oleh', t.createdBy)}
      ${infoRow('Waktu', fmtDateTime(t.createdAt))}
    </div>
    <div class="section-title">Deskripsi</div>
    <div class="card small">${t.desc}</div>
    ${t.photo ? `<div class="section-title">Lampiran</div><div class="photo-slot filled" style="aspect-ratio:16/9;"><img src="${t.photo}"></div>` : ''}
    ${t.status === 'gagal_sinkron' ? `<button class="btn btn-secondary tap" style="margin-top:16px;" id="btnRetryTiket">${ICON.sync} Coba Kirim Lagi</button>` : ''}
  `;
}
function wireTiketDetail() {
  const btn = document.getElementById('btnRetryTiket');
  if (btn) btn.onclick = () => flushTicketQueue(true);
}

async function flushTicketQueue(showFeedback = false) {
  const cfg = settings();
  if (!navigator.onLine || !cfg.appsScriptUrl) { if (showFeedback) toast('Tidak dapat mengirim: offline atau URL belum diatur.', 'danger'); return; }
  const list = DB.get('tickets', []);
  const pending = list.filter(t => t.status === 'menunggu_sinkron' || t.status === 'gagal_sinkron');
  if (!pending.length) { if (showFeedback) toast('Tidak ada tiket yang perlu dikirim.'); return; }
  let ok = 0, fail = 0;
  for (const t of pending) {
    try {
      const res = await fetch(cfg.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          tipe: 'ticket', idTiket: t.ticketId, judul: t.subject, kategori: t.category,
          prioritas: t.priority, deskripsi: t.desc, idPSB: t.relatedPsbId || '',
          dibuatOleh: t.createdBy, timestamp: new Date(t.createdAt).toISOString(),
          fotoBase64: t.photo || '',
        }),
      });
      if (res.ok) { t.status = 'tersinkron'; ok++; } else { t.status = 'gagal_sinkron'; fail++; }
    } catch (e) { t.status = 'gagal_sinkron'; fail++; }
  }
  DB.set('tickets', list);
  if (ok) toast(`${ok} tiket berhasil dikirim.`, 'success');
  if (fail) toast(`${fail} tiket gagal dikirim.`, 'danger');
  render();
}

/* ---------------------------------------------------------------------- */
/* SCREEN: Speed Test — gauge kustom (bukan progress-bar generik)         */
/* ---------------------------------------------------------------------- */

// Menggambar arc lingkaran (dipakai untuk track & fill gauge).
function polarPoint(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
// Gauge 270° (dari -225° ke 45°, melewati atas) — bentuk otomotif yang lebih
// dramatis daripada setengah lingkaran 180° yang umum dipakai di app speedtest.
function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polarPoint(cx, cy, r, startDeg);
  const e = polarPoint(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
}
const GAUGE_START = -225, GAUGE_END = 45, GAUGE_SWEEP = GAUGE_END - GAUGE_START;

function gaugeSvg(gaugeId) {
  const cx = 130, cy = 140, r = 106;
  const track = arcPath(cx, cy, r, GAUGE_START, GAUGE_END);
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const ang = GAUGE_START + (GAUGE_SWEEP * i) / 10;
    const major = i % 5 === 0;
    const p1 = polarPoint(cx, cy, r + 9, ang);
    const p2 = polarPoint(cx, cy, r + (major ? 19 : 15), ang);
    ticks.push(`<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${major ? 'var(--text-dim)' : 'var(--border)'}" stroke-width="${major ? 2 : 1.4}" stroke-linecap="round"/>`);
  }
  return `
  <svg viewBox="0 0 260 250" id="${gaugeId}" class="gauge-svg">
    <defs>
      <linearGradient id="${gaugeId}Grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2F8FFF"/>
        <stop offset="55%" stop-color="#5CACFF"/>
        <stop offset="100%" stop-color="#8FD9FF"/>
      </linearGradient>
      <filter id="${gaugeId}Glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    ${ticks.join('')}
    <path d="${track}" fill="none" stroke="var(--surface-3)" stroke-width="10" stroke-linecap="round"/>
    <path id="${gaugeId}Fill" d="${track}" fill="none" stroke="url(#${gaugeId}Grad)" stroke-width="10"
      stroke-linecap="round" filter="url(#${gaugeId}Glow)" stroke-dasharray="1 1000" />
    <circle id="${gaugeId}Dot" r="7" fill="#fff" filter="url(#${gaugeId}Glow)"/>
    <text x="130" y="150" id="${gaugeId}Value" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="40" font-weight="600" fill="var(--text)">0.0</text>
    <text x="130" y="176" id="${gaugeId}Unit" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12" letter-spacing="2" fill="var(--text-dim)">MBPS</text>
    <text x="130" y="215" id="${gaugeId}Phase" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="600" fill="var(--accent-strong)">SIAP MENGUJI</text>
  </svg>`;
}

// Panjang keliling arc (untuk menghitung stroke-dasharray dari 0..1 progres).
function gaugeArcLength(r) { return (2 * Math.PI * r) * (GAUGE_SWEEP / 360); }

function setGaugeValue(gaugeId, value, max, unit, decimals = 1) {
  const r = 106, cx = 130, cy = 140;
  const len = gaugeArcLength(r);
  const frac = Math.max(0, Math.min(1, value / max));
  const dash = Math.max(len * frac, 0.001);
  const fill = document.getElementById(gaugeId + 'Fill');
  if (fill) fill.setAttribute('stroke-dasharray', `${dash} ${len * 2}`);
  const ang = GAUGE_START + GAUGE_SWEEP * frac;
  const dotPos = polarPoint(cx, cy, r, ang);
  const dot = document.getElementById(gaugeId + 'Dot');
  if (dot) { dot.setAttribute('cx', dotPos.x.toFixed(1)); dot.setAttribute('cy', dotPos.y.toFixed(1)); }
  const valEl = document.getElementById(gaugeId + 'Value');
  if (valEl) valEl.textContent = value.toFixed(decimals);
  const unitEl = document.getElementById(gaugeId + 'Unit');
  if (unitEl) unitEl.textContent = unit;
}
function setGaugePhase(gaugeId, phase) {
  const el = document.getElementById(gaugeId + 'Phase');
  if (el) el.textContent = phase;
}

// Animasi halus dari nilai lama ke nilai baru dengan sedikit "goyangan" agar
// terasa hidup seperti jarum speedometer sungguhan, bukan progress bar kaku.
function animateGaugeTo(gaugeId, from, to, max, unit, duration, decimals, onDone) {
  const start = performance.now();
  const wobbleSeed = Math.random() * Math.PI * 2;
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic — halus, tidak kaku
    const wobble = t < 0.85 ? Math.sin(t * 14 + wobbleSeed) * (1 - t) * (max * 0.02) : 0;
    const current = from + (to - from) * eased + wobble;
    setGaugeValue(gaugeId, Math.max(0, current), max, unit, decimals);
    if (t < 1) requestAnimationFrame(frame);
    else { setGaugeValue(gaugeId, to, max, unit, decimals); onDone && onDone(); }
  }
  requestAnimationFrame(frame);
}

function qualityFromMetrics(ping, jitter, loss) {
  const th = settings().thresholds;
  const flags = [evalThreshold(ping, th.ping, 'ping'), evalThreshold(jitter, th.jitter, 'jitter'), evalThreshold(loss, th.packetLoss, 'packetLoss')];
  if (flags.includes('bad')) return { label: 'Kurang Baik', cls: 'bad' };
  if (flags.includes('warn')) return { label: 'Cukup', cls: 'warn' };
  return { label: 'Sangat Baik', cls: 'ok' };
}

function screenSpeedtest() {
  const history = DB.get('speedtests', []).sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  return `
    <div class="card center speedtest-card">
      ${gaugeSvg('mainGauge')}
      <button class="btn btn-primary tap" id="btnStartTest" style="margin-top:6px;">Mulai Tes</button>
    </div>
    <div id="speedResult"></div>
    ${history.length ? `
    <div class="section-title">Riwayat Tes</div>
    <div class="card" style="padding:4px 16px;">
      ${history.map(h => `
        <div class="row-between" style="padding:11px 0; border-bottom:1px solid var(--border);">
          <span class="small muted">${fmtDateTime(h.timestamp)}</span>
          <span class="small mono">${h.download}↓ / ${h.upload}↑ Mbps</span>
        </div>`).join('')}
    </div>` : ''}
  `;
}

function wireSpeedtest() {
  document.getElementById('btnStartTest').onclick = () => runSpeedtest();
}

function runSpeedtest() {
  const btn = document.getElementById('btnStartTest');
  btn.disabled = true; btn.textContent = 'Menguji…';
  document.getElementById('speedResult').innerHTML = '';
  setGaugeValue('mainGauge', 0, 100, 'MS', 0);
  setGaugePhase('mainGauge', 'MENGUJI PING…');

  // Target hasil realistis untuk simulasi (dipengaruhi sedikit variasi acak
  // agar tiap tes tidak identik). Saat dihosting online, download/upload
  // measurement sungguhan bisa disambungkan menggantikan target simulasi ini.
  const targetPing = +(12 + Math.random() * 30).toFixed(0);
  const targetJitter = +(2 + Math.random() * 10).toFixed(1);
  const targetLoss = +(Math.random() * 1.2).toFixed(1);
  const targetDown = +(35 + Math.random() * 65).toFixed(1);
  const targetUp = +(10 + Math.random() * 25).toFixed(1);

  animateGaugeTo('mainGauge', 0, targetPing, 150, 'MS', 1200, 0, () => {
    setGaugePhase('mainGauge', 'MENGUJI DOWNLOAD…');
    animateGaugeTo('mainGauge', 0, targetDown, 150, 'MBPS', 2600, 1, () => {
      setGaugePhase('mainGauge', 'MENGUJI UPLOAD…');
      animateGaugeTo('mainGauge', 0, targetUp, 150, 'MBPS', 2200, 1, () => {
        setGaugePhase('mainGauge', 'SELESAI');
        finishSpeedtest({ ping: targetPing, jitter: targetJitter, packetLoss: targetLoss, download: targetDown, upload: targetUp });
        btn.disabled = false; btn.textContent = 'Uji Ulang';
      });
    });
  });
}

function finishSpeedtest(r) {
  const q = qualityFromMetrics(r.ping, r.jitter, r.packetLoss);
  const result = { id: 'st_' + Date.now(), timestamp: Date.now(), ...r, quality: q.label };
  const list = DB.get('speedtests', []);
  list.unshift(result);
  DB.set('speedtests', list.slice(0, 30));

  document.getElementById('speedResult').innerHTML = `
    <div class="section-title">Hasil Lengkap</div>
    <div class="stat-grid">
      <div class="stat-card"><div class="row-between"><span class="stat-label">Download</span>${ICON.download}</div><div class="stat-value" style="font-size:20px;">${r.download} <span class="small muted">Mbps</span></div></div>
      <div class="stat-card"><div class="row-between"><span class="stat-label">Upload</span>${ICON.upload}</div><div class="stat-value" style="font-size:20px;">${r.upload} <span class="small muted">Mbps</span></div></div>
      <div class="stat-card"><div class="stat-value" style="font-size:20px;">${r.ping} <span class="small muted">ms</span></div><div class="stat-label">Ping</div></div>
      <div class="stat-card"><div class="stat-value" style="font-size:20px;">${r.jitter} <span class="small muted">ms</span></div><div class="stat-label">Jitter</div></div>
    </div>
    <div class="card" style="margin-top:10px;">
      <div class="row-between"><span class="small" style="font-weight:600;">Packet Loss</span><span class="mono">${r.packetLoss}%</span></div>
      <div class="divider"></div>
      <div class="row-between"><span class="small" style="font-weight:600;">Kualitas Jaringan</span><span class="badge ${q.cls}"><span class="dot"></span>${q.label}</span></div>
    </div>
    <div class="small muted center" style="margin-top:10px;">Estimasi diukur secara lokal pada perangkat.</div>
  `;
}

/* ---------------------------------------------------------------------- */
/* Render dispatcher                                                      */
/* ---------------------------------------------------------------------- */
function renderView() {
  const view = document.getElementById('view');
  switch (state.route) {
    case 'login': view.innerHTML = screenLogin(); wireLogin(); break;
    case 'dashboard': view.innerHTML = screenDashboard(); wireDashboard(); break;
    case 'instalasi': view.innerHTML = screenInstalasi(); wireInstalasi(); break;
    case 'psb-detail': view.innerHTML = screenPsbDetail(); wirePsbDetail(); break;
    case 'form': view.innerHTML = screenForm(); wireForm(); break;
    case 'riwayat': view.innerHTML = screenRiwayat(); wireRiwayat(); break;
    case 'riwayat-detail': view.innerHTML = screenRiwayatDetail(); wireRiwayatDetail(); break;
    case 'laporan': view.innerHTML = screenLaporan(); break;
    case 'diagnosa': view.innerHTML = screenDiagnosa(); wireDiagnosa(); break;
    case 'profil': view.innerHTML = screenProfil(); wireProfil(); break;
    case 'pengaturan': view.innerHTML = screenPengaturan(); wirePengaturan(); break;
    case 'admin': view.innerHTML = screenAdmin(); wireAdmin(); break;
    case 'tiket': view.innerHTML = screenTiket(); wireTiket(); break;
    case 'tiket-form': view.innerHTML = screenTiketForm(); wireTiketForm(); break;
    case 'tiket-detail': view.innerHTML = screenTiketDetail(); wireTiketDetail(); break;
    case 'speedtest': view.innerHTML = screenSpeedtest(); wireSpeedtest(); break;
    default: view.innerHTML = emptyState('Halaman tidak ditemukan', '');
  }
  // Page-enter animation — retrigger by forcing reflow so it plays every time.
  view.classList.remove('view-enter');
  void view.offsetWidth;
  view.classList.add('view-enter');
}

function render() {
  if (!session() && state.route !== 'login') { state.route = 'login'; state.params = {}; }
  renderTopbar();
  renderBottomNav();
  renderView();
  // Floating action button — one per screen that needs a quick "create" shortcut.
  const oldFab = document.getElementById('fabNew');
  if (oldFab) oldFab.remove();
  if (session() && state.route === 'instalasi') {
    addFab(ICON.plus + 'Instalasi', () => {
      const next = DB.get('psb', []).filter(p => ['pending', 'scheduled', 'progress'].includes(p.status)).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0];
      if (next) goTo('psb-detail', { psbId: next.id });
      else toast('Tidak ada PSB yang tersedia untuk instalasi baru.');
    });
  } else if (session() && state.route === 'tiket') {
    addFab(ICON.plus + 'Tiket', () => goTo('tiket-form'));
  }
}
function addFab(html, onClick) {
  const fab = document.createElement('button');
  fab.className = 'fab tap'; fab.id = 'fabNew';
  fab.innerHTML = html;
  fab.onclick = onClick;
  document.getElementById('shell').appendChild(fab);
}

/* ---------------------------------------------------------------------- */
/* Boot                                                                   */
/* ---------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('shell').style.display = 'flex';
    if (session()) state.route = 'dashboard';
    render();
    if (settings().autoSync) flushQueue();
  }, 1400);

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
