(function () {
    const track = document.getElementById('carrusel-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const dotsWrap = document.getElementById('carrusel-dots');
    const contador = document.getElementById('carrusel-contador');

    if (!track) return;

    const slides = track.querySelectorAll('.carrusel-slide');
    const total = slides.length;
    let actual = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' activo' : '');
        dot.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
        dot.addEventListener('click', () => irA(i));
        dotsWrap.appendChild(dot);
    });


    function irA(index) {
        actual = Math.max(0, Math.min(index, total - 1));

        track.style.transform = `translateX(-${actual * 100}%)`;

        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('activo', i === actual);
        });

        contador.textContent = `${actual + 1} / ${total}`;

        btnPrev.disabled = actual === 0;
        btnNext.disabled = actual === total - 1;
    }

    btnPrev.addEventListener('click', () => irA(actual - 1));
    btnNext.addEventListener('click', () => irA(actual + 1));

    let startX = 0;
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            irA(actual + (diff > 0 ? 1 : -1));
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') irA(actual + 1);
        if (e.key === 'ArrowLeft') irA(actual - 1);
    });

    irA(0);
})();


(function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('visible');

            const bar = entry.target.querySelector('.skill-bar');
            if (bar) {
                bar.style.width = bar.dataset.width;
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();