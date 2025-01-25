const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const repeatButton = document.getElementById('repeat');
const shuffleButton = document.getElementById('shuffle');
const trackList = document.getElementById('track-list');
const lyricsDisplay = document.getElementById('lyrics-display');
const lyricsInput = document.getElementById('lyrics-input');
const saveLyricsButton = document.getElementById('save-lyrics');
const fileInput = document.getElementById('file-input');

let playlist = [];
let currentTrackIndex = 0;
let isRepeat = false;
let isShuffle = false;
let lyrics = {};

// Play or pause the track
playPauseButton.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.textContent = '⏸️';
  } else {
    audioPlayer.pause();
    playPauseButton.textContent = '▶️';
  }
});

// Play the next track
document.getElementById('next-track').addEventListener('click', () => {
  nextTrack();
});

// Play the previous track
document.getElementById('prev-track').addEventListener('click', () => {
  prevTrack();
});

// Toggle repeat mode
repeatButton.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatButton.style.color = isRepeat ? 'blue' : 'black';
});

// Toggle shuffle mode
shuffleButton.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleButton.style.color = isShuffle ? 'blue' : 'black';
});

// Load user-selected tracks
fileInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    playlist.push(file);
    const li = document.createElement('li');
    li.textContent = file.name;
    li.addEventListener('click', () => playTrack(playlist.indexOf(file)));
    trackList.appendChild(li);
  });
  if (playlist.length === files.length) {
    playTrack(0);
  }
});

// Play a specific track
function playTrack(index) {
  currentTrackIndex = index;
  const track = playlist[index];
  audioPlayer.src = URL.createObjectURL(track);
  audioPlayer.play();
  playPauseButton.textContent = '⏸️';
  displayLyrics(track.name);
}

// Play the next track
function nextTrack() {
  if (isShuffle) {
    playTrack(Math.floor(Math.random() * playlist.length));
  } else {
    playTrack((currentTrackIndex + 1) % playlist.length);
  }
}

// Play the previous track
function prevTrack() {
  playTrack((currentTrackIndex - 1 + playlist.length) % playlist.length);
}

// Handle track end
audioPlayer.addEventListener('ended', () => {
  if (isRepeat) {
    playTrack(currentTrackIndex);
  } else {
    nextTrack();
  }
});

// Display lyrics
function displayLyrics(trackName) {
  const trackLyrics = lyrics[trackName] || 'No lyrics available';
  lyricsDisplay.textContent = trackLyrics;
  lyricsInput.value = trackLyrics;
}

// Save lyrics for the current track
saveLyricsButton.addEventListener('click', () => {
  if (playlist[currentTrackIndex]) {
    const trackName = playlist[currentTrackIndex].name;
    lyrics[trackName] = lyricsInput.value;
    alert(`Lyrics for "${trackName}" saved!`);
  } else {
    alert('No track selected!');
  }
});
