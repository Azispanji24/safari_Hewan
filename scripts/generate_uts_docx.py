import os
import shutil
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>'))

def set_table_borders(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        f'<w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def set_cell_margins(cell, top=80, bottom=80, left=100, right=100):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def add_hyperlink(paragraph, url, text, color="0000EE", underline=True):
    part = paragraph.part
    r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)

    hyperlink = parse_xml(
        f'<w:hyperlink {nsdecls("w")} xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}"/>'
    )
    new_run = parse_xml(f'<w:r {nsdecls("w")}/>')
    rPr = parse_xml(f'<w:rPr {nsdecls("w")}/>')

    if color:
        c = parse_xml(f'<w:color {nsdecls("w")} w:val="{color}"/>')
        rPr.append(c)
    if underline:
        u = parse_xml(f'<w:u {nsdecls("w")} w:val="single"/>')
        rPr.append(u)

    new_run.append(rPr)
    new_run.text = text
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)

def create_uts_docx():
    doc = docx.Document()

    # Page setup - Letter, 1 inch margins
    sections = doc.sections
    for section in sections:
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Base style
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)

    # ==================== COVER PAGE ====================
    # Top title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.line_spacing = 1.3
    p_title.paragraph_format.space_before = Pt(10)
    p_title.paragraph_format.space_after = Pt(4)
    run_t1 = p_title.add_run("REDESAIN MEDIA DIGITAL PEMBELAJARAN UNTUK ANAK USIA DINI\n")
    run_t1.bold = True
    run_t1.font.size = Pt(12)

    run_t2 = p_title.add_run("Disusun Untuk Memenuhi Tugas Ujian Tengah Semester\nMata Kuliah IT untuk AUD")
    run_t2.font.size = Pt(12)

    # Lecturer
    p_lec = doc.add_paragraph()
    p_lec.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_lec.paragraph_format.line_spacing = 1.3
    p_lec.paragraph_format.space_before = Pt(20)
    p_lec.paragraph_format.space_after = Pt(25)
    run_l1 = p_lec.add_run("Dosen Pengampu:\n")
    run_l1.bold = True
    run_l2 = p_lec.add_run("Rifqi Syamsul Fuadi, S.T., M.Kom.")

    # Logo UIN SGD
    uin_logo_path = os.path.abspath("public/images/extracted_uin_logo_0.png")
    if os.path.exists(uin_logo_path):
        p_logo = doc.add_paragraph()
        p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_logo.paragraph_format.space_before = Pt(10)
        p_logo.paragraph_format.space_after = Pt(30)
        run_logo = p_logo.add_run()
        run_logo.add_picture(uin_logo_path, width=Inches(1.8))

    # Author
    p_auth = doc.add_paragraph()
    p_auth.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_auth.paragraph_format.line_spacing = 1.3
    p_auth.paragraph_format.space_before = Pt(20)
    p_auth.paragraph_format.space_after = Pt(40)
    p_auth.add_run("Disusun Oleh:\nLiana Nurfatimah    (1242100062)")

    # Footer
    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_foot.paragraph_format.line_spacing = 1.3
    p_foot.paragraph_format.space_before = Pt(15)
    p_foot.paragraph_format.space_after = Pt(0)
    run_f = p_foot.add_run(
        "JURUSAN PENDIDIKAN ISLAM ANAK USIA DINI\n"
        "FAKULTAS TARBIYAH DAN KEGURUAN\n"
        "UNIVERSITAS ISLAM NEGERI SUNAN GUNUNG DJATI BANDUNG\n"
        "TAHUN\n"
        "2026"
    )
    run_f.bold = True

    # Page break after cover
    doc.add_page_break()

    def add_sec_title(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title_text)
        run.bold = True
        run.font.size = Pt(12)
        return p

    def add_body_p(text, indent=True):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        if indent:
            p.paragraph_format.first_line_indent = Inches(0.5)
        p.add_run(text)
        return p

    # ==================== SECTION 1 ====================
    add_sec_title("1. Analisis Masalah Media Digital")
    add_body_p(
        "Media yang dianalisis adalah video pembelajaran bertema “Hewan di Sekitar Kita” yang ditunjukkan untuk anak usia 5 – 6 tahun. "
        "Berdasarkan kasus dalam instruksi UTS, video berdurasi 3 menit dan menggunakan gambar dari internet, musik populer komersial, "
        "serta foto anak yang berasal dari grup WhatsApp kelas tanpa bukti persetujuan orang tua. Selain itu, teks yang ditampilkan "
        "berukuran kecil, pergantian gambarnya berlangsung cepat, dan media belum dilengkapi keterangan sumber maupun lisensi aset. "
        "Setelah anak-anak menonton video secara pasif, anak hanya diminta mengerjakan tugas lembar kerja (LKPD). "
        "Beberapa masalah tersebut perlu diperhatikan dan diperbaiki, karena media pembelajaran untuk anak usia dini seharusnya "
        "tidak hanya menarik secara visual sesaat, tetapi juga harus mendukung proses belajar yang bermakna, menjaga kenyamanan "
        "serta keselamatan anak, dan menaati etika pemanfaatan teknologi secara bertanggung jawab."
    )

    t1_headers = ["No", "Aspek", "Masalah yang Ditemukan", "Dampak", "Saran Perbaikan"]
    t1_data = [
        ("1", "Pedagogis", "Setelah menonton video pasif selama 3 menit, anak hanya diminta mengerjakan lembar kerja tanpa kegiatan interaktif yang memadai.", "Anak tidak mendapatkan kesempatan untuk bertanya, mencoba, menirukan, dan menyampaikan pendapat secara aktif.", "Guru menambahkan pertanyaan sederhana, permainan mencocokkan gambar, kegiatan menirukan suara hewan, dan aktivitas gerak fisik."),
        ("2", "Perkembangan AUD", "Ukuran teks terlalu kecil, suku kata tidak dipisah, dan pergantian informasi berlangsung terlalu cepat.", "Anak usia 5–6 tahun kesulitan mengenali huruf/kata serta mengalami kelelahan mental (cognitive overload).", "Menggunakan kalimat pendek, huruf font ramah anak berukuran besar, suku kata bervokal ('Ga - jah', 'Ke - lin - ci'), serta kontrol tempo mandiri."),
        ("3", "Multimedia", "Gambar berganti cepat dengan musik populer bervolume keras yang menenggelamkan artikulasi narasi.", "Perhatian anak teralihkan dari substansi materi utama kepada kebisingan audio dan animasi yang berlebihan.", "Gunakan ilustrasi SVG orisinal ramah anak, matikan musik latar (BGM) secara bawaan (default off), dan gunakan narasi suara ramah guru."),
        ("4", "Keamanan Digital", "Video menampilkan iklan pihak ketiga dan tautan keluar yang berisiko mengganggu kegiatan belajar.", "Anak mudah terdistraksi atau terpapar konten komersial yang tidak sesuai dengan kebutuhan perkembangan AUD.", "Rancang aplikasi web edukasi mandiri yang 100% bebas iklan, tanpa pelacak daring, serta bebas dari tautan luar berisiko."),
        ("5", "Privasi Anak", "Foto wajah anak diambil langsung dari grup WhatsApp kelas tanpa keterangan izin tertulis (informed consent).", "Identitas dan data privasi anak berpotensi tersebar luas di ranah digital publik serta melanggar hak privasi anak.", "Menghapus seluruh foto identitas anak dan menggantinya dengan karakter ilustrasi hewan ramah anak buatan tim pengembang."),
        ("6", "Hak Cipta dan Etika", "Gambar internet dan musik populer komersial digunakan bebas tanpa verifikasi lisensi dan atribusi.", "Melanggar ketentuan UU Hak Cipta No. 28 Tahun 2014 dan hak moral pencipta karya tidak dihargai semestinya.", "Menggunakan aset orisinal sendiri, aset domain publik (CC0), atau lisensi Creative Commons dengan audit TASL yang tertib."),
        ("7", "Aksesibilitas", "Teks berukuran kecil, kontras warna rendah, dan tidak tersedia pembacaan suara bagi anak pra-membaca.", "Sebagian anak tertinggal dalam memahami materi pembelajaran karena keterbatasan kemampuan membaca mandiri.", "Menyediakan tombol pembacaan suara narasi guru ('Dengarkan Guru Membaca'), kontras warna tinggi (WCAG AAA), dan tombol navigasi sentuh besar.")
    ]

    table1 = doc.add_table(rows=len(t1_data) + 1, cols=5)
    table1.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table1)

    widths_t1 = [Inches(0.4), Inches(1.2), Inches(1.8), Inches(1.5), Inches(1.6)]
    for i, h_text in enumerate(t1_headers):
        cell = table1.cell(0, i)
        cell.width = widths_t1[i]
        set_cell_background(cell, "D9E1F2")
        set_cell_margins(cell)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(h_text)
        run.bold = True
        run.font.size = Pt(10.5)

    for row_idx, row_data in enumerate(t1_data):
        for col_idx, text in enumerate(row_data):
            cell = table1.cell(row_idx + 1, col_idx)
            cell.width = widths_t1[col_idx]
            set_cell_margins(cell)
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(2)
            if col_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(text)
            run.font.size = Pt(10)
            if col_idx == 1:
                run.bold = True

    add_body_p(
        "Berdasarkan analisis tersebut, media perlu dirancang ulang secara komprehensif agar penyampaian materi lebih sesuai "
        "dengan karakteristik anak usia dini. Perbaikan ini mencakup keterlibatan aktif seluruh modalitas belajar anak "
        "(visual, auditori, kinestetik), perlindungan privasi anak, keamanan digital bebas distraksi komersial, serta "
        "penggunaan aset digital secara legal dan bertanggung jawab."
    )

    # ==================== SECTION 2 ====================
    add_sec_title("2. Rancangan Redesain Pembelajaran")
    add_body_p(
        "Rancangan redesain dilakukan dengan memperbaiki beberapa bagian fundamental dari media awal. Media yang awalnya berbentuk "
        "video satu arah yang pasif diubah menjadi prototipe aplikasi pembelajaran interaktif berbasis web responsif berjudul "
        "“Safari Hewan: Media Pembelajaran Interaktif Hewan untuk Anak Usia Dini (5–6 Tahun)”. Perubahan ini bertujuan agar "
        "materi dapat ditampilkan secara bertahap, memberikan otonomi eksplorasi kepada anak, serta dapat digunakan bersama guru "
        "melalui aktivitas belajar multisensori yang menyenangkan."
    )

    t2_headers = ["No", "Aspek yang Diredesain", "Kondisi Media Awal", "Rencana Perubahan", "Alasan"]
    t2_data = [
        ("1", "Format Media", "Media berbentuk video pasif dengan durasi 3 menit yang berjalan searah.", "Mengembangkan aplikasi web interaktif multisensori yang membagi pembelajaran ke dalam 6 adegan terstruktur.", "Anak dapat mengeksplorasi materi dengan tempo belajar mandiri tanpa terburu-buru oleh durasi waktu video."),
        ("2", "Media dan Teks", "Teks berukuran kecil, kalimat panjang, dan tidak ada pemenggalan suku kata.", "Menampilkan suku kata bervokalisasi besar ('Ga - jah', 'Ke - lin - ci', 'Be - bek', 'Bu - rung') dan tombol audio baca.", "Membantu kesiapan keaksaraan awal (literasi fonik) anak usia 5–6 tahun sesuai tahap perkembangannya."),
        ("3", "Tampilan Visual", "Menggunakan gambar internet acak dengan gaya visual tidak seragam dan padat dekorasi.", "Menggunakan ilustrasi vektor orisinal (SVG) ramah anak dengan fitur 'Ayo Amati' bergaris tepi (border) oranye menyala saat disentuh.", "Tampilan menjadi konsisten, bersih, serta membantu mengarahkan atensi visual anak langsung pada organ tubuh hewan yang sedang dibahas."),
        ("4", "Audio", "Menggunakan musik populer komersial yang berisik dan izin penggunaannya belum jelas.", "Musik latar dinonaktifkan secara bawaan (default OFF), narasi suara ramah guru (Edge Neural Voice), dan suara hewan asli terverifikasi.", "Menghindari polusi suara di kelas, memberikan ketenangan belajar, serta melatih kepekaan pendengaran anak secara akurat."),
        ("5", "Interaktivitas", "Anak hanya menonton video secara pasif, kemudian diminta mengerjakan tugas kertas LKPD.", "Menambahkan fitur eksplorasi sentuh anatomi, tebak kuis audio, aktivitas fisik menirukan gerak hewan, dan kartu mencocokkan ciri.", "Anak memiliki kesempatan untuk aktif berbicara, bergerak, mendengarkan, dan mengekspresikan diri secara gembira."),
        ("6", "Privasi dan Keamanan", "Menggunakan foto anak dari grup WhatsApp kelas dan video menampilkan iklan komersial.", "Menghilangkan seluruh foto identitas anak, 100% bebas iklan, tanpa login/pengumpulan data (zero data collection).", "Menjaga privasi dan keselamatan digital anak usia dini sesuai regulasi perlindungan anak."),
        ("7", "Alur dan Kenyamanan Tampilan", "Pergantian slide berlangsung sangat cepat sehingga membuat anak kehilangan fokus.", "Menyusun adegan dengan urutan logis, tombol navigasi besar, progress bar interaktif, dan panduan dialog untuk guru.", "Guru dan anak memegang kendali penuh atas jalannya pembelajaran sehingga proses belajar berjalan nyaman.")
    ]

    table2 = doc.add_table(rows=len(t2_data) + 1, cols=5)
    table2.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table2)

    widths_t2 = [Inches(0.4), Inches(1.3), Inches(1.6), Inches(1.7), Inches(1.5)]
    for i, h_text in enumerate(t2_headers):
        cell = table2.cell(0, i)
        cell.width = widths_t2[i]
        set_cell_background(cell, "D9E1F2")
        set_cell_margins(cell)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(h_text)
        run.bold = True
        run.font.size = Pt(10.5)

    for row_idx, row_data in enumerate(t2_data):
        for col_idx, text in enumerate(row_data):
            cell = table2.cell(row_idx + 1, col_idx)
            cell.width = widths_t2[col_idx]
            set_cell_margins(cell)
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(2)
            if col_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(text)
            run.font.size = Pt(10)
            if col_idx == 1:
                run.bold = True

    add_body_p(
        "Meskipun dikembangkan dalam bentuk aplikasi digital interaktif modern, Safari Hewan dirancang agar tidak mengurung "
        "anak di depan layar gadget (screen time berlebihan). Guru dapat memadukan media web ini dengan kegiatan pembelajaran "
        "langsung di kelas, seperti menirukan gerakan belalai gajah secara bersama-sama, melompat riang meniru kelinci, berdiskusi "
        "mengenai cara merawat hewan piaraan, serta mencetak kartu aktivitas fisik tanpa layar (non-screen printable cards). "
        "Dengan demikian, teknologi berfungsi sebagai stimulan pedagogis yang sehat, bukan sebagai pengganti interaksi sosial "
        "dan aktivitas gerak nyata anak."
    )

    # ==================== SECTION 3 ====================
    add_sec_title("3. Storyboard Redesain")
    add_body_p(
        "Storyboard disusun untuk menggambarkan urutan alur media interaktif dengan tema “Safari Hewan: Hewan di Sekitar Kita”. "
        "Media ini terdiri atas tujuh panel utama, mulai dari penyambutan di gerbang safari hingga panggung perayaan dan penanaman "
        "sikap menyayangi makhluk hidup. Setiap bagian dirancang agar anak dapat mengamati gambar secara mendalam, mendengarkan "
        "narasi ramah, merespons pertanyaan pemantik, dan beraktivitas motorik bersama guru."
    )

    t3_headers = ["No", "Panel", "Visual atau Isi", "Teks atau Narasi", "Interaksi Anak", "Tujuan"]
    t3_data = [
        ("1", "Pembuka (Gerbang Safari)", "Pintu gerbang safari ceria berlatar kanopi daun rimba, kartu 4 sahabat hewan (Gajah, Kelinci, Bebek, Burung).", "“Halo sahabat kecil! Selamat datang di Safari Hewan. Hewan apa yang paling ingin kamu temui hari ini?”", "Anak menyentuh salah satu kartu sahabat hewan untuk menentukan hewan yang ingin dipelajari pertama kali.", "Membangun rasa ingin tahu, suasana menyenangkan, dan memberikan pilihan awal kepada anak."),
        ("2", "Mengenal Gajah", "Ilustrasi Gajah ramah, suku kata 'Ga - jah', tombol 'Tunjuk Belalai Panjang' dan 'Tunjuk Telinga Lebar'.", "“Gajah memiliki belalai yang panjang dan telinga yang sangat lebar. Suara terompetnya sangat keras!”", "Anak menekan tombol observasi (bagian tubuh bergaris tepi oranye menyala) dan mendengar suara asli terompet gajah.", "Mengenalkan ciri fisik gajah, melatih observasi detail, dan pengenalan fonem keaksaraan."),
        ("3", "Mengenal Kelinci", "Ilustrasi Kelinci lucu membawa wortel, suku kata 'Ke - lin - ci', tombol 'Tunjuk Telinga Panjang' & 'Tunjuk Kaki Melompat'.", "“Kelinci memiliki telinga panjang yang tegak dan kaki belakang yang kuat untuk melompat!”", "Anak menyentuh tombol kaki kelinci (garis tepi menyala) dan mendengarkan efek suara ritmik lompatan kelinci.", "Mengenalkan organ gerak kelinci dan memicu imajinasi gerakan hewan melalui audio visual."),
        ("4", "Mengenal Bebek & Burung", "Ilustrasi Bebek ('Be - bek') dan Burung ('Bu - rung'), tombol paruh sudu, selaput renang, dan sayap terbang.", "“Bebek pandai berenang dengan selaput kakinya, sedangkan burung terbang riang di angkasa dengan sayapnya!”", "Anak menyentuh bagian sayap burung atau paruh bebek, mendengarkan suara kwek bebek dan kicauan burung.", "Memperkaya kosakata ciri adaptasi fauna air dan udara secara konkret."),
        ("5", "Bermain Tebak Suara", "Papan teka-teki suara misteri dengan tiga kartu pilihan hewan dan tombol pemutar audio.", "“Ayo dengarkan suaranya! Suara hewan siapakah ini? Coba tebak dengan menyentuh gambarnya!”", "Anak mendengarkan rekaman suara hewan alami, mendiskusikan bersama teman, lalu memilih gambar yang tepat.", "Melatih kepekaan persepsi auditori, daya konsentrasi, dan penalaran asosiasi suara-gambar."),
        ("6", "Aktivitas Motorik & Pasangkan", "Panduan gerakan fisik hewan dan permainan memasangkan ciri khas hewan secara interaktif.", "“Ayo berdiri bersama teman! Ayunkan tangan seperti belalai gajah dan melompatlah riang seperti kelinci!”", "Anak berdiri di kelas menirukan gerakan hewan bersama guru, lalu mencocokkan kartu ciri hewan di layar.", "Mengembangkan keterampilan motorik kasar, koordinasi fisik, dan pemahaman kognitif."),
        ("7", "Panggung Safari & Penutup", "Panggung safari meriah dengan 4 sahabat hewan, kartu stiker prestasi, tombol unduh kartu aktivitas cetak.", "“Alhamdulillah! Petualangan safari hari ini hebat sekali. Mari kita selalu menyayangi hewan ciptaan Allah!”", "Anak menyentuh stiker apresiasi, menyebutkan cara menyayangi hewan, dan mengambil kartu kegiatan non-screen.", "Menanamkan nilai moral empati pada makhluk hidup dan transisi sehat menuju kegiatan fisik tanpa layar.")
    ]

    table3 = doc.add_table(rows=len(t3_data) + 1, cols=6)
    table3.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table3)

    widths_t3 = [Inches(0.4), Inches(1.1), Inches(1.4), Inches(1.4), Inches(1.2), Inches(1.0)]
    for i, h_text in enumerate(t3_headers):
        cell = table3.cell(0, i)
        cell.width = widths_t3[i]
        set_cell_background(cell, "D9E1F2")
        set_cell_margins(cell)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(h_text)
        run.bold = True
        run.font.size = Pt(10)

    for row_idx, row_data in enumerate(t3_data):
        for col_idx, text in enumerate(row_data):
            cell = table3.cell(row_idx + 1, col_idx)
            cell.width = widths_t3[col_idx]
            set_cell_margins(cell)
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(2)
            if col_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(text)
            run.font.size = Pt(9.5)
            if col_idx == 1:
                run.bold = True

    add_body_p(
        "Pada saat guru mengimplementasikan media ini di kelas, guru memegang kendali untuk memberikan waktu yang cukup bagi "
        "setiap anak dalam mengamati gambar dan merespons pertanyaan. Anak tidak dituntut untuk menjawab serentak atau tergesa-gesa. "
        "Guru dapat menyesuaikan kedalaman dialog dengan tingkat kemampuan dan minat masing-masing anak di ruang belajar."
    )

    # ==================== SECTION 4 ====================
    add_sec_title("4. Audit Aset Digital")
    add_body_p(
        "Audit aset digital dilakukan untuk mengidentifikasi sumber, pembuat, tautan asal, ketentuan lisensi atau izin penggunaan, "
        "serta pencantuman atribusi legal dari seluruh aset visual maupun audio dalam website interaktif Safari Hewan. "
        "Pemeriksaan komprehensif ini mengacu pada kaidah standar TASL (Title, Author, Source, License), etika digital PIAUD, "
        "dan kepatuhan terhadap UU Hak Cipta No. 28 Tahun 2014 guna memastikan bahwa seluruh materi aman, orisinal, dan layak "
        "digunakan dalam pembelajaran anak usia dini."
    )

    t4_headers = ["Aset/halaman", "Pembuat/sumber", "Tautan sumber", "Lisensi", "Cara atribusi"]
    t4_data = [
        ("Ilustrasi Gajah, Kelinci, Bebek, Burung\n(Halaman 1, 2, 5, 6)", "Liana Nurfatimah (Pengembang Safari Hewan)", "https://github.com/lianaumin24/safari_Hewan/tree/main/src/assets/illustrations", "CC BY-SA 4.0 (Karya Orisinal Tim Pengembang)", "Ilustrasi vektor orisinal dibuat manual dalam format SVG oleh pengembang Safari Hewan (Liana Nurfatimah)."),
        ("Suara Terompet Gajah\n(Halaman 2, 3)", "Wikimedia Commons / Rekaman Alami Gajah Asia (Elephas maximus)", "https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg", "CC0 1.0 Universal (Public Domain Dedication)", "“Elephant voice - trumpeting” bersumber dari Wikimedia Commons, berstatus domain publik (CC0)."),
        ("Suara Lompatan Kelinci\n(Halaman 2, 3)", "Liana Nurfatimah (Pengembang Safari Hewan)", "https://github.com/lianaumin24/safari_Hewan/blob/main/public/audio/kelinci-hop.mp3", "CC0 1.0 Universal (Karya Orisinal Tim Pengembang)", "Efek suara lompatan dirancang khusus secara akustik oleh pengembang Safari Hewan (CC0)."),
        ("Suara Bebek (Kwek-kwek)\n(Halaman 2, 3)", "SoundBible / Mike Koenig", "https://soundbible.com/1004-Mallard-Duck-Quack.html", "Creative Commons Attribution 3.0 (CC BY 3.0)", "“Mallard Duck Quack” direkam oleh Mike Koenig di bawah lisensi resmi CC BY 3.0."),
        ("Suara Kicauan Burung\n(Halaman 2, 3)", "Freesound / InspectorJ", "https://freesound.org/people/InspectorJ/sounds/416529/", "Creative Commons Attribution 4.0 (CC BY 4.0)", "“Bird Whistling, Single, A.wav” oleh InspectorJ (www.jshaw.co.uk) di bawah lisensi CC BY 4.0."),
        ("Musik Latar Safari (Carefree)\n(Header Kontrol Audio)", "Kevin MacLeod (incompetech.com)", "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037", "Creative Commons: By Attribution 3.0 (CC BY 3.0)", "“Carefree” Kevin MacLeod (incompetech.com), Lisensi Creative Commons: By Attribution 3.0."),
        ("Audio Narasi Suara Guru\n(Seluruh Adegan)", "Microsoft Edge Neural Voice (id-ID-GadisNeural)", "https://azure.microsoft.com/en-us/products/cognitive-services/text-to-speech/", "Microsoft Azure Speech Terms (Non-Commercial Educational Use)", "Narasi dibangkitkan menggunakan model suara neural ramah guru id-ID-GadisNeural untuk tujuan pendidikan."),
        ("Tipografi Fredoka & Quicksand\n(Tampilan Teks)", "Milena Brandao & Andrew Paglinawan (Google Fonts)", "https://fonts.google.com/specimen/Fredoka", "SIL Open Font License, Version 1.1 (OFL 1.1)", "Font berlisensi terbuka SIL OFL 1.1 bebas digunakan untuk aplikasi edukasi digital."),
        ("Ikon Navigasi UI\n(Header & Tombol)", "Kontributor Proyek Lucide Icons", "https://lucide.dev/", "ISC License (Kompatibel Open Source MIT)", "Ikon UI antarmuka bersumber dari pustaka open-source Lucide Icons di bawah lisensi ISC.")
    ]

    table4 = doc.add_table(rows=len(t4_data) + 1, cols=5)
    table4.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table4)

    widths_t4 = [Inches(1.2), Inches(1.2), Inches(1.6), Inches(1.1), Inches(1.4)]
    for i, h_text in enumerate(t4_headers):
        cell = table4.cell(0, i)
        cell.width = widths_t4[i]
        set_cell_background(cell, "D9E1F2")
        set_cell_margins(cell)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(h_text)
        run.bold = True
        run.font.size = Pt(10)

    for row_idx, row_data in enumerate(t4_data):
        for col_idx, text in enumerate(row_data):
            cell = table4.cell(row_idx + 1, col_idx)
            cell.width = widths_t4[col_idx]
            set_cell_margins(cell)
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.15
            p.paragraph_format.space_after = Pt(2)
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT

            if col_idx == 2 and text.startswith("http"):
                add_hyperlink(p, text, text, color="0000EE", underline=True)
            else:
                run = p.add_run(text)
                run.font.size = Pt(9.5)
                if col_idx == 0:
                    run.bold = True

    add_body_p(
        "Dalam proses perancangan website interaktif Safari Hewan, teknologi berbantuan komputasi dan kecerdasan artifisial (AI) "
        "digunakan sebagai sarana perumusan gagasan tata letak dan struktur antarmuka responsif. Seluruh prompt dirancang dengan "
        "mempertimbangkan prinsip perlindungan anak usia dini:"
    )

    # Prompt Callout Box
    table_prompt = doc.add_table(rows=1, cols=1)
    table_prompt.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_p = table_prompt.cell(0, 0)
    c_p.width = Inches(6.5)
    set_cell_background(c_p, "F8F9FA")
    set_cell_margins(c_p, top=100, bottom=100, left=140, right=140)
    tblPr_p = table_prompt._tbl.tblPr
    borders_p = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/>'
        f'</w:tblBorders>'
    )
    tblPr_p.append(borders_p)

    p_box = c_p.paragraphs[0]
    p_box.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_box.paragraph_format.line_spacing = 1.25
    run_bh = p_box.add_run("Prompt Perancangan yang Digunakan:\n")
    run_bh.bold = True
    run_bh.font.size = Pt(10)
    run_bb = p_box.add_run(
        "“Rancang media digital pembelajaran interaktif untuk anak usia dini (5–6 tahun) bertema 'Safari Hewan: Hewan di Sekitar Kita' "
        "dengan pendekatan multisensori yang ramah anak. Terapkan prinsip: 1) Bebas iklan komersial dan tidak mengumpulkan data pribadi anak (zero data collection); "
        "2) Matikan musik latar (BGM) secara otomatis saat aplikasi dibuka (default mute) agar guru memegang kendali suasana kelas; "
        "3) Gunakan ilustrasi vektor SVG orisinal tanpa dekorasi berlebihan dengan fitur 'Ayo Amati' yang memancarkan garis tepi (border) oranye menyala saat disentuh; "
        "4) Sajikan teks suku kata berukuran besar ('Ga - jah', 'Ke - lin - ci') disertai audio pembacaan narasi suara guru; "
        "5) Sediakan aktivitas fisik menirukan gerak hewan dan lembar kartu aktivitas tanpa layar (non-screen printable cards).”"
    )
    run_bb.italic = True
    run_bb.font.size = Pt(10)

    add_body_p(
        "Seluruh aset visual tidak menggunakan foto identitas anak dari ruang publik guna menghormati prinsip perlindungan privasi anak (UNICEF, 2025). "
        "Musik latar komersial yang awalnya berisik dan tidak berizin digantikan dengan musik resmi Incompetech (CC BY 3.0) yang diatur dalam kondisi nonaktif "
        "secara bawaan. Rekaman audio terompet gajah yang awalnya berupa nada sintetis buatan digantikan dengan rekaman suara asli Gajah Asia (Elephas maximus) "
        "dari repositori Wikimedia Commons berstatus domain publik (CC0), sehingga anak-anak mendapatkan stimulasi suara hewan yang autentik dan nyata."
    )

    # Page break before Section 5
    doc.add_page_break()

    # ==================== SECTION 5 ====================
    add_sec_title("5. Prototype Media (Safari Hewan: Web App Interaktif)")
    add_body_p(
        "Prototipe media pembelajaran digital “Safari Hewan: Media Pembelajaran Interaktif Hewan untuk Anak Usia Dini (5–6 Tahun)” "
        "telah selesai dirancang, dikembangkan, dan diuji secara komprehensif. Dosen pengampu, guru PAUD, serta pemerhati pendidikan "
        "anak dapat langsung mengakses, mencoba, dan menguji seluruh fungsi interaktif media melalui tautan resmi berikut:"
    )

    p_links = doc.add_paragraph()
    p_links.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_links.paragraph_format.line_spacing = 1.3
    p_links.paragraph_format.space_before = Pt(4)
    p_links.paragraph_format.space_after = Pt(10)
    r_l1 = p_links.add_run("Tautan Website Prototype:\n")
    r_l1.bold = True
    add_hyperlink(p_links, "https://lianaumin24.github.io/safari_Hewan/", "https://lianaumin24.github.io/safari_Hewan/", color="0000EE", underline=True)
    p_links.add_run("\n\nTautan Repositori Sumber Kode (GitHub):\n")
    p_links.runs[-1].bold = True
    add_hyperlink(p_links, "https://github.com/lianaumin24/safari_Hewan", "https://github.com/lianaumin24/safari_Hewan", color="0000EE", underline=True)

    add_body_p(
        "Prototipe Safari Hewan memiliki sejumlah karakteristik pedagogis dan teknis unggulan yang membedakannya secara signifikan dari media video konvensional, antara lain:\n"
        "1. Arsitektur Web Interaktif Responsif: Dibangun menggunakan standar web modern (Single Page Application berbasis React, TypeScript, dan Tailwind CSS) yang ringan, dapat diakses langsung tanpa proses instalasi aplikasi rumit, dan responsif secara sempurna di berbagai perangkat (komputer meja, laptop ruang kelas, proyektor, tablet sentuh, maupun smartphone guru).\n"
        "2. Keamanan Digital dan Privasi Mutlak (Zero-Data Collection): Aplikasi 100% bebas dari segala bentuk iklan pihak ketiga, bebas tautan eksternal yang membahayakan anak, tidak meminta formulir login atau nama anak, serta tidak merekam maupun mengumpulkan data pribadi peserta didik sesuai prinsip perlindungan etika digital anak (UNICEF, 2025).\n"
        "3. Kontrol Audio Bertanggung Jawab: Autoplay musik latar dinonaktifkan secara otomatis (default OFF) saat situs web pertama kali dimuat. Musik safari hanya berbunyi jika guru atau pengguna secara sadar menekan tombol kontrol musik di bilah atas. Narasi suara guru yang ramah dan efek suara hewan alami terverifikasi dapat didengarkan kapan saja melalui tombol audio sentuh tanpa perulangan yang mengganggu.\n"
        "4. Fitur Eksplorasi Anatomi 'Ayo Amati' Bergaris Tepi Menyala: Pada setiap sesi pengenalan hewan, anak disajikan tombol pengamatan organ tubuh spesifik (misalnya 'Tunjuk Belalai Panjang' pada gajah, 'Tunjuk Kaki Melompat' pada kelinci, 'Tunjuk Sayap Terbang' pada burung). Saat disentuh, bagian tubuh tersebut langsung dilingkari garis tepi oranye menyala (#E27D18 dengan efek filter glowing), membantu pemfokusan visual anak usia dini secara sangat terarah.\n"
        "5. Integrasi Pembelajaran Non-Screen (Tanpa Layar): Pada panel penutup, tersedia tombol panduan bagi guru dan fitur lembar kartu aktivitas fisik yang dapat dicetak (printable activity cards), menjembatani pengalaman belajar digital menuju eksplorasi dunia nyata di lingkungan sekolah dan rumah."
    )

    # Page break to start prototype screenshots (matching Page 11 of template)
    doc.add_page_break()

    # Function to add screenshot
    def add_screenshot_entry(header_title, image_filename, caption_text):
        p_hdr = doc.add_paragraph()
        p_hdr.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_hdr.paragraph_format.space_before = Pt(6)
        p_hdr.paragraph_format.space_after = Pt(2)
        p_hdr.paragraph_format.keep_with_next = True
        run_h = p_hdr.add_run(header_title)
        run_h.bold = True
        run_h.font.size = Pt(11.5)

        img_path = os.path.abspath(os.path.join("public/screenshots", image_filename))
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(0)
            p_img.paragraph_format.space_after = Pt(2)
            p_img.paragraph_format.keep_with_next = True
            run_i = p_img.add_run()
            run_i.add_picture(img_path, width=Inches(4.8))

        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(0)
        p_cap.paragraph_format.space_after = Pt(10)
        run_c = p_cap.add_run(caption_text)
        run_c.italic = True
        run_c.font.size = Pt(10)

    # Page 11: Halaman 1 & Halaman 2
    add_screenshot_entry("Halaman 1", "scene1_pilih_hewan.png", "Tampilan gerbang safari interaktif dengan 4 pilihan sahabat hewan dan tombol narasi suara ramah guru.")
    add_screenshot_entry("Halaman 2", "scene2_gajah.png", "Pengenalan suku kata 'Ga - jah', fitur pengamatan dengan garis batas oranye menyala pada belalai, dan tombol suara terompet gajah asli.")
    doc.add_page_break()

    # Page 12: Halaman 3 & Halaman 4
    add_screenshot_entry("Halaman 3", "scene2_kelinci.png", "Pengejaan suku kata 'Ke - lin - ci', tombol pengamatan kaki melompat bergaris tepi menyala, dan pemutar audio lompatan kelinci.")
    add_screenshot_entry("Halaman 4", "scene3_tebak_suara.png", "Permainan teka-teki auditori interaktif di mana anak mendengarkan suara hewan alami dan menebak gambar hewan yang sesuai.")
    doc.add_page_break()

    # Page 13: Halaman 5 & Halaman 6
    add_screenshot_entry("Halaman 5", "scene4_tirukan_gerak.png", "Ajakan gerak fisik aktif bagi anak dan guru di dalam kelas untuk menirukan gerakan belalai gajah, lompatan kelinci, dan kepakan sayap burung.")
    add_screenshot_entry("Halaman 6", "scene5_mencocokkan.png", "Permainan mencocokkan kartu ciri khas fisik, tempat hidup, dan makanan kesukaan sahabat hewan dengan umpan balik visual ramah anak.")
    doc.add_page_break()

    # Page 14: Halaman 7 + audio narration + start of Section 6 Refleksi Individu
    add_screenshot_entry("Halaman 7", "scene6_panggung_safari.png", "Panggung perayaan hasil petualangan safari, perolehan stiker prestasi, dialog kasih sayang terhadap makhluk ciptaan Allah, dan akses kartu fisik.")

    add_body_p(
        "Selain disajikan dalam bentuk website interaktif berbasis web, seluruh rangkaian media pembelajaran ini juga dilengkapi dengan audio narasi berupa penjelasan lisan yang sederhana dan menarik. Penambahan suara narasi guru bertujuan membantu anak-anak usia 5–6 tahun yang masih dalam tahap awal belajar membaca agar tetap dapat memahami instruksi dan menikmati setiap penjelasan materi. Narasi audio disusun sesuai dengan isi setiap adegan, mulai dari pengenalan hewan hingga kegiatan bermain dan penutup. Dengan adanya audio, anak tidak hanya mengamati gambar dan membaca suku kata, tetapi juga dapat mendengarkan artikulasi penjelasan materi secara nyaman."
    )

    p_demo_link = doc.add_paragraph()
    p_demo_link.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_demo_link.paragraph_format.space_before = Pt(4)
    p_demo_link.paragraph_format.space_after = Pt(10)
    r_dl = p_demo_link.add_run("Tautan website prototype dan audio narasi:\n")
    r_dl.bold = True
    add_hyperlink(p_demo_link, "https://lianaumin24.github.io/safari_Hewan/", "https://lianaumin24.github.io/safari_Hewan/", color="0000EE", underline=True)

    # ==================== SECTION 6 ====================
    add_sec_title("6. Refleksi Individu")
    add_body_p(
        "Redesain media pembelajaran “Hewan di Sekitar Kita: Safari Hewan” dilakukan untuk membuat pembelajaran lebih sesuai dengan kebutuhan anak usia 5–6 tahun. "
        "Media awal memiliki beberapa kekurangan, seperti penggunaan teks kecil, pergantian gambar yang cepat, penggunaan musik populer komersial yang belum jelas izinnya, "
        "serta pemakaian foto anak tanpa keterangan izin yang memadai. Oleh karena itu, media dirancang ulang menjadi web app interaktif dengan penyajian materi yang lebih "
        "bertahap dan terarah. Keputusan pertama dalam redesain ini adalah menggunakan format aplikasi interaktif yang membagi materi ke dalam 6 adegan terstruktur. "
        "Format tersebut memungkinkan guru mengatur tempo penyampaian materi dan memberi kesempatan leluasa kepada anak untuk mengamati gambar, mencoba tombol sentuh, "
        "serta mengeksplorasi ciri fisik hewan. Keputusan kedua adalah menggunakan kalimat pendek, suku kata bervokalisasi besar ('Ga - jah', 'Ke - lin - ci'), serta "
        "ilustrasi vektor ramah anak yang bersih agar anak lebih mudah mengikuti informasi tanpa beban kognitif berlebih. Keputusan ketiga adalah memperhatikan keamanan "
        "dan etika digital dengan tidak menggunakan foto identitas anak, menghindari iklan yang tidak diperlukan, serta mematikan musik latar secara bawaan (default mute) "
        "agar tidak menimbulkan polusi suara di ruang kelas."
    )

    add_body_p(
        "Dari segi pembelajaran, prototipe Safari Hewan ini tidak hanya digunakan untuk mengenalkan nama hewan secara hafalan semata. Anak juga diajak aktif menirukan "
        "suara asli hewan, mengeksplorasi organ tubuh spesifik dengan panduan garis tepi oranye menyala, menirukan gerakan fisik hewan di kelas bersama teman-teman, serta "
        "menjawab kuis tebak suara dan memasangkan kartu ciri. Kegiatan tersebut memberikan kesempatan holistik kepada anak untuk mengembangkan kemampuan bahasa, "
        "kepekaan auditori, koordinasi motorik kasar, serta kemampuan bersosialisasi dengan teman dan guru. Ajakan untuk menyayangi hewan ciptaan Allah pada adegan penutup "
        "juga menjadi sarana strategis dalam menanamkan nilai-nilai moral dan karakter peduli terhadap lingkungan hidup sejak usia dini. Meskipun demikian, prototipe ini "
        "masih perlu dievaluasi dan diuji coba secara langsung bersama anak-anak di lembaga PAUD guna memperoleh masukan mengenai kemudahan navigasi sentuh serta efektivitas "
        "dialog interaktif guru. Opsi kartu aktivitas non-screen yang dapat dicetak juga memastikan anak memiliki alternatif belajar fisik tanpa ketergantungan pada layar "
        "gadget, sehingga teknologi digital benar-benar hadir sebagai sarana penunjang tumbuh kembang anak secara sehat dan seimbang."
    )

    # ==================== DAFTAR PUSTAKA ====================
    add_sec_title("Daftar Pustaka")

    biblio_items = [
        "Canva. (t.t.). Canva’s content license agreement. https://www.canva.com/policies/content-license-agreement/",
        "Creative Commons. (2023). Best practices for attribution: Marking third-party content. https://creativecommons.org/use-remix/attribution/",
        "MacLeod, K. (2014). Carefree [Song recorded by Kevin MacLeod]. Incompetech Royalty-Free Music. https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037",
        "Mayer, R. E. (2021). Multimedia learning (3rd ed.). Cambridge University Press. https://doi.org/10.1017/9781316941355",
        "Republik Indonesia. (2014). Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta. Lembaran Negara Republik Indonesia Tahun 2014 Nomor 266. https://peraturan.bpk.go.id/Details/38690/uu-no-28-tahun-2014",
        "UNICEF Office of Strategy and Evidence Innocenti. (2025). Guidance on AI and children: Version 3.0. UNICEF. https://www.unicef.org/innocenti/reports/policy-guidance-ai-children"
    ]

    for b in biblio_items:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.line_spacing = 1.35
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(4)
        p_b.paragraph_format.left_indent = Inches(0.5)
        p_b.paragraph_format.first_line_indent = Inches(-0.5)
        run_b = p_b.add_run(b)
        run_b.font.size = Pt(10.5)

    out_file1 = os.path.abspath("UTS_IT-AUD_Liana_12470500.docx")
    out_file2 = os.path.abspath("1242100062_Liana Nurfatimah_UTS IT_REDESAIN MEDIA.docx")
    out_file3 = os.path.abspath("UTS_IT-AUD_Liana Nurfatimah_1242100062.docx")

    doc.save(out_file1)
    print(f"Generated DOCX: {out_file1}")
    shutil.copyfile(out_file1, out_file2)
    print(f"Generated DOCX: {out_file2}")
    shutil.copyfile(out_file1, out_file3)
    print(f"Generated DOCX: {out_file3}")

if __name__ == "__main__":
    create_uts_docx()
