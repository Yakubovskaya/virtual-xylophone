import { showErrorMessage, delay } from "./utils";
import { activateKey } from "./key-interactions";
import { deactivateKey } from "./key-interactions";
import { disableInteraction, enableInteraction } from "./manage-state";
import { disableKeyboard, enableKeyboard } from "./key-interactions";

const WAIT_TIME = 400;

const sanitizeInputValue = (keys, input) => {
  const maxLength = keys.length * 2;

  const original = input.value;
  const cleaned = original.replace(/[^A-Za-z]/g, "");

  if (cleaned !== original) {
    showErrorMessage(input, {
      text: "Please enter only Latin letters",
    });
  }

  const validValues = keys.map((key) => {
    return key.assignedKey;
  });
  const filtered = [...input.value.toUpperCase()]
    .filter((val) => {
      return validValues.includes(val);
    })
    .slice(0, maxLength);

  return filtered.join("");
};

const handleInputChange = (keys, input) => {
  input.value = sanitizeInputValue(keys, input);
};

const playKeySequence = (button, input, keys) => {
  button.addEventListener("click", () =>
    onPlayButtonClick(button, input, keys),
  );
};

const onPlayButtonClick = async (button, input, keys) => {
  const keySequence = input.value.split("");

  disableInteraction(button, input, keys);
  disableKeyboard();

  for (const key of keySequence) {
    let existedKey = keys.find((el) => el.assignedKey === key);
    activateKey(existedKey);
    await delay(WAIT_TIME);
    deactivateKey(existedKey);
  }

  enableInteraction(button, input, keys);
  enableKeyboard();
};

const initKeySequence = (button, input, keys) => {
  input.addEventListener("input", () => handleInputChange(keys, input));
  playKeySequence(button, input, keys);
};

export { initKeySequence };
