(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const createAppContainer = () => {
  const app = document.createElement("div");
  app.classList.add("app");
  document.body.appendChild(app);
  return app;
};
const createEditInput = (container) => {
  const editInputWrapper2 = document.createElement("div");
  editInputWrapper2.classList.add("edit-input", "edit-input__wrapper", "hidden");
  const editLabel = document.createElement("label");
  editLabel.textContent = "Edit key";
  editLabel.classList.add("edit-input__label");
  editLabel.setAttribute("for", "edit-key");
  editInputWrapper2.appendChild(editLabel);
  const editField2 = document.createElement("input");
  editField2.classList.add("edit-input__field");
  editField2.setAttribute("maxlength", "1");
  editField2.setAttribute("id", "edit-key");
  editInputWrapper2.appendChild(editField2);
  container.appendChild(editInputWrapper2);
  return { editInputWrapper: editInputWrapper2, editField: editField2 };
};
const createKeyboardContainer = (parent) => {
  const keyboardContainer = document.createElement("div");
  keyboardContainer.classList.add("keyboard");
  parent.appendChild(keyboardContainer);
  return keyboardContainer;
};
const createKeys = (container, keysData2) => {
  return keysData2.map((key) => {
    const keyContainer = document.createElement("div");
    keyContainer.classList.add("key", "keyboard__key");
    const editButton = document.createElement("button");
    editButton.classList.add("button", "key__edit-button");
    keyContainer.appendChild(editButton);
    const keyName = document.createElement("span");
    keyName.classList.add("key__name");
    keyName.textContent = key.name;
    keyContainer.appendChild(keyName);
    const keyButton = document.createElement("button");
    keyButton.classList.add(
      "button",
      "key__button",
      `key__button--${key.slot}`
    );
    keyContainer.appendChild(keyButton);
    container.appendChild(keyContainer);
    return {
      keyContainer,
      editButton,
      keyName,
      keyButton,
      assignedKey: key.name,
      code: key.code,
      note: key.note
    };
  });
};
const createPlayerInput = (container) => {
  const playerInputWrapper = document.createElement("div");
  playerInputWrapper.classList.add("player-input", "player-input__wrapper");
  const playerLabel = document.createElement("label");
  playerLabel.textContent = "Enter key sequence";
  playerLabel.classList.add("player-input__label");
  playerLabel.setAttribute("for", "player-sequence");
  playerInputWrapper.appendChild(playerLabel);
  const playerField2 = document.createElement("input");
  playerField2.classList.add("player-input__field");
  playerField2.setAttribute("id", "player-sequence");
  playerInputWrapper.appendChild(playerField2);
  const playerButton2 = document.createElement("button");
  playerButton2.classList.add("button", "player-input__button");
  playerButton2.textContent = "Play";
  playerInputWrapper.appendChild(playerButton2);
  container.appendChild(playerInputWrapper);
  return { playerInputWrapper, playerField: playerField2, playerButton: playerButton2 };
};
const initUI = (keysData2) => {
  const app = createAppContainer();
  const { editInputWrapper: editInputWrapper2, editField: editField2 } = createEditInput(app);
  const keyboardContainer = createKeyboardContainer(app);
  const keys2 = createKeys(keyboardContainer, keysData2);
  const { playerInputWrapper, playerField: playerField2, playerButton: playerButton2 } = createPlayerInput(app);
  return {
    app,
    keyboardContainer,
    editInputWrapper: editInputWrapper2,
    editField: editField2,
    keys: keys2,
    playerInputWrapper,
    playerField: playerField2,
    playerButton: playerButton2
  };
};
const showErrorMessage = (input, options = {}) => {
  const {
    text = "Invalid",
    parent = input.parentElement,
    className = "error-msg"
  } = options;
  const oldMsg = parent.querySelector(`.${className}`);
  if (oldMsg) oldMsg.remove();
  input.classList.add("is-invalid");
  const msg = document.createElement("span");
  msg.textContent = text;
  msg.classList.add(className);
  if (top !== null) msg.style.top = top;
  parent.appendChild(msg);
  setTimeout(() => {
    input.classList.remove("is-invalid");
    msg.remove();
  }, 1200);
  return;
};
const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
const disableInteraction = (button, input, keys2) => {
  input.disabled = true;
  button.disabled = true;
  input.classList.add("disabled");
  button.classList.add("disabled", "button--disabled");
  keys2.forEach((key) => {
    key.keyButton.classList.add("disabled");
    key.editButton.classList.add("disabled", "button--disabled");
  });
};
const enableInteraction = (button, input, keys2) => {
  input.disabled = false;
  button.disabled = false;
  input.classList.remove("disabled");
  button.classList.remove("disabled", "button--disabled");
  keys2.forEach((key) => {
    key.keyButton.classList.remove("disabled");
    key.editButton.classList.remove("disabled", "button--disabled");
  });
};
const disableSequenceInteraction = (sequenceInput, playButton) => {
  sequenceInput.disabled = true;
  sequenceInput.classList.add("disabled");
  sequenceInput.value = "";
  playButton.disabled = true;
  playButton.classList.add("disabled", "button--disabled");
};
const enableSequenceInteraction = (sequenceInput, playButton) => {
  sequenceInput.disabled = false;
  sequenceInput.classList.remove("disabled");
  playButton.disabled = false;
  playButton.classList.remove("disabled", "button--disabled");
};
const initEdit = (keys2, inputWrapper, inputEl, playerField2, playerButton2) => {
  keys2.forEach((keyObj) => {
    const { editButton } = keyObj;
    editButton.addEventListener("click", () => {
      disableSequenceInteraction(playerField2, playerButton2);
      onEditButtonClick(
        inputWrapper,
        inputEl,
        keyObj,
        keys2,
        playerField2,
        playerButton2
      );
    });
  });
};
const onEditButtonClick = (inputWrapper, inputEl, keyObj, keys2, playerField2, playerButton2) => {
  inputWrapper.classList.remove("hidden");
  inputEl.value = keyObj.assignedKey;
  inputEl.focus();
  const enterHandler = (e) => {
    if (e.key === "Enter") {
      const newKey = e.target.value.toUpperCase();
      const isDuplicate = keys2.some((key) => {
        return key.assignedKey === newKey && key !== keyObj;
      });
      const isValid = /^[A-Z]$/.test(newKey);
      if (!isDuplicate && isValid) {
        keyObj.assignedKey = newKey;
        keyObj.code = `Key${newKey}`;
        keyObj.keyName.textContent = newKey;
      } else {
        const errorText = isDuplicate ? "This key is already in use" : "Please enter only Latin letters";
        showErrorMessage(inputEl, { text: errorText });
        return;
      }
      inputWrapper.classList.add("hidden");
      inputEl.removeEventListener("keydown", enterHandler);
      enableSequenceInteraction(playerField2, playerButton2);
    }
  };
  inputEl.addEventListener("keydown", enterHandler);
};
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const sounds = {};
const soundFiles = [
  "C.wav",
  "D.wav",
  "E.wav",
  "F.wav",
  "G.wav",
  "A.wav",
  "B.wav"
];
const loadSounds = () => {
  soundFiles.forEach((file, index) => {
    fetch(`./sounds/${file}`).then((response) => {
      return response.arrayBuffer();
    }).then((data) => {
      return audioContext.decodeAudioData(data);
    }).then((buffer) => {
      const keyNote = soundFiles[index].split(".")[0];
      sounds[keyNote] = buffer;
    });
  });
};
const playSound = (keyNote, sounds2) => {
  if (!sounds2[keyNote]) return;
  const source = audioContext.createBufferSource();
  source.buffer = sounds2[keyNote];
  source.connect(audioContext.destination);
  source.start(0);
};
const findPressedKey = (e, keys2) => keys2.find((key) => key.code === e.code);
const activateKey = (key) => {
  playSound(key.note, sounds);
  key.keyButton.classList.add("active");
};
const deactivateKey = (key) => key.keyButton.classList.remove("active");
let pressedKey = null;
let keyboardLocked = false;
const onKeyButtonDown = (key) => {
  activateKey(key);
};
const onKeyButtonUp = (key) => {
  deactivateKey(key);
};
const initKeyClicks = (keys2) => {
  keys2.forEach((key) => {
    const keyButton = key.keyButton;
    if ("ontouchstart" in window) {
      keyButton.addEventListener("touchstart", () => onKeyButtonDown(key));
      keyButton.addEventListener("touchend", () => onKeyButtonUp(key));
    } else {
      keyButton.addEventListener("mousedown", () => onKeyButtonDown(key));
      keyButton.addEventListener("mouseup", () => onKeyButtonUp(key));
    }
  });
};
const initKeyboard = (keys2) => {
  const handleKeydown = (e) => {
    if (pressedKey || keyboardLocked) return;
    const key = findPressedKey(e, keys2);
    if (e.repeat || !key) return;
    pressedKey = key;
    activateKey(pressedKey);
  };
  const handleKeyup = (e) => {
    if (keyboardLocked) return;
    const key = findPressedKey(e, keys2);
    if (key && key === pressedKey) {
      deactivateKey(key);
      pressedKey = null;
    }
  };
  document.body.addEventListener("keydown", handleKeydown);
  document.body.addEventListener("keyup", handleKeyup);
};
const disableKeyboard = () => keyboardLocked = true;
const enableKeyboard = () => keyboardLocked = false;
const initKeyInteractions = (keys2) => {
  initKeyClicks(keys2);
  initKeyboard(keys2);
};
const WAIT_TIME = 400;
const sanitizeInputValue = (keys2, input) => {
  const maxLength = keys2.length * 2;
  const original = input.value;
  const cleaned = original.replace(/[^A-Za-z]/g, "");
  if (cleaned !== original) {
    showErrorMessage(input, {
      text: "Please enter only Latin letters"
    });
  }
  const validValues = keys2.map((key) => {
    return key.assignedKey;
  });
  const filtered = [...input.value.toUpperCase()].filter((val) => {
    return validValues.includes(val);
  }).slice(0, maxLength);
  return filtered.join("");
};
const handleInputChange = (keys2, input) => {
  input.value = sanitizeInputValue(keys2, input);
};
const playKeySequence = (button, input, keys2) => {
  button.addEventListener(
    "click",
    () => onPlayButtonClick(button, input, keys2)
  );
};
const onPlayButtonClick = async (button, input, keys2) => {
  const keySequence = input.value.split("");
  disableInteraction(button, input, keys2);
  disableKeyboard();
  for (const key of keySequence) {
    let existedKey = keys2.find((el) => el.assignedKey === key);
    activateKey(existedKey);
    await delay(WAIT_TIME);
    deactivateKey(existedKey);
  }
  enableInteraction(button, input, keys2);
  enableKeyboard();
};
const initKeySequence = (button, input, keys2) => {
  input.addEventListener("input", () => handleInputChange(keys2, input));
  playKeySequence(button, input, keys2);
};
const addFavicon = (url) => {
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/x-icon";
  link.href = url;
  document.head.appendChild(link);
};
addFavicon("./favicon.ico");
const keysData = [
  { name: "A", note: "C", code: "KeyA", slot: "first" },
  { name: "S", note: "D", code: "KeyS", slot: "second" },
  { name: "D", note: "E", code: "KeyD", slot: "third" },
  { name: "F", note: "F", code: "KeyF", slot: "fourth" },
  { name: "G", note: "G", code: "KeyG", slot: "fifth" },
  { name: "H", note: "A", code: "KeyH", slot: "sixth" },
  { name: "J", note: "B", code: "KeyJ", slot: "seventh" }
];
loadSounds();
const { keys, editInputWrapper, editField, playerField, playerButton } = initUI(keysData);
initKeyInteractions(keys);
initEdit(keys, editInputWrapper, editField, playerField, playerButton);
initKeySequence(playerButton, playerField, keys);
