import { showErrorMessage } from "./utils";

const initKeySequence = (input, keys) => {
  input.addEventListener("input", () => handleInputChange(keys, input));
};

const handleInputChange = (keys, input) => {
  input.value = sanitizeInputValue(keys, input);
};

const sanitizeInputValue = (keys, input) => {
  const maxLength = keys.length * 2;

  const original = input.value;
  const cleaned = original.replace(/[^A-Za-z]/g, "");

  if (cleaned !== original) {
    showErrorMessage(input, {text: 'Please enter only Latin letters', top: '45px'});
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

export { initKeySequence };
