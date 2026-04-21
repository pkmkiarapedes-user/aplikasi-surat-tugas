"use client";
import { useState } from "react";
import styles from "./page.module.css";

// Tetap mempertahankan daftar pegawai lengkap Anda
const DAFTAR_PEGAWAI = [
  { nama: "Ajat Hermawan", nip: "198102202025211054", jabatan: "Operator Layanan Operasional" },
  { nama: "Anas Muhiban, S.E.", nip: "199703242025211057", jabatan: "Penata Layanan Operasional" },
  { nama: "apt. Herni Ekaraharjo, S. Farm", nip: "198509272023212004", jabatan: "Ahli Pertama - Apoteker" },
  { nama: "apt. Tria Wulandari P, S. Farm", nip: "199210082022032009", jabatan: "Apoteker Ahli Muda" },
  { nama: "Ardiansyah Astriadi, A. Md. AK", nip: "198907272022031007", jabatan: "Pranata Laboratorium Kesehatan Terampil" },
  { nama: "Ari Niken Palupi, Amd.Keb.", nip: "198501202017042001", jabatan: "Bidan Mahir" },
  { nama: "Barir Ismaya Shofa, A. Md.", nip: "199307252019032006", jabatan: "Perawat Gigi Pelaksana/Terampil" },
  { nama: "Ceceng Firmansyah", nip: "198405232025211107", jabatan: "Pengelola Umum Operasional" },
  { nama: "Cici Wijayanti, Amd.Keb", nip: "198608022024212010", jabatan: "Bidan Terampil" },
  { nama: "Cindyaningrum, Amd. Keb", nip: "199401272025212073", jabatan: "Bidan Terampil" },
  { nama: "Cucu Cuhayati, S.Tr. Keb.", nip: "199408202024212013", jabatan: "Bidan Terampil" },
  { nama: "Cucu Suminar, Amd.Kep", nip: "196804171989032007", jabatan: "Perawat Penyelia" },
  { nama: "Dewi Novianti, Amk", nip: "198311112023212003", jabatan: "Terampil - Perawat" },
  { nama: "Dewi Yuliani, AMK", nip: "199103132024212002", jabatan: "Perawat Terampil" },
  { nama: "Dika Megianty Agustin, S.M.", nip: "199708222025212061", jabatan: "Penata Layanan Operasional" },
  { nama: "Dodo Widodo", nip: "198410122025211067", jabatan: "Operator Layanan Operasional" },
  { nama: "dr. Anna Mardyana", nip: "198606172023212005", jabatan: "Ahli Pertama - Dokter" },
  { nama: "dr. Hendric Hariansyah, M.K.M", nip: "199603282022031009", jabatan: "Dokter Ahli Muda" },
  { nama: "dr. Rizki Prasetyo", nip: "123456789101112134", jabatan: "Dokter Umum" },
  { nama: "dr. Zakariya", nip: "197509222006041007", jabatan: "Dokter Ahli Madya" },
  { nama: "drg. Fitri Nurzanah", nip: "199902032025062009", jabatan: "Dokter Gigi Ahli Pertama" },
  { nama: "Eka Prisna Nengsih, Amd. Kep", nip: "199605152025212081", jabatan: "Perawat Terampil" },
  { nama: "Garry Rachman, Amd.Kep", nip: "198509132025211002", jabatan: "Perawat Terampil" },
  { nama: "Harbangkit Rizki, Amd. Kes", nip: "199605202022031014", jabatan: "Perekam Medis Terampil" },
  { nama: "Haris Ridwansyah, S. Kep. Ners.", nip: "198105202008011004", jabatan: "Perawat Penyelia" },
  { nama: "Imas Teti Sugiharti, Amd.Keb", nip: "198702172017042001", jabatan: "Bidan Mahir" },
  { nama: "Irma Septiani, Amd. Keb.", nip: "199309082025212079", jabatan: "Bidan Terampil" },
  { nama: "Juwita Pebrara, Amd. Keb.", nip: "199002092024212007", jabatan: "Bidan Terampil" },
  { nama: "Kartikasari, Amd. Keb", nip: "199504232025212088", jabatan: "Bidan Terampil" },
  { nama: "Komariah, Amd.Keb.", nip: "198208202023212002", jabatan: "Terampil - Bidan" },
  { nama: "Lusi Fitriyani Caturmawati, A. Md. Farm", nip: "199104132022032013", jabatan: "Asisten Apoteker Terampil" },
  { nama: "Marina, Amd. Keb", nip: "199303052025212078", jabatan: "Bidan Terampil" },
  { nama: "Merri Diana, S.Tr. Keb.", nip: "197205122006042012", jabatan: "Bidan Penyelia" },
  { nama: "Mimah Nurhalimah, Amd.Keb", nip: "199106152025212098", jabatan: "Bidan Terampil" },
  { nama: "Muhamad Haris Romdoni, AMK.", nip: "199502052024211005", jabatan: "Perawat Terampil" },
  { nama: "Neni Supriyani, Amk", nip: "198204192008012006", jabatan: "Perawat Penyelia" },
  { nama: "Nining", nip: "198204072025212053", jabatan: "Operator Layanan Operasional" },
  { nama: "Popy Hasanah, Amd. AK", nip: "199812292024212009", jabatan: "Pranata Laboratorium Kesehatan Terampil" },
  { nama: "Rahayu Ratnasari, Amg", nip: "199103232019032003", jabatan: "Nutrisionis Mahir" },
  { nama: "Ratna Dewi, Amd.Keb", nip: "199101142024212015", jabatan: "Bidan Terampil" },
  { nama: "Rizki Rangga Triyana, A.Md. Kep.", nip: "198903012019031002", jabatan: "Perawat Mahir" },
  { nama: "Rohman", nip: "198610292025211068", jabatan: "Operator Layanan Operasional" },
  { nama: "Rudi Subarkat, S. Kep", nip: "199109232023211003", jabatan: "Terampil - Perawat" },
  { nama: "Samirah, Amd. Keb.", nip: "198905312024212002", jabatan: "Tenaga Promosi Kesehatan" },
  { nama: "Siska Apriliani, Amd. Keb.", nip: "199804132024212005", jabatan: "Bidan Terampil" },
  { nama: "Siswinarti, S.Kep. Ners.", nip: "198204272009022005", jabatan: "Perawat Ahli Pertama" },
  { nama: "Siti Fatimah, Amk", nip: "199108042024212012", jabatan: "Perawat Terampil" },
  { nama: "Siti Rohmah, AMK", nip: "198306252008012002", jabatan: "Perawat Penyelia" },
  { nama: "Sri Endang Sukmayati", nip: "200206012025212009", jabatan: "Operator Layanan Operasional" },
  { nama: "Sri Sumarti, SKM", nip: "197503232006042021", jabatan: "Bidan Mahir" },
  { nama: "Susilawati, Amd.Keb.", nip: "198404062019032004", jabatan: "Bidan Mahir" },
  { nama: "Tanti Kemalasari, Amd.Farm.", nip: "199511192024212009", jabatan: "Asisten Apoteker Terampil" },
  { nama: "Tating Kusmiati, Amd. Keb.", nip: "199310112024212011", jabatan: "Bidan Terampil" },
  { nama: "Tika Ayu Lestari, Amd. Keb.", nip: "199402012025212076", jabatan: "Bidan Terampil" },
  { nama: "Tita Rosmiati, Amd.Keb", nip: "197608182006042023", jabatan: "Bidan Mahir" },
  { nama: "Titin Sutinah, Amd. Keb", nip: "197701212006042012", jabatan: "Bidan Mahir" },
  { nama: "Tika Azlia Rachmawati, Amd.Kes", nip: "200209092025062007", jabatan: "Tenaga Sanitasi Lingkungan" },
  { nama: "Ujang Kartono", nip: "198103222009011001", jabatan: "Pengadministrasi Umum" },
  { nama: "Vivit Nopiyanti, Amd.Keb.", nip: "198411042017042001", jabatan: "Bidan Mahir" },
  { nama: "Widya Kusumawati, S.E.", nip: "199708152025212066", jabatan: "Penata Layanan Operasional" },
  { nama: "Yeni Heryani", nip: "198510212025212047", jabatan: "Operator Layanan Operasional" }
];

