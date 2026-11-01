// Imut.archieve — animasi scroll, formulir, dan daftar meme
  // ===== Animasi muncul saat di-scroll =====
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(el => observer.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible')); // browser lama
  }

  // ===== Formulir: kirim jawaban ke Google Form + tampilkan ringkasan =====
  const form = document.getElementById('formKucing');
  const hasil = document.getElementById('hasil');

  // Alamat tujuan Google Form (akhiran /formResponse) dan kode tiap pertanyaan.
  // Kalau pertanyaan di Google Form diubah atau dibuat ulang, kode di bawah ikut diganti.
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd0adgFMWAAXX0kMTsCHc_reyv5a5SEpGlH3-1HlvhtpFY3tQ/formResponse';
  const ENTRY = {
    nama:   'entry.502293850',
    kelas:  'entry.1154809358',
    warna:  'entry.1892421980',
    jk:     'entry.1292462997',
    hewan:  'entry.1182457156',   // kotak centang: dikirim sekali per pilihan
    meme:   'entry.13094483',
    alasan: 'entry.2105877553'
  };

  // Mengubah teks jadi aman untuk ditampilkan
  const aman = (teks) => {
    const div = document.createElement('div');
    div.textContent = teks;
    return div.innerHTML;
  };

  // Mengirim jawaban ke Google Form. Mode no-cors: kiriman terkirim, tapi balasannya tidak bisa dibaca.
  function kirimKeGoogleForm(data) {
    const body = new URLSearchParams();
    ['nama', 'kelas', 'warna', 'jk', 'meme', 'alasan'].forEach((k) => {
      body.append(ENTRY[k], data.get(k) || '');
    });
    data.getAll('hewan').forEach((h) => body.append(ENTRY.hewan, h));
    return fetch(GOOGLE_FORM_URL, { method: 'POST', mode: 'no-cors', body });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const hewan = data.getAll('hewan').join(', ') || '-';
    const tombol = form.querySelector('button[type="submit"]');

    tombol.disabled = true;
    tombol.textContent = 'Mengirim... 🐾';

    let terkirim = true;
    try {
      await kirimKeGoogleForm(data);
    } catch (err) {
      terkirim = false; // misalnya tidak ada internet
    }

    tombol.disabled = false;
    tombol.textContent = 'Proses 🐾';

    hasil.innerHTML = `
      <h3>Makasih ya, ${aman(data.get('nama'))}! 🎉</h3>
      <ul>
        <li>Kelas: ${aman(data.get('kelas') || '-')}</li>
        <li>Warna kucing favorit: ${aman(data.get('warna') || '-')}</li>
        <li>Jenis kelamin kucing: ${aman(data.get('jk') || '-')}</li>
        <li>Hewan lain yang disuka: ${aman(hewan)}</li>
        <li>Meme favorit: ${aman(data.get('meme'))}</li>
        <li>Alasan suka kucing: ${aman(data.get('alasan') || '-')}</li>
      </ul>
      <p>${terkirim ? '✅ Jawabanmu sudah dikirim!' : '⚠️ Jawabanmu belum terkirim. Cek internetmu lalu coba lagi.'}</p>`;
    hasil.classList.add('show');
    hasil.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

// ===== Daftar meme dimuat dari data/meme.json =====
// Pilihan awal sudah ada di index.html, jadi kalau file JSON gagal dimuat
// (misalnya halaman dibuka langsung dari folder), formulir tetap bisa dipakai.
fetch('data/meme.json')
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then((data) => {
    const select = document.getElementById('meme');
    if (!select || !Array.isArray(data.meme) || !data.meme.length) return;
    select.innerHTML = '';
    data.meme.forEach((nama) => {
      const opt = document.createElement('option');
      opt.textContent = nama;
      select.appendChild(opt);
    });
  })
  .catch(() => {});
