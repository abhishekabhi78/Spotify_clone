// ================= AUDIO PLAYER =================
const albumSection = document.getElementById("albumSection");
const player = document.getElementById("audioPlayer");
const cards = document.querySelectorAll(".card");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.querySelector(".progress-bar");
const currentTime = document.querySelector(".curr-time");
const endTime = document.querySelector(".end-time");

// Album Section
const albumImg = document.getElementById("albumImg");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
// Volume Controls
const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");

let songs = [];
let currentSong = -1;

// ================= SONGS LOAD =================

cards.forEach((card) => {

    if(card.dataset.song){
        songs.push(card.dataset.song);
    }

});

// ================= LOAD SONG =================

function loadSong(index){

    if(index < 0){
        index = songs.length - 1;
    }

    if(index >= songs.length){
        index = 0;
    }

    currentSong = index;

    const currentCard = [...cards].filter(card => card.dataset.song)[index];

    player.src = songs[index];
    albumSection.style.visibility = "visible";

    albumImg.src = currentCard.querySelector("img").src;

    songTitle.innerText = currentCard.querySelector(".card-tittle").innerText;

    artistName.innerText = currentCard.querySelector(".card-info").innerText;

    cards.forEach(card => card.classList.remove("active"));

    currentCard.classList.add("active");

    player.play();

}

// ================= CARD CLICK =================
//have to change here you have to make like that if i don't click on the card by default player 
//is in at its centric and also player point is large

cards.forEach((card)=>{

    if(card.dataset.song){

        card.addEventListener("click",()=>{

            const playableCards = [...cards].filter(c=>c.dataset.song);

            const index = playableCards.indexOf(card);

            loadSong(index);

        });

    }

});

// ================= PLAY ICON =================

function updatePlayIcon(){

    if(player.paused){

        playBtn.classList.remove("fa-circle-pause");
        playBtn.classList.add("fa-circle-play");

    }else{

        playBtn.classList.remove("fa-circle-play");
        playBtn.classList.add("fa-circle-pause");

    }

}

player.addEventListener("play",updatePlayIcon);
player.addEventListener("pause",updatePlayIcon);

// ================= PLAY / PAUSE =================

playBtn.addEventListener("click",()=>{

    if(currentSong==-1) return;

    if(player.paused){

        player.play();

    }else{

        player.pause();

    }

});

// ================= NEXT =================

nextBtn.addEventListener("click",()=>{

    if(songs.length==0) return;

    loadSong(currentSong+1);

});

// ================= PREVIOUS =================

prevBtn.addEventListener("click",()=>{

    if(songs.length==0) return;

    loadSong(currentSong-1);

});

// ================= PROGRESS =================

player.addEventListener("timeupdate",()=>{

    if(!isNaN(player.duration)){

        progressBar.value=(player.currentTime/player.duration)*100;

        currentTime.innerText=formatTime(player.currentTime);

        endTime.innerText=formatTime(player.duration);

    }

});

// ================= SEEK =================

progressBar.addEventListener("input",()=>{

    if(player.duration){

        player.currentTime=(progressBar.value/100)*player.duration;

    }

});

// ================= AUTO NEXT =================

player.addEventListener("ended",()=>{

    loadSong(currentSong+1);

});

// ================= FORMAT TIME =================

function formatTime(seconds){

    let min=Math.floor(seconds/60);

    let sec=Math.floor(seconds%60);

    if(sec<10){

        sec="0"+sec;

    }

    return `${min}:${sec}`;

}

// ================= VOLUME =================

player.volume = 1;

volumeBar.addEventListener("input", () => {

    player.volume = volumeBar.value / 100;

    if(player.volume == 0){
        volumeIcon.className = "fa-solid fa-volume-xmark control-icon";
    }
    else if(player.volume < 0.5){
        volumeIcon.className = "fa-solid fa-volume-low control-icon";
    }
    else{
        volumeIcon.className = "fa-solid fa-volume-high control-icon";
    }

});

// Mute / Unmute
volumeIcon.addEventListener("click", () => {

    if(player.volume > 0){

        player.volume = 0;
        volumeBar.value = 0;
        volumeIcon.className = "fa-solid fa-volume-xmark control-icon";

    }else{

        player.volume = 1;
        volumeBar.value = 100;
        volumeIcon.className = "fa-solid fa-volume-high control-icon";

    }

});