# Safari Hewan: Lihat, Tebak, dan Bergerak
## Media Pembelajaran Interaktif Anak Usia Dini (PAUD/RA)
### UTS Mata Kuliah IT untuk AUD | Program Studi PIAUD Semester 5

---

## 1. Judul dan Tujuan Proyek

**Judul Proyek:** Safari Hewan: Lihat, Tebak, dan Bergerak  
**Subjudul:** *"Yuk, kenali hewan, dengarkan suaranya, dan bergerak bersama!"*

**Tujuan Pengembangan:**  
Website ini dikembangkan sebagai prototipe media pembelajaran digital interaktif berbasis web untuk anak usia dini (5–6 tahun) pada tema **"Hewan di Sekitar Kita"**. 

Website ini dirancang secara khusus untuk memperbaiki kelemahan skenario video pembelajaran pasif yang umum ditemukan, antara lain:
1. **Durasi Terlalu Panjang & Tidak Sesuai Rentang Perhatian AUD:** Digantikan dengan alur petualangan interaktif 6 adegan (*self-paced*) berorientasi eksplorasi mandiri dengan batas waktu alami.
2. **Animasi Berlebihan & Transisi Kilat:** Digantikan dengan tata visual tenang bernuansa alam, tata letak fokus, dan transisi lembut yang menghormati kenyamanan persepsi anak (*prefers-reduced-motion*).
3. **Musik Latar Belakang Terlalu Keras:** Dihapuskan dari putaran otomatis. Audio hanya bersuara atas tindakan sadar pengguna (*user-initiated playback*), dilengkapi subtitle teks alternatif.
4. **Ukuran Huruf Terlalu Kecil:** Menggunakan tipografi sans-serif ramah anak (*Fredoka* & *Quicksand*) berukuran besar, pemenggalan suku kata (*Ga — jah*), dan kontras warna tinggi.
5. **Menonton Pasif:** Anak diajak aktif mengamati, mendengar, menyentuh pilihan, menirukan gerakan fisik motorik kasar, serta bercerita secara lisan.
6. **Ketidakjelasan Lisensi Aset & Iklan Berbahaya:** Menggunakan ilustrasi orisinal grafis vektor SVG, audio terverifikasi/disintesis secara lokal, 100% bebas iklan, bebas pelacak (*zero trackers*), dan tanpa meminta data pribadi anak (*privacy by design*).
7. **Ketiadaan Koneksi dengan Dunia Nyata:** Dilengkapi modul panduan guru (*Teacher Guide*) dengan rencana kegiatan tindak lanjut non-digital konkret: *"Kartu Pasangan Hewan"* fisik dan kreasi menggambar di atas kertas.

---

## 2. Sasaran Pengguna dan Capaian Pembelajaran

* **Sasaran Pengguna:** Anak Usia Dini 5–6 Tahun (Kelompok B PAUD / RA / TK).
* **Capaian Pembelajaran (Kurikulum AUD):**
  * **Kognitif:** Mengenal 4 hewan familiar (Gajah, Kelinci, Bebek, Burung) dan ciri fisik khasnya (belalai, telinga panjang, paruh pipih, sayap).
  * **Bahasa (Reseptif & Ekspresif):** Membedakan bunyi/suara hewan, mengenali kartu kata nama hewan, dan menceritakan hewan favoritnya secara lisan.
  * **Fisik Motorik Kasar:** Mempraktikkan gerak lokomotor dan non-lokomotor secara aman (melompat seperti kelinci, berjalan tegap gajah, mengepakkan sayap burung).
  * **Sosial Emosional & Nilai Agama/Moral:** Menyayangi sesama makhluk ciptaan Tuhan, memiliki rasa ingin tahu, dan menikmati pengalaman belajar tanpa tekanan penilaian kompetitif.

---

## 3. Fitur Utama Aplikasi

