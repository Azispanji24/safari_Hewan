import os
import subprocess
import base64
import sys
import shutil

def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as img_file:
            ext = os.path.splitext(path)[1].lower().replace(".", "")
            if ext == "jpg":
                ext = "jpeg"
            return f"data:image/{ext};base64,{base64.b64encode(img_file.read()).decode('utf-8')}"
    return ""

uin_logo = get_base64_image("public/images/extracted_uin_logo_0.png")
scene1_img = get_base64_image("public/screenshots/scene1_pilih_hewan.png")
scene2_gajah_img = get_base64_image("C:/Users/Azis panji Gumilang/.gemini/antigravity/brain/69ad9809-005a-4e09-be90-3a57768f2523/.user_uploaded/media_1793356102124_766e945c.jpg")
scene2_kelinci_img = get_base64_image("C:/Users/Azis panji Gumilang/.gemini/antigravity/brain/69ad9809-005a-4e09-be90-3a57768f2523/.user_uploaded/media_1793356147459_9f6cc4d7.jpg")
scene3_img = get_base64_image("public/screenshots/scene3_tebak_suara.png")
scene4_img = get_base64_image("public/screenshots/scene4_tirukan_gerak.png")
scene5_img = get_base64_image("public/screenshots/scene5_mencocokkan.png")
scene6_img = get_base64_image("public/screenshots/scene6_panggung_safari.png")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>REDESAIN MEDIA DIGITAL PEMBELAJARAN UNTUK ANAK USIA DINI - Liana Nurfatimah (1242100062)</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 2.54cm 2.54cm 2.54cm 2.54cm;
    }}

    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000000;
      background: #FFFFFF;
      margin: 0;
      padding: 0;
    }}

    p {{
      text-align: justify;
      text-justify: inter-word;
      text-indent: 1.25cm;
      margin-top: 0;
      margin-bottom: 6pt;
    }}

    .no-indent {{
      text-indent: 0 !important;
    }}

    h1.section-title {{
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      font-weight: bold;
      color: #000000;
      margin-top: 14pt;
      margin-bottom: 6pt;
      text-indent: 0;
      page-break-after: avoid;
    }}

    .page-break {{
      page-break-before: always;
    }}

    /* Table Formatting matching Nurul Husna template */
    table {{
      width: 100%;
      border-collapse: collapse;
      margin-top: 6pt;
      margin-bottom: 8pt;
      font-family: 'Times New Roman', Times, serif;
      font-size: 10.5pt;
      line-height: 1.2;
    }}

    tr {{
      page-break-inside: avoid;
    }}

    th {{
      background-color: #D9E1F2;
      color: #000000;
      font-family: 'Times New Roman', Times, serif;
      font-weight: bold;
      text-align: center;
      border: 1px solid #000000;
      padding: 5px 4px;
      vertical-align: middle;
    }}

    td {{
      border: 1px solid #000000;
      padding: 4px 5px;
      vertical-align: top;
      color: #000000;
    }}

    td.center {{
      text-align: center;
    }}

    td.justify {{
      text-align: justify;
      text-justify: inter-word;
    }}

    a {{
      color: #0000EE;
      text-decoration: underline;
      word-break: break-all;
    }}

    /* Cover Page Structure */
    .cover-wrapper {{
      height: 89vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 10px 0;
    }}

    .cover-top {{
      margin-top: 15px;
    }}

    .cover-main-title {{
      font-size: 12pt;
      font-weight: bold;
      line-height: 1.4;
      text-transform: uppercase;
      margin-bottom: 4px;
    }}

    .cover-sub-title {{
      font-size: 12pt;
      font-weight: normal;
      line-height: 1.4;
    }}

    .cover-lecturer {{
      font-size: 12pt;
      line-height: 1.4;
      margin-top: 25px;
    }}

    .cover-logo-container {{
      margin: 30px auto;
      text-align: center;
    }}

    .cover-logo {{
      width: 150px;
      height: auto;
      display: inline-block;
    }}

    .cover-author {{
      font-size: 12pt;
      line-height: 1.4;
      margin-bottom: 30px;
    }}

    .cover-footer {{
      font-size: 12pt;
      font-weight: bold;
      line-height: 1.35;
      text-transform: uppercase;
      margin-bottom: 15px;
    }}

    /* Prototype Media Page Styling */
    .prototype-page-container {{
      text-align: center;
      margin-bottom: 8pt;
      page-break-inside: avoid;
    }}

    .prototype-page-header {{
      font-weight: bold;
      font-size: 11.5pt;
      margin-bottom: 2pt;
      text-align: center;
      text-indent: 0;
    }}

    .prototype-img {{
      width: 68%;
      max-width: 430px;
      max-height: 220px;
      object-fit: contain;
      border: 1px solid #777777;
      display: block;
      margin: 0 auto;
    }}

    .prototype-desc {{
      font-size: 10pt;
      font-style: italic;
      margin-top: 2pt;
      margin-bottom: 6pt;
      text-indent: 0;
      text-align: center;
    }}

    .prompt-box {{
      background-color: #F8F9FA;
      border: 1px solid #000000;
      padding: 8px 12px;
      margin: 8pt 0;
      font-size: 10.5pt;
      line-height: 1.3;
      text-align: justify;
    }}

    .refleksi-p {{
      text-align: justify;
      text-justify: inter-word;
      text-indent: 1.25cm;
      margin-top: 0;
      margin-bottom: 5pt;
      line-height: 1.45;
    }}

    .biblio-p {{
      padding-left: 1.25cm;
      text-indent: -1.25cm;
      margin-bottom: 4pt;
      font-size: 10.5pt;
      line-height: 1.35;
    }}
  </style>
