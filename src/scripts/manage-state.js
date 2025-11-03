const disableInteraction = (button, input, keys) => {
  input.disabled = true;
  button.disabled = true;
  input.classList.add("disabled");
  button.classList.add("disabled", "button--disabled");

  keys.forEach((key) => key.keyButton.classList.add("disabled"));
};

const enableInteraction = (button, input, keys) => {
  input.disabled = false;
  button.disabled = false;
  input.classList.remove("disabled");
  button.classList.remove("disabled", "button--disabled");

  keys.forEach((key) => key.keyButton.classList.remove("disabled"));
};

export { disableInteraction, enableInteraction };
