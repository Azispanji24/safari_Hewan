# Log Perbaikan Audit & Refaktorisasi Menyeluruh (Changelog Audit Fixes)
## Proyek: Safari Hewan — Lihat, Tebak, dan Bergerak
### UTS IT untuk AUD | Program Studi PIAUD Semester 5
**Tanggal Rilis Perbaikan:** 30 Oktober 2026

---

## 1. Ringkasan Perbaikan Berdasarkan Prioritas

Dokumen ini mencatat seluruh tindakan korektif dan penyempurnaan yang telah diimplementasikan pada proyek website **Safari Hewan** berdasarkan laporan audit komprehensif.

### A. Prioritas Critical (Wajib Diperbaiki)
1. **Peniadaan Autoplay Musik Latar (BGM Autoplay Elimination):**
   - **Masalah:** Musik latar *Carefree* (Kevin MacLeod) berputar otomatis saat pengguna mengklik apa pun di layar akibat logika `setupAutoplayUnlock()`. Ini melanggar klaim dokumentasi dan prinsip kenyamanan sensorik anak.
   - **Perbaikan:** `isMusicEnabled` diubah menjadi `false` (default MATI). Logika pemicu `startBgm()` di dalam `setupAutoplayUnlock()` dihapus sepenuhnya. BGM kini 100% *user-initiated* / *opt-in*, hanya berputar saat pengguna/guru secara sadar menekan tombol musik di Header.
   - **File yang Diubah:** `src/utils/audioController.ts`, `src/components/Header.tsx`.

2. **Penyempurnaan Tabel Audit Aset Digital (Format TASL Lengkap):**
   - **Masalah:** Berkas BGM Kevin MacLeod (3.28 MB) dan narasi suara wicara belum tercatat transparan di tabel audit aset.
   - **Perbaikan:** Merombak berkas `docs/ASSET_AUDIT.md` dengan tabel 7 kolom: `Nama Aset | Title | Author | Source | License | Modifikasi | Keputusan`. Mencantumkan BGM *Carefree* (CC BY 3.0), kicauan burung asli (CC BY-SA 4.0), rekaman bebek asli (CC BY-SA 3.0), narasi wicara neural non-komersial, efek suara sintetis lokal (CC0), serta font Google Fonts (OFL 1.1).
   - **File yang Diubah:** `docs/ASSET_AUDIT.md`.

3. **Koreksi Suara Karakter Burung (Akurasi Sains AUD):**
   - **Masalah:** Karakter burung sebelumnya diarahkan ke efek suara lonceng kemenangan (`success-chime.wav`), berisiko menimbulkan miskonsepsi biologis pada anak.
   - **Perbaikan:** Mengunduh dan memproses rekaman kicauan burung gereja pekarangan asli (*Passer montanus* XC347806 oleh Derek Paulo, lisensi CC BY-SA 4.0 via Xeno-canto & Wikimedia Commons) menjadi berkas `public/audio/burung-chirp.mp3` dan `public/audio/burung-chirp.wav` (durasi 2,4 detik, normalisasi EBU R128 -16 LUFS), serta menambahkan synthesizer kicauan burung pada Web Audio API fallback.
   - **File yang Diubah:** `src/data/animals.ts`, `src/utils/audioController.ts`, `src/utils/soundEngine.ts`, `public/audio/burung-chirp.mp3`, `public/audio/burung-chirp.wav`.

---

### B. Prioritas High (UI/UX & Pedagogis)
4. **Penyempurnaan Tombol Audio Narasi Anak:**
   - **Masalah:** Tombol audio narasi kurang menonjol untuk anak usia 5–6 tahun yang belum lancar membaca.
   - **Perbaikan:** Mengganti ikon teks kecil dengan piringan audio visual besar (`audio-icon-disc` $\ge 42\text{ px}$) berpendar lembut (*pulse halo aura*). Saat audio berputar, visualisator gelombang bergerak aktif. Saat selesai, status berubah menjadi ikon replay `🔁` dengan umpan balik hijau.
   - **File yang Diubah:** `src/components/AudioButton.tsx`, `src/App.css`.

5. **Dialog Respons Dinamis Pengakuan Pilihan Anak:**
   - **Masalah:** Di Adegan 1, apa pun hewan yang dipilih anak (Kelinci, Bebek, Burung), respons teks selalu kaku mengarahkan ke gajah tanpa mengakui pilihan anak.
   - **Perbaikan:** Membuat fungsi `getDiscoveryResponse` yang memberikan respons apresiasi dinamis spesifik untuk masing-masing hewan (Kelinci, Bebek, Burung, Gajah) sebelum mengajak anak mengamati sahabat gajah di adegan berikutnya.
   - **File yang Diubah:** `src/scenes/Scene1Welcome.tsx`.

