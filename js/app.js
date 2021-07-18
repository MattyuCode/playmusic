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

const wrapper = document.querySelector('.wrapper'),
    musicImg = wrapper.querySelector('.image_area img'),
    musicName = wrapper.querySelector('.song_details .name'),
    musicArtist = wrapper.querySelector('.song_details  .artist'),
    musicAudio = wrapper.querySelector('#audioSong'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    progressArea = wrapper.querySelector('.progress_area'),
    progressBar = wrapper.querySelector('.progress_bar');

// volver a declara con document para que funcione
const musicList = document.querySelector('.music-list'),
    showMoreBtn = wrapper.querySelector('#more-music'),
    hideMusicBtn = musicList.querySelector('#close');

let musicIndex = 1;

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
    wrapper.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = 'pause';
    musicAudio.play();
}

// función de pausar música
function pauseMusic() {
    wrapper.classList.remove('paused');
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
    const isMusicPause = wrapper.classList.contains('paused');
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

    let musicCurrentTime = wrapper.querySelector('.current'),
        musicDuration = wrapper.querySelector('.duration');

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
const repeatBton = wrapper.querySelector('#repeat-list');

repeatBton.addEventListener('click', () => {
    // first we get the innerText of the icon the we'll change accord
    let getText = repeatBton.innerText; // obteniendo innerText de icono
    switch (getText) {
        case 'repeat': // si este icono se repite, cámbielo a repite_uno
            repeatBton.innerText = 'repeat_one';
            repeatBton.setAttribute('title', 'Song looped');
            break;
        case 'repeat_one': // si el icono es repetido uno, cámbielo a aleatorio
            repeatBton.innerText = 'shuffle';
            repeatBton.setAttribute('title', 'Playback shuffle');
            break;
        default:
            'shuffle'
            repeatBton.innerText = 'repeat';
            repeatBton.setAttribute('title', 'Playlist looped');
            break;
    }
});

// 
musicAudio.addEventListener('ended', () => {

    let getText = repeatBton.innerText;
    // hagamos diferentes cambios en diferentes íconos haga clic usando el switch
    switch (getText) {
        case 'repeat': // si este icono es repetir, simplemente llamamos a la función nextmusic para que se reproduzca la siguiente canción
            nextMusic();
            break;
        case 'repeat_one': // Si el ícono es el ícono de repetición, cambiaremos la hora actual de la canción que se está reproduciendo a 0 para que la canción se reproduzca desde el principio.
            musicAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic()
            break;
        case 'shuffle': // si el icono es barajar el cambio si se repite la generación de índice aleatorio entre el rango máximo de longitud de la matriz
            let randIndex = Math.floor((Math.random() * listMusicaAll.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * listMusicaAll.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex; //  pasando randomIndex a musicIndex para que se reproduzca la canción aleatoria
            loadMusic(musicIndex); // llamar a la función loadmusic
            playMusic(); // llamar a la función playMusic
            break;
    }
});


showMoreBtn.onclick = () => { // this is copied in FM
    musicList.classList.toggle('show');
}
// ESTO FUNCIONA IGUAL EL QUE DE ARRIBA 

// showMoreBtn.addEventListener('click', () => {
//     musicList.classList.toggle('show');
// });

// hideMusicBtn.addEventListener('click', () => {
//     showMoreBtn.click();
// });

hideMusicBtn.onclick = () => {
    showMoreBtn.click();
}

const ulTag = document.querySelector('.ultra');

for (let i = 0; i < listMusicaAll.length; i++) {
    let liTag = ` 
     <li li-index"${i}">
         <div class="row-content1">
           <span>${listMusicaAll[i].name}</span>
           <p>${listMusicaAll[i].artist}</p> 
        </div>
        <audio class="${listMusicaAll[i].src}" src="music/${listMusicaAll[i].src}.mp3"></audio>
        <span id="${listMusicaAll[i].src}" class="audio-duration">3:40</span>
     </li>
     <hr>`;


    ulTag.insertAdjacentHTML('beforeend', liTag);

    let liAudioDuration = document.getElementById(`${listMusicaAll[i].src}`);
    let liAudioTag = document.getElementById(`${listMusicaAll[i].src}`);

    liAudioTag.addEventListener('loadeddata', () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) { // sumando 0 si se es menor que 10
            totalSec = `0${totalSec}`;
        }

        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    });

}

const TodoLiTag = ulTag.querySelectorAll('li');
for (let j = 0; j < TodoLiTag.length; j++) {

    if (TodoLiTag[j].getAttribute('li-index') === musicIndex) {
        // TodoLiTag.classList;1
        // document.getElementById('li').classList.add('.playing');
        TodoLiTag[j].classList.add('playing');
        // let TodoLiTag[j].classList.add('playing');
    }
    TodoLiTag[j].setAttribute('onclick', 'clicked(this)');
}

