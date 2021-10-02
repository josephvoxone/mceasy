
# McEasy Webservice Project

Aplikasi ini dibuat sebagai Webserivce RESTFull API untuk mendukung front-end dengan menggunakan node.js, Express dan Sequalize.
  
## Model

![App Screenshot](https://i.ibb.co/LdtxWtY/model.png)

  
Pada halaman model untuk medeklarasikan kolom atau variabel yang nantinya kan dipakai dalam tabel "customer".
Tujuan tersebut guna untuk kembali melakukan cek terhadap tabel dan memudahkan melakukan pembuatan tabel tanpa harus mengimpor dari mysql.
## Controller

![App Screenshot](https://i.ibb.co/4dZL18Y/create.png)

Pada halaman controller adalah proses fungsi dari API tersebut. Salah satunya adalah ketika melakukan create customer, api menampung data, jika tidak ada data maka akan melakukan return warning.

## Router

![App Screenshot](https://i.ibb.co/v1JshjW/route.png)

  
Halaman router bertujuan sebagai deklarasi URL API yang akan dipakai dan menhubungkan tersebut dengan fungsi yang ada di controller. Setiap API URL sudah menggunakan metode yang sesuai.
- GET ketika mendapatkan data
- POST ketika mengirim data
- PUT ketika mengubah data
- DELETE ketika menghapus data 

## Deployment

Menginisialisasi proyek ini dapat menjalan commend dibawah ini.

```bash
  npm install
```
Untuk menjalankan proyek.

```bash
  node server
```

  
## Tech Stack

Teknologi yang dipakai untuk membuat proyek ini.

**Client:** Vuejs2, Axios, Google Cloud Maps, Vuetify

**Server:** Node, Express, Sequalize

**Misc:** VS Code, Chrome, Photoshop, Sqlyog, XAMPP
  