6. **Klarifikasi Konteks Tema "Hewan di Sekitar Kita":**
   - **Masalah:** Gajah lebih identik dengan satwa liar/kebun binatang daripada pekarangan rumah sekitar anak.
   - **Perbaikan:** Memperjelas deskripsi tema di `WelcomeScreen.tsx`, `TeacherGuideModal.tsx`, dan `README.md` bahwa petualangan safari memadukan pengenalan fauna sekitar rumah (bebek, kelinci, burung) dengan wawasan satwa saat berkunjung ke kebun binatang atau taman safari (gajah).
   - **File yang Diubah:** `src/scenes/WelcomeScreen.tsx`, `src/components/TeacherGuideModal.tsx`, `README.md`.

---

### C. Prioritas Medium (Fitur & Aksesibilitas)
7. **Fitur Cetak Lembar Kartu Aktivitas Fisik Siswa (A4 Print Ready):**
   - **Fitur Baru:** Menambahkan tombol *"Cetak Lembar Kartu Aktivitas Siswa (A4)"* di dalam Panduan Guru (`TeacherGuideModal.tsx`).
   - **Implementasi:** Menyediakan markup lembar kerja khusus `<div className="printable-activity-sheet">` dan CSS `@media print` hemat tinta (*white eco-background*) berformat A4 potret. Memuat 4 kartu gambar hewan SVG, 4 kartu kata nama suku kata, garis potong putus-putus (✂️), instruksi guru/siswa, dan kolom identitas nama anak.
   - **File yang Diubah:** `src/components/TeacherGuideModal.tsx`, `src/App.css`.

8. **Peningkatan Aksesibilitas Modal Guru:**
   - **Perbaikan:** Menambahkan pemindahan fokus otomatis (*focus management*) saat modal dibuka, penjebak fokus keyboard (*Tab trap navigation*), penutupan via tombol Escape, dan pengembalian fokus ke tombol pemicu saat modal ditutup.
   - **File yang Diubah:** `src/components/TeacherGuideModal.tsx`.

9. **Visualisator Gelombang Audio Suara Misteri (Adegan 3):**
   - **Fitur Baru:** Menambahkan equalizer 5-bar (`mystery-sound-visualizer`) yang HANYA beranimasi saat audio suara bebek benar-benar sedang diputar.
   - **File yang Diubah:** `src/scenes/Scene3GuessSound.tsx`, `src/App.css`.

---

