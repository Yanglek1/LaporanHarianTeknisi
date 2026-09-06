/**
 * WHUSNET INSTALLER — Google Apps Script backend
 * ------------------------------------------------------------------------
 * Deploy this as a Web App (Extensions ▸ Apps Script in your Google Sheet,
 * paste this file as Code.gs, then Deploy ▸ New deployment ▸ Web app).
 * Execute as: Me. Who has access: Anyone with the link.
 * Copy the resulting /exec URL into the app's Pengaturan screen.
 *
 * No credentials are ever stored in the Android/web client — the app only
 * ever holds this URL, and the URL itself requires no embedded secret
 * because access to the underlying Sheet/Drive is scoped to this script's
 * own execution identity (Execute as: Me).
 * ------------------------------------------------------------------------
 */

// ---- Configuration -------------------------------------------------------

// Leave blank to use the spreadsheet this script is bound to. Otherwise set
// an explicit Spreadsheet ID (Sheets URL: .../d/<THIS PART>/edit).
const SPREADSHEET_ID = '';

// Name of the Drive folder used to store uploaded installation photos and
// customer signatures. Created automatically on first run if missing.
const DRIVE_FOLDER_NAME = 'WHUSNET Installer - Dokumentasi';

const SHEET_NAMES = {
  PSB: 'PSB',
  INSTALLATION: 'INSTALLATION',
  TECHNICIANS: 'TECHNICIANS',
  CUSTOMERS: 'CUSTOMERS',
  DOCUMENTATION: 'DOCUMENTATION',
  SETTINGS: 'SETTINGS',
  LOG: 'LOG',
  REPORT: 'REPORT',
};

const INSTALLATION_HEADERS = [
  'Timestamp', 'ID PSB', 'ID Pelanggan', 'Nama Pelanggan', 'Nomor HP', 'Alamat',
  'Paket', 'Teknisi', 'Tanggal Instalasi', 'Jam Mulai', 'Jam Selesai', 'Latitude',
  'Longitude', 'ODP', 'Port ODP', 'Core', 'Panjang Fiber', 'ONT', 'Serial Number ONT',
  'MAC Address', 'RX Power', 'TX Power', 'Redaman', 'Download', 'Upload', 'Ping',
  'Jitter', 'Packet Loss', 'Status Instalasi', 'Catatan Teknisi', 'Konfirmasi Pelanggan',
  'Timestamp Konfirmasi', 'Link Foto', 'Link Tanda Tangan', 'ID Instalasi',
]; // columns A..AH, in order

// ---- Entry point -----------------------------------------------------------

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.tipe === 'ticket') {
      return handleTicket_(payload);
    }

    const folder = getOrCreateFolder_();
    const photoLinks = uploadPhotos_(folder, payload);
    const signatureLink = payload.tandaTanganBase64
      ? uploadBase64File_(folder, payload.tandaTanganBase64, `TTD_${payload.idInstalasi || Date.now()}.png`)
      : '';

    appendInstallationRow_(payload, photoLinks.join(', '), signatureLink);
    logEvent_('SUBMIT_OK', payload.idInstalasi || '', '');

    return jsonResponse_({ ok: true, idInstalasi: payload.idInstalasi });
  } catch (err) {
    logEvent_('SUBMIT_ERROR', '', String(err));
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

// ---- Ticket handling --------------------------------------------------------

const TICKET_HEADERS = [
  'Timestamp', 'ID Tiket', 'Judul', 'Kategori', 'Prioritas', 'Deskripsi',
  'ID PSB', 'Dibuat Oleh', 'Link Foto', 'Status',
];

function handleTicket_(payload) {
  try {
    const folder = getOrCreateFolder_();
    const photoLink = payload.fotoBase64
      ? uploadBase64File_(folder, payload.fotoBase64, `TIKET_${payload.idTiket || Date.now()}.jpg`)
      : '';
    const sheet = getOrCreateSheet_('TICKETS', TICKET_HEADERS);
    sheet.appendRow([
      payload.timestamp, payload.idTiket, payload.judul, payload.kategori, payload.prioritas,
      payload.deskripsi, payload.idPSB, payload.dibuatOleh, photoLink, 'Baru',
    ]);
    logEvent_('TICKET_OK', payload.idTiket || '', '');
    return jsonResponse_({ ok: true, idTiket: payload.idTiket });
  } catch (err) {
    logEvent_('TICKET_ERROR', payload.idTiket || '', String(err));
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  // Simple health check so you can confirm the deployment works by visiting
  // the /exec URL directly in a browser.
  return jsonResponse_({ ok: true, message: 'WHUSNET Installer API aktif.' });
}

// ---- Sheet helpers ----------------------------------------------------------

function getSpreadsheet_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet_(name, headers) {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (headers && headers.length) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#0A1628').setFontColor('#FFFFFF');
    }
  }
  return sheet;
}

