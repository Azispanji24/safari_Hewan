import React, { useEffect, useRef } from 'react';
import { ElephantSvg, RabbitSvg, DuckSvg, BirdSvg } from '../assets/illustrations';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Move focus into the modal once opened
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        // Tab Trap Navigation
        if (e.key === 'Tab' && modalRef.current) {
          const focusables = Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

          if (focusables.length === 0) return;

          const firstElement = focusables[0];
          const lastElement = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        // Restore focus to button that opened the modal
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const handlePrintActivity = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-guide-title"
    >
      <div className="modal-backdrop" onClick={onClose} />
      <div ref={modalRef} className="modal-card">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-badge-icon" aria-hidden="true">📖</span>
            <div>
              <h2 id="teacher-guide-title" className="modal-title">
                Panduan Guru & Kegiatan Nyata
              </h2>
              <p className="modal-subtitle">
                Media Safari Hewan | AUD Usia 5–6 Tahun (PIAUD Semester 5)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Tutup Panduan Guru"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Section 1: Target & Tujuan */}
          <section className="guide-section">
            <h3 className="section-title">
              <span className="section-num">1</span>
              Sasaran & Capaian Pembelajaran AUD
            </h3>
            <div className="guide-card">
              <p><strong>Sasaran Usia:</strong> Anak Usia Dini 5–6 Tahun (Kelompok B PAUD / RA).</p>
              <p className="guide-theme-desc">
                <strong>Tema Pembelajaran:</strong> <em>"Hewan di Sekitar Kita"</em> (Konsep Integratif AUD: memadukan pengenalan fauna yang hidup di lingkungan terdekat anak seperti bebek, kelinci, dan burung, dengan perluasan wawasan saat berkunjung ke kebun binatang atau taman safari untuk sahabat gajah besar berbelalai panjang).
              </p>
              <div className="objectives-grid">
                <div className="objective-item">
                  <span className="obj-tag tag-kognitif">Kognitif</span>
                  <p>Mengenali ciri-ciri khas hewan (belalai gajah, paruh pipih bebek, telinga panjang kelinci, sayap burung).</p>
                </div>
                <div className="objective-item">
                  <span className="obj-tag tag-bahasa">Bahasa</span>
                  <p>Menirukan bunyi hewan, memperkaya kosakata nama hewan, dan menceritakan pengalaman secara lisan.</p>
                </div>
                <div className="objective-item">
                  <span className="obj-tag tag-motorik">Fisik Motorik</span>
                  <p>Melakukan gerak lokomotor dan non-lokomotor: melompat seperti kelinci, berjalan tegap gajah, mengepakkan tangan burung.</p>
                </div>
                <div className="objective-item">
                  <span className="obj-tag tag-sosial">Sosial Emosional</span>
                  <p>Menumbuhkan rasa sayang pada ciptaan Tuhan, menyimak dengan tertib, dan mengekspresikan pilihan hewan favorit.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Persiapan Guru */}
          <section className="guide-section">
            <h3 className="section-title">
              <span className="section-num">2</span>
              Persiapan Sebelum Pembelajaran
            </h3>
            <div className="guide-card">
              <ul className="guide-checklist">
                <li>
                  <strong>Kondisi Ruangan:</strong> Pastikan area tengah kelas lapang dan bebas dari benda tajam atau penghalang untuk aktivitas gerak fisik di Adegan 4.
                </li>
                <li>
                  <strong>Pengaturan Suara:</strong> Sesuaikan volume speaker laptop/proyektor agar nyaman di telinga anak (tidak mengejutkan atau bising).
                </li>
                <li>
                  <strong>Media Konkret:</strong> Siapkan kartu gambar hewan dan kartu kata nama untuk kegiatan tindak lanjut non-digital.
                </li>
                <li>
                  <strong>Sikap Pendidik:</strong> Posisikan diri sebagai fasilitator ramah yang membacakan instruksi, mengamati, dan mengapresiasi setiap usaha anak.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Alur 6 Adegan Pembelajaran */}
          <section className="guide-section">
            <h3 className="section-title">
              <span className="section-num">3</span>
              Alur Belajar 6 Adegan (Storyboard Safari)
            </h3>
            <div className="guide-card">
              <ol className="scene-guide-list">
                <li>
                  <strong>Adegan 1 — Selamat Datang di Safari:</strong> Membangun rasa ingin tahu. Guru mengajak anak mengamati gerbang safari dan menyapa teman-teman hewan.
                </li>
                <li>
                  <strong>Adegan 2 — Berkenalan dengan Gajah:</strong> Fokus pengamatan visual dan kosakata. Anak mengamati ciri tubuh gajah (belalai dan telinga) serta menunjuk belalai.
                </li>
                <li>
                  <strong>Adegan 3 — Tebak Suara Hewan:</strong> Melatih kepekaan auditori. Anak mendengarkan rekaman suara lalu memilih kartu hewan yang tepat dengan umpan balik ramah.
                </li>
                <li>
                  <strong>Adegan 4 — Ayo Bergerak Seperti Hewan:</strong> Menghubungkan layar digital dengan stimulasi motorik kasar. Anak berdiri dan mempraktikkan gerakan aman.
                </li>
                <li>
                  <strong>Adegan 5 — Pasangkan Hewan & Namanya:</strong> Pengenalan literasi awal dan asosiasi lambang bunyi/kata sederhana tanpa tekanan skor.
                </li>
                <li>
                  <strong>Adegan 6 — Hewan Favorit & Refleksi:</strong> Pengungkapan emosi positif dan ekspresi verbal. Anak memilih hewan favorit dan menceritakan alasannya kepada guru.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 4: Peran Guru Selama Interaksi Digital */}
          <section className="guide-section">
            <h3 className="section-title">
              <span className="section-num">4</span>
              Peran Guru Sebagai Fasilitator
            </h3>
            <div className="guide-card">
              <div className="guidance-alert info">
                <span className="alert-icon">💡</span>
                <div>
                  <p><strong>Teknologi Adalah Alat Bantu, Bukan Pengganti Guru.</strong></p>
                  <p>Anak usia 5–6 tahun belajar optimal melalui dialog interaktif dan keteladanan. Guru mendampingi anak menyentuh layar, memvalidasi ide anak, dan menanyakan pertanyaan terbuka (<em>open-ended questions</em>).</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Aktivitas Nyata Non-Digital */}
          <section className="guide-section">
            <h3 className="section-title">
              <span className="section-num">5</span>
              Aktivitas Nyata Non-Digital (Tindak Lanjut Kelas)
            </h3>
            <div className="guide-card">
              <div className="activity-box">
                <h4 className="activity-title">Aktivitas Utama: "Kartu Pasangan Hewan"</h4>
                <p className="activity-desc">
                  Kegiatan fisik konkret setelah sesi gawai selesai untuk memastikan anak tidak terpaku pada layar (<em>screen time balance</em>).
                </p>
                <div className="activity-steps">
                  <div className="step-box">
                    <strong>Langkah 1:</strong> Guru membagikan lembar kartu bergambar hewan (gajah, kelinci, bebek, burung) dan kartu nama kata kepada kelompok anak.
                  </div>
                  <div className="step-box">
                    <strong>Langkah 2:</strong> Anak bersama teman sekelompok mencocokkan kartu gambar dengan kartu kata nama hewan.
                  </div>
                  <div className="step-box">
                    <strong>Langkah 3:</strong> Saat berhasil memasangkan, anak menyebutkan 1 ciri khas hewan dan memeragakan gerakannya di depan kelas.
                  </div>
                </div>

                {/* Print Activity Action */}
                <div className="activity-print-cta">
                  <button
                    type="button"
                    onClick={handlePrintActivity}
                    className="btn-print-activity"
                    aria-label="Cetak Lembar Kartu Aktivitas Siswa A4"
                  >
                    <span aria-hidden="true">🖨️</span>
                    <span>Cetak Lembar Kartu Aktivitas Siswa (A4)</span>
                  </button>
                  <p className="print-hint-text">
                    💡 <em>Tips untuk Guru: Pada dialog cetak peramban, Anda dapat langsung mencetak ke printer kertas atau memilih <strong>"Save as PDF"</strong> untuk menyimpan berkas digital lembar aktivitas ini.</em>
                  </p>
                </div>
              </div>

              <div className="activity-box alternative">
                <h4 className="activity-title">Alternatif: "Kreasi Gambar & Cerita Hewan Favoritku"</h4>
                <p className="activity-desc">
                  Anak menggambar hewan yang paling disukainya pada kertas gambar menggunakan krayon warna-warni, kemudian menceritakan karyanya secara verbal kepada guru atau orang tua.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Pengingat Keselamatan & Etika Aset */}
          <section className="guide-section">
            <h3 className="section-title">
              <span className="section-num">6</span>
              Keselamatan Fisik & Tanggung Jawab Digital
            </h3>
            <div className="guide-card">
              <div className="guidance-alert warning">
                <span className="alert-icon">⚠️</span>
                <div>
                  <p><strong>Pengingat Keselamatan Gerak:</strong></p>
                  <p>Awasi lompatan kelinci dan kepakan burung agar anak menjaga jarak aman dari teman di sebelahnya. Pastikan lantai tidak licin.</p>
                </div>
              </div>
              <div className="guidance-alert safe">
                <span className="alert-icon">🛡️</span>
                <div>
                  <p><strong>Privasi & Keamanan Anak (Privacy by Design):</strong></p>
                  <p>Aplikasi ini 100% aman untuk anak: tidak meminta identitas pribadi, tanpa foto anak asli, tanpa iklan, tanpa tautan luar, dan tanpa pelacak daring.</p>
                </div>
              </div>
              <div className="guidance-alert asset">
                <span className="alert-icon">📜</span>
                <div>
                  <p><strong>Etika Hak Cipta Aset:</strong></p>
                  <p>Seluruh ilustrasi hewan dibuat khusus (orisinal) dalam bentuk grafis vektor SVG. Efek suara disintesis secara lokal dan didokumentasikan lengkap pada berkas <code>docs/ASSET_AUDIT.md</code>.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn-modal-action"
          >
            Tutup dan Kembali ke Safari
          </button>
        </div>
      </div>

      {/* Printable A4 Activity Sheet Container (Printer & Eco-Ink Friendly) */}
      <div className="printable-activity-sheet" aria-hidden="true">
        <div className="print-header">
          <div className="print-title-row">
            <h1 className="print-title">SAFARI HEWAN: LEMBAR AKTIVITAS FISIK SISWA</h1>
            <span className="print-badge">PAUD / RA • Usia 5–6 Tahun</span>
          </div>
          <p className="print-instructions">
            <strong>Petunjuk Guru & Anak:</strong> Guntinglah kartu bergambar dan kartu kata nama hewan di bawah ini mengikuti garis putus-putus (✂️). Cocokkan gambar hewan dengan namanya, lalu sebutkan ciri khas dan peragakan gerakannya bersama teman di kelas!
          </p>
          <div className="print-student-info">
            <span>Nama Siswa: ..............................................................</span>
            <span>Kelompok: ..................</span>
            <span>Tanggal: ......................</span>
          </div>
        </div>

        <div className="print-cards-section">
          <h2 className="print-section-title">BAGIAN 1: KARTU BERGAMBAR HEWAN (Gunting Ikuti Garis Putus-putus)</h2>
          <div className="print-grid print-images-grid">
            <div className="print-card image-card">
              <div className="print-art-box"><ElephantSvg size="100%" /></div>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
              <span className="print-card-num">Gambar 1: Gajah</span>
            </div>
            <div className="print-card image-card">
              <div className="print-art-box"><RabbitSvg size="100%" /></div>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
              <span className="print-card-num">Gambar 2: Kelinci</span>
            </div>
            <div className="print-card image-card">
              <div className="print-art-box"><DuckSvg size="100%" /></div>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
              <span className="print-card-num">Gambar 3: Bebek</span>
            </div>
            <div className="print-card image-card">
              <div className="print-art-box"><BirdSvg size="100%" /></div>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
              <span className="print-card-num">Gambar 4: Burung</span>
            </div>
          </div>

          <h2 className="print-section-title">BAGIAN 2: KARTU NAMA & CIRI HEWAN (Pasangkan dengan Kartu Gambar)</h2>
          <div className="print-grid print-names-grid">
            <div className="print-card name-card">
              <span className="print-word">G A J A H</span>
              <span className="print-syllables">(Ga — jah)</span>
              <p className="print-hint">Badan besar, belalai panjang & telinga lebar</p>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
            </div>
            <div className="print-card name-card">
              <span className="print-word">K E L I N C I</span>
              <span className="print-syllables">(Ke — lin — ci)</span>
              <p className="print-hint">Dua telinga panjang, suka melompat lincah</p>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
            </div>
            <div className="print-card name-card">
              <span className="print-word">B E B E K</span>
              <span className="print-syllables">(Be — bek)</span>
              <p className="print-hint">Paruh pipih, suka berenang & bersuara kwek-kwek</p>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
            </div>
            <div className="print-card name-card">
              <span className="print-word">B U R U N G</span>
              <span className="print-syllables">(Bu — rung)</span>
              <p className="print-hint">Memiliki sepasang sayap & berkicau cuit-cuit</p>
              <div className="print-cut-line">✂️ - - - - - - - - - - - - - - - - - - - - -</div>
            </div>
          </div>
        </div>

        <div className="print-footer">
          <span>Media Edukasi Safari Hewan • UTS IT untuk AUD PIAUD Semester 5 • Rifqi Syamsul Fuadi, S.T., M.Kom.</span>
        </div>
      </div>
    </div>
  );
};
