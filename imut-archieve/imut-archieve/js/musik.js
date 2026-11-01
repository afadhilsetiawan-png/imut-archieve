// Imut.archieve — musik kotak musik yang dibuat dengan Web Audio (tanpa file lagu)
  // ===== Musik kotak musik imut (dibuat dengan Web Audio, tanpa file lagu) =====
  (function () {
    const btn = document.getElementById('musicBtn');
    const label = document.getElementById('musicLabel');
    const hint = document.getElementById('musicHint');
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { btn.style.display = 'none'; hint.style.display = 'none'; return; }

    // Frekuensi nada (Hz)
    const N = { C3:130.81, F3:174.61, G3:196.00, A3:220.00,
                A4:440.00, B4:493.88, C5:523.25, D5:587.33, E5:659.25, G5:783.99, A5:880.00 };

    // 1 bar = 8 not (per 1/8). null = jeda. Progresi akor: C - Am - F - G
    const bars = [
      { bass: 'C3', m: ['E5','G5','E5','D5','C5','D5','E5',null] },
      { bass: 'A3', m: ['C5','E5','C5','A4','C5','E5','D5',null] },
      { bass: 'F3', m: ['A5','G5','E5','G5','A5','G5','E5',null] },
      { bass: 'G3', m: ['D5','E5','D5','C5','D5','E5','D5',null] },
      { bass: 'C3', m: ['G5','E5','G5','A5','G5','E5','D5','C5'] },
      { bass: 'A3', m: ['E5','C5','E5','G5','E5','C5','A4',null] },
      { bass: 'F3', m: ['A5','A5','G5','E5','G5','E5','D5','C5'] },
      { bass: 'G3', m: ['D5','B4','D5','E5','D5','C5','D5',null] },
    ];

    const BPM = 96;
    const step = 60 / BPM / 2;       // durasi satu not 1/8
    let ctx, master, timer, nextTime = 0, stepIdx = 0, playing = false;

    function tone(freq, t, dur, vol, type) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur + 0.05);
    }

    function schedule() {
      while (nextTime < ctx.currentTime + 0.25) {
        const bar = bars[Math.floor(stepIdx / 8) % bars.length];
        const pos = stepIdx % 8;
        const note = bar.m[pos];
        if (note) {
          tone(N[note], nextTime, 0.9, 0.22, 'triangle');   // melodi kotak musik
          tone(N[note] * 2, nextTime, 0.35, 0.05, 'sine');  // kilau tipis di atasnya
        }
        if (pos === 0 || pos === 4) tone(N[bar.bass], nextTime, 1.3, 0.2, 'sine'); // bass lembut
        nextTime += step;
        stepIdx++;
      }
    }

    function start() {
      if (!ctx) {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.5;
        const lp = ctx.createBiquadFilter();           // pelembut suara
        lp.type = 'lowpass'; lp.frequency.value = 3200;
        master.connect(lp); lp.connect(ctx.destination);
      }
      ctx.resume();
      nextTime = ctx.currentTime + 0.08;
      timer = setInterval(schedule, 40);
      playing = true;
      setUI();
    }

    function stop() {
      clearInterval(timer);
      playing = false;
      if (ctx) ctx.suspend();
      setUI();
    }

    function setUI() {
      btn.classList.toggle('playing', playing);
      btn.setAttribute('aria-pressed', playing);
      btn.setAttribute('aria-label', playing ? 'Matikan musik' : 'Putar musik');
      label.textContent = playing ? 'Matikan' : 'Musik';
      hint.classList.add('hide');
    }

    btn.addEventListener('click', () => (playing ? stop() : start()));

    // Hemat baterai: jeda saat tab disembunyikan, lanjut saat dibuka lagi
    document.addEventListener('visibilitychange', () => {
      if (!ctx || !playing) return;
      if (document.hidden) { clearInterval(timer); ctx.suspend(); }
      else { ctx.resume(); nextTime = ctx.currentTime + 0.08; timer = setInterval(schedule, 40); }
    });

    setTimeout(() => hint.classList.add('hide'), 9000);
  })();
