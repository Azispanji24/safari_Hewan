# Digital Asset Audit & Provenance Log (Format TASL)
## Proyek: Safari Hewan — Lihat, Tebak, dan Bergerak
### UTS IT untuk AUD | Program Studi PIAUD Semester 5
**Dosen Pengampu:** Rifqi Syamsul Fuadi, S.T., M.Kom.

---

## 1. Prinsip Integritas Akademik & Etika Aset Digital

Sesuai materi perkuliahan Pertemuan 7 (*"Etika Digital, Hak Cipta, Lisensi & Sumber Media Legal"*), dokumen ini mencatat seluruh aset multimedia (visual, audio, rekaman lapangan, efek suara, wicara, dan font) yang digunakan dalam aplikasi interaktif **Safari Hewan**.

Prinsip dasar yang ditegakkan:
1. **Kejujuran Asal Usul Aset:** Seluruh aset diidentifikasi pemilik aslinya, lisensinya, dan perubahannya tanpa ada klaim kepemilikan palsu.
2. **Formula Atribusi TASL:** Setiap karya pihak ketiga diatribusikan dengan formula standar internasional: **T**itle (Judul Karya), **A**uthor (Nama Pencipta), **S**ource (Tautan Sumber Asli), dan **L**icense (Jenis Lisensi Penggunaan).
3. **Kemandirian Berkas Lokal (*Local Asset Integrity*):** Tidak menggunakan *hotlinking* ke server luar yang rentan rusak atau disusupi iklan.
4. **Pencegahan Beban Auditori AUD (*Auditory Comfort*):** Musik latar belakang (BGM) diatur **NON-AKTIF secara default (tidak ada autoplay)**. Musik hanya bersuara atas kehendak sadar guru/pengguna.
5. **Perlindungan Privasi Anak (*Privacy by Design*):** 100% bebas dari foto/video anak nyata, bebas pelacak (*zero trackers*), dan tanpa meminta identitas diri anak.

---

## 2. Tabel Audit Aset Multimedia Lengkap (Format TASL)

