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
    nextBtn = wrApper.querySelector('#next');


let musicIndex = 15;

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