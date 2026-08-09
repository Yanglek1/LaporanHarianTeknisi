/* ============================================================ ICONS ============================================================ */
const ICO = {};
function svgw(inner){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;}
ICO.home = svgw(`<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h5v-5h2v5h5v-9"/>`);
ICO.ticket = svgw(`<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v2a2 2 0 0 0 0 3v2a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-2a2 2 0 0 0 0-3z"/><line x1="14" y1="7.5" x2="14" y2="16.5" stroke-dasharray="2.2 2.2"/>`);
ICO.plus = svgw(`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`);
ICO.history = svgw(`<path d="M3.5 12a8.5 8.5 0 1 0 2.8-6.3"/><path d="M3 4.5v4.5h4.5"/><path d="M12 7.5v5l3.5 2"/>`);
ICO.user = svgw(`<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/>`);
ICO.search = svgw(`<circle cx="11" cy="11" r="6.5"/><line x1="20.5" y1="20.5" x2="16" y2="16"/>`);
ICO.chevleft = svgw(`<path d="M15 5 8 12l7 7"/>`);
ICO.chevright = svgw(`<path d="M9 5l7 7-7 7"/>`);
ICO.close = svgw(`<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>`);
ICO.check = svgw(`<path d="M5 12.5 10 17.5 19 7"/>`);
ICO.pin = svgw(`<path d="M12 21s7-7.8 7-12.5a7 7 0 1 0-14 0C5 13.2 12 21 12 21z"/><circle cx="12" cy="8.5" r="2.4"/>`);
ICO.phone = svgw(`<path d="M6.6 10.8c1.4 2.8 3.6 5 6.4 6.4l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1z"/>`);
ICO.chat = svgw(`<path d="M4 5h16v11.5H8.5L4 20.5z"/>`);
ICO.gauge = svgw(`<path d="M4 15.5a8 8 0 1 1 16 0"/><path d="M12 15.5 15.5 10"/><circle cx="12" cy="15.5" r="1.1" fill="currentColor"/>`);
ICO.zap = svgw(`<path d="M13 2 4.5 14h5.7l-1.2 8L18 10h-5.7z"/>`);
ICO.clock = svgw(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`);
ICO.camera = svgw(`<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13.3" r="3.4"/>`);
ICO.alert = svgw(`<path d="M12 3 2 20h20z"/><line x1="12" y1="9.5" x2="12" y2="14"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>`);
ICO.pen = svgw(`<path d="M4 20l4.2-1 10.3-10.3-3.2-3.2L4.9 15.8z"/><path d="M14 6.5 17.5 10"/>`);
ICO.logout = svgw(`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><line x1="21" y1="12" x2="9" y2="12"/>`);
ICO.doc = svgw(`<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><line x1="9.5" y1="12" x2="14.5" y2="12"/><line x1="9.5" y1="15.5" x2="14.5" y2="15.5"/>`);
ICO.wifi = svgw(`<path d="M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>`);
ICO.trash = svgw(`<path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6 7l1 13h10l1-13"/>`);

/* ============================================================ DATA ============================================================ */
let ticketSeq = 8806;
function newTicketId(){ return 'WN-'+(ticketSeq++); }
function nowStr(){ return new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})+' WIB'; }
const initials = n => n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();

const TICKETS = [
 {id:'WN-8805', type:'Instalasi', name:'Budi Santoso', phone:'081234567890', alamat:'Jl. Melati No. 12, Kartoharjo, Madiun', paket:'Home Fiber 50 Mbps', priority:'rendah', status:'diterima',
   timeline:[{status:'baru',time:'09:10 WIB'},{status:'diterima',time:'09:12 WIB'}]},
 {id:'WN-8802', type:'Gangguan', name:'Siti Aminah', phone:'081322114455', alamat:'Jl. Kenanga No. 5, Manguharjo, Madiun', keluhan:'Internet sering putus-putus sejak semalam.', priority:'tinggi', status:'proses',
   timeline:[{status:'baru',time:'07:40 WIB'},{status:'diterima',time:'07:45 WIB'},{status:'otw',time:'07:50 WIB'},{status:'tiba',time:'08:10 WIB'},{status:'proses',time:'08:15 WIB'}]},
 {id:'WN-8801', type:'Instalasi', name:'Rudi Hartono', phone:'085711223344', alamat:'Jl. Diponegoro No. 21, Kartoharjo, Madiun', paket:'Home Fiber 30 Mbps', priority:'sedang', status:'baru',
   timeline:[{status:'baru',time:'08:00 WIB'}]},
 {id:'WN-8798', type:'Instalasi', name:'Toko Elektronik Jaya', phone:'081155667788', alamat:'Jl. Sudirman No. 45, Manguharjo, Madiun', paket:'Business Fiber 100 Mbps', priority:'sedang', status:'selesai',
   timeline:[{status:'baru',time:'Kemarin 10:00'},{status:'diterima',time:'Kemarin 10:05'},{status:'otw',time:'Kemarin 10:20'},{status:'tiba',time:'Kemarin 10:45'},{status:'proses',time:'Kemarin 10:50'},{status:'selesai',time:'Kemarin 11:20'}],
   completedAt:'Kemarin, 11:20 WIB',
   ba:{sn:'ONU8841022X', mac:'CC:2D:B7:19:AA:01', redaman:'-19.4', down:'98.2', up:'41.0', catatan:'Instalasi lancar, WiFi dan IPTV berfungsi normal.'}},
 {id:'WN-8790', type:'Gangguan', name:'Warkop Setia Kawan', phone:'082199887766', alamat:'Jl. Pahlawan No. 88, Taman, Madiun', keluhan:'ONT mati total, lampu indikator tidak menyala.', priority:'tinggi', status:'batal',
   timeline:[{status:'baru',time:'2 hari lalu, 09:00'},{status:'batal',time:'2 hari lalu, 09:30'}],
   cancelReason:'Pelanggan minta jadwal ulang'},
];

const STATUS_LABEL = {baru:'Tiket Baru', diterima:'Diterima', otw:'Menuju Lokasi', tiba:'Tiba di Lokasi', proses:'Sedang Dikerjakan', selesai:'Selesai', batal:'Dibatalkan'};
const STATUS_PILL = {baru:'neutral', diterima:'blue', otw:'blue', tiba:'blue', proses:'warn', selesai:'good', batal:'bad'};
const NEXT_STATUS = {baru:'diterima', diterima:'otw', otw:'tiba', tiba:'proses'};
const ACTION_LABEL = {baru:'Terima Tiket', diterima:'Mulai Perjalanan', otw:'Saya Sudah Tiba di Lokasi', tiba:'Mulai Pengerjaan', proses:'Isi Berita Acara & Selesaikan'};
const STEP_ORDER = ['baru','diterima','otw','tiba','proses','selesai'];
const STEP_LABEL = {baru:'Tiket Dibuat', diterima:'Diterima Teknisi', otw:'Menuju Lokasi', tiba:'Tiba di Lokasi', proses:'Sedang Dikerjakan', selesai:'Pekerjaan Selesai'};