</head>
<body>

  <!-- ==================== HALAMAN 1: COVER ==================== -->
  <div class="cover-wrapper">
    <div class="cover-top">
      <div class="cover-main-title">
        REDESAIN MEDIA DIGITAL PEMBELAJARAN UNTUK ANAK USIA DINI
      </div>
      <div class="cover-sub-title">
        Disusun Untuk Memenuhi Tugas Ujian Tengah Semester<br>
        Mata Kuliah IT untuk AUD
      </div>

      <div class="cover-lecturer">
        <strong>Dosen Pengampu:</strong><br>
        Rifqi Syamsul Fuadi, S.T., M.Kom.
      </div>
    </div>

    <div class="cover-logo-container">
      <img src="{uin_logo}" class="cover-logo" alt="Logo UIN Sunan Gunung Djati Bandung">
    </div>

    <div class="cover-bottom">
      <div class="cover-author">
        Disusun Oleh:<br>
        Liana Nurfatimah &nbsp;&nbsp;&nbsp;&nbsp; (1242100062)
      </div>

      <div class="cover-footer">
        JURUSAN PENDIDIKAN ISLAM ANAK USIA DINI<br>
        FAKULTAS TARBIYAH DAN KEGURUAN<br>
        UNIVERSITAS ISLAM NEGERI SUNAN GUNUNG DJATI BANDUNG<br>
        TAHUN<br>
        2026
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== HALAMAN 2: SECTION 1 ==================== -->
  <h1 class="section-title">1. Analisis Masalah Media Digital</h1>
  <p>
    Media yang dianalisis adalah video pembelajaran bertema “Hewan di Sekitar Kita” yang ditunjukkan untuk anak usia 5 – 6 tahun. Berdasarkan kasus dalam instruksi UTS, video berdurasi 3 menit dan menggunakan gambar dari internet, musik populer komersial, serta foto anak yang berasal dari grup WhatsApp kelas tanpa bukti persetujuan orang tua. Selain itu, teks yang ditampilkan berukuran kecil, pergantian gambarnya berlangsung cepat, dan media belum dilengkapi keterangan sumber maupun lisensi aset. Setelah anak-anak menonton video secara pasif, anak hanya diminta mengerjakan tugas lembar kerja (LKPD). Beberapa masalah tersebut perlu diperhatikan dan diperbaiki, karena media pembelajaran untuk anak usia dini seharusnya tidak hanya menarik secara visual sesaat, tetapi juga harus mendukung proses belajar yang bermakna, menjaga kenyamanan serta keselamatan anak, dan menaati etika pemanfaatan teknologi secara bertanggung jawab.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">No</th>
        <th style="width: 17%;">Aspek</th>
        <th style="width: 26%;">Masalah yang Ditemukan</th>
        <th style="width: 25%;">Dampak</th>
        <th style="width: 27%;">Saran Perbaikan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td><strong>Pedagogis</strong></td>
        <td>Setelah menonton video pasif selama 3 menit, anak hanya diminta mengerjakan lembar kerja tanpa kegiatan interaktif yang memadai.</td>
        <td>Anak tidak mendapatkan kesempatan untuk bertanya, mencoba, menirukan, dan menyampaikan pendapat secara aktif.</td>
        <td>Guru menambahkan pertanyaan sederhana, permainan mencocokkan gambar, kegiatan menirukan suara hewan, dan aktivitas gerak fisik.</td>
      </tr>
      <tr>
        <td class="center">2</td>
        <td><strong>Perkembangan AUD</strong></td>
        <td>Ukuran teks terlalu kecil, suku kata tidak dipisah, dan pergantian informasi berlangsung terlalu cepat.</td>
        <td>Anak usia 5–6 tahun kesulitan mengenali huruf/kata serta mengalami kelelahan mental (cognitive overload).</td>
        <td>Menggunakan kalimat pendek, huruf font ramah anak berukuran besar, suku kata bervokal ('Ga - jah', 'Ke - lin - ci'), serta kontrol tempo mandiri.</td>
      </tr>
      <tr>
        <td class="center">3</td>
        <td><strong>Multimedia</strong></td>
        <td>Gambar berganti cepat dengan musik populer bervolume keras yang menenggelamkan artikulasi narasi.</td>
        <td>Perhatian anak teralihkan dari substansi materi utama kepada kebisingan audio dan animasi yang berlebihan.</td>
        <td>Gunakan ilustrasi SVG orisinal ramah anak, matikan musik latar (BGM) secara bawaan (default off), dan gunakan narasi suara ramah guru.</td>
      </tr>
      <tr>
        <td class="center">4</td>
        <td><strong>Keamanan Digital</strong></td>
        <td>Video menampilkan iklan pihak ketiga dan tautan keluar yang berisiko mengganggu kegiatan belajar.</td>
        <td>Anak mudah terdistraksi atau terpapar konten komersial yang tidak sesuai dengan kebutuhan perkembangan AUD.</td>
        <td>Rancang aplikasi web edukasi mandiri yang 100% bebas iklan, tanpa pelacak daring, serta bebas dari tautan luar berisiko.</td>
      </tr>
      <tr>
        <td class="center">5</td>
        <td><strong>Privasi Anak</strong></td>
        <td>Foto wajah anak diambil langsung dari grup WhatsApp kelas tanpa keterangan izin tertulis (informed consent).</td>
        <td>Identitas dan data privasi anak berpotensi tersebar luas di ranah digital publik serta melanggar hak privasi anak.</td>
        <td>Menghapus seluruh foto identitas anak dan menggantinya dengan karakter ilustrasi hewan ramah anak buatan tim pengembang.</td>
      </tr>
      <tr>
        <td class="center">6</td>
        <td><strong>Hak Cipta dan Etika</strong></td>
        <td>Gambar internet dan musik populer komersial digunakan bebas tanpa verifikasi lisensi dan atribusi.</td>
        <td>Melanggar ketentuan UU Hak Cipta No. 28 Tahun 2014 dan hak moral pencipta karya tidak dihargai semestinya.</td>
        <td>Menggunakan aset orisinal sendiri, aset domain publik (CC0), atau lisensi Creative Commons dengan audit TASL yang tertib.</td>
      </tr>
      <tr>
        <td class="center">7</td>
        <td><strong>Aksesibilitas</strong></td>
        <td>Teks berukuran kecil, kontras warna rendah, dan tidak tersedia pembacaan suara bagi anak pra-membaca.</td>
        <td>Sebagian anak tertinggal dalam memahami materi pembelajaran karena keterbatasan kemampuan membaca mandiri.</td>
        <td>Menyediakan tombol pembacaan suara narasi guru ('Dengarkan Guru Membaca'), kontras warna tinggi (WCAG AAA), dan tombol navigasi sentuh besar.</td>
      </tr>
    </tbody>
  </table>

  <p>
    Berdasarkan analisis tersebut, media perlu dirancang ulang secara komprehensif agar penyampaian materi lebih sesuai dengan karakteristik anak usia dini. Perbaikan ini mencakup keterlibatan aktif seluruh modalitas belajar anak (visual, auditori, kinestetik), perlindungan privasi anak, keamanan digital bebas distraksi komersial, serta penggunaan aset digital secara legal dan bertanggung jawab.
  </p>

  <!-- ==================== SECTION 2 ==================== -->
  <h1 class="section-title">2. Rancangan Redesain Pembelajaran</h1>
  <p>
    Rancangan redesain dilakukan dengan memperbaiki beberapa bagian fundamental dari media awal. Media yang awalnya berbentuk video satu arah yang pasif diubah menjadi prototipe aplikasi pembelajaran interaktif berbasis web responsif berjudul “Safari Hewan: Media Pembelajaran Interaktif Hewan untuk Anak Usia Dini (5–6 Tahun)”. Perubahan ini bertujuan agar materi dapat ditampilkan secara bertahap, memberikan otonomi eksplorasi kepada anak, serta dapat digunakan bersama guru melalui aktivitas belajar multisensori yang menyenangkan.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">No</th>
        <th style="width: 20%;">Aspek yang Diredesain</th>
        <th style="width: 23%;">Kondisi Media Awal</th>
        <th style="width: 27%;">Rencana Perubahan</th>
        <th style="width: 25%;">Alasan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td><strong>Format Media</strong></td>
        <td>Media berbentuk video pasif dengan durasi 3 menit yang berjalan searah.</td>
        <td>Mengembangkan aplikasi web interaktif multisensori yang membagi pembelajaran ke dalam 6 adegan terstruktur.</td>
        <td>Anak dapat mengeksplorasi materi dengan tempo belajar mandiri tanpa terburu-buru oleh durasi waktu video.</td>
      </tr>
      <tr>
        <td class="center">2</td>
        <td><strong>Media dan Teks</strong></td>
        <td>Teks berukuran kecil, kalimat panjang, dan tidak ada pemenggalan suku kata.</td>
        <td>Menampilkan suku kata bervokalisasi besar ('Ga - jah', 'Ke - lin - ci', 'Be - bek', 'Bu - rung') dan tombol audio baca.</td>
        <td>Membantu kesiapan keaksaraan awal (literasi fonik) anak usia 5–6 tahun sesuai tahap perkembangannya.</td>
      </tr>
      <tr>
        <td class="center">3</td>
        <td><strong>Tampilan Visual</strong></td>
        <td>Menggunakan gambar internet acak dengan gaya visual tidak seragam dan padat dekorasi.</td>
        <td>Menggunakan ilustrasi vektor orisinal (SVG) ramah anak dengan fitur 'Ayo Amati' bergaris tepi (border) oranye menyala saat disentuh.</td>
        <td>Tampilan menjadi konsisten, bersih, serta membantu mengarahkan atensi visual anak langsung pada organ tubuh hewan yang sedang dibahas.</td>
      </tr>
      <tr>
        <td class="center">4</td>
        <td><strong>Audio</strong></td>
        <td>Menggunakan musik populer komersial yang berisik dan izin penggunaannya belum jelas.</td>
        <td>Musik latar dinonaktifkan secara bawaan (default OFF), narasi suara ramah guru (Edge Neural Voice), dan suara hewan asli terverifikasi.</td>
        <td>Menghindari polusi suara di kelas, memberikan ketenangan belajar, serta melatih kepekaan pendengaran anak secara akurat.</td>
      </tr>
      <tr>
        <td class="center">5</td>
        <td><strong>Interaktivitas</strong></td>
        <td>Anak hanya menonton video secara pasif, kemudian diminta mengerjakan tugas kertas LKPD.</td>
        <td>Menambahkan fitur eksplorasi sentuh anatomi, tebak kuis audio, aktivitas fisik menirukan gerak hewan, dan kartu mencocokkan ciri.</td>
        <td>Anak memiliki kesempatan untuk aktif berbicara, bergerak, mendengarkan, dan mengekspresikan diri secara gembira.</td>
      </tr>
      <tr>
        <td class="center">6</td>
        <td><strong>Privasi dan Keamanan</strong></td>
        <td>Menggunakan foto anak dari grup WhatsApp kelas dan video menampilkan iklan komersial.</td>
        <td>Menghilangkan seluruh foto identitas anak, 100% bebas iklan, tanpa login/pengumpulan data (zero data collection).</td>
        <td>Menjaga privasi dan keselamatan digital anak usia dini sesuai regulasi perlindungan anak.</td>
      </tr>
      <tr>
        <td class="center">7</td>
        <td><strong>Alur dan Kenyamanan Tampilan</strong></td>
        <td>Pergantian slide berlangsung sangat cepat sehingga membuat anak kehilangan fokus.</td>
        <td>Menyusun adegan dengan urutan logis, tombol navigasi besar, progress bar interaktif, dan panduan dialog untuk guru.</td>
        <td>Guru dan anak memegang kendali penuh atas jalannya pembelajaran sehingga proses belajar berjalan nyaman.</td>
      </tr>
    </tbody>
  </table>

  <p>
    Meskipun dikembangkan dalam bentuk aplikasi digital interaktif modern, Safari Hewan dirancang agar tidak mengurung anak di depan layar gadget (screen time berlebihan). Guru dapat memadukan media web ini dengan kegiatan pembelajaran langsung di kelas, seperti menirukan gerakan belalai gajah secara bersama-sama, melompat riang meniru kelinci, berdiskusi mengenai cara merawat hewan piaraan, serta mencetak kartu aktivitas fisik tanpa layar (non-screen printable cards). Dengan demikian, teknologi berfungsi sebagai stimulan pedagogis yang sehat, bukan sebagai pengganti interaksi sosial dan aktivitas gerak nyata anak.
  </p>

  <!-- ==================== SECTION 3 ==================== -->
  <h1 class="section-title">3. Storyboard Redesain</h1>
  <p>
    Storyboard disusun untuk menggambarkan urutan alur media interaktif dengan tema “Safari Hewan: Hewan di Sekitar Kita”. Media ini terdiri atas tujuh panel utama, mulai dari penyambutan di gerbang safari hingga panggung perayaan dan penanaman sikap menyayangi makhluk hidup. Setiap bagian dirancang agar anak dapat mengamati gambar secara mendalam, mendengarkan narasi ramah, merespons pertanyaan pemantik, dan beraktivitas motorik bersama guru.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">No</th>
        <th style="width: 14%;">Panel</th>
        <th style="width: 22%;">Visual atau Isi</th>
        <th style="width: 24%;">Teks atau Narasi</th>
        <th style="width: 20%;">Interaksi Anak</th>
        <th style="width: 15%;">Tujuan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td><strong>Pembuka (Gerbang Safari)</strong></td>
        <td>Pintu gerbang safari ceria berlatar kanopi daun rimba, kartu 4 sahabat hewan (Gajah, Kelinci, Bebek, Burung).</td>
        <td>“Halo sahabat kecil! Selamat datang di Safari Hewan. Hewan apa yang paling ingin kamu temui hari ini?”</td>
        <td>Anak menyentuh salah satu kartu sahabat hewan untuk menentukan hewan yang ingin dipelajari pertama kali.</td>
        <td>Membangun rasa ingin tahu, suasana menyenangkan, dan memberikan pilihan awal kepada anak.</td>
      </tr>
      <tr>
        <td class="center">2</td>
        <td><strong>Mengenal Gajah</strong></td>
        <td>Ilustrasi Gajah ramah, suku kata 'Ga - jah', tombol 'Tunjuk Belalai Panjang' dan 'Tunjuk Telinga Lebar'.</td>
        <td>“Gajah memiliki belalai yang panjang dan telinga yang sangat lebar. Suara terompetnya sangat keras!”</td>
        <td>Anak menekan tombol observasi (bagian tubuh bergaris tepi oranye menyala) dan mendengar suara asli terompet gajah.</td>
        <td>Mengenalkan ciri fisik gajah, melatih observasi detail, dan pengenalan fonem keaksaraan.</td>
      </tr>
      <tr>
        <td class="center">3</td>
        <td><strong>Mengenal Kelinci</strong></td>
        <td>Ilustrasi Kelinci lucu membawa wortel, suku kata 'Ke - lin - ci', tombol 'Tunjuk Telinga Panjang' & 'Tunjuk Kaki Melompat'.</td>
        <td>“Kelinci memiliki telinga panjang yang tegak dan kaki belakang yang kuat untuk melompat!”</td>
        <td>Anak menyentuh tombol kaki kelinci (garis tepi menyala) dan mendengarkan efek suara ritmik lompatan kelinci.</td>
        <td>Mengenalkan organ gerak kelinci dan memicu imajinasi gerakan hewan melalui audio visual.</td>
      </tr>
      <tr>
        <td class="center">4</td>
        <td><strong>Mengenal Bebek & Burung</strong></td>
        <td>Ilustrasi Bebek ('Be - bek') dan Burung ('Bu - rung'), tombol paruh sudu, selaput renang, dan sayap terbang.</td>
        <td>“Bebek pandai berenang dengan selaput kakinya, sedangkan burung terbang riang di angkasa dengan sayapnya!”</td>
        <td>Anak menyentuh bagian sayap burung atau paruh bebek, mendengarkan suara kwek bebek dan kicauan burung.</td>
        <td>Memperkaya kosakata ciri adaptasi fauna air dan udara secara konkret.</td>
      </tr>
      <tr>
        <td class="center">5</td>
        <td><strong>Bermain Tebak Suara</strong></td>
        <td>Papan teka-teki suara misteri dengan tiga kartu pilihan hewan dan tombol pemutar audio.</td>
        <td>“Ayo dengarkan suaranya! Suara hewan siapakah ini? Coba tebak dengan menyentuh gambarnya!”</td>
        <td>Anak mendengarkan rekaman suara hewan alami, mendiskusikan bersama teman, lalu memilih gambar yang tepat.</td>
        <td>Melatih kepekaan persepsi auditori, daya konsentrasi, dan penalaran asosiasi suara-gambar.</td>
      </tr>
      <tr>
        <td class="center">6</td>
        <td><strong>Aktivitas Motorik & Pasangkan</strong></td>
        <td>Panduan gerakan fisik hewan dan permainan memasangkan ciri khas hewan secara interaktif.</td>
        <td>“Ayo berdiri bersama teman! Ayunkan tangan seperti belalai gajah dan melompatlah riang seperti kelinci!”</td>
        <td>Anak berdiri di kelas menirukan gerakan hewan bersama guru, lalu mencocokkan kartu ciri hewan di layar.</td>
        <td>Mengembangkan keterampilan motorik kasar, koordinasi fisik, dan pemahaman kognitif.</td>
      </tr>
      <tr>
        <td class="center">7</td>
        <td><strong>Panggung Safari & Penutup</strong></td>
        <td>Panggung safari meriah dengan 4 sahabat hewan, kartu stiker prestasi, tombol unduh kartu aktivitas cetak.</td>
        <td>“Alhamdulillah! Petualangan safari hari ini hebat sekali. Mari kita selalu menyayangi hewan ciptaan Allah!”</td>
        <td>Anak menyentuh stiker apresiasi, menyebutkan cara menyayangi hewan, dan mengambil kartu kegiatan non-screen.</td>
        <td>Menanamkan nilai moral empati pada makhluk hidup dan transisi sehat menuju kegiatan fisik tanpa layar.</td>
      </tr>
    </tbody>
  </table>

  <p>
    Pada saat guru mengimplementasikan media ini di kelas, guru memegang kendali untuk memberikan waktu yang cukup bagi setiap anak dalam mengamati gambar dan merespons pertanyaan. Anak tidak dituntut untuk menjawab serentak atau tergesa-gesa. Guru dapat menyesuaikan kedalaman dialog dengan tingkat kemampuan dan minat masing-masing anak di ruang belajar.
  </p>

  <!-- ==================== SECTION 4 ==================== -->
  <h1 class="section-title">4. Audit Aset Digital</h1>
  <p>
    Audit aset digital dilakukan untuk mengidentifikasi sumber, pembuat, tautan asal, ketentuan lisensi atau izin penggunaan, serta pencantuman atribusi legal dari seluruh aset visual maupun audio dalam website interaktif Safari Hewan. Pemeriksaan komprehensif ini mengacu pada kaidah standar TASL (Title, Author, Source, License), etika digital PIAUD, dan kepatuhan terhadap UU Hak Cipta No. 28 Tahun 2014 guna memastikan bahwa seluruh materi aman, orisinal, dan layak digunakan dalam pembelajaran anak usia dini.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Aset/halaman</th>
        <th style="width: 18%;">Pembuat/sumber</th>
        <th style="width: 25%;">Tautan sumber</th>
        <th style="width: 17%;">Lisensi</th>
        <th style="width: 22%;">Cara atribusi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Ilustrasi Gajah, Kelinci, Bebek, Burung</strong><br>(Halaman 1, 2, 5, 6)</td>
        <td>Azis Panji & Liana Nurfatimah</td>
        <td><a href="https://github.com/azispanji24/safari_Hewan/tree/main/src/assets/illustrations">Tautan Berkas SVG Orisinal Tim Pengembang</a></td>
        <td>CC BY-SA 4.0 (Karya Orisinal Tim Pengembang)</td>
        <td>Ilustrasi vektor orisinal dibuat manual dalam format SVG oleh tim pengembang Safari Hewan.</td>
      </tr>
      <tr>
        <td><strong>Suara Terompet Gajah</strong><br>(Halaman 2, 3)</td>
        <td>Wikimedia Commons / Rekaman Alami Gajah Asia (<em>Elephas maximus</em>)</td>
        <td><a href="https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg">File:Elephant voice - trumpeting.ogg</a></td>
        <td>CC0 1.0 Universal (Public Domain Dedication)</td>
        <td>“Elephant voice - trumpeting” bersumber dari Wikimedia Commons, berstatus domain publik (CC0).</td>
      </tr>
      <tr>
        <td><strong>Suara Lompatan Kelinci</strong><br>(Halaman 2, 3)</td>
        <td>Tim Pengembang Safari Hewan</td>
        <td><a href="https://github.com/azispanji24/safari_Hewan/blob/main/public/audio/kelinci-hop.mp3">Berkas Audio Hop Orisinal Proyek</a></td>
        <td>CC0 1.0 Universal (Karya Orisinal Tim Pengembang)</td>
        <td>Efek suara lompatan dirancang khusus secara akustik oleh tim pengembang Safari Hewan (CC0).</td>
      </tr>
      <tr>
        <td><strong>Suara Bebek (Kwek-kwek)</strong><br>(Halaman 2, 3)</td>
        <td>SoundBible / Mike Koenig</td>
        <td><a href="https://soundbible.com/1004-Mallard-Duck-Quack.html">SoundBible: Mallard Duck Quack</a></td>
        <td>Creative Commons Attribution 3.0 (CC BY 3.0)</td>
        <td>“Mallard Duck Quack” direkam oleh Mike Koenig di bawah lisensi resmi CC BY 3.0.</td>
      </tr>
      <tr>
        <td><strong>Suara Kicauan Burung</strong><br>(Halaman 2, 3)</td>
        <td>Freesound / InspectorJ</td>
        <td><a href="https://freesound.org/people/InspectorJ/sounds/416529/">Freesound: Bird Whistling, Single, A.wav</a></td>
        <td>Creative Commons Attribution 4.0 (CC BY 4.0)</td>
        <td>“Bird Whistling, Single, A.wav” oleh InspectorJ (www.jshaw.co.uk) di bawah lisensi CC BY 4.0.</td>
      </tr>
      <tr>
        <td><strong>Musik Latar Safari (Carefree)</strong><br>(Header Kontrol Audio)</td>
        <td>Kevin MacLeod (incompetech.com)</td>
        <td><a href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037">Incompetech: Carefree</a></td>
        <td>Creative Commons: By Attribution 3.0 (CC BY 3.0)</td>
        <td>“Carefree” Kevin MacLeod (incompetech.com), Lisensi Creative Commons: By Attribution 3.0.</td>
      </tr>
      <tr>
        <td><strong>Audio Narasi Suara Guru</strong><br>(Seluruh Adegan)</td>
        <td>Microsoft Edge Neural Voice (id-ID-GadisNeural)</td>
        <td><a href="https://azure.microsoft.com/en-us/products/cognitive-services/text-to-speech/">Microsoft Cognitive Speech Synthesizer API</a></td>
        <td>Microsoft Azure Speech Terms (Non-Commercial Educational Use)</td>
        <td>Narasi dibangkitkan menggunakan model suara neural ramah guru id-ID-GadisNeural untuk tujuan pendidikan.</td>
      </tr>
      <tr>
        <td><strong>Tipografi Fredoka & Quicksand</strong><br>(Tampilan Teks)</td>
        <td>Milena Brandao & Andrew Paglinawan (Google Fonts)</td>
        <td><a href="https://fonts.google.com/specimen/Fredoka">Google Fonts Fredoka</a></td>
        <td>SIL Open Font License, Version 1.1 (OFL 1.1)</td>
        <td>Font berlisensi terbuka SIL OFL 1.1 bebas digunakan untuk aplikasi edukasi digital.</td>
      </tr>
      <tr>
        <td><strong>Ikon Navigasi UI</strong><br>(Header & Tombol)</td>
        <td>Kontributor Proyek Lucide Icons</td>
        <td><a href="https://lucide.dev/">Lucide Open Source Icons</a></td>
        <td>ISC License (Kompatibel Open Source MIT)</td>
        <td>Ikon UI antarmuka bersumber dari pustaka open-source Lucide Icons di bawah lisensi ISC.</td>
      </tr>
    </tbody>
  </table>

  <p>
    Dalam proses perancangan website interaktif Safari Hewan, teknologi berbantuan komputasi dan kecerdasan artifisial (AI) digunakan sebagai sarana perumusan gagasan tata letak dan struktur antarmuka responsif. Seluruh prompt dirancang dengan mempertimbangkan prinsip perlindungan anak usia dini:
  </p>

  <div class="prompt-box">
    <strong>Prompt Perancangan yang Digunakan:</strong><br>
    <em>“Rancang media digital pembelajaran interaktif untuk anak usia dini (5–6 tahun) bertema 'Safari Hewan: Hewan di Sekitar Kita' dengan pendekatan multisensori yang ramah anak. Terapkan prinsip: 1) Bebas iklan komersial dan tidak mengumpulkan data pribadi anak (zero data collection); 2) Matikan musik latar (BGM) secara otomatis saat aplikasi dibuka (default mute) agar guru memegang kendali suasana kelas; 3) Gunakan ilustrasi vektor SVG orisinal tanpa dekorasi berlebihan dengan fitur 'Ayo Amati' yang memancarkan garis tepi (border) oranye menyala saat disentuh; 4) Sajikan teks suku kata berukuran besar ('Ga - jah', 'Ke - lin - ci') disertai audio pembacaan narasi suara guru; 5) Sediakan aktivitas fisik menirukan gerak hewan dan lembar kartu aktivitas tanpa layar (non-screen printable cards).”</em>
  </div>

  <p>
    Seluruh aset visual tidak menggunakan foto identitas anak dari ruang publik guna menghormati prinsip perlindungan privasi anak (UNICEF, 2025). Musik latar komersial yang awalnya berisik dan tidak berizin digantikan dengan musik resmi Incompetech (CC BY 3.0) yang diatur dalam kondisi nonaktif secara bawaan. Rekaman audio terompet gajah yang awalnya berupa nada sintetis buatan digantikan dengan rekaman suara asli Gajah Asia (<em>Elephas maximus</em>) dari repositori Wikimedia Commons berstatus domain publik (CC0), sehingga anak-anak mendapatkan stimulasi suara hewan yang autentik dan nyata.
  </p>

  <div class="page-break"></div>

  <!-- ==================== SECTION 5 ==================== -->
  <h1 class="section-title">5. Prototype Media (Safari Hewan: Web App Interaktif)</h1>
  <p>
    Prototipe media pembelajaran digital “Safari Hewan: Media Pembelajaran Interaktif Hewan untuk Anak Usia Dini (5–6 Tahun)” telah selesai dirancang, dikembangkan, dan diuji secara komprehensif. Dosen pengampu, guru PAUD, serta pemerhati pendidikan anak dapat langsung mengakses, mencoba, dan menguji seluruh fungsi interaktif media melalui tautan resmi berikut:
  </p>

  <p class="no-indent" style="text-align: center; margin: 8pt 0;">
    <strong>Tautan Website Prototype:</strong><br>
    <a href="https://azispanji24.github.io/safari_Hewan/" style="font-size: 12pt; font-weight: bold;">https://azispanji24.github.io/safari_Hewan/</a><br><br>
    <strong>Tautan Repositori Sumber Kode (GitHub):</strong><br>
    <a href="https://github.com/azispanji24/safari_Hewan" style="font-size: 11pt;">https://github.com/azispanji24/safari_Hewan</a>
  </p>

  <p>
    Prototipe Safari Hewan memiliki sejumlah karakteristik pedagogis dan teknis unggulan yang membedakannya secara signifikan dari media video konvensional, antara lain:
  </p>

  <p>
    <strong>1. Arsitektur Web Interaktif Responsif:</strong> Dibangun menggunakan standar web modern (Single Page Application berbasis React, TypeScript, dan Tailwind CSS) yang ringan, dapat diakses langsung tanpa proses instalasi aplikasi rumit, dan responsif secara sempurna di berbagai perangkat (komputer meja, laptop ruang kelas, proyektor, tablet sentuh, maupun smartphone guru).
  </p>

  <p>
    <strong>2. Keamanan Digital dan Privasi Mutlak (Zero-Data Collection):</strong> Aplikasi 100% bebas dari segala bentuk iklan pihak ketiga, bebas tautan eksternal yang membahayakan anak, tidak meminta formulir login atau nama anak, serta tidak merekam maupun mengumpulkan data pribadi peserta didik sesuai prinsip perlindungan etika digital anak (UNICEF, 2025).
  </p>

  <p>
    <strong>3. Kontrol Audio Bertanggung Jawab:</strong> Autoplay musik latar dinonaktifkan secara otomatis (default OFF) saat situs web pertama kali dimuat. Musik safari hanya berbunyi jika guru atau pengguna secara sadar menekan tombol kontrol musik di bilah atas. Narasi suara guru yang ramah dan efek suara hewan alami terverifikasi dapat didengarkan kapan saja melalui tombol audio sentuh tanpa perulangan yang mengganggu.
  </p>

  <p>
    <strong>4. Fitur Eksplorasi Anatomi 'Ayo Amati' Bergaris Tepi Menyala:</strong> Pada setiap sesi pengenalan hewan, anak disajikan tombol pengamatan organ tubuh spesifik (misalnya 'Tunjuk Belalai Panjang' pada gajah, 'Tunjuk Kaki Melompat' pada kelinci, 'Tunjuk Sayap Terbang' pada burung). Saat disentuh, bagian tubuh tersebut langsung dilingkari garis tepi oranye menyala (#E27D18 dengan efek filter glowing), membantu pemfokusan visual anak usia dini secara sangat terarah.
  </p>

  <p>
    <strong>5. Integrasi Pembelajaran Non-Screen (Tanpa Layar):</strong> Pada panel penutup, tersedia tombol panduan bagi guru dan fitur lembar kartu aktivitas fisik yang dapat dicetak (printable activity cards), menjembatani pengalaman belajar digital menuju eksplorasi dunia nyata di lingkungan sekolah dan rumah.
  </p>

  <div class="page-break"></div>

  <!-- ==================== TAMPILAN PROTOTYPE: HALAMAN 1 & 2 ==================== -->
  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 1</div>
    <img src="{scene1_img}" class="prototype-img" alt="Halaman 1 Gerbang Safari">
    <div class="prototype-desc">Tampilan gerbang safari interaktif dengan 4 pilihan sahabat hewan dan tombol narasi suara ramah guru.</div>
  </div>

  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 2</div>
    <img src="{scene2_gajah_img}" class="prototype-img" alt="Halaman 2 Mengenal Gajah">
    <div class="prototype-desc">Pengenalan suku kata 'Ga - jah', fitur pengamatan dengan garis batas oranye menyala pada belalai, dan tombol suara terompet gajah asli.</div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== TAMPILAN PROTOTYPE: HALAMAN 3 & 4 ==================== -->
  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 3</div>
    <img src="{scene2_kelinci_img}" class="prototype-img" alt="Halaman 3 Mengenal Kelinci">
    <div class="prototype-desc">Pengejaan suku kata 'Ke - lin - ci', tombol pengamatan kaki melompat bergaris tepi menyala, dan pemutar audio lompatan kelinci.</div>
  </div>

  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 4</div>
    <img src="{scene3_img}" class="prototype-img" alt="Halaman 4 Tebak Suara Hewan">
    <div class="prototype-desc">Permainan teka-teki auditori interaktif di mana anak mendengarkan suara hewan alami dan menebak gambar hewan yang sesuai.</div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== TAMPILAN PROTOTYPE: HALAMAN 5 & 6 ==================== -->
  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 5</div>
    <img src="{scene4_img}" class="prototype-img" alt="Halaman 5 Menirukan Gerak">
    <div class="prototype-desc">Ajakan gerak fisik aktif bagi anak dan guru di dalam kelas untuk menirukan gerakan belalai gajah, lompatan kelinci, dan kepakan sayap burung.</div>
  </div>

  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 6</div>
    <img src="{scene5_img}" class="prototype-img" alt="Halaman 6 Pasangkan Ciri Hewan">
    <div class="prototype-desc">Permainan mencocokkan kartu ciri khas fisik, tempat hidup, dan makanan kesukaan sahabat hewan dengan umpan balik visual ramah anak.</div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== TAMPILAN PROTOTYPE: HALAMAN 7 & SECTION 6 ==================== -->
  <div class="prototype-page-container">
    <div class="prototype-page-header">Halaman 7</div>
    <img src="{scene6_img}" class="prototype-img" alt="Halaman 7 Panggung Safari dan Refleksi">
    <div class="prototype-desc">Panggung perayaan hasil petualangan safari, perolehan stiker prestasi, dialog kasih sayang terhadap makhluk ciptaan Allah, dan akses kartu fisik.</div>
  </div>

  <p>
    Selain disajikan dalam bentuk website interaktif berbasis web, seluruh rangkaian media pembelajaran ini juga dilengkapi dengan audio narasi berupa penjelasan lisan yang sederhana dan menarik. Penambahan suara narasi guru bertujuan membantu anak-anak usia 5–6 tahun yang masih dalam tahap awal belajar membaca agar tetap dapat memahami instruksi dan menikmati setiap penjelasan materi. Narasi audio disusun sesuai dengan isi setiap adegan, mulai dari pengenalan hewan hingga kegiatan bermain dan penutup. Dengan adanya audio, anak tidak hanya mengamati gambar dan membaca suku kata, tetapi juga dapat mendengarkan artikulasi penjelasan materi secara nyaman.
  </p>

  <p class="no-indent" style="text-align: center; margin: 4pt 0 8pt 0;">
    <strong>Tautan website prototype dan audio narasi:</strong><br>
    <a href="https://azispanji24.github.io/safari_Hewan/">https://azispanji24.github.io/safari_Hewan/</a>
  </p>

  <!-- ==================== SECTION 6: REFLEKSI INDIVIDU ==================== -->
  <h1 class="section-title">6. Refleksi Individu</h1>
  <p class="refleksi-p">
    Redesain media pembelajaran “Hewan di Sekitar Kita: Safari Hewan” dilakukan untuk membuat pembelajaran lebih sesuai dengan kebutuhan anak usia 5–6 tahun. Media awal memiliki beberapa kekurangan, seperti penggunaan teks kecil, pergantian gambar yang cepat, penggunaan musik populer komersial yang belum jelas izinnya, serta pemakaian foto anak tanpa keterangan izin yang memadai. Oleh karena itu, media dirancang ulang menjadi web app interaktif dengan penyajian materi yang lebih bertahap dan terarah. Keputusan pertama dalam redesain ini adalah menggunakan format aplikasi interaktif yang membagi materi ke dalam 6 adegan terstruktur. Format tersebut memungkinkan guru mengatur tempo penyampaian materi dan memberi kesempatan leluasa kepada anak untuk mengamati gambar, mencoba tombol sentuh, serta mengeksplorasi ciri fisik hewan. Keputusan kedua adalah menggunakan kalimat pendek, suku kata bervokalisasi besar ('Ga - jah', 'Ke - lin - ci'), serta ilustrasi vektor ramah anak yang bersih agar anak lebih mudah mengikuti informasi tanpa beban kognitif berlebih. Keputusan ketiga adalah memperhatikan keamanan dan etika digital dengan tidak menggunakan foto identitas anak, menghindari iklan yang tidak diperlukan, serta mematikan musik latar secara bawaan (default mute) agar tidak menimbulkan polusi suara di ruang kelas.
  </p>

  <p class="refleksi-p">
    Dari segi pembelajaran, prototipe Safari Hewan ini tidak hanya digunakan untuk mengenalkan nama hewan secara hafalan semata. Anak juga diajak aktif menirukan suara asli hewan, mengeksplorasi organ tubuh spesifik dengan panduan garis tepi oranye menyala, menirukan gerakan fisik hewan di kelas bersama teman-teman, serta menjawab kuis tebak suara dan memasangkan kartu ciri. Kegiatan tersebut memberikan kesempatan holistik kepada anak untuk mengembangkan kemampuan bahasa, kepekaan auditori, koordinasi motorik kasar, serta kemampuan bersosialisasi dengan teman dan guru. Ajakan untuk menyayangi hewan ciptaan Allah pada adegan penutup juga menjadi sarana strategis dalam menanamkan nilai-nilai moral dan karakter peduli terhadap lingkungan hidup sejak usia dini. Meskipun demikian, prototipe ini masih perlu dievaluasi dan diuji coba secara langsung bersama anak-anak di lembaga PAUD guna memperoleh masukan mengenai kemudahan navigasi sentuh serta efektivitas dialog interaktif guru. Opsi kartu aktivitas non-screen yang dapat dicetak juga memastikan anak memiliki alternatif belajar fisik tanpa ketergantungan pada layar gadget, sehingga teknologi digital benar-benar hadir sebagai sarana penunjang tumbuh kembang anak secara sehat dan seimbang.
  </p>

  <!-- ==================== DAFTAR PUSTAKA ==================== -->
  <h1 class="section-title" style="margin-top: 10pt;">Daftar Pustaka</h1>
  <p class="biblio-p">
    Canva. (t.t.). <em>Canva’s content license agreement</em>. https://www.canva.com/policies/content-license-agreement/
  </p>
  <p class="biblio-p">
    Creative Commons. (2023). <em>Best practices for attribution: Marking third-party content</em>. https://creativecommons.org/use-remix/attribution/
  </p>
  <p class="biblio-p">
    MacLeod, K. (2014). <em>Carefree</em> [Song recorded by Kevin MacLeod]. Incompetech Royalty-Free Music. https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037
  </p>
  <p class="biblio-p">
    Mayer, R. E. (2021). <em>Multimedia learning</em> (3rd ed.). Cambridge University Press. https://doi.org/10.1017/9781316941355
  </p>
  <p class="biblio-p">
    Republik Indonesia. (2014). <em>Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta</em>. Lembaran Negara Republik Indonesia Tahun 2014 Nomor 266. https://peraturan.bpk.go.id/Details/38690/uu-no-28-tahun-2014
  </p>
  <p class="biblio-p">
    UNICEF Office of Strategy and Evidence Innocenti. (2025). <em>Guidance on AI and children: Version 3.0</em>. UNICEF. https://www.unicef.org/innocenti/reports/policy-guidance-ai-children
  </p>

</body>
</html>
"""

temp_html_path = os.path.abspath("scripts/temp_uts_liana.html")
with open(temp_html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated HTML template at: {temp_html_path}")

target_pdf_1 = os.path.abspath("UTS_IT-AUD_Liana_12470500.pdf")
target_pdf_2 = os.path.abspath("1242100062_Liana Nurfatimah_UTS IT_REDESAIN MEDIA.pdf")
target_pdf_3 = os.path.abspath("UTS_IT-AUD_Liana Nurfatimah_1242100062.pdf")

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={target_pdf_1}",
    temp_html_path
]

print("Rendering PDF via Microsoft Edge Headless...")
res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0 and os.path.exists(target_pdf_1):
    size_mb = os.path.getsize(target_pdf_1) / (1024 * 1024)
    print(f"Successfully generated: {target_pdf_1} ({size_mb:.2f} MB)")
    shutil.copyfile(target_pdf_1, target_pdf_2)
    print(f"Successfully created: {target_pdf_2}")
    shutil.copyfile(target_pdf_1, target_pdf_3)
    print(f"Successfully created: {target_pdf_3}")
else:
    print("Error rendering PDF:", res.stderr)
