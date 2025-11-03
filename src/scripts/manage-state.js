const disableInteraction = (button, input, keys) => {
  input.disabled = true;
  button.disabled = true;
  input.classList.add("disabled");
  button.classList.add("disabled", "button--disabled");

  keys.forEach((key) => {
    key.keyButton.classList.add("disabled");
    key.editButton.classList.add("disabled", "button--disabled");
  });
};

const enableInteraction = (button, input, keys) => {
  input.disabled = false;
  button.disabled = false;
  input.classList.remove("disabled");
  button.classList.remove("disabled", "button--disabled");

  keys.forEach((key) => {
    key.keyButton.classList.remove("disabled");
    key.editButton.classList.remove("disabled", "button--disabled");
  });
};

export { disableInteraction, enableInteraction };
