const audio = document.getElementById("audio");
const trackTitle = document.getElementById("trackTitle");
const playlistUI = document.getElementById("playlist");
const playlistDropdown = document.getElementById("playlistDropdown");
const progressCircle = document.querySelector(".circular-progress circle.progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playlistToggle = document.getElementById("playlistToggle");

// Update with your song paths
const playlist = [
  { title: "Song 1", src: "songs/a.mp3" },
  { title: "Song 2", src: "songs/b.mp3" },
  { title: "Song 3", src: "songs/c.mp3" },
  { title: "Song 4", src: "songs/d.mp3" },
  { title: "Song 5", src: "songs/e.mp3" },
  { title: "Song 6", src: "songs/f.mp3" },
  { title: "Song 7", src: "songs/g.mp3" },
  { title: "Song 8", src: "songs/h.mp3" },
  { title: "Song 9", src: "songs/i.mp3" },
  { title: "Song 10", src: "songs/k.mp3" }
];

let currentTrack = 0;
let isPlaying = false;

function loadTrack(index) {
  audio.src = playlist[index].src;
  trackTitle.textContent = "Track: " + playlist[index].title;
  highlightTrack(index);
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️";
    isPlaying = false;
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️";
    isPlaying = true;
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
}

playlist.forEach((track, index) => {
  const card = document.createElement("div");
  card.classList.add("track-card");
  card.textContent = track.title;
  card.addEventListener("click", () => {
    currentTrack = index;
    loadTrack(currentTrack);
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
  });
  playlistUI.appendChild(card);
});

playlistToggle.addEventListener("click", () => {
  playlistDropdown.classList.toggle("open");
});

// Circular progress update
function updateProgress() {
  const { currentTime, duration } = audio;
  if (duration) {
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (currentTime / duration) * circumference;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = offset;
  }
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextTrack);
playPauseBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

function highlightTrack(index) {
  const items = playlistUI.querySelectorAll(".track-card");
  items.forEach((item, i) => item.classList.toggle("active", i === index));
}

// Load first track
loadTrack(currentTrack);