* **Layar Pembuka Ramah Anak:** Sambutan visual hangat gerbang safari dengan tombol ajakan bertindak (*call-to-action*) yang menonjol dan akses langsung ke Panduan Guru.
* **Alur Belajar 6 Adegan Terbimbing:**
  1. *Adegan 1 (Selamat Datang di Safari):* Eksplorasi gerbang safari dan pemilihan hewan yang ingin ditemui.
  2. *Adegan 2 (Berkenalan dengan Gajah):* Kosakata ejaan suku kata (*Ga — jah*), fakta belalai & telinga, serta fitur interaktif tunjuk belalai dan tunjuk telinga berpendar.
  3. *Adegan 3 (Tebak Suara Hewan):* Pemutar audio suara bebek (*kwek-kwek*) dengan 3 kartu pilihan besar dan umpan balik suportif tanpa bunyi penalti kasar.
  4. *Adegan 4 (Ayo Bergerak Bersama):* Stimulasi motorik kasar nyata dengan panduan 3 gerakan hewan, catatan pengawasan guru, dan tombol konfirmasi *"Hore, Saya Sudah Mencoba Bergerak!"*.
  5. *Adegan 5 (Pasangkan Hewan & Namanya):* Latihan literasi awal mencocokkan ilustrasi hewan dengan kartu kata nama melalui 3 soal terstruktur dan perayaan kelulusan.
  6. *Adegan 6 (Hewan Favoritku & Refleksi):* Pemilihan hewan yang paling disukai, pemantik diskusi verbal guru-anak, lencana penghargaan *"Bintang Safari Hewan"*, dan tombol mulai ulang bersih (*clean state reset*).
* **Panduan Guru & Kegiatan Nyata (Modal Terintegrasi):** Modul instruksional lengkap mencakup panduan fasilitasi kelas, langkah aktivitas non-digital kartu fisik, prosedur keselamatan gerak, dan etika media.
* **Mesin Audio & Narasi Cerdas (*Dual Audio Engine*):**
  * Memutar berkas audio lokal PCM WAV murni (`public/audio/`).
  * Sintesis instan *Web Audio API* sebagai cadangan jika perangkat luring/terbatas.
  * Narasi lisan berbahasa Indonesia ramah anak menggunakan *Web Speech API*.
  * Sakelar suara terpadu (*Mute / Unmute*) pada bilah kepala.
* **Perlindungan Privasi Sejak Desain (*Privacy by Design*):** Tanpa pendaftaran/akun, tanpa formulir data pribadi, tanpa kamera/mikrofon, tanpa penyimpanan data awan (*cloud*), dan tanpa pelacak pihak ketiga.

---

## 4. Tumpukan Teknologi (Tech Stack)

Aplikasi dibangun dengan arsitektur modern, ringan, dan mudah dipelihara:
* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 8
* **Styling:** Vanilla CSS murni dengan variabel desain token, palet alam ramah anak, dan kueri media responsif (tanpa ketergantungan framework CSS pihak ketiga).
* **Grafis & Ilustrasi:** Scalable Vector Graphics (SVG) murni yang dibuat khusus dan responsif di segala resolusi layar.
* **Audio:** HTML5 Audio, Web Audio API Oscillator/Gain/Filter synthesizer, dan W3C Web Speech API (`id-ID`).
* **Linter & Type Checker:** TypeScript Compiler (`tsc`) & Oxlint.

---

## 5. Panduan Instalasi dan Menjalankan Aplikasi

Pastikan Node.js (versi 18 ke atas) telah terpasang di komputer Anda.

### A. Memasang Dependensi
Buka terminal pada direktori proyek, lalu jalankan:
```bash
npm install
```

### B. Menjalankan Server Pengembangan (Local Dev Server)
Jalankan perintah berikut:
```bash
npm run dev
```
Setelah server aktif, buka peramban dan akses alamat:
```
http://127.0.0.1:5173/
```

### C. Menghasilkan Aset Audio (Opsional / Perbaruan)
Berkas audio lokal telah digenerate pada direktori `public/audio/`. Jika ingin memperbarui sintesis audio:
```bash
node scripts/generate-audio.js
```

---

