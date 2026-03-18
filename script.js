const video = document.querySelector(".player__video");
const toggle = document.querySelector(".toggle");
const rewindBtn = document.querySelector(".rewind");
const forwardBtn = document.querySelector(".forward");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const sliders = document.querySelectorAll("input");

// ▶️ Play / Pause
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// Change icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// ⏪ Rewind 10s
function rewind() {
  video.currentTime -= 10;
}

// ⏩ Forward 25s
function forward() {
  video.currentTime += 25;
}

// 🔊 Volume & Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// 📊 Progress Update
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = percent + "%";
}

// Click progress to seek
function scrub(e) {
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
}

// EVENTS
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

rewindBtn.addEventListener("click", rewind);
forwardBtn.addEventListener("click", forward);

sliders.forEach(s =>
  s.addEventListener("input", handleRangeUpdate)
);

video.addEventListener("timeupdate", updateProgress);

progress.addEventListener("click", scrub);