function findTicket(id){ return TICKETS.find(t=>t.id===id); }
function typePill(t){ return t==='Gangguan' ? 'bad' : 'blue'; }
function priPill(p){ return p==='tinggi'?'bad':p==='sedang'?'warn':'neutral'; }

/* ============================================================ NAV ENGINE ============================================================ */
const TABS = [
  {id:'dashboard', label:'Beranda', icon:'home'},
  {id:'tiket', label:'Tiket', icon:'ticket'},
  {id:'buatform', label:'Buat', icon:'plus', raised:true, action:'openTicketForm'},
  {id:'riwayat', label:'Riwayat', icon:'history'},
  {id:'profil', label:'Profil', icon:'user'},
];
let navStack = ['login'];

function renderBottomNav(){
  const el = document.getElementById('bottomnav');
  const cur = navStack[0];
  el.innerHTML = TABS.map(t=>{
    if(t.raised){
      return `<button class="navbtn raised" onclick="${t.action}()"><div class="fab">${ICO[t.icon]}</div><span>${t.label}</span></button>`;
    }
    return `<button class="navbtn ${cur===t.id && navStack.length===1 ? 'active':''}" onclick="openTab('${t.id}')">${ICO[t.icon]}<span>${t.label}</span></button>`;
  }).join('');
}
function openTab(id){ navStack=[id]; render(); }
function openScreen(id){ navStack.push(id); render(); }
function goBack(){ if(navStack.length>1){ navStack.pop(); render(); } }

const TITLES = {
  dashboard:['Whusnet WFM','Workforce Management'],
  tiket:['Daftar Tiket','Instalasi & gangguan'],
  riwayat:['Riwayat Pekerjaan','Tiket selesai & dibatalkan'],
  profil:['Profil Teknisi',''],
  ticketform:['Buat Tiket Instalasi','Order mandiri'],
  ticketdetail:['Detail Tiket',''],
  ba:['Berita Acara',''],
  speedtest:['Speed Test','Uji kecepatan koneksi'],
  optical:['Peta ODP','K1.POP Pacitan'],
  absensi:['Absensi','Check in / check out'],
};

function render(){
  const cur = navStack[navStack.length-1];
  if(cur==='login'){
    document.getElementById('topbar').style.display='none';
    document.getElementById('bottomnav').style.display='none';
  } else {
    document.getElementById('topbar').style.display='flex';
    document.getElementById('bottomnav').style.display='flex';
  }
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+cur).classList.add('active');

  document.getElementById('backBtn').style.display = navStack.length>1 ? 'flex' : 'none';
  document.getElementById('backBtn').innerHTML = ICO.chevleft;
  document.getElementById('topLogo').style.display = navStack.length>1 ? 'none' : 'flex';
  document.getElementById('topAction').style.display='none';

  let t = TITLES[cur] || ['',''];
  if(cur==='ticketdetail' && currentTicket){ const tk=findTicket(currentTicket); t=[tk.id, tk.name]; }
  if(cur==='ba' && currentTicket){ const tk=findTicket(currentTicket); t=['Berita Acara', tk.id+' — '+tk.name]; }
  document.getElementById('topTitle').textContent = t[0];
  document.getElementById('topSub').textContent = t[1];

  renderBottomNav();
  window.scrollTo(0,0);
}

/* ============================================================ SCREEN BUILDERS ============================================================ */
const screensEl = document.getElementById('screens');
function addScreen(id, html, extraClass){
  const s=document.createElement('div'); s.className='screen'+(extraClass?(' '+extraClass):''); s.id='screen-'+id; s.innerHTML=html; screensEl.appendChild(s);
}

/* ---------- LOGIN ---------- */
addScreen('login', `
  <div class="login-screen">
    <div class="login-hero">
      <div class="mark">WN</div>
      <h1>Whusnet WFM</h1>
      <p>Workforce Management System<br>untuk teknisi lapangan</p>
    </div>
    <div class="login-form">
      <h2>Masuk Akun Teknisi</h2>
      <input class="input" placeholder="ID Teknisi (contoh: WN-2214)" value="WN-2214">
      <input class="input" type="password" placeholder="Kata sandi" value="••••••••">
      <button class="btn primary" style="width:100%; margin-top:4px;" onclick="doLogin()">Masuk</button>
    </div>
  </div>
`, 'nopad');
function doLogin(){ openTab('dashboard'); toast('Selamat datang kembali, Dedi 👋'); }

/* ---------- DASHBOARD ---------- */
addScreen('dashboard', `<div id="dashBody"></div>`);
function renderDashboard(){
  const baru = TICKETS.filter(t=>t.status==='baru').length;
  const berjalan = TICKETS.filter(t=>['diterima','otw','tiba','proses'].includes(t.status)).length;
  const selesai = TICKETS.filter(t=>t.status==='selesai').length;
  const prioritas = TICKETS.find(t=>t.priority==='tinggi' && !['selesai','batal'].includes(t.status));
  document.getElementById('dashBody').innerHTML = `
    <div class="greet-row">
      <div><h1>Selamat pagi, Dedi</h1><p>Selasa, 4 Agustus 2026</p></div>
      <div class="avatar-sm">DA</div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="num" style="color:var(--text-faint);">${baru}</div><div class="lbl">Tiket Baru</div></div>
      <div class="stat-card"><div class="num" style="color:var(--warn);">${berjalan}</div><div class="lbl">Sedang Berjalan</div></div>
      <div class="stat-card"><div class="num" style="color:var(--good);">${selesai}</div><div class="lbl">Selesai</div></div>
    </div>
    <div class="cta-card">
      <b>Ada order instalasi baru?</b>
      <span>Buat tiket instalasi mandiri dan kerjakan langsung dari sini.</span>
      <button onclick="openTicketForm()">${ICO.plus} Buat Tiket Instalasi</button>
    </div>
    ${prioritas ? `
    <div class="priority-card" onclick="openTicketDetail('${prioritas.id}')">
      <div class="tag">${ICO.alert} PRIORITAS TINGGI — ${prioritas.type.toUpperCase()}</div>
      <b>${prioritas.name}</b>
      <div class="addr">${prioritas.alamat}</div>
    </div>` : ''}
    <div class="section-title">Alat Cepat</div>
    <div class="quick-row">
      <div class="quick-item" onclick="openScreen('speedtest')"><div class="ic">${ICO.gauge}</div><span>Speed Test</span></div>
      <div class="quick-item" onclick="openScreen('optical')"><div class="ic">${ICO.pin}</div><span>Peta ODP</span></div>
      <div class="quick-item" onclick="openScreen('absensi')"><div class="ic">${ICO.clock}</div><span>Absensi</span></div>
      <div class="quick-item" onclick="openTab('tiket')"><div class="ic">${ICO.ticket}</div><span>Semua Tiket</span></div>
    </div>
    <div class="section-title">Tiket Berjalan</div>
    <div id="dashRunning"></div>
  `;
  const running = TICKETS.filter(t=>['diterima','otw','tiba','proses'].includes(t.status));
  document.getElementById('dashRunning').innerHTML = running.length ? running.map(ticketCardHtml).join('') : `<div class="empty-note">Tidak ada tiket yang sedang berjalan.</div>`;
}

