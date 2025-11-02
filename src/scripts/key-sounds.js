const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const sounds = {};

const soundFiles = [
  "C.wav",
  "D.wav",
  "E.wav",
  "F.wav",
  "G.wav",
  "A.wav",
  "B.wav",
];

const loadSounds = () => {
  soundFiles.forEach((file, index) => {
    fetch(`/sounds/${file}`)
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((data) => {
        return audioContext.decodeAudioData(data);
      })
      .then((buffer) => {
        const keyNote = soundFiles[index].split(".")[0];
        sounds[keyNote] = buffer;
      });
  });
};

const playSound = (keyNote, sounds) => {
  if (!sounds[keyNote]) return;

  const source = audioContext.createBufferSource();
  source.buffer = sounds[keyNote];
  source.connect(audioContext.destination);
  source.start(0);
};

export { loadSounds, playSound, sounds };
