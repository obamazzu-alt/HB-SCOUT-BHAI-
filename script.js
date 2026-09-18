/* =================================
   GET ELEMENTS
================================= */

const cardScene = document.getElementById("cardScene");

const openBtn = document.getElementById("openBtn");
const openScreen = document.getElementById("openScreen");

const continueBtn = document.getElementById("continueBtn");

const closeBtn = document.getElementById("closeBtn");

const game = document.getElementById("game");

const candleStage = document.getElementById("candleStage");
const cakeStage = document.getElementById("cakeStage");
const giftStage = document.getElementById("giftStage");
const toyStage = document.getElementById("toyStage");

const flame = document.getElementById("flame");
const timerText = document.getElementById("timerText");

const cakeBtn = document.getElementById("cakeBtn");
const giftBtn = document.getElementById("giftBtn");
const speakBtn = document.getElementById("speakBtn");

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");


let candleTimer = null;


/* =================================
   OPEN CARD
================================= */

openBtn.addEventListener("click", function () {

  cardScene.classList.add("opened");

  openScreen.classList.add("hidden");

  closeBtn.classList.add("show");

  /*
    Browser allows music after
    the user clicks the button.
  */

  music.play().then(function () {

    musicBtn.textContent = "🔊";

  }).catch(function () {

    musicBtn.textContent = "🎵";

  });

});


/* =================================
   CONTINUE TO CANDLE
================================= */

continueBtn.addEventListener("click", function () {

  game.classList.add("show");

  showStage(candleStage);

  startCandle();

});


/* =================================
   SHOW STAGE
================================= */

function showStage(stage) {

  const stages =
    document.querySelectorAll(".game-stage");

  stages.forEach(function (item) {

    item.classList.remove("active");

  });

  stage.classList.add("active");

}


/* =================================
   CANDLE
   10 SECOND AUTO BLOW
================================= */

function startCandle() {

  /*
    Reset candle
  */

  flame.classList.remove("off");

  timerText.textContent = "10";

  let seconds = 10;


  /*
    Countdown every second
  */

  candleTimer = setInterval(function () {

    seconds--;

    timerText.textContent = seconds;


    /*
      After 10 seconds
    */

    if (seconds <= 0) {

      clearInterval(candleTimer);

      blowCandle();

    }

  }, 1000);

}


/* =================================
   BLOW CANDLE
================================= */

function blowCandle() {

  /*
    Flame disappears
  */

  flame.classList.add("off");


  /*
    Small delay before cake
  */

  setTimeout(function () {

    showStage(cakeStage);

  }, 1200);

}


/* =================================
   CUT CAKE
================================= */

cakeBtn.addEventListener("click", function () {

  cakeBtn.textContent = "🔪 Cake Cut! ❤️";


  setTimeout(function () {

    showStage(giftStage);

  }, 1200);

});


/* =================================
   OPEN GIFT
================================= */

giftBtn.addEventListener("click", function () {

  giftBtn.textContent = "✨ Opening...";


  setTimeout(function () {

    showStage(toyStage);

  }, 900);

});


/* =================================
   SPIDER-MAN VOICE
================================= */

speakBtn.addEventListener("click", function () {

  if (!("speechSynthesis" in window)) {

    alert("Voice is not supported in this browser.");

    return;

  }


  speechSynthesis.cancel();


  const message =
    new SpeechSynthesisUtterance(
      "Scout, Happy Birthday! I hope you have an amazing day. Keep smiling, keep shining, and stay awesome!"
    );


  message.rate = 0.9;

  message.pitch = 1.1;

  message.volume = 1;


  speechSynthesis.speak(message);

});


/* =================================
   MUSIC BUTTON
================================= */

musicBtn.addEventListener("click", function () {

  if (music.paused) {

    music.play().then(function () {

      musicBtn.textContent = "🔊";

    }).catch(function () {

      musicBtn.textContent = "🎵";

    });

  } else {

    music.pause();

    musicBtn.textContent = "🎵";

  }

});


/* =================================
   CLOSE
================================= */

closeBtn.addEventListener("click", function () {

  /*
    Stop game
  */

  game.classList.remove("show");


  /*
    Close card
  */

  cardScene.classList.remove("opened");

  openScreen.classList.remove("hidden");

  closeBtn.classList.remove("show");


  /*
    Reset candle
  */

  if (candleTimer) {

    clearInterval(candleTimer);

    candleTimer = null;

  }

  flame.classList.remove("off");

  timerText.textContent = "10";

  cakeBtn.textContent = "🍰 CUT YOUR CAKE";

  giftBtn.textContent = "🎁 OPEN YOUR GIFT";

});