## 6. Cara Membangun Versi Produksi (Production Build)

Untuk menguji kompilasi TypeScript dan menghasilkan bundel web siap publikasi:
```bash
npm run build
```
Hasil kompilasi bundel produksi yang dioptimalkan akan disimpan di folder `dist/`.

Untuk meninjau hasil bundel produksi secara lokal:
```bash
npm run preview
```

Untuk menjalankan pemeriksaan linting kode:
```bash
npm run lint
```

---

## 7. Rangkuman Alur Pembelajaran 6 Adegan

Alur petualangan disusun berurutan sesuai prinsip pedagogik AUD:
1. **Adegan 1 — Selamat Datang:** Menumbuhkan rasa ingin tahu dan membangun kedekatan anak dengan tema.
2. **Adegan 2 — Kenal Gajah:** Melatih pengamatan visual terfokus pada 1 ciri fisik utama (belalai panjang).
3. **Adegan 3 — Tebak Suara:** Melatih diskriminasi pendengaran dan asosiasi bunyi dengan gambar hewan.
4. **Adegan 4 — Ayo Bergerak:** Mengalihkan anak dari layar menuju stimulasi motorik kasar nyata.
5. **Adegan 5 — Pasangkan Hewan:** Penguatan literasi awal menghubungkan simbol gambar dengan kata bermakna.
6. **Adegan 6 — Hewan Favorit:** Refleksi diri, pengungkapan emosi positif, dan ekspresi verbal kepada guru.

---

## 8. Keseimbangan Aktivitas Digital dan Non-Digital

Media digital ini dirancang sebagai **pemantik pembelajaran (*learning trigger*)**, bukan pengganti interaksi nyata. Pembelajaran digital dibatasi pada durasi yang wajar (sekitar 10–15 menit) dan diakhiri dengan transisi ke kegiatan konkret di kelas:

### Kegiatan Nyata: "Kartu Pasangan Hewan"
1. Guru menyiapkan kartu fisik bergambar hewan dan kartu kata nama yang telah dicetak.
2. Anak bekerja bersama teman sebangku mencocokkan pasangan kartu gambar dan kata di atas meja.
3. Anak menirukan gerakan hewan yang berhasil dipasangkannya di hadapan guru dan teman-teman.

### Kegiatan Alternatif: Menggambar & Bercerita
Anak menggambar hewan yang paling ia sukai pada kertas gambar dengan krayon, kemudian menceritakan gambarnya secara lisan kepada guru atau orang tua.

---

## 9. Lokasi Dokumentasi Tambahan

1. **Audit Lisensi & Asal-Usul Aset:**  
   Lihat berkas [`docs/ASSET_AUDIT.md`](docs/ASSET_AUDIT.md) untuk tabel lengkap sumber, kreator, lisensi, modifikasi, dan keputusan penggunaan seluruh aset gambar dan audio.
2. **Dokumentasi 6 Panel Storyboard:**  
   Lihat berkas [`docs/STORYBOARD.md`](docs/STORYBOARD.md) untuk rincian visual, narasi, audio, interaksi anak, dan tujuan pembelajaran pada setiap adegan.

---

## 10. Batasan Teknis dan Rencana Pengembangan Lanjutan

* **Dukungan Sintesis Wicara (*Web Speech API*):** Suara narasi otomatis bergantung pada ketersediaan mesin TTS bahasa Indonesia di peramban pengguna. Sebagai mitigasi, aplikasi selalu menyediakan teks alternatif tertulis dan panduan bagi guru untuk membacakan secara langsung.
* **Cakupan Hewan Prototipe:** Prototipe ini sengaja membatasi diri pada 4 hewan (gajah, kelinci, bebek, burung) demi menjaga fokus kognitif anak usia 5–6 tahun agar tidak terbebani informasi berlebih (*cognitive overload*).
* **Penyimpanan Lokal:** Sesuai prinsip *privacy by design*, status permainan disimpan hanya pada memori peramban (*component state*) dan akan tereset bersih setiap kali aplikasi diulang.
