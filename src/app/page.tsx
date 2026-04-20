"use client";

import { useState } from "react";
import styles from "./page.module.css";

// 1. Data Database Pegawai
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

export default function SuratTugasGenerator() {
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

  // State untuk menyimpan list petugas yang dipilih (maksimal 5)
  const [petugasTerpilih, setPetugasTerpilih] = useState([
    { nama: "", nip: "", jabatan: "" } // Start dengan 1 baris kosong
  ]);

  const handleGeneralChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi saat memilih nama di Dropdown
  const handleSelectPetugas = (index, namaYangDipilih) => {
    const dataPegawai = DAFTAR_PEGAWAI.find(p => p.nama === namaYangDipilih);
    const listBaru = [...petugasTerpilih];
    listBaru[index] = { 
      nama: dataPegawai.nama, 
      nip: dataPegawai.nip, 
      jabatan: dataPegawai.jabatan 
    };
    setPetugasTerpilih(listBaru);
  };

  const tambahBarisPetugas = () => {
    if (petugasTerpilih.length < 5) {
      setPetugasTerpilih([...petugasTerpilih, { nama: "", nip: "", jabatan: "" }]);
    }
  };

  return (
    <div className={styles.container}>
      {/* FORM SECTION */}
      <div className={`${styles.formSection} ${styles.noPrint}`}>
        <h2 className={styles.title}>Data Surat Tugas</h2>
        
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}><label>No Urut</label><input name="noUrut" value={formData.noUrut} onChange={handleGeneralChange} /></div>
            <div className={styles.inputGroup}><label>Bulan</label><input name="bulanRomawi" value={formData.bulanRomawi} onChange={handleGeneralChange} /></div>
            <div className={styles.inputGroup}><label>Tahun</label><input name="tahun" value={formData.tahun} onChange={handleGeneralChange} /></div>
          </div>
          
          <h4 style={{margin: '10px 0 5px 0'}}>Daftar Petugas</h4>
          {petugasTerpilih.map((item, index) => (
            <div key={index} className={styles.petugasSelector}>
               <label>Petugas {index + 1}</label>
               <select 
                 onChange={(e) => handleSelectPetugas(index, e.target.value)}
                 className={styles.selectInput}
               >
                 <option value="">-- Pilih Nama Pegawai --</option>
                 {DAFTAR_PEGAWAI.map((p, i) => (
                   <option key={i} value={p.nama}>{p.nama}</option>
                 ))}
               </select>
            </div>
          ))}
          
          {petugasTerpilih.length < 5 && (
            <button onClick={tambahBarisPetugas} className={styles.addBtn}>+ Tambah Petugas</button>
          )}

          <hr />
          <div className={styles.inputGroup}><label>Tugas</label><textarea name="tugas" onChange={handleGeneralChange} /></div>
          <div className={styles.row}>
            <div className={styles.inputGroup}><label>Hari</label><input name="hari" onChange={handleGeneralChange} /></div>
            <div className={styles.inputGroup}><label>Tanggal Kegiatan</label><input name="tanggalTugas" onChange={handleGeneralChange} /></div>
          </div>
          <div className={styles.inputGroup}><label>Tempat</label><input name="tempat" onChange={handleGeneralChange} /></div>
          <div className={styles.inputGroup}><label>Tanggal Surat</label><input name="tanggalDibuat" onChange={handleGeneralChange} /></div>

          <button onClick={() => window.print()} className={styles.printBtn}>Cetak Surat</button>
        </div>
      </div>

      {/* PREVIEW SECTION */}
      <div className={styles.previewSection}>
        <div className={styles.kertasSurat}>
          {/* Header Kop */}
          <div className={styles.header}>
            <div className={styles.logoArea}><img src="/logo-pwk.png" className={styles.logoImg} /></div>
            <div className={styles.headerText}>
              <h3>PEMERINTAH KABUPATEN PURWAKARTA</h3>
              <h3>DINAS KESEHATAN</h3>
              <h2>UPTD PUSKESMAS KIARAPEDES</h2>
              <span>Jalan Raya Kiarapedes No. 2 Km. 28 Kecamatan Kiarapedes</span>
              <p>Email: pkmkiarapedes20@gmail.com Kode Pos: 41175</p>
            </div>
            <div className={styles.logoArea}><img src="/logo-pkm.png" className={styles.logoImg} /></div>
          </div>
          <div className={styles.doubleLine}></div>

          <div className={styles.judulArea}>
            <h4 className={styles.centerText}>SURAT TUGAS</h4>
            <p>No: 440/{formData.noUrut}/ST/PKM-KPDS/{formData.bulanRomawi}/{formData.tahun}</p>
          </div>

          <p>Yang bertanda tangan di bawah ini:</p>
          <table className={styles.tablePolos}>
            <tbody>
              <tr><td>Nama</td><td>: H. Ujang Sutrisna, S. Kep., Ners., M. Kep.</td></tr>
              <tr><td>NIP</td><td>: 197707132006041011</td></tr>
              <tr><td>Jabatan</td><td>: Kepala UPTD Puskesmas Kiarapedes</td></tr>
            </tbody>
          </table>

          <div className={styles.centerText}>M E N U G A S K A N</div>

          <p>kepada:</p>
          <table className={styles.tablePetugas}>
            <thead>
              <tr>
                <th style={{width: '30px'}}>No</th>
                <th>Nama</th>
                <th>NIP / NIPPPK</th>
                <th>Jabatan</th>
              </tr>
            </thead>
            <tbody>
              {petugasTerpilih.map((p, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td style={{textAlign: 'left'}}>{p.nama || "...................."}</td>
                  <td>{p.nip || "...................."}</td>
                  <td style={{textAlign: 'left'}}>{p.jabatan || "...................."}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{marginTop: '15px'}}>Untuk {formData.tugas || "...................."}, pada:</p>
          <table className={styles.tablePolos}>
            <tbody>
              <tr><td>Hari</td><td>: {formData.hari || "...................."}</td></tr>
              <tr><td>Tanggal</td><td>: {formData.tanggalTugas || "...................."}</td></tr>
              <tr><td>Tempat</td><td>: {formData.tempat || "...................."}</td></tr>
            </tbody>
          </table>

          <p style={{marginTop: '20px'}}>Demikian surat ini dibuat untuk dilaksanakan sebagaimana mestinya dengan penuh rasa tanggung jawab.</p>

          <div className={styles.ttd}>
            <p>Purwakarta, {formData.tanggalDibuat || "...................."}</p>
            <p>Kepala UPTD Puskesmas Kiarapedes</p>
            <br /><br />
            <p>TTE</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}