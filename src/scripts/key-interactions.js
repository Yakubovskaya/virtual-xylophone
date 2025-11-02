import { sounds, playSound } from "./key-sounds";

const findPressedKey = (e, keys) => keys.find((key) => key.code === e.code);
const activateKey = (key) => {
  playSound(key.assignedKey, sounds);
  key.keyButton.classList.add("active");
};
const deactivateKey = (key) => key.keyButton.classList.remove("active");
let pressedKey = null;

const onKeyButtonDown = (key) => {
  activateKey(key);
};

const onKeyButtonUp = (key) => {
  deactivateKey(key);
};

const initKeyClicks = (keys) => {
  keys.forEach((key) => {
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

const initKeyboard = (keys) => {
  const handleKeydown = (e) => {
    if (pressedKey) return;
    const key = findPressedKey(e, keys);
    if (e.repeat || !key) return;
    pressedKey = key;
    activateKey(pressedKey);
  };

  const handleKeyup = (e) => {
    const key = findPressedKey(e, keys);
    if (key && key === pressedKey) {
      deactivateKey(key);
      pressedKey = null;
    }
  };

  document.body.addEventListener("keydown", handleKeydown);
  document.body.addEventListener("keyup", handleKeyup);
};

const initKeyInteractions = (keys) => {
  initKeyClicks(keys);
  initKeyboard(keys);
};

export { initKeyInteractions };