function ticketCardHtml(t){
  return `<div class="tk-card" onclick="openTicketDetail('${t.id}')">
    <div class="tk-top">
      <div><div class="tk-id">${t.id}</div><div class="tk-name">${t.name}</div></div>
      <span class="pill ${priPill(t.priority)}">${t.priority==='tinggi'?'Tinggi':t.priority==='sedang'?'Sedang':'Rendah'}</span>
    </div>
    <div class="tk-addr">${ICO.pin}<span>${t.alamat}</span></div>
    <div class="tk-bottom">
      <div class="tk-tags">
        <span class="pill ${typePill(t.type)}">${t.type}</span>
        <span class="pill ${STATUS_PILL[t.status]}">${STATUS_LABEL[t.status]}</span>
      </div>
      ${ICO.chevright}
    </div>
  </div>`;
}

/* ---------- TIKET (list) ---------- */
addScreen('tiket', `
  <div class="search-wrap">${ICO.search}<input class="input" id="tkSearch" placeholder="Cari nama / ID tiket..." oninput="renderTicketList()"></div>
  <div class="seg" id="tkSeg">
    <button class="active" data-f="aktif" onclick="setTkFilter('aktif')">Aktif</button>
    <button data-f="baru" onclick="setTkFilter('baru')">Baru</button>
    <button data-f="selesai" onclick="setTkFilter('selesai')">Selesai</button>
  </div>
  <div id="tkListBody"></div>
`);
let tkFilter = 'aktif';
function setTkFilter(f){
  tkFilter=f;
  document.querySelectorAll('#tkSeg button').forEach(b=>b.classList.toggle('active', b.dataset.f===f));
  renderTicketList();
}
function renderTicketList(){
  const q = (document.getElementById('tkSearch')?.value||'').toLowerCase();
  let list = TICKETS.filter(t=>t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
  if(tkFilter==='aktif') list = list.filter(t=>['diterima','otw','tiba','proses'].includes(t.status));
  if(tkFilter==='baru') list = list.filter(t=>t.status==='baru');
  if(tkFilter==='selesai') list = list.filter(t=>['selesai','batal'].includes(t.status));
  document.getElementById('tkListBody').innerHTML = list.length ? list.map(ticketCardHtml).join('') : `<div class="empty-note">Tidak ada tiket pada kategori ini.</div>`;
}

/* ---------- RIWAYAT ---------- */
addScreen('riwayat', `<div id="riwayatBody"></div>`);
function renderRiwayat(){
  const list = TICKETS.filter(t=>['selesai','batal'].includes(t.status));
  document.getElementById('riwayatBody').innerHTML = list.length ? list.map(t=>`
    <div class="tk-card" onclick="openTicketDetail('${t.id}')">
      <div class="tk-top">
        <div><div class="tk-id">${t.id}</div><div class="tk-name">${t.name}</div></div>
        <span class="pill ${STATUS_PILL[t.status]}">${STATUS_LABEL[t.status]}</span>
      </div>
      <div class="tk-addr">${ICO.pin}<span>${t.alamat}</span></div>
      <div class="tk-bottom"><span class="pill ${typePill(t.type)}">${t.type}</span><span style="font-size:11px; color:var(--text-faint);">${t.completedAt || t.timeline[t.timeline.length-1].time}</span></div>
    </div>`).join('') : `<div class="empty-note">Belum ada riwayat pekerjaan.</div>`;
}

/* ---------- BUAT TIKET (order instalasi mandiri) ---------- */
addScreen('ticketform', `
  <div class="card">
    <div class="field"><label>Jenis Order</label>
      <div class="seg" id="tfType">
        <button class="active" data-t="Instalasi" onclick="setTfType('Instalasi')">Instalasi</button>
        <button data-t="Gangguan" onclick="setTfType('Gangguan')">Gangguan</button>
      </div>
    </div>
    <div class="field"><label>Nama Pelanggan</label><input class="input" id="tfName" placeholder="Contoh: Andi Wijaya"></div>
    <div class="field"><label>Nomor HP</label><input class="input" id="tfPhone" placeholder="08xxxxxxxxxx"></div>
    <div class="field"><label>Alamat Lengkap</label><textarea class="input" id="tfAddr" placeholder="Jl. ... , Kelurahan, Kota"></textarea></div>
    <div class="field" id="tfPaketWrap"><label>Paket Internet</label>
      <select class="input" id="tfPaket">
        <option>Home Fiber 30 Mbps</option><option>Home Fiber 50 Mbps</option><option selected>Home Fiber 100 Mbps</option><option>Business Fiber 100 Mbps</option><option>Business Fiber 200 Mbps</option>
      </select>
    </div>
    <div class="field" id="tfKeluhanWrap" style="display:none;"><label>Keluhan Pelanggan</label><textarea class="input" id="tfKeluhan" placeholder="Contoh: Internet mati total sejak pagi"></textarea></div>
    <div class="field"><label>Prioritas</label>
      <select class="input" id="tfPriority"><option value="rendah">Rendah</option><option value="sedang" selected>Sedang</option><option value="tinggi">Tinggi</option></select>
    </div>
  </div>
  <button class="btn primary" style="width:100%; margin-top:16px;" onclick="submitTicketForm()">${ICO.check} Buat Tiket</button>
  <div class="empty-note">Tiket akan langsung masuk ke daftar tiket kamu dengan status "Tiket Baru", siap untuk diterima dan dikerjakan.</div>
`);
let tfType = 'Instalasi';
function setTfType(t){
  tfType=t;
  document.querySelectorAll('#tfType button').forEach(b=>b.classList.toggle('active', b.dataset.t===t));
  document.getElementById('tfPaketWrap').style.display = t==='Instalasi' ? 'block':'none';
  document.getElementById('tfKeluhanWrap').style.display = t==='Gangguan' ? 'block':'none';
}
function openTicketForm(){
  document.getElementById('tfName').value='';
  document.getElementById('tfPhone').value='';
  document.getElementById('tfAddr').value='';
  document.getElementById('tfKeluhan').value='';
  setTfType('Instalasi');
  navStack=['dashboard','ticketform']; render();
}
function submitTicketForm(){
  const name = document.getElementById('tfName').value.trim();
  const phone = document.getElementById('tfPhone').value.trim();
  const addr = document.getElementById('tfAddr').value.trim();
  if(!name || !addr){ toast('Nama dan alamat pelanggan wajib diisi'); return; }
  const t = {
    id:newTicketId(), type:tfType, name, phone:phone||'-', alamat:addr,
    priority:document.getElementById('tfPriority').value,
    status:'baru', timeline:[{status:'baru', time:nowStr()}]
  };
  if(tfType==='Instalasi') t.paket = document.getElementById('tfPaket').value;
  else t.keluhan = document.getElementById('tfKeluhan').value.trim() || 'Tidak ada detail keluhan.';
  TICKETS.unshift(t);
  currentTicket = t.id;
  renderTicketDetail();
  navStack=['dashboard','ticketdetail']; render();
  toast('Tiket '+t.id+' berhasil dibuat');
}

/* ---------- TICKET DETAIL ---------- */
addScreen('ticketdetail', `<div id="tdBody"></div>`);
let currentTicket = null;
function openTicketDetail(id){ currentTicket=id; renderTicketDetail(); openScreen('ticketdetail'); }
function renderTicketDetail(){
  const t = findTicket(currentTicket);
  const isCancelled = t.status==='batal';
  const isDone = t.status==='selesai';
  const waLink = t.phone && t.phone!=='-' ? `https://wa.me/62${t.phone.replace(/^0/,'')}` : '#';
  const telLink = t.phone && t.phone!=='-' ? `tel:${t.phone}` : '#';
  const mapLink = `https://www.google.com/maps?q=${encodeURIComponent(t.alamat)}`;

  let stepsHtml = '';
  if(!isCancelled){
    const curIdx = STEP_ORDER.indexOf(t.status);
    stepsHtml = STEP_ORDER.map((s,i)=>{
      const tl = t.timeline.find(x=>x.status===s);
      const done = i<curIdx || (i===curIdx && t.status==='selesai');
      const current = i===curIdx && t.status!=='selesai';
      return `<div class="step ${done?'done':''} ${current?'current':''}"><div class="line"></div>
        <div class="step-dot">${done?ICO.check:''}</div>
        <div class="step-body"><b>${STEP_LABEL[s]}</b>${tl?`<span>${tl.time}</span>`:''}</div>
      </div>`;
    }).join('');
  }

  let actionHtml = '';
  if(isCancelled){
    actionHtml = `<div class="empty-note">Tiket ini telah dibatalkan.${t.cancelReason?' Alasan: '+t.cancelReason:''}</div>`;
  } else if(isDone){
    actionHtml = `<div class="card" style="background:var(--good-dim); border-color:transparent;">
      <div style="display:flex; align-items:center; gap:8px; color:var(--good); font-weight:800; font-size:13px;">${ICO.check} Pekerjaan Selesai</div>
      <div style="font-size:11.5px; color:var(--text-dim); margin-top:3px;">Diselesaikan ${t.completedAt}</div>
    </div>`;
  } else {
    actionHtml = `<div class="action-bar">
      <button class="btn primary" style="width:100%;" onclick="advanceTicket('${t.id}')">${ACTION_LABEL[t.status]}</button>
      ${['baru','diterima','otw'].includes(t.status) ? `<div style="text-align:center; margin-top:10px;"><button class="btn text-danger" onclick="cancelTicket('${t.id}')">Batalkan Tiket</button></div>` : ''}
    </div>`;
  }

  let baHtml = '';
  if(t.ba){
    baHtml = `<div class="section-title">Berita Acara</div><div class="card">
      <div class="info-row"><span class="k">SN ONU</span><span class="v mono">${t.ba.sn||'-'}</span></div>
      <div class="info-row"><span class="k">MAC Address</span><span class="v mono">${t.ba.mac||'-'}</span></div>
      <div class="info-row"><span class="k">Redaman</span><span class="v mono">${t.ba.redaman||'-'} dBm</span></div>
      <div class="info-row"><span class="k">Speedtest</span><span class="v mono">${t.ba.down||'-'} / ${t.ba.up||'-'} Mbps</span></div>
      ${t.ba.catatan?`<div class="info-row"><span class="k">Catatan</span><span class="v">${t.ba.catatan}</span></div>`:''}
    </div>`;
  }

  document.getElementById('tdBody').innerHTML = `
    <div class="det-hero">
      <div class="av">${initials(t.name)}</div>
      <div><h2>${t.name}</h2><p>${t.id} · ${t.type}</p></div>
    </div>
    <div class="tk-tags" style="margin-bottom:16px;">
      <span class="pill ${typePill(t.type)}">${t.type}</span>
      <span class="pill ${priPill(t.priority)}">Prioritas ${t.priority}</span>
      <span class="pill ${STATUS_PILL[t.status]}">${STATUS_LABEL[t.status]}</span>
    </div>
    <div class="contact-row">
      <a href="${telLink}">${ICO.phone}<span>Telepon</span></a>
      <a href="${waLink}" target="_blank">${ICO.chat}<span>WhatsApp</span></a>
      <a href="${mapLink}" target="_blank">${ICO.pin}<span>Rute</span></a>
    </div>
    <div class="card">
      <div class="info-row"><span class="k">Alamat</span><span class="v">${t.alamat}</span></div>
      ${t.paket ? `<div class="info-row"><span class="k">Paket</span><span class="v">${t.paket}</span></div>` : ''}
      ${t.keluhan ? `<div class="info-row"><span class="k">Keluhan</span><span class="v">${t.keluhan}</span></div>` : ''}
      <div class="info-row"><span class="k">Dibuat</span><span class="v">${t.timeline[0].time}</span></div>
    </div>
    ${!isCancelled ? `<div class="section-title">Progres Pekerjaan</div><div class="card"><div class="stepper">${stepsHtml}</div></div>` : ''}
    ${baHtml}
    ${actionHtml}
  `;
}
function advanceTicket(id){
  const t = findTicket(id);
  if(t.status==='proses'){ currentTicket=id; renderBaForm(); openScreen('ba'); return; }
  const next = NEXT_STATUS[t.status];
  if(!next) return;
  t.status = next;
  t.timeline.push({status:next, time:nowStr()});
  toast('Status diperbarui: '+STATUS_LABEL[next]);
  renderTicketDetail();
}
function cancelTicket(id){
  const t = findTicket(id);
  t.status='batal'; t.cancelReason='Dibatalkan oleh teknisi';
  t.timeline.push({status:'batal', time:nowStr()});
  toast('Tiket '+id+' dibatalkan');
  renderTicketDetail();
}

/* ---------- BERITA ACARA (BA) + tanda tangan ---------- */
addScreen('ba', `
  <div class="card">
    <div class="field"><label>SN ONU</label><input class="input" id="baSn" placeholder="Contoh: ONU8841022X"></div>
    <div class="field"><label>MAC Address</label><input class="input" id="baMac" placeholder="XX:XX:XX:XX:XX:XX"></div>
    <div class="row">
      <div class="field"><label>Redaman (dBm)</label><input class="input" id="baRedaman" type="number" step="0.1" placeholder="-19.5"></div>
      <div class="field"><label>Speedtest (Mbps)</label><input class="input" id="baDown" placeholder="Down / Up misal 95.2"></div>
    </div>
    <div class="field"><label>Catatan Pekerjaan</label><textarea class="input" id="baCatatan" placeholder="Kondisi hasil pekerjaan..."></textarea></div>
  </div>
  <div class="section-title">Tanda Tangan Pelanggan</div>
  <div class="sig-wrap">
    <canvas id="sigCanvas"></canvas>
    <div class="sig-placeholder" id="sigPlaceholder">Tanda tangan di sini</div>
  </div>
  <div class="sig-actions">
    <button class="btn ghost" style="height:38px; padding:0 14px;" onclick="clearSignature()">${ICO.trash} Hapus</button>
    <span style="font-size:11px; color:var(--text-faint);">Gunakan jari / stylus pelanggan</span>
  </div>
  <div class="check-row" id="baCheckRow" onclick="toggleBaCheck()">
    <div class="check-box" id="baCheckBox">${ICO.check}</div>
    <span>Pelanggan menyetujui hasil pekerjaan ini</span>
  </div>
  <button class="btn primary" style="width:100%;" id="baSubmitBtn" disabled onclick="submitBa()">${ICO.check} Selesaikan Tiket</button>
`);
let sigCtx=null, sigDrawing=false, hasSignature=false, baChecked=false;
function renderBaForm(){
  document.getElementById('baSn').value='';
  document.getElementById('baMac').value='';
  document.getElementById('baRedaman').value='';
  document.getElementById('baDown').value='';
  document.getElementById('baCatatan').value='';
  hasSignature=false; baChecked=false;
  document.getElementById('baCheckBox').classList.remove('on');
  document.getElementById('baSubmitBtn').disabled = true;
  document.getElementById('sigPlaceholder').style.display='flex';
  setTimeout(initSignaturePad, 50);
}
function initSignaturePad(){
  const canvas = document.getElementById('sigCanvas');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width*dpr; canvas.height = rect.height*dpr;
  sigCtx = canvas.getContext('2d');
  sigCtx.scale(dpr,dpr);
  sigCtx.strokeStyle = '#181C2A'; sigCtx.lineWidth = 2.2; sigCtx.lineCap='round'; sigCtx.lineJoin='round';
  let last=null;
  function pos(e){ const r=canvas.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; }
  canvas.onpointerdown = e=>{ sigDrawing=true; last=pos(e); document.getElementById('sigPlaceholder').style.display='none'; };
  canvas.onpointermove = e=>{
    if(!sigDrawing) return;
    const p = pos(e);
    sigCtx.beginPath(); sigCtx.moveTo(last.x,last.y); sigCtx.lineTo(p.x,p.y); sigCtx.stroke();
    last=p; hasSignature=true; updateBaSubmit();
  };
  canvas.onpointerup = ()=>{ sigDrawing=false; };
  canvas.onpointerleave = ()=>{ sigDrawing=false; };
}
function clearSignature(){
  const canvas = document.getElementById('sigCanvas');
  sigCtx.clearRect(0,0,canvas.width,canvas.height);
  hasSignature=false; document.getElementById('sigPlaceholder').style.display='flex';
  updateBaSubmit();
}
function toggleBaCheck(){
  baChecked=!baChecked;
  document.getElementById('baCheckBox').classList.toggle('on', baChecked);
  updateBaSubmit();
}
function updateBaSubmit(){
  document.getElementById('baSubmitBtn').disabled = !(hasSignature && baChecked);
}
function submitBa(){
  const t = findTicket(currentTicket);
  const downUp = (document.getElementById('baDown').value||'').split('/').map(s=>s.trim());
  t.ba = {
    sn:document.getElementById('baSn').value.trim(),
    mac:document.getElementById('baMac').value.trim(),
    redaman:document.getElementById('baRedaman').value.trim(),
    down:downUp[0]||'-', up:downUp[1]||'-',
    catatan:document.getElementById('baCatatan').value.trim()
  };
  t.status='selesai';
  t.completedAt='Hari ini, '+nowStr();
  t.timeline.push({status:'selesai', time:nowStr()});
  toast('Tiket '+t.id+' selesai ✓');
  navStack=['dashboard','ticketdetail']; render();
}

/* ---------- SPEED TEST — pengukuran nyata 10 detik ---------- */
addScreen('speedtest', `
  <div class="st-ring-wrap">
    <div class="st-ring" id="stRing" style="background:conic-gradient(var(--accent) 0deg, var(--surface-3) 0deg);">
      <div class="hole">
        <div class="v" id="stMain">—</div>
        <div class="u">Mbps Download</div>
        <div class="s" id="stStatus">Tekan mulai untuk menguji</div>
      </div>
    </div>
  </div>

  <div class="st-progress"><i id="stProgress"></i></div>
  <div class="st-phase" id="stPhase">Durasi pengukuran: 10 detik</div>

  <button class="btn primary" style="width:100%;" id="stBtn" onclick="runSpeedtest()">${ICO.gauge} Mulai Test 10 Detik</button>

  <div class="st-mini-grid">
    <div class="st-mini"><div class="n" id="stUp">—</div><div class="l">Upload Mbps</div></div>
    <div class="st-mini"><div class="n" id="stPing">—</div><div class="l">Ping ms</div></div>
    <div class="st-mini"><div class="n" id="stJitter">—</div><div class="l">Jitter ms</div></div>
  </div>

  <div class="st-meta">
    <div class="meta-card"><div class="meta-k">Provider / ISP</div><div class="meta-v" id="stProvider">—</div></div>
    <div class="meta-card"><div class="meta-k">IP Publik</div><div class="meta-v mono" id="stIp">—</div></div>
    <div class="meta-card"><div class="meta-k">Server</div><div class="meta-v" id="stServer">Cloudflare Speed Test</div></div>
    <div class="meta-card"><div class="meta-k">Lokasi</div><div class="meta-v" id="stLocation">—</div></div>
  </div>

  <div class="card st-detail" id="stResultCard" style="display:none;">
    <div class="section-title" style="margin-top:0;">Hasil Tes Lengkap</div>
    <div class="info-row"><span class="k">Download</span><span class="v mono" id="stDetailDown">— Mbps</span></div>
    <div class="info-row"><span class="k">Upload</span><span class="v mono" id="stDetailUp">— Mbps</span></div>
    <div class="info-row"><span class="k">Ping</span><span class="v mono" id="stDetailPing">— ms</span></div>
    <div class="info-row"><span class="k">Jitter</span><span class="v mono" id="stDetailJitter">— ms</span></div>
    <div class="info-row"><span class="k">Data Download</span><span class="v mono" id="stDetailBytes">—</span></div>
    <div class="info-row"><span class="k">Data Upload</span><span class="v mono" id="stDetailUpBytes">—</span></div>
    <div class="info-row"><span class="k">Durasi</span><span class="v mono">10 detik</span></div>
    <div class="info-row"><span class="k">Waktu Tes</span><span class="v" id="stDetailTime">—</span></div>
    <button class="btn dark st-share" style="width:100%;" id="stShareBtn" onclick="shareSpeedtestResult()">${ICO.chat} Bagikan Hasil Tes</button>
  </div>

  <div class="st-note">
    Download dan upload diukur dengan transfer data nyata ke endpoint pengujian Cloudflare. Pengukuran bandwidth memakai jendela 10 detik: 5 detik download + 5 detik upload. Provider/IP berasal dari layanan informasi jaringan dan dapat tidak tersedia jika diblokir browser atau jaringan.
  </div>
`);

const ST_PING_URL = 'https://speed.cloudflare.com/__down?bytes=1';
const ST_DOWNLOAD_URL = 'https://speed.cloudflare.com/__down?bytes=25000000';
const ST_UPLOAD_URL = 'https://speed.cloudflare.com/__up';
const ST_INFO_URL = 'https://ipapi.co/json/';
const ST_PHASE_MS = 5000;

async function getNetworkInfo(){
  try{
    const res = await fetch(ST_INFO_URL+'?cb='+Date.now(), {cache:'no-store', mode:'cors'});
    if(!res.ok) throw new Error('info');
    const d = await res.json();
    return {
      provider: d.org || d.asn || d.network || 'Tidak terdeteksi',
      ip: d.ip || 'Tidak terdeteksi',
      location: [d.city, d.region, d.country_name].filter(Boolean).join(', ') || 'Tidak terdeteksi',
      asn: d.asn || ''
    };
  }catch(e){
    return {provider:'Tidak terdeteksi', ip:'Tidak terdeteksi', location:'Tidak terdeteksi', asn:''};
  }
}

async function measurePing(rounds=7){
  const samples=[];
  for(let i=0;i<rounds;i++){
    const t0=performance.now();
    try{
      await fetch(ST_PING_URL+'&cb='+Date.now()+'-'+i, {cache:'no-store', mode:'cors'});
      samples.push(performance.now()-t0);
    }catch(e){}
  }
  if(!samples.length) throw new Error('Ping gagal');
  const ping = Math.min(...samples);
  let jitterSum=0;
  for(let i=1;i<samples.length;i++) jitterSum += Math.abs(samples[i]-samples[i-1]);
  const jitter = samples.length>1 ? jitterSum/(samples.length-1) : 0;
  return {ping:Math.round(ping), jitter:Number(jitter.toFixed(1))};
}

async function measureDownload(durationMs, onProgress){
  const start=performance.now();
  const deadline=start+durationMs;
  let totalBytes=0;
  let active=true;

  async function worker(){
    while(active && performance.now()<deadline){
      const controller=new AbortController();
      const remaining=Math.max(100, deadline-performance.now());
      const timer=setTimeout(()=>controller.abort(), remaining);
      try{
        const res=await fetch(ST_DOWNLOAD_URL+'&cb='+Date.now()+'-'+Math.random(), {
          cache:'no-store', mode:'cors', signal:controller.signal
        });
        if(!res.ok || !res.body) throw new Error('download');
        const reader=res.body.getReader();
        while(active && performance.now()<deadline){
          const {value,done}=await reader.read();
          if(done) break;
          if(value) totalBytes+=value.byteLength;
          const elapsed=Math.max(0.001,(performance.now()-start)/1000);
          onProgress(Math.min(1,(performance.now()-start)/durationMs), totalBytes, elapsed);
        }
        try{ reader.cancel(); }catch(e){}
      }catch(e){
        if(performance.now()>=deadline) break;
      }finally{
        clearTimeout(timer);
      }
    }
  }

  await Promise.all([worker(),worker(),worker(),worker()]);
  active=false;
  const seconds=Math.max(0.001,(performance.now()-start)/1000);
  return {mbps:(totalBytes*8)/(seconds*1e6),bytes:totalBytes,seconds};
}

async function measureUpload(durationMs, onProgress){
  const start=performance.now();
  const deadline=start+durationMs;
  let totalBytes=0;
  const chunkSize=2*1024*1024;
  const payload=new Uint8Array(chunkSize);
  if(window.crypto?.getRandomValues){
    for(let i=0;i<payload.length;i+=65536){
      window.crypto.getRandomValues(payload.subarray(i, Math.min(i+65536,payload.length)));
    }
  }

  while(performance.now()<deadline){
    try{
      const res=await fetch(ST_UPLOAD_URL+'?cb='+Date.now()+'-'+Math.random(), {
        method:'POST',
        body:payload,
        cache:'no-store',
        mode:'cors',
        headers:{'Content-Type':'application/octet-stream'}
      });
      if(res.ok) totalBytes+=chunkSize;
    }catch(e){
      /* Be tolerant of browsers/network policies that block upload CORS. */
    }
    const elapsed=Math.max(0.001,(performance.now()-start)/1000);
    onProgress(Math.min(1,(performance.now()-start)/durationMs), totalBytes, elapsed);
  }

  const seconds=Math.max(0.001,(performance.now()-start)/1000);
  return {mbps:(totalBytes*8)/(seconds*1e6),bytes:totalBytes,seconds};
}

function formatBytes(bytes){
  if(!bytes) return '0 B';
  const units=['B','KB','MB','GB','TB'];
  const i=Math.min(Math.floor(Math.log(bytes)/Math.log(1024)), units.length-1);
  return (bytes/Math.pow(1024,i)).toFixed(i>=2?2:1)+' '+units[i];
}

function setStRing(progress){
  const deg=Math.max(0,Math.min(360,progress*360));
  document.getElementById('stRing').style.background =
    `conic-gradient(var(--accent) ${deg}deg, var(--surface-3) ${deg}deg)`;
  document.getElementById('stProgress').style.width=(progress*100).toFixed(1)+'%';
}

let stRunning=false;
let lastSpeedtestResult=null;

async function runSpeedtest(){
  if(stRunning) return;
  stRunning=true;

  const btn=document.getElementById('stBtn');
  const ring=document.getElementById('stRing');
  const main=document.getElementById('stMain');
  const status=document.getElementById('stStatus');
  const phase=document.getElementById('stPhase');
  const upEl=document.getElementById('stUp');
  const pingEl=document.getElementById('stPing');
  const jitEl=document.getElementById('stJitter');
  const resultCard=document.getElementById('stResultCard');

  btn.textContent='Menguji 10 detik...';
  btn.disabled=true;
  resultCard.style.display='none';
  main.textContent='—';
  upEl.textContent='—';
  pingEl.textContent='—';
  jitEl.textContent='—';
  setStRing(0);

  try{
    status.textContent='Mendeteksi provider & jaringan...';
    const infoPromise=getNetworkInfo();

    status.textContent='Mengukur ping...';
    const pingResult=await measurePing();
    pingEl.textContent=pingResult.ping;
    jitEl.textContent=pingResult.jitter;

    const info=await infoPromise;
    document.getElementById('stProvider').textContent=info.provider;
    document.getElementById('stIp').textContent=info.ip;
    document.getElementById('stLocation').textContent=info.location;
    document.getElementById('stServer').textContent='Cloudflare Speed Test';

    status.textContent='Download 5 detik...';
    phase.textContent='Tahap 1/2 · Download · 5 detik';
    const down=await measureDownload(ST_PHASE_MS,(frac,bytes,elapsed)=>{
      const overall=(elapsed*1000/ST_PHASE_MS)*0.5;
      setStRing(overall);
      main.textContent=(bytes*8/(Math.max(.001,elapsed)*1e6)).toFixed(1);
      status.textContent=`Download ${formatBytes(bytes)} · ${Math.ceil(Math.max(0,(ST_PHASE_MS-elapsed*1000)/1000))}s`;
    });
    const finalDown=down.mbps;
    main.textContent=finalDown.toFixed(1);

    status.textContent='Upload 5 detik...';
    phase.textContent='Tahap 2/2 · Upload · 5 detik';
    const up=await measureUpload(ST_PHASE_MS,(frac,bytes,elapsed)=>{
      const overall=0.5+(elapsed*1000/ST_PHASE_MS)*0.5;
      setStRing(overall);
      upEl.textContent=(bytes*8/(Math.max(.001,elapsed)*1e6)).toFixed(1);
      status.textContent=`Upload ${formatBytes(bytes)} · ${Math.ceil(Math.max(0,(ST_PHASE_MS-elapsed*1000)/1000))}s`;
    });

    const finalUp=up.mbps;
    upEl.textContent=finalUp>0 ? finalUp.toFixed(1) : 'Gagal';
    setStRing(1);
    status.textContent='Tes selesai';
    phase.textContent='Selesai · total pengukuran bandwidth 10 detik';

    const now=new Date();
    const timeText=now.toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'medium'});
    document.getElementById('stDetailDown').textContent=finalDown.toFixed(1)+' Mbps';
    document.getElementById('stDetailUp').textContent=finalUp>0?finalUp.toFixed(1)+' Mbps':'Tidak tersedia';
    document.getElementById('stDetailPing').textContent=pingResult.ping+' ms';
    document.getElementById('stDetailJitter').textContent=pingResult.jitter+' ms';
    document.getElementById('stDetailBytes').textContent=formatBytes(down.bytes);
    document.getElementById('stDetailUpBytes').textContent=formatBytes(up.bytes);
    document.getElementById('stDetailTime').textContent=timeText;

    lastSpeedtestResult={
      provider:info.provider, ip:info.ip, location:info.location,
      server:'Cloudflare Speed Test',
      download:finalDown, upload:finalUp, ping:pingResult.ping,
      jitter:pingResult.jitter, downBytes:down.bytes, upBytes:up.bytes,
      time:timeText
    };
    resultCard.style.display='block';
  }catch(err){
    status.textContent='Tes gagal — periksa koneksi internet';
    phase.textContent='Tidak dapat menyelesaikan pengukuran';
    toast('Speed test gagal. Pastikan perangkat terhubung internet.');
  }finally{
    btn.textContent='Ulangi Test 10 Detik';
    btn.disabled=false;
    stRunning=false;
  }
}

