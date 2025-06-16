document.addEventListener('DOMContentLoaded', function() {
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