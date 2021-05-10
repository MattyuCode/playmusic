// boton de dark & ligth
const Body = document.querySelector('body');
const BotonToogleTheme = document.querySelector('.toogle-theme');

BotonToogleTheme.onclick = () => {
    Body.classList.toggle('dark');

    if (Body.classList.contains('dark')) {
        localStorage.setItem('ModoDarkAgregado', 'true');
    } else {
        localStorage.setItem('ModoDarkAgregado', 'false');
    }
}

if (localStorage.getItem('ModoDarkAgregado') === 'true') {
    Body.classList.add('dark');
} else {
    Body.classList.remove('dark');
}

/*-------------------------------------------
        code de listado de musicas
  -------------------------------------------
*/

const wrApper = document.querySelector('.wrapper'),
    musicImg = wrApper.querySelector('.image_area img'),
    musicName = wrApper.querySelector('.song_details .name'),
    musicArtist = wrApper.querySelector('.song_details  .artist'),
    musicAudio = wrApper.querySelector('#audioSong'),
    playPauseBtn = wrApper.querySelector('.play-pause');


let musicIndex = 10;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
})

// función de cargar música
function loadMusic(indexNumb) {
    musicName.innerHTML = listMusicaAll[indexNumb - 1].name;
    musicArtist.innerHTML = listMusicaAll[indexNumb - 1].artist;
    musicImg.src = `img/${listMusicaAll[indexNumb - 1].img}.jpg`;
    musicAudio.src = `music/${listMusicaAll[indexNumb - 1].src}.mp3`;
}

// función de reproducción música
function playMusic() {
    wrApper.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = 'pause';
    musicAudio.play();
}

// función de pausar música
function pauseMusic() {
    wrApper.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText = 'play_circle';

    musicAudio.pause();
}


playPauseBtn.addEventListener('click', () => {
    const isMusicPause = wrApper.classList.contains('paused');
    isMusicPause ? pauseMusic() : playMusic();
});
 {
    /* <i class="material-icons">play_circle</i> */
}