function speedtestShareText(){
  if(!lastSpeedtestResult) return '';
  const r=lastSpeedtestResult;
  return [
    'WHUSNET SPEED TEST',
    '━━━━━━━━━━━━━━━━━━━━',
    `Provider : ${r.provider}`,
    `IP Publik: ${r.ip}`,
    `Lokasi   : ${r.location}`,
    `Server   : ${r.server}`,
    '',
    `Download : ${r.download.toFixed(1)} Mbps`,
    `Upload   : ${r.upload>0?r.upload.toFixed(1):'Tidak tersedia'} Mbps`,
    `Ping     : ${r.ping} ms`,
    `Jitter   : ${r.jitter} ms`,
    `Data ↓   : ${formatBytes(r.downBytes)}`,
    `Data ↑   : ${formatBytes(r.upBytes)}`,
    `Durasi   : 10 detik`,
    `Waktu    : ${r.time}`,
    '━━━━━━━━━━━━━━━━━━━━',
    'Hasil dari Whusnet WFM Speed Test'
  ].join('\n');
}

async function shareSpeedtestResult(){
  if(!lastSpeedtestResult){
    toast('Belum ada hasil speed test');
    return;
  }
  const shareText=speedtestShareText();
  try{
    if(navigator.share){
      await navigator.share({title:'Hasil Whusnet Speed Test',text:shareText});
      toast('Hasil tes berhasil dibagikan');
    }else if(navigator.clipboard){
      await navigator.clipboard.writeText(shareText);
      toast('Hasil tes disalin. Silakan bagikan ke WhatsApp/Telegram.');
    }else{
      const ta=document.createElement('textarea');
      ta.value=shareText; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
      toast('Hasil tes disalin ke clipboard');
    }
  }catch(e){
    if(e.name!=='AbortError') toast('Gagal membagikan hasil tes');
  }
}