function appendInstallationRow_(p, linkFoto, linkTtd) {
  const sheet = getOrCreateSheet_(SHEET_NAMES.INSTALLATION, INSTALLATION_HEADERS);
  sheet.appendRow([
    p.timestamp, p.idPSB, p.idPelanggan, p.namaPelanggan, p.nomorHp, p.alamat,
    p.paket, p.teknisi, p.tanggalInstalasi, p.jamMulai, p.jamSelesai, p.latitude,
    p.longitude, p.odp, p.portOdp, p.core, p.panjangFiber, p.ont, p.serialNumberOnt,
    p.macAddress, p.rxPower, p.txPower, p.redaman, p.download, p.upload, p.ping,
    p.jitter, p.packetLoss, p.statusInstalasi, p.catatanTeknisi, p.konfirmasiPelanggan,
    p.timestampKonfirmasi, linkFoto, linkTtd, p.idInstalasi,
  ]);

  // Conditional formatting cue: highlight "Bermasalah" rows so admins spot
  // them without opening the app. Cheap to recompute on every submit since
  // sheets stay in the thousands-of-rows range for this use case.
  applyStatusFormatting_(sheet);
}

function applyStatusFormatting_(sheet) {
  const range = sheet.getRange('AC2:AC' + sheet.getMaxRows());
  const rules = sheet.getConditionalFormatRules().filter(r =>
    !r.getRanges().some(rg => rg.getA1Notation().indexOf('AC') === 0));
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('gagal_sinkron').setBackground('#FCE8E8').setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('tersinkron').setBackground('#E8F8EF').setRanges([range]).build());
  sheet.setConditionalFormatRules(rules);
}

function logEvent_(type, refId, detail) {
  const sheet = getOrCreateSheet_(SHEET_NAMES.LOG, ['Timestamp', 'Tipe', 'Referensi', 'Detail']);
  sheet.appendRow([new Date().toISOString(), type, refId, detail]);
}

// ---- Drive helpers ----------------------------------------------------------

function getOrCreateFolder_() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function uploadPhotos_(folder, payload) {
  if (!payload.fotos || !payload.fotos.length) return [];
  return payload.fotos.map(f =>
    uploadBase64File_(folder, f.dataBase64, `${f.jenis}_${payload.idInstalasi || Date.now()}.jpg`));
}

function uploadBase64File_(folder, dataUrl, filename) {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) return '';
  const contentType = match[1];
  const bytes = Utilities.base64Decode(match[2]);
  const blob = Utilities.newBlob(bytes, contentType, filename);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

// ---- Response helper --------------------------------------------------------

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once manually from the Apps Script editor (select
 * setupSheets and click Run) to pre-create every sheet/tab from the
 * spec with headers, so the spreadsheet looks complete even before the
 * first submission comes in.
 */
function setupSheets() {
  getOrCreateSheet_(SHEET_NAMES.PSB, [
    'ID PSB', 'ID Pelanggan', 'Nama Pelanggan', 'Nomor HP', 'Alamat', 'Kecamatan',
    'Desa', 'Paket', 'Biaya Pemasangan', 'Teknisi', 'Tanggal', 'Jam', 'Status',
  ]);
  getOrCreateSheet_(SHEET_NAMES.INSTALLATION, INSTALLATION_HEADERS);
  getOrCreateSheet_('TICKETS', TICKET_HEADERS);
  getOrCreateSheet_(SHEET_NAMES.TECHNICIANS, ['ID Teknisi', 'Nama', 'Nomor HP', 'Wilayah Kerja', 'Status']);
  getOrCreateSheet_(SHEET_NAMES.CUSTOMERS, ['ID Pelanggan', 'Nama', 'Nomor HP', 'Alamat', 'Paket']);
  getOrCreateSheet_(SHEET_NAMES.DOCUMENTATION, ['ID Instalasi', 'Jenis Foto', 'Link', 'Timestamp']);
  getOrCreateSheet_(SHEET_NAMES.SETTINGS, ['Key', 'Value']);
  getOrCreateSheet_(SHEET_NAMES.LOG, ['Timestamp', 'Tipe', 'Referensi', 'Detail']);
  getOrCreateSheet_(SHEET_NAMES.REPORT, ['Tanggal', 'Total PSB', 'Selesai', 'Pending', 'Bermasalah']);
}
