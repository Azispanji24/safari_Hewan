import os
import subprocess
import base64
import sys

def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as img_file:
            ext = os.path.splitext(path)[1].lower().replace(".", "")
            if ext == "jpg":
                ext = "jpeg"
            return f"data:image/{ext};base64,{base64.b64encode(img_file.read()).decode('utf-8')}"
    return ""

img_scene1 = get_base64_image("C:/Users/Azis panji Gumilang/.gemini/antigravity/brain/69ad9809-005a-4e09-be90-3a57768f2523/.user_uploaded/media_1793354925456_154e5d1e.jpg")
img_scene2 = get_base64_image("C:/Users/Azis panji Gumilang/.gemini/antigravity/brain/69ad9809-005a-4e09-be90-3a57768f2523/.user_uploaded/media_1793354986488_537943a0.jpg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>UTS_IT-AUD_Liana_12470500</title>
  <style>
    @page {{
      size: A4 portrait;
      margin: 14mm 15mm 15mm 15mm;
      @bottom-right {{
        content: "Halaman " counter(page);
        font-size: 8pt;
        color: #718096;
        font-family: 'Segoe UI', Tahoma, sans-serif;
      }}
    }}

    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      font-size: 9.3pt;
      line-height: 1.45;
      color: #2D3748;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
    }}

    h1, h2, h3, h4 {{
      color: #1A365D;
      font-weight: 700;
      margin-top: 0;
    }}

    .page-break {{
      page-break-before: always;
    }}

    .avoid-break {{
      break-inside: avoid;
      page-break-inside: avoid;
    }}

    /* Cover Styling */
    .cover-container {{
      height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 3px double #2B6CB0;
      padding: 30px 26px;
      border-radius: 8px;
      background: linear-gradient(180deg, #F8FAFC 0%, #EDF2F7 100%);
    }}

    .cover-header {{
      text-align: center;
      border-bottom: 2px solid #CBD5E0;
      padding-bottom: 14px;
    }}

    .univ-tag {{
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #2B6CB0;
      text-transform: uppercase;
      margin-bottom: 5px;
    }}

    .doc-type {{
      font-size: 18pt;
      font-weight: 800;
      color: #1A202C;
      margin: 6px 0;
      letter-spacing: 0.5px;
    }}

    .doc-subtitle {{
      font-size: 12pt;
      color: #4A5568;
      font-weight: 600;
    }}

    .cover-body {{
      margin: 18px 0;
      text-align: center;
    }}

    .case-title-box {{
      background: #FFFFFF;
      border-left: 6px solid #319795;
      padding: 14px 18px;
      margin: 0 auto 20px auto;
      text-align: left;
      max-width: 92%;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }}

    .case-title-box h3 {{
      margin: 0 0 5px 0;
      color: #234E52;
      font-size: 11pt;
    }}

    .case-title-box p {{
      margin: 0;
      font-size: 9.2pt;
      color: #4A5568;
      line-height: 1.45;
    }}

    .identity-table-box {{
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px 22px;
      max-width: 88%;
      margin: 0 auto;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    }}

    .identity-table {{
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 9.8pt;
    }}

    .identity-table td {{
      padding: 5px 8px;
      vertical-align: top;
    }}

    .identity-table td.label {{
      font-weight: 700;
      color: #4A5568;
      width: 32%;
    }}

    .identity-table td.sep {{
      width: 3%;
      font-weight: 700;
    }}

    .identity-table td.value {{
      color: #1A202C;
      font-weight: 600;
    }}

    .cover-footer {{
      border-top: 2px solid #CBD5E0;
      padding-top: 12px;
      text-align: center;
      font-size: 8.5pt;
      color: #718096;
    }}

    /* Section Styles */
    .section-title {{
      font-size: 13.5pt;
      border-bottom: 2px solid #2B6CB0;
      padding-bottom: 4px;
      margin-bottom: 10px;
      color: #1A365D;
    }}

    .section-subtitle {{
      font-size: 10.5pt;
      color: #2C5282;
      margin-top: 12px;
      margin-bottom: 6px;
      border-left: 4px solid #3182CE;
      padding-left: 8px;
    }}

    .badge {{
      display: inline-block;
      font-size: 7.2pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }}

    .badge-primary {{ background: #EBF8FF; color: #2B6CB0; border: 1px solid #BEE3F8; }}
    .badge-success {{ background: #F0FFF4; color: #276749; border: 1px solid #C6F6D5; }}
    .badge-warning {{ background: #FFFAF0; color: #9C4221; border: 1px solid #FEEBC8; }}
    .badge-danger {{ background: #FFF5F5; color: #9B2C2C; border: 1px solid #FED7D7; }}

    /* Tables */
    table.data-table {{
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 8.5pt;
    }}

    table.data-table th, table.data-table td {{
      border: 1px solid #CBD5E0;
      padding: 5.5px 7px;
      vertical-align: top;
      line-height: 1.35;
    }}

    table.data-table th {{
      background: #EDF2F7;
      color: #2D3748;
      font-weight: 700;
      text-align: left;
    }}

    table.data-table tr:nth-child(even) td {{
      background: #F8FAFC;
    }}

    /* Specific compact styling for TASL Table */
    table.tasl-table th, table.tasl-table td {{
      font-size: 7.8pt;
      padding: 4px 5px;
      line-height: 1.25;
    }}

    /* Specific compact styling for Storyboard Table */
    table.storyboard-table th, table.storyboard-table td {{
      font-size: 8.1pt;
      padding: 5px 6px;
      line-height: 1.3;
    }}

    .analysis-card {{
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 9px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }}

    .flow-step {{
      background: #F8FAFC;
      border-left: 4px solid #4299E1;
      padding: 7px 11px;
      margin-bottom: 7px;
      border-radius: 0 4px 4px 0;
    }}

    .flow-step h4 {{
      margin: 0 0 3px 0;
      font-size: 9.3pt;
      color: #2B6CB0;
    }}

    .quote-box {{
      background: #FFFAF0;
      border-left: 4px solid #DD6B20;
      padding: 8px 12px;
      font-style: italic;
      color: #7B341E;
      margin: 8px 0;
      border-radius: 0 6px 6px 0;
      font-size: 8.3pt;
    }}

    .screenshot-row {{
      display: flex;
      gap: 12px;
      margin: 10px 0;
      justify-content: center;
    }}

    .screenshot-card {{
      flex: 1;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      padding: 5px;
      background: #F8FAFC;
      text-align: center;
    }}

    .screenshot-card img {{
      max-width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #E2E8F0;
    }}

    .screenshot-caption {{
      font-size: 7.8pt;
      font-weight: 600;
      color: #4A5568;
      margin-top: 4px;
    }}

    .reflection-q {{
      font-weight: 700;
      color: #1A365D;
      margin-top: 10px;
      margin-bottom: 3px;
      font-size: 9.3pt;
    }}

    .reflection-a {{
      color: #2D3748;
      text-align: justify;
      margin-bottom: 8px;
      font-size: 8.7pt;
      line-height: 1.4;
    }}
  </style>
</head>
<body>

  <!-- ==================== HALAMAN 1: IDENTITAS ==================== -->
  <div class="cover-container">
    <div class="cover-header">
      <div class="univ-tag">Program Studi Pendidikan Islam Anak Usia Dini (PIAUD)</div>
      <div class="doc-type">UJIAN TENGAH SEMESTER (UTS)</div>
      <div class="doc-subtitle">Redesign Media Digital Pembelajaran untuk Anak Usia Dini</div>
    </div>

    <div class="cover-body">
      <div class="case-title-box">
        <h3>Tema Studi Kasus: "Hewan di Sekitar Kita" (Anak Usia 5–6 Tahun)</h3>
        <p>
          Analisis kritis dan rekonstruksi pedagogis media pembelajaran digital: bertransformasi dari video pasif berdurasi panjang, bising, dan sarat distraksi iklan/pelanggaran hak cipta menuju ekosistem pembelajaran aktif terpadu <strong>Digital &rarr; Interaksi &rarr; Aktivitas Nyata</strong>.
        </p>
      </div>

      <div class="identity-table-box">
        <table class="identity-table">
          <tr>
            <td class="label">Nama Mahasiswa</td>
            <td class="sep">:</td>
            <td class="value">Liana</td>
          </tr>
          <tr>
            <td class="label">Nomor Induk Mahasiswa (NIM)</td>
            <td class="sep">:</td>
            <td class="value">12470500</td>
          </tr>
          <tr>
            <td class="label">Program Studi / Semester</td>
            <td class="sep">:</td>
            <td class="value">PIAUD (Pendidikan Islam Anak Usia Dini) / Semester 5</td>
          </tr>
          <tr>
            <td class="label">Mata Kuliah</td>
            <td class="sep">:</td>
            <td class="value">IT untuk AUD</td>
          </tr>
          <tr>
            <td class="label">Dosen Pengampu</td>
            <td class="sep">:</td>
            <td class="value">Rifqi Syamsul Fuadi, S.T., M.Kom.</td>
          </tr>
          <tr>
            <td class="label">Batas Pengumpulan</td>
            <td class="sep">:</td>
            <td class="value">30 Oktober 2026, Pukul 23.59 WIB</td>
          </tr>
          <tr>
            <td class="label">Tautan Prototipe Live</td>
            <td class="sep">:</td>
            <td class="value"><a href="https://azispanji24.github.io/safari_Hewan/" style="color:#2B6CB0; font-weight:700;">https://azispanji24.github.io/safari_Hewan/</a></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="cover-footer">
      <p style="margin: 0 0 4px 0; font-weight: 700; color: #2B6CB0;">
        "Prinsip Utama: Teknologi sebagai alat pedagogis: tepat tujuan, sesuai perkembangan, aman, sederhana, aktif, dan etis."
      </p>
      <p style="margin: 0; font-size: 7.8pt; color: #718096;">
        Kepatuhan Penuh Terhadap RPS IT untuk AUD &bull; Standar Hak Cipta & Etika Digital P7 &bull; WCAG 2.1 AAA &bull; DAP (Developmentally Appropriate Practice)
      </p>
    </div>
  </div>

  <!-- ==================== HALAMAN 2: BAGIAN 1 (MASALAH 1, 2, 3) ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 1: Analisis Permasalahan Studi Kasus (Bagian A: Poin 1 – 3)</h2>
  <p style="font-size: 8.8pt; color: #4A5568; margin-top: -6px; margin-bottom: 10px;">
    Evaluasi kritis terhadap skenario video studi kasus menggunakan 4 lensa analitis (Pedagogis, Perkembangan AUD, Desain Multimedia, serta Keamanan & Etika) dengan pola baku: <strong>Masalah &rarr; Alasan &rarr; Risiko &rarr; Solusi</strong>.
  </p>

  <!-- Masalah 1 -->
  <div class="analysis-card avoid-break">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:9.8pt; margin:0; color:#1A365D;">1. Video Berdurasi Panjang & Pola Pembelajaran Menonton Pasif</h3>
      <span class="badge badge-danger">Lensa Pedagogis & Perkembangan AUD</span>
    </div>
    <div style="font-size:8.6pt; margin-top:5px;">
      <p style="margin: 2px 0;"><strong>Masalah:</strong> Guru berencana memutar video internet berdurasi panjang dan menginstruksikan anak duduk diam menonton hingga selesai tanpa jeda interaksi.</p>
      <p style="margin: 2px 0;"><strong>Alasan:</strong> Rentang perhatian (<em>attention span</em>) anak usia 5–6 tahun hanya berkisar antara 10–15 menit untuk aktivitas terfokus. Karakteristik belajar AUD bersifat konkret dan kinestetik, bukan penerima informasi satu arah (pasif).</p>
      <p style="margin: 2px 0;"><strong>Risiko:</strong> Anak mengalami kelelahan visual (<em>screen fatigue</em>), kehilangan konsentrasi, gelisah, serta tidak terbentuknya retensi memori bermakna karena tiadanya keterlibatan fisik dan emosional.</p>
      <p style="margin: 2px 0;"><strong>Solusi:</strong> Dekonstruksi alur belajar menjadi <em>Digital &rarr; Interaksi &rarr; Aktivitas Nyata</em>. Media digital difungsikan sebagai pemantik singkat (5–8 menit) yang dipandu guru (<em>co-viewing</em>), lalu segera disambung aktivitas fisik motorik dan kartu cetak nyata di kelas.</p>
    </div>
  </div>

  <!-- Masalah 2 -->
  <div class="analysis-card avoid-break">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:9.8pt; margin:0; color:#1A365D;">2. Musik Latar (BGM) Keras yang Menenggelamkan Narasi & Suara Asli Hewan</h3>
      <span class="badge badge-warning">Lensa Desain Multimedia & Audio</span>
    </div>
    <div style="font-size:8.6pt; margin-top:5px;">
      <p style="margin: 2px 0;"><strong>Masalah:</strong> Video menggunakan musik latar bertempo cepat dan bervolume dominan yang diputar terus-menerus.</p>
      <p style="margin: 2px 0;"><strong>Alasan:</strong> Berdasarkan Teori Beban Kognitif (Sweller) dan <em>Coherence Principle</em> (Mayer), musik latar keras menciptakan <em>extraneous cognitive load</em> yang menutupi sinyal auditori primer (suara artikulasi guru dan suara khas hewan).</p>
      <p style="margin: 2px 0;"><strong>Risiko:</strong> Anak mengalami miskonsepsi auditori, gagal membedakan onomatopoeia frekuensi khas hewan, dan kelas menjadi gaduh karena anak harus berteriak mengatasi kebisingan speaker.</p>
      <p style="margin: 2px 0;"><strong>Solusi:</strong> Menerapkan <em>audio ducking</em> (-18 dB saat narasi berbunyi), volume master yang ternormalisasi (-16 LUFS), opsi mute eksplisit (default OFF saat aplikasi dibuka), dan memastikan suara tiruan hewan jernih dan berlisensi otentik.</p>
    </div>
  </div>

  <!-- Masalah 3 -->
  <div class="analysis-card avoid-break">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:9.8pt; margin:0; color:#1A365D;">3. Tulisan Teks Berukuran Kecil & Beban Bahasa Tak Sesuai Usia</h3>
      <span class="badge badge-danger">Lensa Aksesibilitas & Literasi Awal</span>
    </div>
    <div style="font-size:8.6pt; margin-top:5px;">
      <p style="margin: 2px 0;"><strong>Masalah:</strong> Teks keterangan dalam video berukuran kecil, tipis, dan disusun dalam format paragraf panjang.</p>
      <p style="margin: 2px 0;"><strong>Alasan:</strong> Anak usia 5–6 tahun berada pada tahap membaca awal (<em>early emergent literacy</em>). Mereka mengenali kata melalui bentuk visual dan suku kata besar, bukan membaca teks paragraf padat.</p>
      <p style="margin: 2px 0;"><strong>Risiko:</strong> Frustrasi belajar, hilangnya minat baca, dan anak-anak yang duduk di baris belakang kelas tidak dapat membaca teks di proyektor/layar.</p>
      <p style="margin: 2px 0;"><strong>Solusi:</strong> Menggunakan tipografi ramah anak (Fredoka & Quicksand) ukuran besar (&ge; 22–32px), kontras tinggi (WCAG 2.1 AAA &ge; 7:1), pemotongan suku kata fonetik warna-warni (misal: "Ga — jah", "Bu — rung"), serta narasi audio untuk setiap teks.</p>
    </div>
  </div>

  <!-- ==================== HALAMAN 3: BAGIAN 1 (MASALAH 4, 5, 6) ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 1: Analisis Permasalahan Studi Kasus (Bagian B: Poin 4 – 6)</h2>

  <!-- Masalah 4 -->
  <div class="analysis-card avoid-break">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:9.8pt; margin:0; color:#1A365D;">4. Animasi Berlebihan & Visual Penuh Distraksi (Visual Clutter)</h3>
      <span class="badge badge-warning">Lensa Desain Multimedia (Mayer's Principles)</span>
    </div>
    <div style="font-size:8.6pt; margin-top:5px;">
      <p style="margin: 2px 0;"><strong>Masalah:</strong> Video dipenuhi partikel kilau berkedip, transisi zoom cepat, dan elemen visual penghias yang tidak bermakna.</p>
      <p style="margin: 2px 0;"><strong>Alasan:</strong> Melanggar <em>Signaling Principle</em>. Visual yang terlalu ramai memecah perhatian anak (<em>split-attention effect</em>), sehingga otak anak sibuk memproses visual bergerak yang tidak relevan dengan esensi materi.</p>
      <p style="margin: 2px 0;"><strong>Risiko:</strong> Stimulasi berlebih (<em>sensory overload</em>), memicu hipereksitabilitas, dan terabaikannya ciri anatomi utama hewan.</p>
      <p style="margin: 2px 0;"><strong>Solusi:</strong> Menyederhanakan visual dengan prinsip "Satu Scene, Satu Fokus Utama". Menggunakan ilustrasi SVG orisinal berlatar kanvas lembut (#F8F5EC) dengan hierarki visual terarah dan tombol interaktif yang memancarkan pendar lembut saat disentuh.</p>
    </div>
  </div>

  <!-- Masalah 5 -->
  <div class="analysis-card avoid-break">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:9.8pt; margin:0; color:#1A365D;">5. Kemunculan Iklan Komersial Tak Terduga & Risiko Tautan Eksternal</h3>
      <span class="badge badge-danger">Lensa Keamanan, Privasi & Perlindungan Anak</span>
    </div>
    <div style="font-size:8.6pt; margin-top:5px;">
      <p style="margin: 2px 0;"><strong>Masalah:</strong> Video diputar langsung dari platform streaming gratisan yang menyisipkan jeda iklan komersial secara acak.</p>
      <p style="margin: 2px 0;"><strong>Alasan:</strong> Algoritma iklan platform publik bersifat dinamis dan tidak terkontrol oleh guru, berpotensi menayangkan konten yang tidak sesuai usia anak (iklan gim dewasa, konsumerisme, atau visual menakutkan).</p>
      <p style="margin: 2px 0;"><strong>Risiko:</strong> Paparan konten berbahaya, distraksi kelas, dan kebocoran privasi/keamanan data jika tautan iklan tertekan secara tak sengaja oleh anak.</p>
      <p style="margin: 2px 0;"><strong>Solusi:</strong> Mengembangkan media mandiri berbasis web statis/PWA terisolasi, 100% bebas iklan (<em>zero-ad</em>), tanpa pelacak analitik pihak ketiga (<em>zero-tracker</em>), dan aman dijalankan secara luring (<em>offline</em>).</p>
    </div>
  </div>

  <!-- Masalah 6 -->
  <div class="analysis-card avoid-break">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="font-size:9.8pt; margin:0; color:#1A365D;">6. Penggunaan Aset Digital Tanpa Pencatatan Sumber & Lisensi Legal</h3>
      <span class="badge badge-danger">Lensa Etika Digital & Kepatuhan Hak Cipta</span>
    </div>
    <div style="font-size:8.6pt; margin-top:5px;">
      <p style="margin: 2px 0;"><strong>Masalah:</strong> Guru mengambil gambar dan musik dari mesin pencari Google tanpa mencatat sumber, pembuat, atau informasi lisensi.</p>
      <p style="margin: 2px 0;"><strong>Alasan:</strong> Miskonsepsi umum bahwa "semua konten di Google bebas diambil untuk pendidikan". Hal ini melanggar UU Hak Cipta No. 28 Tahun 2014 dan kode etik profesional pendidik PIAUD (Materi Perkuliahan P7).</p>
      <p style="margin: 2px 0;"><strong>Risiko:</strong> Pelanggaran hukum hak cipta, risiko takedown media saat dipublikasikan, serta memberikan keteladanan literasi digital yang keliru kepada sivitas sekolah.</p>
      <p style="margin: 2px 0;"><strong>Solusi:</strong> Melakukan inventarisasi dan audit aset digital menyeluruh menggunakan standar <strong>TASL (Title, Author, Source, License)</strong>, mengutamakan karya orisinal (SVG buatan sendiri), domain publik (CC0), atau lisensi Creative Commons legal (CC BY / CC BY-SA).</p>
    </div>
  </div>

  <!-- ==================== HALAMAN 4: BAGIAN 2: REDESIGN PEMBELAJARAN ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 2: Redesign Pembelajaran (Digital &rarr; Interaksi &rarr; Aktivitas Nyata)</h2>
  
  <table class="data-table avoid-break">
    <tr>
      <th style="width:24%;">Tema & Subtema</th>
      <td><strong>Hewan di Sekitar Kita</strong> / Sahabat Safari: Gajah, Kelinci, Bebek, dan Burung</td>
    </tr>
    <tr>
      <th>Kelompok Sasaran</th>
      <td>Kelompok B (Anak Usia 5–6 Tahun) &bull; PIAUD / TK</td>
    </tr>
    <tr>
      <th>Alokasi Waktu</th>
      <td>1 Kali Pertemuan (Total 60 Menit: 8 menit digital pemantik, 12 menit interaksi kelas, 40 menit aktivitas nyata)</td>
    </tr>
    <tr>
      <th>Capaian Pembelajaran (TP)</th>
      <td>
        1. <strong>Kognitif:</strong> Anak mampu membedakan 4 ciri fisik dan suara khas hewan (belalai, telinga panjang, paruh, sayap).<br>
        2. <strong>Bahasa:</strong> Anak mampu melafalkan suku kata nama hewan ("Ga-jah", "Bu-rung") dan menirukan onomatopoeia suara hewan.<br>
        3. <strong>Motorik:</strong> Anak mampu mengoordinasikan motorik kasar menirukan gerak hewan dan motorik halus pada kartu fisik.<br>
        4. <strong>Sosial-Emosional & Karakter:</strong> Anak menyayangi binatang ciptaan Tuhan, sabar mengantre giliran, dan percaya diri.
      </td>
    </tr>
    <tr>
      <th>Media & Fasilitas</th>
      <td>Aplikasi Web <em>Safari Hewan</em> pada Tablet/Laptop Kelas, Proyektor (opsional), Kartu Cetak Aktivitas Safari A4, Gunting tumpul, Perekat.</td>
    </tr>
  </table>

  <h3 class="section-subtitle">Sintaks Pembelajaran Terintegrasi (3 Fase Terstruktur)</h3>

  <div class="flow-step avoid-break">
    <h4>Fase 1: Pemantik Digital Singkat (Screen Time Terkontrol: 5–8 Menit)</h4>
    <p style="margin: 2px 0; font-size: 8.5pt;">
      <strong>Peran Guru:</strong> Membuka kegiatan dengan menyalakan aplikasi Safari Hewan di layar sentuh/proyektor sebagai fasilitator aktif (<em>co-viewing</em>). Membacakan narasi ramah atau mengaktifkan audio narasi Ibu Guru.<br>
      <strong>Aktivitas Anak:</strong> Duduk melingkar (<em>circle time</em>), menyapa gerbang safari, dan anak secara demokratis memilih hewan pembuka yang disepakati (misal Burung atau Gajah). Anak menyimak suara khas hewan tanpa kebisingan musik latar.<br>
      <strong>Keputusan Pedagogis:</strong> Mengutamakan prinsip agensi anak (<em>child agency</em>). Durasi digital dibatasi ketat &le; 10 menit agar terhindar dari adiksi layar dan kelelahan visual.
    </p>
  </div>

  <div class="flow-step avoid-break">
    <h4>Fase 2: Interaksi Terbimbing (Dialog & Tebak Suara: 10–12 Menit)</h4>
    <p style="margin: 2px 0; font-size: 8.5pt;">
      <strong>Peran Guru:</strong> Memfasilitasi dialog interaktif: <em>"Ayo dengarkan, suara siapakah ini yang bersuara kwek-kwek?"</em> Guru meminta anak mengamati layar dan memandu anak mengeja suku kata bersama-sama.<br>
      <strong>Aktivitas Anak:</strong> Anak bergiliran menyentuh layar untuk membuktikan tebakan suara misteri, mengamati fitur anatomi tubuh hewan (belalai gajah, telinga kelinci, kaki bebek, sayap burung), dan mengeja suku kata dengan tepukan tangan ritmis.<br>
      <strong>Keputusan Pedagogis:</strong> Mengubah konsumsi pasif menjadi stimulasi diskriminasi auditori dan kesadaran fonologis awal (<em>phonological awareness</em>).
    </p>
  </div>

  <div class="flow-step avoid-break">
    <h4>Fase 3: Aktivitas Nyata Non-Digital (Hands-on & Kinestetik: 35–40 Menit)</h4>
    <p style="margin: 2px 0; font-size: 8.5pt;">
      <strong>Aktivitas 1 (Motorik Kasar - Safari Movement):</strong> Di ruang kelas terbuka, guru memandu anak melompat riang seperti kelinci (hop! hop!), mengayunkan tangan tegap seperti belalai gajah, bergoyang jalan seperti bebek, dan merentangkan sayap terbang seperti burung.<br>
      <strong>Aktivitas 2 (Motorik Halus - Kartu Fisik & Kolase):</strong> Guru membagikan lembar kerja cetak A4 <em>Safari Animal Activity Sheet</em> (tersedia di tombol Panduan Guru). Anak menggunting kartu hewan, mencocokkan jejak kaki hewan ke habitatnya, serta mewarnai hewan kesukaan.<br>
      <strong>Aktivitas 3 (Sosial-Emosional & Refleksi):</strong> Anak duduk kembali dalam lingkaran, menunjukkan karyanya kepada teman sebaya, dan menceritakan: <em>"Hewan apa yang paling aku sayangi hari ini dan mengapa?"</em> Guru menutup dengan doa dan apresiasi kebaikan.
    </p>
  </div>

  <!-- ==================== HALAMAN 5: BAGIAN 3: STORYBOARD MEDIA ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 3: Storyboard Media Digital Interaktif (6 Panel Lengkap)</h2>
  <p style="font-size: 8.8pt; color: #4A5568; margin-top: -6px; margin-bottom: 8px;">
    Rancangan antarmuka 6 adegan terstruktur dengan prinsip: <em>Satu scene satu fokus utama, visual sederhana bebas distraksi, teks besar ramah membaca awal, serta tombol sentuh ramah motorik AUD (&ge; 48px).</em>
  </p>

  <table class="data-table storyboard-table">
    <thead>
      <tr>
        <th style="width:6%;">Scene</th>
        <th style="width:20%;">Visual & Layout</th>
        <th style="width:23%;">Narasi (Teks & Suara)</th>
        <th style="width:17%;">Audio & Efek</th>
        <th style="width:18%;">Interaksi Anak</th>
        <th style="width:16%;">Tujuan Pedagogis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td>Gerbang kayu safari rimbun, kanopi daun tropis, 4 token kartu hewan (Gajah, Kelinci, Bebek, Burung).</td>
        <td>"Halo sahabat kecil! Selamat datang di Safari Hewan. Hewan apa yang paling ingin kamu temui hari ini?"</td>
        <td>Efek bel ramah (gentle chime), narasi suara Ibu Guru hangat. BGM default hening (mute).</td>
        <td>Anak menyentuh salah satu token hewan favorit untuk menentukan alur petualangan.</td>
        <td>Membangun rasa ingin tahu (curiosity), memberikan agensi anak, dan pemanasan visual.</td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td>Karakter hewan heroik yang dipilih anak (Burung/Gajah/dll) di tengah layar, pendar halo lembut, switcher 4 sahabat, & 2 tombol fitur tubuh.</td>
        <td>"Wah, lihat sahabat [Nama Hewan]! Perhatikan [Fitur Tubuh 1] dan [Fitur Tubuh 2]. Ayo sentuh untuk berkenalan!"</td>
        <td>Suara khas asli hewan (belalai pruuu / kicau burung) + ejaan suku kata narator.</td>
        <td>Anak menyentuh tombol fitur anatomi tubuh hewan dan dapat menukar sahabat hewan melalui quick-switcher.</td>
        <td>Literasi fonetik membaca suku kata awal ("Bu — rung") dan observasi sains organ tubuh hewan.</td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td>Panggung siluet semak belukar hijau, ikon speaker bergetar dengan visualizer 5 gelombang audio, 3 kartu pilihan tebakan.</td>
        <td>"Sstt... dengarkan baik-baik suara di balik semak! Hewan apakah yang bersuara seperti ini?"</td>
        <td>Playback suara hewan murni tanpa gangguan musik (isolasi suara), chime benar / nada coba lagi.</td>
        <td>Anak menekan tombol dengarkan suara berulang kali, lalu memilih kartu tebakan yang cocok.</td>
        <td>Melatih diskriminasi auditori aktif, memori asosiatif, dan penalaran inferensial anak.</td>
      </tr>
      <tr>
        <td><strong>4</strong></td>
        <td>Kartu visual panduan pose gerakan tubuh riang, ilustrasi ikonik pose hewan (misal kelinci melompat / burung terbang).</td>
        <td>"Ayo kita tirukan! Rentangkan tanganmu seperti sayap burung dan terbang keliling ruangan bersama teman!"</td>
        <td>Efek suara lompatan gembira (gentle pop) dan instruksi gerak berirama.</td>
        <td>Anak berdiri di ruang kelas melakukan gerakan motorik nyata, lalu menekan tombol "Sudah Mencoba!".</td>
        <td>Mengintegrasikan stimulasi motorik kasar, memecah isolasi duduk diam di depan layar gawai.</td>
      </tr>
      <tr>
        <td><strong>5</strong></td>
        <td>Area permainan mencocokkan: 4 kartu sahabat hewan di kiri dan 4 bayangan/jejak/fitur di kanan dengan bingkai warna kontras.</td>
        <td>"Hebat! Sekarang ayo kita pasangkan setiap sahabat hewan dengan ciri khasnya yang benar!"</td>
        <td>Suara pop saat kartu dipilih dan melodi kebanggaan pendek saat pasangan cocok.</td>
        <td>Anak menyentuh kartu hewan lalu menyentuh pasangannya (tap-to-match ramah motorik halus).</td>
        <td>Mengasah fungsi eksekutif kognitif, klasifikasi visual, persepsi spasial, dan koordinasi mata-tangan.</td>
      </tr>
      <tr>
        <td><strong>6</strong></td>
        <td>Panggung perayaan perpisahan: ke-4 hewan berkumpul bersama, konfeti daun tropis, bintang apresiasi, dan tombol 'Panduan Guru'.</td>
        <td>"Luar biasa, petualangan safari selesai! Hewan mana yang paling kamu sukai hari ini? Ayo ceritakan pada Ibu Guru!"</td>
        <td>Melodi riang lembut perayaan (Carefree - Kevin MacLeod jika dinyalakan) dan tepukan tangan hangat.</td>
        <td>Anak memilih hewan terfavorit dan guru mencetak lembar aktivitas fisik A4 untuk kegiatan kelas.</td>
        <td>Refleksi metakognitif afektif, apresiasi diri, serta transisi mulus dari media digital ke aktivitas nyata.</td>
      </tr>
    </tbody>
  </table>

  <!-- ==================== HALAMAN 6: BAGIAN 4: AUDIT ASET DIGITAL ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 4: Audit Aset Digital & Format TASL (Kepatuhan Etika & Hak Cipta)</h2>
  <p style="font-size: 8.8pt; color: #4A5568; margin-top: -6px; margin-bottom: 8px;">
    Seluruh aset visual, audio, font, dan kode yang diintegrasikan ke dalam media Safari Hewan telah diaudit secara legal dan etis menggunakan standar internasional <strong>TASL (Title, Author, Source, License)</strong> sesuai materi Perkuliahan Pertemuan 7 (RPS IT untuk AUD):
  </p>

  <table class="data-table tasl-table">
    <thead>
      <tr>
        <th style="width:12%;">Nama Aset</th>
        <th style="width:15%;">Title</th>
        <th style="width:14%;">Author</th>
        <th style="width:18%;">Source</th>
        <th style="width:15%;">License</th>
        <th style="width:14%;">Modifikasi</th>
        <th style="width:12%;">Keputusan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Ilustrasi Gajah</strong></td>
        <td>Elephant Storybook Vector</td>
        <td>Tim Pengembang Safari Hewan</td>
        <td>Original SVG Asset</td>
        <td>Creative Commons Zero (CC0 1.0) / Hak Penuh Mahasiswa</td>
        <td>Dirancang khusus dengan path SVG native responsif, palet #5C7D8D</td>
        <td><span class="badge badge-success">PAKAI (RESMI)</span></td>
      </tr>
      <tr>
        <td><strong>Ilustrasi Kelinci</strong></td>
        <td>Rabbit Storybook Vector</td>
        <td>Tim Pengembang Safari Hewan</td>
        <td>Original SVG Asset</td>
        <td>Creative Commons Zero (CC0 1.0) / Hak Penuh Mahasiswa</td>
        <td>Ilustrasi orisinal telinga panjang tegak & wortel, palet #D97A53</td>
        <td><span class="badge badge-success">PAKAI (RESMI)</span></td>
      </tr>
      <tr>
        <td><strong>Ilustrasi Bebek</strong></td>
        <td>Duck Storybook Vector</td>
        <td>Tim Pengembang Safari Hewan</td>
        <td>Original SVG Asset</td>
        <td>Creative Commons Zero (CC0 1.0) / Hak Penuh Mahasiswa</td>
        <td>Ilustrasi orisinal paruh pipih & kaki berselaput, palet #ECA72C</td>
        <td><span class="badge badge-success">PAKAI (RESMI)</span></td>
      </tr>
      <tr>
        <td><strong>Ilustrasi Burung</strong></td>
        <td>Bird Storybook Vector</td>
        <td>Tim Pengembang Safari Hewan</td>
        <td>Original SVG Asset</td>
        <td>Creative Commons Zero (CC0 1.0) / Hak Penuh Mahasiswa</td>
        <td>Ilustrasi orisinal sayap mengepak dan bulu biru, palet #3A9BB7</td>
        <td><span class="badge badge-success">PAKAI (RESMI)</span></td>
      </tr>
      <tr>
        <td><strong>Musik Latar (BGM)</strong></td>
        <td>Carefree</td>
        <td>Kevin MacLeod</td>
        <td>Incompetech (<a href="https://incompetech.com" style="color:#2B6CB0;">incompetech.com</a>)</td>
        <td>Creative Commons Attribution 3.0 Unported (CC BY 3.0)</td>
        <td>Dipotong loop 45 detik, di-attenuate ke -22 LUFS, default posisi OFF</td>
        <td><span class="badge badge-success">PAKAI (ATRIBUSI)</span></td>
      </tr>
      <tr>
        <td><strong>Suara Belalai Gajah</strong></td>
        <td>Elephant Voice - Trumpeting</td>
        <td>Wikimedia Audio Contributor</td>
        <td>Wikimedia Commons (CC0)</td>
        <td>CC0 1.0 Universal (Public Domain Dedication)</td>
        <td>Rekaman biologis terompet gajah asli (<em>Elephas maximus</em>), ternormalisasi</td>
        <td><span class="badge badge-success">PAKAI (OTENTIK)</span></td>
      </tr>
      <tr>
        <td><strong>Suara Lompatan Kelinci</strong></td>
        <td>Lompatan Riang Kelinci</td>
        <td>Tim Pengembang Safari Hewan</td>
        <td>Sintesis Akustik Python</td>
        <td>Creative Commons Zero (CC0 1.0) / Hak Penuh Mahasiswa</td>
        <td>3 denyut loncatan ritmis 200–75 Hz dengan resonansi empuk dan decay hangat</td>
        <td><span class="badge badge-success">PAKAI (LEGAL)</span></td>
      </tr>
      <tr>
        <td><strong>Suara Bebek</strong></td>
        <td>Mallard Duck Quack</td>
        <td>Freesound Audio Archivist</td>
        <td>Freesound.org</td>
        <td>CC0 1.0 Universal (Public Domain Dedication)</td>
        <td>Dipotong repetisi 2x kwek, di-amplify pada rentang vokal 1.2 kHz</td>
        <td><span class="badge badge-success">PAKAI (LEGAL)</span></td>
      </tr>
      <tr>
        <td><strong>Suara Burung (Revisi Audit)</strong></td>
        <td>Eurasian Tree Sparrow (<em>Passer montanus</em>) XC347806</td>
        <td>Derek Paulo</td>
        <td>Xeno-canto (<a href="https://xeno-canto.org/347806" style="color:#2B6CB0;">xeno-canto.org/347806</a>)</td>
        <td>Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)</td>
        <td>Menggantikan chime lonceng non-biologis; dipotong durasi 2 detik, filter high-pass</td>
        <td><span class="badge badge-success">PAKAI (TERVERIFIKASI)</span></td>
      </tr>
      <tr>
        <td><strong>Audio Narasi Ibu Guru</strong></td>
        <td>Suara Narasi Safari Hewan</td>
        <td>Microsoft Azure Cognitive Speech / Gadis Neural Voice</td>
        <td>Microsoft Edge Speech Services SDK</td>
        <td>Microsoft Service Agreement (Personal & Educational Use)</td>
        <td>Dihasilkan via TTS id-ID-GadisNeural berkecepatan 0.9x dan intonasi ramah anak</td>
        <td><span class="badge badge-success">PAKAI (EDUKATIF)</span></td>
      </tr>
    </tbody>
  </table>

  <div class="quote-box avoid-break" style="font-size: 8.2pt; margin-top: 6px;">
    <strong>Catatan Kepatuhan Etika Digital Pertemuan 7:</strong><br>
    Sesuai arahan Dosen Rifqi Syamsul Fuadi, S.T., M.Kom., seluruh media yang digunakan tidak mengambil gambar/audio secara serampangan dari Google Image. Tidak ada foto wajah anak nyata yang ditampilkan tanpa izin (<em>privacy protection</em>). Seluruh aset diintegrasikan secara transparan tanpa klaim palsu.
  </div>

  <!-- ==================== HALAMAN 7: BAGIAN 5: PROTOTIPE MEDIA ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 5: Prototipe Media Digital Interaktif Safari Hewan</h2>

  <table class="data-table avoid-break" style="margin-bottom:8px;">
    <tr>
      <th style="width:24%;">Tautan Langsung (Live URL)</th>
      <td><a href="https://azispanji24.github.io/safari_Hewan/" style="color:#2B6CB0; font-weight:700; font-size:9.5pt;">https://azispanji24.github.io/safari_Hewan/</a></td>
    </tr>
    <tr>
      <th>Repositori Kode Sumber</th>
      <td><a href="https://github.com/Azispanji24/safari_Hewan" style="color:#2B6CB0; font-weight:700;">https://github.com/Azispanji24/safari_Hewan</a></td>
    </tr>
    <tr>
      <th>Arsitektur & Teknologi</th>
      <td>React 18 &bull; TypeScript &bull; Vite &bull; Web Audio API &bull; Web Speech Synthesis API &bull; Semantic HTML5 & CSS3</td>
    </tr>
    <tr>
      <th>Standar Aksesibilitas</th>
      <td>WCAG 2.1 AAA (Kontras &ge; 7:1, Target Sentuh &ge; 48x48 px, Navigasi Tab Keyboard, Aria-live announcement)</td>
    </tr>
  </table>

  <div class="screenshot-row avoid-break">
    <div class="screenshot-card">
      <img src="{img_scene1}" alt="Tampilan Gerbang Selamat Datang Adegan 1">
      <div class="screenshot-caption">Gambar 1: Adegan 1 - Pemilihan Hewan Terfokus & Bebas Iklan</div>
    </div>
    <div class="screenshot-card">
      <img src="{img_scene2}" alt="Tampilan Perkenalan Hewan dan Suku Kata Adegan 2">
      <div class="screenshot-caption">Gambar 2: Adegan 2 - Perkenalan Hewan Terpilih & Eksplorasi Ciri Tubuh</div>
    </div>
  </div>

  <h3 class="section-subtitle" style="margin-top:8px;">Fitur Utama & Inovasi Prototipe yang Dikembangkan</h3>
  <div style="font-size: 8.7pt; line-height: 1.42;">
    <ul>
      <li><strong>Alur Adaptif Pilihan Anak (Child Agency & Co-Viewing):</strong> Berbeda dengan media kaku biasa, ketika anak memilih hewan tertentu di Adegan 1 (misalnya Burung), Adegan 2 secara cerdas beradaptasi mengenalkan Burung lengkap dengan suku kata fonetik ("Bu — rung"), audio kicauan otentik, dan tombol observasi sayap/paruh. Disediakan pula tombol switcher cepat untuk menemui hewan lain kapan saja tanpa rasa bosan.</li>
      <li><strong>Sistem Manajemen Audio Tanpa Autoplay (BGM Non-Autoplay):</strong> Sesuai temuan audit, musik latar disetel non-aktif (OFF) sejak awal. Audio hanya berbunyi saat anak atau guru menekan tombol suara tertentu, mencegah polusi suara di ruang kelas PAUD.</li>
      <li><strong>Fitur Suara Biologis Otentik:</strong> Karakter burung menggunakan suara kicauan asli burung gereja (<em>Passer montanus</em>) berlisensi CC BY-SA 4.0, menggantikan suara lonceng kemenangan sintetis demi mencegah miskonsepsi biologis pada anak usia dini.</li>
      <li><strong>Aktivitas Lanjutan Nyata (Printable Teacher Guide):</strong> Pada pojok kanan atas aplikasi, guru dapat membuka modal <em>Panduan Guru & Kartu Aktivitas</em> serta langsung mencetak lembar kerja fisik A4 terstandarisasi untuk kegiatan gunting, tempel, dan gerak di kelas nyata.</li>
    </ul>
  </div>

  <!-- ==================== HALAMAN 8: BAGIAN 6: REFLEKSI INDIVIDU ==================== -->
  <div class="page-break"></div>
  <h2 class="section-title">Bagian 6: Refleksi Kritis Mahasiswa (5 Pertanyaan Pokok)</h2>

  <div class="avoid-break">
    <div class="reflection-q">1. Mengapa media yang Anda rancang lebih sesuai untuk anak usia dini dibandingkan media pada studi kasus awal?</div>
    <div class="reflection-a">
      Media <em>Safari Hewan</em> dirancang berakar pada prinsip <strong>Developmentally Appropriate Practice (DAP)</strong> dan <strong>Teori Beban Kognitif (Cognitive Load Theory)</strong>. Pada kasus awal, anak ditempatkan sebagai penonton pasif di hadapan video berdurasi panjang dengan musik keras, teks mini, dan serbuan iklan komersial yang mengancam privasi serta overstimulasi otak. Sebaliknya, media hasil rancang ulang ini membagi pengalaman belajar dalam unit-unit mikro interaktif (<em>bite-sized scenes</em>) berprinsip <em>"Satu Adegan, Satu Fokus Utama"</em>. Teks disajikan dengan pemenggalan suku kata besar dan fonetik ramah anak, warna berlatar hangat alami tanpa silau (#F8F5EC), musik latar di-mute secara default agar vokal guru terdengar jernih, dan 100% bebas dari pelacak maupun iklan. Yang paling esensial, teknologi di sini tidak merebut kendali kelas, melainkan berperan sebagai pemantik dialog dan penghubung menuju aktivitas motorik fisik nyata.
    </div>
  </div>

  <div class="avoid-break">
    <div class="reflection-q">2. Bagian mana dari media Anda yang paling kuat secara pedagogis?</div>
    <div class="reflection-a">
      Bagian terkuat secara pedagogis terletak pada <strong>integrasi Adegan 3 (Tebak Suara Misteri) dan Adegan 4 (Ayo Menirukan Gerak)</strong>. Pada Adegan 3, media melatih kemampuan <em>phonological awareness</em> dan diskriminasi auditori aktif: anak tidak melihat gambar terlebih dahulu, melainkan diajak berkonsentrasi mendengarkan frekuensi suara hewan asli di balik semak, mendorong penalaran deduktif sebelum gambar diungkap. Selanjutnya, Adegan 4 secara sengaja mendobrak tradisi isolasi gawai dengan mengajak anak berdiri meninggalkan bangku dan menggerakkan seluruh tubuhnya (mengepakkan sayap seperti burung, melompat seperti kelinci, atau mengayunkan belalai gajah). Ini membuktikan bahwa teknologi sukses memfasilitasi perkembangan motorik kasar dan kecerdasan kinestetik, bukan mematikannya.
    </div>
  </div>

  <div class="avoid-break">
    <div class="reflection-q">3. Risiko apa yang masih mungkin muncul dari penggunaan media ini dan bagaimana mitigasinya?</div>
    <div class="reflection-a">
      Risiko utama yang masih dapat muncul adalah <strong>perebutan giliran sentuh antar-anak (turn-taking conflicts)</strong> jika media hanya ditampilkan pada satu perangkat tablet kecil di tengah kelompok besar, serta potensi anak terpesona pada tombol suara sehingga memencetnya secara repetitif (stimulasi berlebih). Mitigasi yang saya rancang adalah: (a) Penggunaan mode proyektor kelas di mana guru bertindak sebagai konduktor interaksi, memberikan giliran bergiliran sesuai nomor absen atau kartu undian satwa; (b) Penerapan <em>cooldown timer</em> dan pembatasan interaksi audio terprogram agar suara tidak tumpang tindih; serta (c) Pengalihan cepat dari layar digital ke lembar kerja fisik A4 segera setelah adegan digital selesai dalam batas waktu 8–10 menit.
    </div>
  </div>

  <div class="avoid-break">
    <div class="reflection-q">4. Bagaimana Anda menjaga keseimbangan antara aktivitas digital dan aktivitas nyata?</div>
    <div class="reflection-a">
      Keseimbangan dijaga secara ketat melalui formula rasio waktu <strong>1 : 4 (15 menit digital : 45 menit aktivitas nyata)</strong> dalam total 60 menit sesi pembelajaran. Media digital tidak pernah diposisikan sebagai guru pengganti (<em>teacher substitute</em>), melainkan hanya sebagai pemantik rasa ingin tahu (<em>hook / spark</em>). Segala konsep yang disentuh di layar kaca langsung ditransformasikan menjadi benda konkret: suara hewan di layar menjadi permainan tebak suara teman sekelas di dunia nyata; visual hewan di layar diterjemahkan menjadi kartu gunting-tempel fisik dan kolase daun kering; dan teks suku kata di layar dipraktikkan dengan tepukan ritmis tangan dan lagu anak. Dengan cara ini, sensori motorik anak tetap terlatih seimbang.
    </div>
  </div>

  <div class="avoid-break">
    <div class="reflection-q">5. Jika media ini digunakan langsung di kelas PAUD, apa yang perlu diuji atau diperbaiki terlebih dahulu?</div>
    <div class="reflection-a">
      Hal pertama yang wajib diuji langsung (<em>field testing</em>) adalah <strong>kemudahan jangkauan motorik jari anak (touch-target ergonomics)</strong> pada beragam variasi ukuran layar tablet lokal yang umum dimiliki sekolah, guna memastikan tombol berdiameter &ge; 48px dapat ditekan stabil oleh koordinasi motorik halus anak usia 5 tahun tanpa terjadi salah pencet (<em>accidental touch</em>). Kedua, perlu diuji keterbacaan tingkat kenyaringan audio di ruang kelas nyata yang memiliki gema atau kebisingan lingkungan sekitar, memastikan artikulasi narasi guru tetap kontras dan jernih. Ketiga, perlu dievaluasi reaksi emosional anak saat beralih dari fase digital ke fase kartu fisik, untuk memastikan transisi belajar berlangsung mulus tanpa ada anak yang merajuk karena perangkat gawai dimatikan.
    </div>
  </div>

  <!-- Sign-off Box -->
  <div class="avoid-break" style="margin-top:12px; border-top:1px solid #CBD5E0; padding-top:8px; display:flex; justify-content:space-between; font-size:8.3pt; color:#718096;">
    <div>
      <strong>Liana</strong> &bull; NIM 12470500<br>
      Program Studi PIAUD Semester 5
    </div>
    <div style="text-align:right;">
      Disusun untuk Memenuhi Tugas UTS IT untuk AUD<br>
      Dosen Pengampu: <strong>Rifqi Syamsul Fuadi, S.T., M.Kom.</strong>
    </div>
  </div>

</body>
</html>
"""

with open("UTS_IT-AUD_Liana_12470500.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("HTML document generated successfully: UTS_IT-AUD_Liana_12470500.html")

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
input_html = os.path.abspath("UTS_IT-AUD_Liana_12470500.html")
output_pdf = os.path.abspath("UTS_IT-AUD_Liana_12470500.pdf")

cmd = [
    edge_path,
    "--headless=new",
    "--disable-gpu",
    f"--print-to-pdf={output_pdf}",
    "--no-pdf-header-footer",
    input_html
]

print("Rendering PDF via headless Edge...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Edge return code:", res.returncode)

if os.path.exists(output_pdf):
    size = os.path.getsize(output_pdf)
    print(f"PDF generated successfully: {output_pdf} (Size: {size:,} bytes)")
