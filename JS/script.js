$(".info").modaal({
  overlay_close: true,//モーダル背景クリック時に閉じるか
  before_open: function () {// モーダルが開く前に行う動作
    $('html').css('overflow-y', 'hidden');/*縦スクロールバーを出さない*/
  },
  after_close: function () {// モーダルが閉じた後に行う動作
    $('html').css('overflow-y', 'scroll');/*縦スクロールバーを出す*/
  }
});
$('.title').on('click', function () {//タイトル要素をクリックしたら
  var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
  $(findElm).slideToggle();//アコーディオンの上下動作

  if ($(this).hasClass('close')) {//タイトル要素にクラス名closeがあれば
    $(this).removeClass('close');//クラス名を除去し
  } else {//それ以外は
    $(this).addClass('close');//クラス名closeを付与
  }
});
//console()

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function () {
  $('.accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $(".open").each(function (index, element) {	//openクラスを取得
    var Title = $(element).children('.title');	//openクラスの子要素のtitleクラスを取得
    $(Title).addClass('close');				//タイトルにクラス名closeを付与し
    var Box = $(element).children('.box');	//openクラスの子要素boxクラスを取得
    $(Box).slideDown(500);					//アコーディオンを開く
  });
});

fetch("https://ac.skota11.com/activity").then(
  res => res.json()
).then(
  res => {
    if (res.activities == "OFFLINE") {
      document.getElementById("activity").textContent = `現在オフラインです。`
    } else {
      if (res.activities[0].type == "LISTENING") {
        document.getElementById("activity").innerHTML = `${res[0].name}を再生中。<br>${res.activities[0].details} / ${res.activities[0].state}`  
      } else if(res.activities[0].type == "PLAYING"){
        document.getElementById("activity").innerHTML = `${res[0].name}をプレイ中。<br>${res.activities[0].details}`
      }else {
        `${res[0].name}をプレイ中。`
      }
    }
  }
)