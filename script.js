const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");

// ▶️ Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Change icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// ⏩ Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// 🔊 Volume & Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// 📊 Progress Bar Update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Click progress to seek
function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// EVENT LISTENERS
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(btn =>
  btn.addEventListener("click", skip)
);

sliders.forEach(slider =>
  slider.addEventListener("input", handleRangeUpdate)
);

video.addEventListener("timeupdate", handleProgress);

progress.addEventListener("click", scrub);