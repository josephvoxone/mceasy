
# McEasy Assignment Project

Aplikasi ini dibuat sebagai persyaratan interview lamaran kerja di McEasy, Pada Aplikasi ini menggunakan Vuejs 2 dan Menggunakan Framework CSS Vuetify.


## Features

- Login/Logout (menggunakan localstorage)
- Table Customer (Edit/Hapus/Tambah)
- Integrasi dengan gmaps 
- RESTFull API
- Filter berdasarkan nama, alamat dan kelamin
- Tampilan Dekstop First

  
## List Customer

![App Screenshot](https://i.ibb.co/Vg1hHR5/list.png)

  
Pada halaman list customer terdapat beberapa fitur beserta dengan fungsinya.
- Fitur Pencarian Nama customer
- Fitur Filter Kelamin
- Fitur Pencarian Alamat
- Fitur Sortir berdasarkan kolom tabel
- Fitur Action untuk mengubah atau menghapus data customer.

## Edit Customer

![App Screenshot](https://i.ibb.co/JrYc7Xq/edit.png)

Pada halaman edit customer terdapat ada field yang bersifat mandatory dan opsional. Terdapat juga validasi untuk pengecekan jika tidak di isi maupun format yang salah.

Pada fitur penambahan alamat sudah terintegrasi dengan gmaps, ketika ingin memasukan alamat detail harus mengisi kolom yang ada di google maps. 

- User juga dapat menambahkan gambar pada tombol upload tetapi bersifat opsional.
- User juga dapat menghapus data dengan menekan tombol delete (data sepenuhnya tidak dihapus dalam database hanya menggunakan flag)

## Add Customer

![App Screenshot](https://i.ibb.co/42Z2mwT/add.png)

  
Pada halaman add customer terdapat fitur dan field yang sama seperti halaman edit customer.
Jika data tidak diisi akan meghasilkan warning dan data tidak bisa masuk ke dalam database.


## Deployment

Menginisialisasi proyek ini dapat menjalan commend dibawah ini.

```bash
  npm install
```
Untuk menjalankan proyek.

```bash
  npm run serve
```

  
## Tech Stack

Teknologi yang dipakai untuk membuat proyek ini.

**Client:** Vuejs2, Axios, Google Cloud Maps, Vuetify

**Server:** Node, Express, Sequalize

**Misc:** VS Code, Chrome, Photoshop, Sqlyog, XAMPP
  