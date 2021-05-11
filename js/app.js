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
    playPauseBtn = wrApper.querySelector('.play-pause'),
    prevBtn = wrApper.querySelector('#prev'),
    nextBtn = wrApper.querySelector('#next'),
    progressArea = wrApper.querySelector('.progress_area'),
    progressBar = wrApper.querySelector('.progress_bar');


let musicIndex = 6;

window.addEventListener('load', () => {
    loadMusic(musicIndex); // llamar a la función de carga de música una vez a la ventana
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

// funcion de musica siguiente
function nextMusic() {
    // aquí solo incrementaremos el índice en 1
    musicIndex++;
    // si musicIndex es mayor que la longitud de la matriz, musicIndex será 1, por lo que se reproducirá la primera canción
    musicIndex > listMusicaAll.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// funcion de musica anterior
function prevMusic() {
    // aquí solo disminuiremos el índice en 1
    musicIndex--;
    // si musicIndex es menor que 1 musicIndex tendrá la longitud de la matriz, por lo que se reproducirá la última canción
    musicIndex < 1 ? musicIndex = listMusicaAll.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// play musica evento al botón
playPauseBtn.addEventListener('click', () => {
    const isMusicPause = wrApper.classList.contains('paused');
    isMusicPause ? pauseMusic() : playMusic();
});

// musica siguiente con evento
nextBtn.addEventListener('click', () => {
    nextMusic(); // llamar a la siguiente función de música
});

// musica anterior con evento
prevBtn.addEventListener('click', () => {
    prevMusic();
});

// actualizar la barra de progreso según la hora actual de la música
musicAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime; // obteniendo la hora actual de la canción
    const duration = e.target.duration; // obteniendo la duración total de la canción

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrApper.querySelector('.current'),
        musicDuration = wrApper.querySelector('.duration');

    musicAudio.addEventListener('loadeddata', () => {

        // actualizar la duración total de la canción
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { // sumando 0 si se es menor que 10
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // cargar tocando canción hora actual
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { // sumando 0 si se es menor que 10
        currentSec = `0${currentSec}`;
    }

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Permite actualizar la hora actual de la canción de reproducción de acuerdo con el ancho de la barra de progreso.
progressArea.addEventListener('click', (e) => {
    let progressWidthval = progressArea.clientWidth; // obteniendo el ancho de la barra de progreso
    let clickedOffSetX = e.offsetX; // obteniendo el valor de compensación X
    let songDuration = musicAudio.duration; // obteniendo la duración total de la canción

    musicAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

// vamos a trabajar en repetir la canción aleatoria de acuerdo con el icono
const repeatBton = wrApper.querySelector('#repeat-list');
repeatBton.addEventListener('click', () => {
    // first we get the innerText of the icon the we'll change accord
    let getText = repeatBton.innerText; // obteniendo innerText de icono
    switch (getText) {
        case 'repeat': // si este icono se repite
            repeatBton.innerText = 'repeat_one'
            break;

        default:
            break;
    }
});