

var displayText = document.getElementById("displayText");
var welcomeTimerText = document.getElementById("welcomeTimer");

var audioElem;

var audioKick =    [new Audio("kick.mp3"),new Audio("kick.mp3"),new Audio("kick.mp3"),new Audio("kick.mp3")];
var audioSnear =   [new Audio("snear.mp3"),new Audio("snear.mp3"),new Audio("snear.mp3"),new Audio("snear.mp3")];
var audioHighhat = [new Audio("highhat.mp3"),new Audio("highhat.mp3"),new Audio("highhat.mp3"),new Audio("highhat.mp3")];
var audioSinbal =  [new Audio("sinbal.mp3"),new Audio("sinbal.mp3"),new Audio("sinbal.mp3"),new Audio("sinbal.mp3")];
var audioBusstam = [new Audio("busstam.mp3"),new Audio("busstam.mp3"),new Audio("busstam.mp3"),new Audio("busstam.mp3")];

var timerCount = 0

var soundPattern = [
0,0,0,0, // 0 sec
3,0,0,0, // 1 sec
0,0,0,0, // 2 sec
3,0,0,0,
0,0,0,0,
3,0,0,0,
0,0,0,0,
3,0,0,0,
3,0,0,0,
3,0,0,0,
3,0,0,0,
3,0,3,0,
3,0,3,0,
3,3,3,3,
4,0,0,0, // 14 sec
0,0,0,0, // 15 sec
1,0,0,0,
0,0,0,0,
1,0,0,0,
0,0,0,0,
1,0,0,0,
0,0,0,0,
1,0,0,0,
1,0,0,0,
1,0,0,0,
1,0,0,0,
1,0,1,0,
1,0,1,0,
1,1,1,1,
2,0,0,0, // 29 sec
];




var nextDrumTiming = 0;

function onInterval() {

  // 250ミリ秒経過ごとにonDrumTimingを呼び出す

  var now = Date.now();

  while(nextDrumTiming < now){
    // 500ミリ秒以上寝過ごすことはないと思うけど念のため
    onDrumTiming();
    nextDrumTiming += 250;
  }
}

function onDrumTiming() {

  var timerCycleCount = timerCount % 120;
  var activeAudioElem = timerCount % 4;
  switch(soundPattern[timerCycleCount]) {
    case 0: break;
    case 1: audioKick[activeAudioElem].play(); break;
    case 2: audioSnear[activeAudioElem].play(); break;
    case 3: audioHighhat[activeAudioElem].play(); break;
    case 4: audioSinbal[activeAudioElem].play(); break;
  }
  timerCount += 1;
  
  displayText.textContent = Math.ceil(timerCount / 4)
}

var intervalID = 0;

function startMinion() {
  stopAll();
  
  audioBusstam[0].play()
  
  timerCount = 0;
  nextDrumTiming = Date.now() + 250;
  
  intervalID = setInterval(onInterval, 25 );
}

var intervalIDwelcome = 0;
var intervalIDwelcomeTimer = 0;
var welcomeTimerCount = 0;
function welcomeTimer() {
  
  welcomeTimerText.textContent = "ミニオン出撃まで、あと" + welcomeTimerCount + "秒";
  audioBusstam[0].play()
  welcomeTimerCount -= 1;
  if(welcomeTimerCount < 0){
    clearInterval(intervalIDwelcomeTimer);
    welcomeTimerText.textContent = "";
    intervalIDwelcomeTimer = 0;
  }
}
function welcome() {
  stopAll();
  welcomeTimerCount = 10;
  intervalIDwelcome = setTimeout(startMinion,11000);
  intervalIDwelcomeTimer = setInterval(welcomeTimer, 1000)
  
}
function stopAll() {
  if(intervalIDwelcome != 0){
    clearTimeout(intervalIDwelcome);
    intervalIDwelcome = 0;
  }
  
  if(intervalID != 0){
    clearInterval(intervalID);
    intervalID = 0;
  }
  if(intervalIDwelcomeTimer != 0){
    clearInterval(intervalIDwelcomeTimer);
    intervalIDwelcomeTimer = 0;
  }
  
  welcomeTimerText.textContent = "";
}
