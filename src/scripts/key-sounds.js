const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const sounds = {};

const soundFiles = [
  "A.wav",
  "S.wav",
  "D.wav",
  "F.wav",
  "G.wav",
  "H.wav",
  "J.wav",
];

const loadSounds = () => {
  soundFiles.forEach((file, index) => {
    fetch(`/src/sounds/${file}`)
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((data) => {
        return audioContext.decodeAudioData(data);
      })
      .then((buffer) => {
        const keyName = soundFiles[index].split(".")[0];
        sounds[keyName] = buffer;
      });
  });
};

const playSound = (keyName, sounds) => {
  if (!sounds[keyName]) return;

  const source = audioContext.createBufferSource();
  source.buffer = sounds[keyName];
  source.connect(audioContext.destination);
  source.start(0);
};

export { loadSounds, playSound, sounds };
