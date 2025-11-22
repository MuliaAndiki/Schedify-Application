    # 📅 Schedule Management System – PWA

Sistem Manajemen Jadwal berbasis **Progressive Web App (PWA)** yang membantu pengguna mengatur dan mengelola aktivitas harian dengan mudah dan fleksibel.  
Aplikasi ini dapat diakses melalui browser maupun dipasang layaknya aplikasi mobile **tanpa instalasi dari Play Store/App Store**. :contentReference[oaicite:0]{index=0}

---

## 🚀 Fitur Utama

- 🗂️ Kelola Folder / Kategori Jadwal
- ➕ Tambah jadwal baru dengan nama, tanggal & waktu
- ✏️ Edit jadwal yang sudah dibuat
- ❌ Hapus jadwal yang tidak diperlukan
- ✔️ Tandai jadwal sebagai **selesai**
- 🔔 Push Notification sebelum jadwal dimulai
- ☁️ Semua data tersimpan secara online
- 📱 Dapat di-install di perangkat (Add to Home Screen)  
  :contentReference[oaicite:1]{index=1}

---

## 📋 Functional Requirements (R)

| Code | Requirement                                 |
| ---- | ------------------------------------------- |
| R01  | Pengguna dapat membuat folder/kategori baru |
| R02  | Tambahkan jadwal baru                       |
| R03  | Tambahkan tugas ke folder tertentu          |
| R04  | Edit jadwal yang sudah ada                  |
| R05  | Hapus jadwal                                |
| R06  | Edit/Hapus folder beserta seluruh tugas     |
| R07  | Tampilkan daftar jadwal berdasarkan waktu   |
| R08  | Tandai sebagai selesai                      |
| R09  | Notifikasi pengingat                        |
| R10  | Data jadwal tersimpan online                |

:contentReference[oaicite:2]{index=2}

---

## 📌 Rules & Facts

- Setiap jadwal memiliki minimal **nama kegiatan dan 1 waktu mulai**
- Folder dapat berisi banyak tugas
- Reminder hanya terkirim **sebelum waktu mulai**
- Jadwal yang sudah lewat **tidak bisa diubah ke masa depan**
  :contentReference[oaicite:3]{index=3}

---

## 🧠 Assumptions

Beberapa asumsi yang digunakan dalam perancangan sistem:

- Pengguna memberi nama folder dengan jelas
- Folder tidak boleh kosong permanen
- Informasi jadwal selalu diisi dengan benar
- Sistem berjalan dengan Service Worker & Sinkronisasi
- Push notification terkirim sesuai jadwal
  :contentReference[oaicite:4]{index=4}

---

## 🧱 Arsitektur & UML Design

📌 UML mencakup:

- Class Diagram (Auth, Task, Category, Reminder)
- Activity Diagram (Alur login, kategori, task, reminder)
- Sequence Diagram (Flow user → sistem)

Diagram lengkap dapat dilihat pada tautan berikut:

> (Tambahkan link UML atau folder `docs/uml` di sini)

> _Class diagram highlights:_  
> Auth (akun pengguna), Category (folder), Task (jadwal), Reminder (pengingat)  
> :contentReference[oaicite:5]{index=5}

---

## 🔐 OCL Validation

Beberapa aturan validasi utama:

- Email harus unik
- Nama kategori **tidak boleh kosong**
- Task harus memiliki kategori
- Deadline harus lebih dari tanggal dibuat
- Menghapus kategori → seluruh task ikut terhapus
- Reminder hanya untuk waktu yang akan datang  
  :contentReference[oaicite:6]{index=6}

---

## 🛠️ Teknologi yang Disarankan

| Teknologi                | Peran                                    |
| ------------------------ | ---------------------------------------- |
| **PWA**                  | Untuk install app dan offline capability |
| **Service Worker**       | Cache & background notification          |
| **IndexedDB / Cloud DB** | Penyimpanan data                         |
| **Push API**             | Notifikasi jadwal                        |

---

## 👨‍💻 Developer

| Nama             | NIM           |
| ---------------- | ------------- |
| **Mulia Andiki** | 2308107010013 |

Universitas Syiah Kuala  
Fakultas Matematika dan Ilmu Pengetahuan Alam  
Program Studi Informatika  
:contentReference[oaicite:7]{index=7}

---

### ⭐ Jika kamu suka proyek ini, jangan lupa kasih star!
