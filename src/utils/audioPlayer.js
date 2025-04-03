const audioCache = {};

export const loadAudio = (url) => {
  if (!audioCache[url]) {
    audioCache[url] = new Audio(url);
    audioCache[url].load();
  }
  return audioCache[url];
};

export const playAudio = (url, volume = 0.7) => {
  const audio = loadAudio(url);
  audio.currentTime = 0;
  audio.volume = volume;
  return audio.play();
};

export const stopAudio = (url) => {
  if (audioCache[url]) {
    audioCache[url].pause();
    audioCache[url].currentTime = 0;
  }
};