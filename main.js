document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggle'); // ハンバーガーアイコンを取得
  const navMenu = document.getElementById('nav-menu'); // ナビゲーションメニューを取得

  // アイコンがクリックされた時、メニューの表示・非表示を切り替えます
  toggle.addEventListener('click', function(e) {
    navMenu.classList.toggle('active'); // activeクラスの付け外しでメニューを開閉
    e.stopPropagation(); // クリックイベントがwindowに伝播しないように
  });

  // メニュー内のリンク以外、またはwindowのどこかをクリックしたらメニューを閉じる
  document.addEventListener('click', function(e) {
    // nav-menuが開いていて、クリックした要素がnav-menu内のa以外の場合
    if (
      navMenu.classList.contains('active') &&
      !e.target.closest('#nav-menu a') &&
      !e.target.closest('#toggle')
    ) {
      navMenu.classList.remove('active');
    }
  });

  // --- ファーストビュー スライダー制御 ---
  const fvSlides = document.querySelectorAll('.first-view-li');
  let fvCurrent = 0;

  function showFvSlide(index) {
    fvSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextFvSlide() {
    fvCurrent = (fvCurrent + 1) % fvSlides.length;
    showFvSlide(fvCurrent);
  }

  if (fvSlides.length > 0) {
    showFvSlide(fvCurrent);
    setInterval(nextFvSlide, 5000);
  }

  // --- 背景画像の表示制御 ---
  const backgroundImg = document.getElementById('background-img');
  let isBgVisible = false;

  function checkScrollDistance() {
    if (window.scrollY > 250 && !isBgVisible) {
      if (backgroundImg) backgroundImg.classList.add('visible');
      isBgVisible = true;
      window.removeEventListener('scroll', checkScrollDistance);
    }
  }
  window.addEventListener('scroll', checkScrollDistance);

  // --- shop-img スライダー制御 ---
  const shopSlides = document.querySelectorAll('.shop-img li');
  let shopCurrent = 0;

  function showShopSlide(index) {
    shopSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextShopSlide() {
    shopCurrent = (shopCurrent + 1) % shopSlides.length;
    showShopSlide(shopCurrent);
  }

  if (shopSlides.length > 0) {
    showShopSlide(shopCurrent);
    setInterval(nextShopSlide, 5000);
  }

                                                          // .about-listのfadein
    // .about-list li img 要素をすべて取得します
  const aboutImgs = document.querySelectorAll('.about-list li img');

  // スクロール時や初回に呼ばれる関数を定義します
  function fadeInOnScroll() {
    // すべての画像について処理します
    aboutImgs.forEach(img => {
      // 画像のウィンドウ内での位置情報を取得します
      const rect = img.getBoundingClientRect();
      // ウィンドウの高さを取得します
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // 画像の上端がウィンドウ下端より100px上に来たら
      if (rect.top < windowHeight - 100) {
        // .fadeinクラスを付与してフェードインさせます
        img.classList.add('fadein');
      }
    });
  }

  // スクロールイベントが発生したらfadeInOnScrollを実行します
  window.addEventListener('scroll', fadeInOnScroll);
  // ページ読み込み時にも一度実行します
  fadeInOnScroll();

  // --- custom-slider-free 横スクロールスライダー ---
// --- スライダー画像をランダム配置＆横スクロールループ ---
  const sliderTrack = document.querySelector('#slider .slider-track');
  if (sliderTrack) {
    const slides = Array.from(sliderTrack.querySelectorAll('.slide'));
    const slideWidth = 240;
    const sliderHeight = 300;
    const totalSlides = slides.length;
    const trackWidth = slideWidth * totalSlides;
    let pos = 0;
    const speed = 1; // px/frame

    // 各スライド内のimgをランダムな位置に配置
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img) {
        img.style.position = 'absolute';
        const imgWidth = 180;
        const imgHeight = 180;
        const maxTop = sliderHeight - imgHeight;
        const maxLeft = slideWidth - imgWidth;
        const top = Math.random() * maxTop;
        const left = Math.random() * maxLeft;
        img.style.top = `${top}px`;
        img.style.left = `${left}px`;
        img.style.width = `${imgWidth}px`;
        img.style.height = `${imgHeight}px`;
      }
      slide.style.position = 'relative';
      slide.style.overflow = 'hidden';
    });

    // 横スクロールループ
    function animate() {
      pos -= speed;
      if (Math.abs(pos) >= trackWidth / 2) {
        pos = 0;
      }
      sliderTrack.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }
});