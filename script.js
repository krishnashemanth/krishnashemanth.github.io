/* v3 shared behavior — safe no-ops on pages missing the relevant markup */
(function () {
  document.getElementById('v3-year') && (document.getElementById('v3-year').textContent = new Date().getFullYear());

  /* awards marquee: duplicate content for seamless loop */
  var mq = document.getElementById('v3-marquee');
  if (mq) { mq.innerHTML += mq.innerHTML; }

  /* mobile hamburger */
  var burger = document.querySelector('.v3-hamburger');
  var nav = document.querySelector('.v3-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  /* copy-to-clipboard email links */
  var EMAIL = 'krishnashemanth@gmail.com';
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.setAttribute('title', 'Copy email ID');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var restore = a.innerHTML;
      function done() { a.innerHTML = 'Email copied ✓'; setTimeout(function () { a.innerHTML = restore; }, 1500); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done, function () { window.location.href = 'mailto:' + EMAIL; });
      } else { window.location.href = 'mailto:' + EMAIL; }
    });
  });

  /* reveal-on-scroll */
  var reveals = document.querySelectorAll('.v3-reveal');
  if (reveals.length) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { threshold: .12 });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* hero typewriter */
  var tw = document.getElementById('v3-typewriter');
  if (tw) {
    var phrases = JSON.parse(tw.getAttribute('data-phrases') || '[]');
    var pi = 0, ci = phrases[0] ? phrases[0].length : 0, deleting = true;
    setTimeout(function loop() {
      var word = phrases[pi] || '';
      if (!deleting) {
        ci++;
        tw.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(loop, 2200); return; }
        setTimeout(loop, 55);
      } else {
        ci--;
        tw.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(loop, 400); return; }
        setTimeout(loop, 28);
      }
    }, 2200);
  }

  /* case-study sidebar scroll-spy */
  var sideLinks = document.querySelectorAll('.v3-cs-navcard a');
  if (sideLinks.length) {
    var chapters = Array.prototype.map.call(sideLinks, function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    }).filter(Boolean);
    window.addEventListener('scroll', function () {
      var pos = window.scrollY + 180, current = '';
      chapters.forEach(function (sec) {
        if (sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) current = sec.id;
      });
      sideLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

  /* selected-work filter bar (multi-tag, data-category is space-delimited) */
  var filterBtns = document.querySelectorAll('.v3-filter-btn');
  if (filterBtns.length) {
    var cards = document.querySelectorAll('.v3-filter-target');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-category') || '').split(' ');
          var show = f === 'all' || cats.indexOf(f) !== -1;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* expertise segmented control */
  var segBtns = document.querySelectorAll('.v3-seg-btn');
  if (segBtns.length) {
    var panels = document.querySelectorAll('.v3-seg-panel');
    segBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        segBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-seg');
        panels.forEach(function (p) {
          var show = f === 'all' || p.getAttribute('data-seg-cat') === f;
          p.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* quote-automation interactive workbench */
  var benchSteps = document.querySelectorAll('.v3-bench-step-btn');
  if (benchSteps.length) {
    var benchData = window.V3_BENCH_STEPS || [];
    var current = 0;
    function render(idx) {
      current = idx;
      benchSteps.forEach(function (b, i) { b.classList.toggle('active', i === idx); });
      var d = benchData[idx];
      if (!d) return;
      var badge = document.getElementById('v3-bench-badge');
      var body = document.getElementById('v3-bench-body');
      var log = document.getElementById('v3-bench-log');
      if (badge) badge.textContent = d.badge;
      if (body) body.innerHTML = d.html;
      if (log) log.textContent = d.log;
    }
    benchSteps.forEach(function (b, i) { b.addEventListener('click', function () { render(i); }); });
    var nextBtn = document.getElementById('v3-bench-next');
    if (nextBtn) nextBtn.addEventListener('click', function () { render((current + 1) % benchSteps.length); });
    render(0);
  }
  /* testimonial toggle */
  var testBtns = document.querySelectorAll('.test-btn');
  if (testBtns.length) {
    testBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        testBtns.forEach(function(b) { b.classList.remove('active'); });
        document.querySelectorAll('.test-content').forEach(function(c) { c.classList.remove('active'); c.style.display = 'none'; });
        btn.classList.add('active');
        var targetId = btn.getAttribute('data-target');
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.add('active');
          targetEl.style.display = 'flex';
        }
      });
    });
  }
})();