| Nama Aset | Title (Judul Karya) | Author (Pencipta) | Source (Sumber Asli) | License (Lisensi) | Modifikasi / Olahan Teknis | Keputusan Penggunaan |
|---|---|---|---|---|---|---|
| **Musik Latar Safari (`bgm-safari-adventure.mp3`)** | *Carefree* | Kevin MacLeod | Incompetech Royalty-Free Music ([Halaman Sumber](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037)) | Creative Commons Attribution 3.0 Unported ([CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)) | Dikonversi ke MP3 128 kbps stereo, dinormalisasi ke volume lembut (-22 LUFS), dilengkapi sistem *audio ducking* (volume otomatis turun 80%+ saat narasi guru berbicara). Default: **Mati (opt-in)**. | **Digunakan**: Legal dengan atribusi penuh. Tidak diputar otomatis demi kenyamanan sensorik anak. |
| **Suara Kicauan Burung Alami (`burung-chirp.mp3` & `burung-chirp.wav`)** | *Passer montanus (Eurasian Tree Sparrow) call - XC347806* | Derek Paulo (Perekam Lapangan / Recordist) | Xeno-canto XC347806 via Wikimedia Commons ([Berkas Sumber](https://commons.wikimedia.org/wiki/File:Passer_montanus_-_Eurasian_Tree_Sparrow_XC347806.mp3)) | Creative Commons Attribution-ShareAlike 4.0 International ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)) | Rekaman kicauan burung gereja asli di alam bebas. Dipotong segmen cuit-cuit 2,4 detik, fade in 0.05s, fade out 0.1s, normalisasi EBU R128 (-16 LUFS), konversi ke MP3 192 kbps dan 16-bit WAV PCM. | **Digunakan**: Menggantikan efek lonceng kemenangan sebelumnya dengan kicauan burung biologis nyata yang tepat secara sains AUD. |
| **Suara Bebek Asli (`bebek-quack.mp3` & `bebek-quack.wav`)** | *Anas platyrhynchos (Mallard) call - XC62258* | Jonathon Jongsma (Perekam Lapangan / Recordist) | Xeno-canto XC62258 via Wikimedia Commons ([Berkas Sumber](https://commons.wikimedia.org/wiki/File:Anas_platyrhynchos_-_Mallard_-_XC62258.ogg)) | Creative Commons Attribution-ShareAlike 3.0 Unported ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)) | Rekaman lapangan bebek liar asli di Powderhorn Park, Minneapolis. Dipotong segmen 3,47 detik, normalisasi EBU R128 (-16 LUFS), konversi ke MP3 192 kbps dan 16-bit WAV PCM. | **Digunakan**: Suara alami hewan asli terverifikasi legal, mendukung diskriminasi auditori anak. |
| **Berkas Narasi Suara Guru (13 MP3 di `/public/audio/narration/`)** | *Suara Ramah Ibu Guru Safari Hewan* | Sintesis Wicara Neural (`id-ID-GadisNeural`) via skrip `generate_narrations.py` oleh Mahasiswa | Microsoft Edge Neural TTS Engine & W3C Web Speech API | Ketentuan Penggunaan Non-Komersial Edukasi (*Microsoft Services Agreement - Non-commercial Educational Use*) / W3C Web Standard | Dikonfigurasi dengan tempo lambat ramah AUD (*rate 0.9*, *pitch 1.1*), dienkode ke MP3 192 kbps lokal, dilengkapi teks narasi tertulis dan *fallback in-browser speech synthesis*. | **Digunakan secara etis**: Membantu anak yang belum lancar membaca (*early literacy*), transparan sebagai wicara sintetis edukasi non-komersial. |
| **Denting Nada Apresiasi (`success-chime.wav`)** | *Arpeggio Sukses C5-E5-G5-C6* | Pengembang Proyek (Mahasiswa PIAUD) | Sintesis Akustik Harmonik Lokal via `scripts/generate-audio.js` | Domain Publik / Dedikasi Bebas Royalti ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)) | Sintesis matematis gelombang sinus harmonik 16-bit PCM mono 44.1 kHz, berdurasi 1,4 detik dengan peluruhan eksponensial lembut. | **Digunakan**: Umpan balik positif saat anak berhasil menebak, bebas bunyi buzzer yang menakutkan. |
| **Suara Terompet Gajah (`gajah-trumpet.wav`)** | *Panggilan Terompet Gajah Akustik* | Pengembang Proyek (Mahasiswa PIAUD) | Sintesis Frekuensi Lokal via `scripts/generate-audio.js` | Domain Publik / Dedikasi Bebas Royalti ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)) | Sintesis harmonik kuningan (*brass harmonic sweep* 360–480 Hz) 16-bit PCM mono 44.1 kHz. | **Digunakan**: Memberikan asosiasi bunyi belalai gajah secara luring (*offline*). |
| **Suara Lompatan Kelinci (`kelinci-hop.mp3` & `.wav`)** | *Lompatan Riang Kelinci di Rumput* | Pengembang Proyek (Mahasiswa PIAUD) | Sintesis Akustik Organik Bouncing Resonance via Python | Domain Publik / Dedikasi Bebas Royalti ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)) | 3 loncatan ritmis berfrekuensi 200–75 Hz dengan resonansi akustik empuk dan decay hangat. | **Digunakan**: Mengisi suara tombol 'Dengarkan Suara Lompatan Kelinci' secara otentik dan ceria. |
| **Suara Sentuhan Lembut (`gentle-pop.wav`)** | *Gelembung Sentuh Ramah Anak* | Pengembang Proyek (Mahasiswa PIAUD) | Sintesis Frekuensi Lokal via `scripts/generate-audio.js` | Domain Publik / Dedikasi Bebas Royalti ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)) | Penurunan frekuensi sinus cepat 850 Hz $\rightarrow$ 300 Hz berdurasi 0,16 detik menyerupai bunyi gelembung sabun. | **Digunakan**: Umpan balik taktil saat tombol ditekan tanpa mengagetkan pendengaran anak. |
| **Ilustrasi Vektor Hewan & Panggung Safari (`src/assets/illustrations/`)** | *Koleksi Ilustrasi Vektor Safari Hewan (Gajah, Kelinci, Bebek, Burung, Gerbang, Kanopi Hutan, Bukit Savana)* | Pengembang Proyek (Mahasiswa PIAUD) | Dibuat Langsung dalam Kode Sumber Komponen React SVG Orisinal | Lisensi Terbuka Proyek ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)) | Didesain khusus dalam koordinat Scalable Vector Graphics (SVG) murni, responsif di semua resolusi layar, palet warna bumi (*earthy*), dilengkapi sorotan interaktif belalai/telinga. | **Digunakan**: 100% orisinal karya mahasiswa, bebas dari risiko pelanggaran hak cipta gambar Google. |
| **Tipografi Heading & Body (`Fredoka` & `Quicksand`)** | *Font Fredoka & Quicksand* | Hafiz Ismail (Fredoka) & Andrew Paglinawan (Quicksand) | Google Fonts Repository ([Fredoka](https://fonts.google.com/specimen/Fredoka) & [Quicksand](https://fonts.google.com/specimen/Quicksand)) | SIL Open Font License, Version 1.1 ([OFL-1.1](https://openfontlicense.org/)) | Dimuat via Google Fonts webfont dengan fallback tipografi sistem ramah anak. | **Digunakan**: Huruf sans-serif bulat tebal yang mudah dibaca oleh anak pada tahap keaksaraan awal. |

---

## 3. Checklist Kepatuhan Etika Digital AUD (Pertemuan 7)

- [x] **Tidak Mengambil Gambar Acak Mesin Pencari:** Semua grafis berupa vektor SVG orisinal.
- [x] **Musik Berlisensi Jelas:** Lagu *Carefree* oleh Kevin MacLeod berlisensi resmi CC BY 3.0 dengan atribusi lengkap.
- [x] **Tidak Ada Autoplay Musik:** BGM dalam kondisi MATI saat aplikasi pertama kali dibuka; hanya berputar atas persetujuan sadar pengguna.
- [x] **Suara Biologis Hewan Akurat:** Suara bebek dan suara burung menggunakan rekaman ilmiah terverifikasi dari Xeno-canto / Wikimedia Commons berlisensi CC BY-SA.
- [x] **Privasi Anak Terjaga (Privacy by Design):** Tanpa foto anak nyata, tanpa akun/login, tanpa pelacak daring, tanpa izin kamera/mikrofon.
- [x] **Transparansi Aset AI/TTS:** Disebutkan secara terbuka bahwa suara narasi dihasilkan melalui model wicara sintetis ramah anak untuk tujuan pendidikan non-komersial.