/* ---------- PETA ODP ---------- */
addScreen('optical', `
  <a href="https://goo.gl/maps/ibZQ9sK2gbse7z8U8?g_st=ac" target="_blank" class="odp-map-preview">
    <div class="odp-map-lines">
      <i style="top:24%;"></i><i style="top:54%;"></i><i style="top:80%;"></i>
      <i class="v" style="left:26%;"></i><i class="v" style="left:66%;"></i>
    </div>
    <div class="odp-map-pin">${ICO.pin}</div>
  </a>
  <div class="card" style="margin-top:14px;">
    <div class="info-row"><span class="k">Titik ODP</span><span class="v">K1.POP Pacitan</span></div>
    <div class="info-row"><span class="k">Kategori</span><span class="v">Point of Presence (POP)</span></div>
  </div>
  <a class="btn primary" style="width:100%; margin-top:16px; text-decoration:none;" href="https://goo.gl/maps/ibZQ9sK2gbse7z8U8?g_st=ac" target="_blank">${ICO.pin} Buka K1.POP Pacitan di Google Maps</a>
  <div class="empty-note">Gunakan tombol di atas untuk membuka rute langsung ke titik ODP/POP terkait pekerjaan kamu.</div>
`);

/* ---------- ABSENSI ---------- */
addScreen('absensi', `
  <div class="attend-card">
    <div class="time" id="attTime">--:--</div>
    <div class="date">Selasa, 4 Agustus 2026</div>
    <button class="btn primary" style="width:100%;" id="attBtn" onclick="toggleAttend()">Check In</button>
    <div class="attend-status"><span style="color:var(--text-dim);">Check In</span><span id="attInTime" style="font-weight:700;">Belum absen</span></div>
    <div class="attend-status"><span style="color:var(--text-dim);">Check Out</span><span id="attOutTime" style="font-weight:700;">—</span></div>
    <div class="attend-status"><span style="color:var(--text-dim);">Lokasi GPS</span><span style="font-weight:700;">-7.6298, 111.5239</span></div>
  </div>
  <button class="btn ghost" style="width:100%;" onclick="toast('Kamera dibuka untuk selfie absensi')">${ICO.camera} Ambil Foto Selfie</button>
`);
let attendState='out';
function toggleAttend(){
  const now=nowStr();
  if(attendState==='out'){ attendState='in'; document.getElementById('attInTime').textContent=now; document.getElementById('attBtn').textContent='Check Out'; toast('Check in berhasil'); }
  else { attendState='done'; document.getElementById('attOutTime').textContent=now; document.getElementById('attBtn').textContent='Selesai Absen'; document.getElementById('attBtn').disabled=true; toast('Check out berhasil'); }
}
function tickAttendClock(){ const el=document.getElementById('attTime'); if(el) el.textContent=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}); }
setInterval(tickAttendClock, 1000); tickAttendClock();