### D. Prioritas Low (Metadata & Optimasi)
10. **Open Graph Metadata & Penyesuaian Path Favicon:**
    - **Perbaikan:** Memperbaiki path favicon pada `index.html` menjadi `/safari_Hewan/favicon.svg`. Menambahkan meta tag `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, dan Twitter Card menggunakan berkas pratinjau lokal `public/og-preview.png`.
    - **File yang Diubah:** `index.html`, `public/og-preview.png`.

---

## 2. Tabel Matriks File yang Diubah

| No. | File Path | Jenis Komponen | Ringkasan Perubahan |
|:---:|:---|:---|:---|
| 1 | `src/utils/audioController.ts` | Logika Audio | BGM default OFF (`isMusicEnabled = false`), hapus autoplay di `setupAutoplayUnlock`, tambah synth kicauan burung alami, dukung fallback `'bird'`. |
| 2 | `src/utils/soundEngine.ts` | Wrapper Audio | Tambah tipe `'bird'` pada opsi `playSound` dan `synthesizeSound`. |
| 3 | `src/data/animals.ts` | Data Master | Ganti `audioPath` Burung dari `success-chime.wav` ke `/audio/burung-chirp.mp3`. |
| 4 | `src/components/AudioButton.tsx` | Komponen UI | Piringan ikon audio besar (`audio-icon-disc`), animasi denyut lembut (*pulse halo*), indikator bermain/selesai. |
| 5 | `src/scenes/Scene1Welcome.tsx` | Adegan Belajar | Logika respons dialog dinamis per hewan yang dipilih anak. |
| 6 | `src/scenes/WelcomeScreen.tsx` | Layar Pembuka | Klarifikasi narasi tema integratif lingkungan sekitar + kebun binatang/safari. |
| 7 | `src/scenes/Scene3GuessSound.tsx` | Adegan Belajar | Integrasi visualisator gelombang audio 5-bar saat suara bebek berbunyi. |
| 8 | `src/components/TeacherGuideModal.tsx` | Modal Guru | Tombol cetak kartu fisik, template kartu A4 siap potong, trap fokus keyboard modal, klarifikasi tema. |
| 9 | `src/App.css` | Stylesheet | Styling tombol audio baru, equalizer suara misteri, tombol print, dan aturan lengkap `@media print`. |
| 10 | `index.html` | Entry HTML | Open Graph social metadata, twitter card, dan perbaikan path favicon base URL. |
| 11 | `docs/ASSET_AUDIT.md` | Dokumentasi Legal | Restrukturisasi tabel audit TASL lengkap memuat 9 kategori aset aktual, link lisensi, dan checklist etika. |
| 12 | `docs/STORYBOARD.md` | Dokumentasi Desain | Sinkronisasi deskripsi visual visualisator suara, dialog dinamis adegan 1, dan audio burung. |
| 13 | `README.md` | Dokumentasi Proyek | Sinkronisasi deskripsi BGM default off, suara burung biologis, kartu aktivitas fisik, dan konteks tema. |
| 14 | `public/audio/burung-chirp.mp3` & `.wav` | Aset Audio | Berkas kicauan burung gereja asli (*Passer montanus* CC BY-SA 4.0 via Xeno-canto). |
| 15 | `public/og-preview.png` | Aset Visual | Berkas gambar pratinjau Open Graph untuk media sosial dan dosen. |

---

## 3. Hasil Pengujian Verifikasi

| Skenario Pengujian | Hasil Pengujian Aktual | Status | Catatan |
|---|---|:---:|---|
| **Pemuatan Awal Web (First Load)** | Halaman terbuka dalam kondisi hening total. Tidak ada musik BGM yang berputar otomatis. | **PASS** | Sesuai aturan etika pendengaran AUD. |
| **Aktivasi BGM Manual** | Tombol `Musik: Mati` ditekan $\rightarrow$ berubah menjadi `🎵 Musik: Aktif` dan lagu *Carefree* mengalun lembut. | **PASS** | Kontrol musik manual bekerja sempurna. |
| **Deaktivasi BGM Manual** | Tombol `Musik: Aktif` ditekan $\rightarrow$ musik memudar lembut (*fade out*) dan berhenti total. | **PASS** | State audio dibersihkan secara rapi. |
| **Suara Karakter Burung** | Memutar audio suara burung $\rightarrow$ terdengar kicauan alami burung gereja (*cuit... cuit... cuit*). | **PASS** | Akurat secara biologis, bukan nada lonceng bel. |
| **Pilihan Hewan Adegan 1** | Memilih Kelinci $\rightarrow$ muncul dialog ramah spesifik kelinci. Memilih Bebek/Burung/Gajah memunculkan dialog spesifik masing-masing. | **PASS** | Mengakui pilihan anak secara positif. |
| **Visualisator Suara Adegan 3** | Tombol suara misteri ditekan $\rightarrow$ bar equalizer bergerak naik-turun. Saat audio bebek selesai $\rightarrow$ animasi otomatis berhenti. | **PASS** | Sinkronisasi event `safari-sound-start` & `stop`. |
| **Fitur Cetak Kartu Aktivitas** | Tombol cetak di modal ditekan $\rightarrow$ dialog print browser terbuka. Hanya lembar kartu A4 yang tampil bersih di preview cetak. | **PASS** | Hemat tinta, garis putus-putus siap gunting. |
| **Aksesibilitas Modal Guru** | Tekan Tab di dalam modal $\rightarrow$ fokus tidak tembus ke background. Tekan Escape $\rightarrow$ modal menutup dan fokus kembali ke tombol. | **PASS** | Standar aksesibilitas WAI-ARIA terpenuhi. |
| **Kompilasi TypeScript & Oxlint** | `tsc -b && vite build` dan `oxlint` selesai tanpa 1 pun error atau warning. | **PASS** | 0 warnings, 0 errors. |

---

## 4. Masalah yang Masih Belum Terselesaikan (Area Tugas Non-Kode)

Perbaikan terhadap **source code website (Tugas 5)** telah selesai 100%. Namun, ada komponen penugasan akademik yang berada di luar kode program yang harus diselesaikan oleh mahasiswa secara manual:
1. **Penggabungan File Dokumen PDF Tugas Resmi:**
   Sesuai instruksi soal UTS Bagian E, mahasiswa wajib menyatukan Halaman Identitas, Bagian 1 (Analisis Kasus), Bagian 2 (Redesign Pembelajaran), Bagian 3 (Storyboard), Bagian 4 (Audit Aset TASL), Bagian 5 (Link & Screenshot Prototipe), dan Bagian 6 (Refleksi 5 Soal) ke dalam **1 file PDF** berjudul `UTS_IT-AUD_Nama_NIM.pdf`.