const DAFTAR_HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function FinalSrikandiUI() {
  const [formData, setFormData] = useState({
    noUrut: "001",
    bulanRomawi: "IV",
    tahun: "2026",
    tugas: "",
    hari: "",
    tanggalTugas: "",
    tempat: "",
    tanggalDibuat: "",
  });

  const [petugasTerpilih, setPetugasTerpilih] = useState([{ nama: "", nip: "", jabatan: "" }]);

  // Fitur Otomatis 3 Digit
  const handleBlurNoUrut = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (val) {
      setFormData(prev => ({ ...prev, noUrut: val.padStart(3, "0") }));
    }
  };

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.appContainer}>
            
        <div className={styles.workspace}>
          {/* FORM AREA (TENGAH) */}
          <section className={`${styles.formContainer} ${styles.noPrint}`}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Detail Isi Naskah</h3>
              
              <div className={styles.formGrid}>
                {/* Identitas Nomor */}
                <div className={styles.inputGroup}>
                  <label>No Urut (Format: 001)</label>
                  <input name="noUrut" value={formData.noUrut} onChange={handleGeneralChange} onBlur={handleBlurNoUrut} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Bulan (Romawi)</label>
                  <input name="bulanRomawi" value={formData.bulanRomawi} onChange={handleGeneralChange} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Tahun</label>
                  <input name="tahun" value={formData.tahun} onChange={handleGeneralChange} />
                </div>

                {/* Daftar Petugas */}
                <div className={styles.inputGroupFull}>
                  <label>Daftar Petugas (Maks 5)</label>
                  {petugasTerpilih.map((p, idx) => (
                    <div key={idx} className={styles.petugasRow}>
                      <select 
                        value={p.nama}
                        onChange={(e) => {
                          const selected = DAFTAR_PEGAWAI.find(item => item.nama === e.target.value);
                          const newArr = [...petugasTerpilih];
                          newArr[idx] = selected || { nama: "", nip: "", jabatan: "" };
                          setPetugasTerpilih(newArr);
                        }} 
                        className={styles.selectInput}
                      >
                        <option value="">-- Pilih Nama Pegawai --</option>
                        {DAFTAR_PEGAWAI.map(pg => <option key={pg.nip} value={pg.nama}>{pg.nama}</option>)}
                      </select>
                      {petugasTerpilih.length > 1 && (
                        <button className={styles.removeBtn} onClick={() => setPetugasTerpilih(petugasTerpilih.filter((_, i) => i !== idx))}>✕</button>
                      )}
                    </div>
                  ))}
                  {petugasTerpilih.length < 5 && (
                    <button className={styles.addBtn} onClick={() => setPetugasTerpilih([...petugasTerpilih, { nama: "", nip: "", jabatan: "" }])}>+ Tambah Petugas</button>
                  )}
                </div>

                {/* Rincian Kegiatan */}
                <div className={styles.inputGroupFull}>
                  <label>Tugas</label>
                  <textarea name="tugas" value={formData.tugas} onChange={handleGeneralChange} placeholder="Masukkan rincian tugas..." rows={3} />
                </div>

                <div className={styles.inputGroup}>
                  <label>Hari</label>
                  <select name="hari" value={formData.hari} onChange={handleGeneralChange} className={styles.selectInput}>
                    <option value="">-- Pilih Hari --</option>
                    {DAFTAR_HARI.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Tanggal Kegiatan</label>
                  <input type="date" name="tanggalTugas" value={formData.tanggalTugas} onChange={handleGeneralChange} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Tempat</label>
                  <input name="tempat" value={formData.tempat} onChange={handleGeneralChange} />
                </div>
                <div className={styles.inputGroupFull}>
                  <label>Tanggal Surat Dibuat</label>
                  <input type="date" name="tanggalDibuat" value={formData.tanggalDibuat} onChange={handleGeneralChange} />
                </div>
              </div>
              
              <button className={styles.btnCetak} onClick={() => window.print()}>🖨️ Cetak Surat Tugas</button>
            </div>
          </section>

          {/* PREVIEW AREA (KANAN) - Mempertahankan Layout Preview Lengkap */}
          <section className={styles.previewContainer}>
            <div className={styles.kertasSurat}>
              {/* Kop Surat */}
              <div className={styles.headerKop}>
                <img src="/logo-pwk.png" className={styles.logoKop} style={{ width: '80px', height: 'auto' }} alt="logo-pwk" />
                <div className={styles.headerText}>
                  <h4 style={{ margin: 0, fontSize: '14pt' }}>PEMERINTAH KABUPATEN PURWAKARTA</h4>
                  <h4 style={{ margin: 0, fontSize: '14pt' }}>DINAS KESEHATAN</h4>
                  <h2 style={{ margin: 0, fontSize: '16pt' }}><strong>UPTD PUSKESMAS KIARAPEDES</strong></h2>
                  <p style={{ margin: 0, fontSize: '10pt', }}>Jalan Raya Kiarapedes No. 2 Km. 28 Kecamatan Kiarapedes</p>
                  <p style={{ margin: 0, fontSize: '10pt' }}>Email: pkmkiarapedes20@gmail.com Kode Pos: 41175</p>
                </div>
                <img src="/logo-pkm.png" className={styles.logoKop} style={{ width: '80px', height: 'auto' }} alt="logo-pkm" />
              </div>
              <div className={styles.doubleLine}></div>

              {/* Judul Surat */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h4 style={{ textDecoration: 'underline', marginBottom: '0', fontSize: '14pt' }}>SURAT TUGAS</h4>
                <p style={{ margin: 0 }}>No: 440/{formData.noUrut}/ST/PKM-KPDS/{formData.bulanRomawi}/{formData.tahun}</p>
              </div>

              <p>Yang bertanda tangan di bawah ini:</p>
              <table style={{ width: '100%', border: 'none' }}>
                <tbody>
                  <tr><td width="100">Nama</td><td>: H. Ujang Sutrisna, S. Kep., Ners., M. Kep.</td></tr>
                  <tr><td>NIP</td><td>: 197707132006041011</td></tr>
                  <tr><td>Jabatan</td><td>: Kepala UPTD Puskesmas Kiarapedes</td></tr>
                </tbody>
              </table>

              <p style={{ textAlign: 'center', fontWeight: 'bold', margin: '15px 0' }}>M E N U G A S K A N</p>
              <p>Kepada:</p>
              
              <table className={styles.tablePetugasPreview}>
  <thead>
    <tr>
      <th style={{ width: '40px', textAlign: 'center' }}>No</th>
      <th style={{ width: '250px' }}>Nama</th>
      <th style={{ width: '200px' }}>NIP / NIPPPK</th>
      <th>Jabatan</th>
    </tr>
  </thead>
  <tbody>
                  {petugasTerpilih.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{textAlign:'center'}}>{idx + 1}</td>
                      <td>{p.nama || ".............................."}</td>
                      <td>{p.nip || ".............................."}</td>
                      <td>{p.jabatan || ".............................."}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={{ marginTop: '15px' }}>Untuk {formData.tugas || "...................................................."}, yang akan dilaksanakan pada:</p>
              <table style={{ width: '100%', border: 'none' }}>
                <tbody>
                  <tr><td width="100">Hari</td><td>: {formData.hari || "...................."}</td></tr>
                  <tr><td>Tanggal</td><td>: {formData.tanggalTugas || "...................."}</td></tr>
                  <tr><td>Tempat</td><td>: {formData.tempat || "...................."}</td></tr>
                </tbody>
              </table>

              <p style={{ marginTop: '20px' }}>Demikian surat tugas ini dibuat untuk dilaksanakan sebagaimana mestinya dengan penuh rasa tanggung jawab.</p>

              <div className={styles.ttdArea}>
                <p>Purwakarta, {formData.tanggalDibuat || "...................."}</p>
                <p>Kepala UPTD Puskesmas Kiarapedes,</p>
                <div style={{ height: '60px' }}></div>
                <p>TTE</p>
                <p></p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}