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

  $(function(){
  var $mv = $('.div-mv .mv');
  var current = 0;
  $mv.eq(current).addClass('active');

  setInterval(function(){
    $mv.eq(current).removeClass('active');
    current = (current + 1) % $mv.length;
    $mv.eq(current).addClass('active');
  }, 4000); // 4秒ごとに切り替え（お好みで調整）
});
});  