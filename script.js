const songsList = document.getElementById('songs-list');
const audioPlayer = document.getElementById('audio-player');
const nowPlaying = document.getElementById('now-playing');
const searchInput = document.getElementById('search-input');
const fileInput = document.getElementById('file-input');

let loadedSongs = []; 
let currentPlayingIndex = -1;

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (!loadedSongs.some(item => item.name === file.name)) {
            loadedSongs.push({
                name: file.name,
                url: URL.createObjectURL(file) 
            });
        }
    });

    renderList(loadedSongs);
});

function playSong(index) {
    if (index < 0 || index >= loadedSongs.length) return;
    currentPlayingIndex = index;
    const song = loadedSongs[index];
    const cleanTitle = song.name.replace(/\.[^/.]+$/, "");
    audioPlayer.src = song.url;
    audioPlayer.play();
    nowPlaying.textContent = `Playing: ${cleanTitle}`;
}

function renderList(songs) {
    songsList.innerHTML = '';
    
    if (songs.length === 0) {
        songsList.innerHTML = '<p style="color: rgba(255,255,255,0.5);">No songs found</p>';
        return;
    }

    songs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        
        const cleanTitle = song.name.replace(/\.[^/.]+$/, "");
        
        const titleSpan = document.createElement('span');
        titleSpan.textContent = cleanTitle;
        songItem.appendChild(titleSpan);

        const iconImg = document.createElement('img');
        iconImg.classList.add('music-icon-element');
        iconImg.src = 'images/yoursong.png';
        iconImg.alt = 'music icon';
        songItem.appendChild(iconImg);

        songItem.addEventListener('click', () => {
            const actualIndex = loadedSongs.findIndex(item => item.name === song.name);
            playSong(actualIndex);
        });

        songsList.appendChild(songItem);
    });
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = loadedSongs.filter(song => 
        song.name.toLowerCase().includes(term)
    );
    renderList(filtered);
});

audioPlayer.addEventListener('ended', () => {
    if (loadedSongs.length > 0) {
        let nextIndex = currentPlayingIndex + 1; 
        if (nextIndex >= loadedSongs.length) {
            nextIndex = 0;
        }
        
        playSong(nextIndex);
    }
});

// i used some googling ( specially gemini search) for some of these js

const phrases = ["Enjoy Music🎶", "Enjoy Life🌄", "Love You ALL 💕"];
let currentPhraseIndex = 0;
const textElement = document.getElementById("someanimations");

function playTypewriter() {
  const currentText = phrases[currentPhraseIndex];
  textElement.textContent = currentText;
  textElement.style.animationTimingFunction = `steps(${currentText.length}, end)`;
  textElement.classList.remove("erasing");
  textElement.classList.add("typing");
  
  setTimeout(() => {
    textElement.classList.remove("typing");
    textElement.classList.add("erasing");
    setTimeout(() => {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      playTypewriter();
    }, 1200);
    
  }, 3000);
}

document.addEventListener("DOMContentLoaded", playTypewriter);