/* ---------- PROFIL ---------- */
addScreen('profil', `
  <div class="profile-hero">
    <div class="av">DA</div>
    <h2>Dedi Ariyanto</h2>
    <p>ID Teknisi: WN-2214 · Divisi Instalasi &amp; Maintenance</p>
    <div class="badge-row"><span class="chip">Sertifikat FTTH</span><span class="chip">Sertifikat K3</span><span class="chip">Splicing Pro</span></div>
  </div>
  <div class="card">
    <div class="info-row"><span class="k">Nomor HP</span><span class="v">0813-2299-1177</span></div>
    <div class="info-row"><span class="k">Divisi</span><span class="v">Instalasi &amp; Maintenance</span></div>
    <div class="info-row"><span class="k">Masa kerja</span><span class="v">3 tahun 2 bulan</span></div>
  </div>
  <div class="section-title">Lainnya</div>
  <div class="card" style="padding:2px 16px;">
    <div class="menu-row" onclick="openScreen('absensi')"><div class="icon-chip">${ICO.clock}</div><div class="t">Absensi</div>${ICO.chevright.replace('<svg ','<svg class="chev" ')}</div>
    <div class="menu-row" onclick="openTab('riwayat')"><div class="icon-chip">${ICO.history}</div><div class="t">Riwayat Pekerjaan</div>${ICO.chevright.replace('<svg ','<svg class="chev" ')}</div>
    <div class="menu-row" onclick="toast('Sesi teknisi diakhiri')"><div class="icon-chip" style="background:var(--bad-dim); color:var(--bad);">${ICO.logout}</div><div class="t" style="color:var(--bad);">Keluar</div></div>
  </div>
`);

/* ============================================================ TOAST ============================================================ */
function toast(msg){
  let t=document.getElementById('toastEl');
  if(!t){
    t=document.createElement('div'); t.id='toastEl';
    t.style.cssText='position:absolute; left:20px; right:20px; bottom:98px; background:#1B1F2B; color:#fff; font-size:12.5px; font-weight:700; padding:12px 16px; border-radius:12px; text-align:center; z-index:100; box-shadow:0 10px 30px rgba(0,0,0,.25); opacity:0; transition:opacity .25s;';
    document.getElementById('device').appendChild(t);
  }
  t.textContent=msg; t.style.opacity='1';
  clearTimeout(window._toastTimer);
  window._toastTimer=setTimeout(()=>{ t.style.opacity='0'; }, 1900);
}

/* ============================================================ INIT ============================================================ */
renderDashboard();
renderTicketList();
renderRiwayat();
render();
