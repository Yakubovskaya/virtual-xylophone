import { showErrorMessage } from "./utils";
import { activateKey } from "./key-interactions";
import { deactivateKey } from "./key-interactions";

const sanitizeInputValue = (keys, input) => {
  const maxLength = keys.length * 2;

  const original = input.value;
  const cleaned = original.replace(/[^A-Za-z]/g, "");

  if (cleaned !== original) {
    showErrorMessage(input, {
      text: "Please enter only Latin letters",
      top: "45px",
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

const initKeySequence = (button, input, keys) => {
  input.addEventListener("input", () => handleInputChange(keys, input));
  playKeySequence(button, input, keys);
};

const playKeySequence = (button, input, keys) => {
  button.addEventListener("click", () => onPlayButtonClick(input, keys));
};

const onPlayButtonClick = (input, keys) => {
  const keySequence = input.value.split("");
  keySequence.forEach((key, index) => {
    let existedKey = keys.find((el) => el.assignedKey === key);
    setTimeout(() => {
      activateKey(existedKey);
      setTimeout(() => deactivateKey(existedKey), 400);
    }, 400 * index);
  });
};

export { initKeySequence };
