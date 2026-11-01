# 🐾 Imut.archieve

Website kecil tentang kucing dan ubur-ubur, dengan tampilan imut, musik kotak musik, dan formulir.
Dibuat dengan HTML, CSS, dan sedikit JavaScript. Tidak perlu install apa pun.

## Isi folder

```
imut-archieve/
├── index.html          Halaman utama (isi/teks website)
├── 404.html            Halaman kalau alamat tidak ditemukan
├── manifest.json       Data agar website bisa "dipasang" di layar HP
├── robots.txt          Aturan untuk mesin pencari
├── css/
│   └── style.css       Warna, layout, animasi, tampilan HP/laptop, mode gelap
├── js/
│   ├── script.js       Animasi saat scroll, formulir, daftar meme
│   └── musik.js        Musik kotak musik (dibuat lewat kode)
├── data/
│   └── meme.json       Daftar pilihan meme di formulir
└── assets/
    ├── img/            Foto kucing dan ubur-ubur
    └── icons/          Ikon website (favicon dan ikon aplikasi)
```

## Cara melihat di komputer

- **Paling mudah:** klik dua kali `index.html`.
- **Disarankan:** buka folder ini di Visual Studio Code, pasang ekstensi *Live Server*,
  lalu klik kanan `index.html` → *Open with Live Server*. Halaman ikut berubah otomatis saat file disimpan.

> Kalau dibuka dengan klik dua kali, `data/meme.json` tidak terbaca oleh browser (aturan keamanan),
> tapi pilihan meme tetap muncul dari `index.html`. Lewat Live Server atau setelah online, JSON terbaca normal.

## Cara membuat online (GitHub Pages)

1. Buat repository **Public** di GitHub.
2. Unggah **semua isi folder ini**, termasuk folder `css`, `js`, `data`, `assets`.
   Cara mudah: *Add file → Upload files*, lalu tarik semua file dan folder sekaligus.
3. *Settings → Pages → Deploy from a branch → main / (root) → Save*.
4. Tunggu 1-3 menit, lalu buka `https://username.github.io/nama-repository/`.

## Mengubah isi

| Mau ubah apa | Edit file |
|---|---|
| Teks, judul, paragraf | `index.html` |
| Warna, font, ukuran, animasi | `css/style.css` (warna ada di bagian `:root` paling atas) |
| Pilihan meme di formulir | `data/meme.json` |
| Melodi atau tempo musik | `js/musik.js` (`BPM` dan daftar `bars`) |
| Foto | ganti file di `assets/img/` dengan nama yang sama |
| Nama dan warna saat dipasang di HP | `manifest.json` |

## Catatan

- Jawaban formulir saat ini hanya tampil di layar pengunjung dan tidak tersimpan.
  Untuk mengumpulkan jawaban, sambungkan ke layanan seperti Formspree atau Google Forms.
- Musik tidak menyala otomatis, pengunjung harus menekan tombol 🎵 (aturan browser).
