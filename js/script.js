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

  // ===== Formulir: tampilkan ringkasan jawaban (tanpa server) =====
  const form = document.getElementById('formKucing');
  const hasil = document.getElementById('hasil');

  // Mengubah teks jadi aman untuk ditampilkan
  const aman = (teks) => {
    const div = document.createElement('div');
    div.textContent = teks;
    return div.innerHTML;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const hewan = data.getAll('hewan').join(', ') || '-';

    hasil.innerHTML = `
      <h3>Makasih ya, ${aman(data.get('nama'))}! 🎉</h3>
      <ul>
        <li>Kelas: ${aman(data.get('kelas') || '-')}</li>
        <li>Warna kucing favorit: ${aman(data.get('warna') || '-')}</li>
        <li>Jenis kelamin kucing: ${aman(data.get('jk') || '-')}</li>
        <li>Hewan lain yang disuka: ${aman(hewan)}</li>
        <li>Meme favorit: ${aman(data.get('meme'))}</li>
        <li>Alasan suka kucing: ${aman(data.get('alasan') || '-')}</li>
      </ul>`;
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
