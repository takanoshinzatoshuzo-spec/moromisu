// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const globalNav = document.querySelector('.global-nav');

if (menuToggle && globalNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = globalNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  globalNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      globalNav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'メニューを開く');
    });
  });
}

// Amino acid comparison
const aminoButtons = document.querySelectorAll('.amino-button');
const aminoResult = document.getElementById('amino-result');

const aminoValues = {
  'アルギニン': ['310mg', '180mg', '179mg'],
  'リジン': ['170mg', '100mg', '99mg'],
  'ヒスチジン': ['90mg', '60mg', '43mg'],
  'フェニルアラニン': ['130mg', '80mg', '72mg'],
  'チロシン': ['160mg', '100mg', '85mg'],
  'ロイシン': ['200mg', '130mg', '118mg'],
  'イソロイシン': ['140mg', '90mg', '74mg'],
  'メチオニン': ['50mg', '30mg', '26mg'],
  'バリン': ['180mg', '110mg', '97mg'],
  'アラニン': ['290mg', '190mg', '138mg'],
  'グリシン': ['200mg', '130mg', '121mg'],
  'プロリン': ['180mg', '120mg', '117mg'],
  'グルタミン酸': ['500mg', '330mg', '295mg'],
  'セリン': ['170mg', '110mg', '103mg'],
  'スレオニン': ['150mg', '90mg', '71mg'],
  'アスパラギン酸': ['340mg', '210mg', '183mg'],
  'トリプトファン': ['30mg', '10mg', '36mg'],
  'シスチン': ['50mg', '40mg', '52mg']
};

aminoButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const aminoName = button.dataset.amino;
    const values = aminoValues[aminoName];
    if (!values || !aminoResult) return;

    aminoButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    aminoResult.innerHTML = `
      <p class="amino-result-label">${aminoName}の各商品含有量（100gあたり）</p>
      <dl class="amino-values">
        <div><dt>無加糖</dt><dd>${values[0]}</dd></div>
        <div><dt>黒糖入り</dt><dd>${values[1]}</dd></div>
        <div><dt>沖縄の活力</dt><dd>${values[2]}</dd></div>
      </dl>
      <p class="amino-source">※試験依頼先：財団法人日本食品分析センター（無加糖、黒糖）<br>※試験依頼先：沖縄県環境科学センター（沖縄の活力）</p>
    `;
  });
});

// Product selector
const selectorButtons = document.querySelectorAll('.selector-option');
const resultBox = document.getElementById('selector-result');
const productCards = document.querySelectorAll('[data-product-card]');

const selectorResults = {
  sugarfree: {
    title: 'おすすめ：琉球もろみ酢 無加糖',
    body: '米こうじのみで作られた、シンプルな造り。リピートされる方が多いもろみ酢です。'
  },
  sweet: {
    title: 'おすすめ：琉球もろみ酢 黒糖入り',
    body: '沖縄の黒糖をつかったもろみ酢です。甘みを追加することで、とげの無いまろやかな飲み口に。'
  },
  citrus: {
    title: 'おすすめ：沖縄の活力 シークワーサー＆レモン入り',
    body: 'シークワーサー果汁、レモン果汁、ざらめを加えました。「飲みやすさ」を追求したもろみ酢です。。'
  }
};

selectorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectorButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    const key = button.dataset.result;
    const result = selectorResults[key];
    if (!result || !resultBox) return;

    resultBox.innerHTML = `
      <span class="result-label">YOUR MATCH</span>
      <strong>${result.title}</strong>
      <p>${result.body}</p>
    `;

    productCards.forEach((card) => {
      card.classList.toggle('is-recommended', card.dataset.productCard === key);
    });
  });
});

// Reveal animation
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Close mobile menu when viewport grows
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && globalNav && menuToggle) {
    globalNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
