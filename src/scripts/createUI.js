const createAppContainer = () => {
  const app = document.createElement("div");
  app.classList.add("app");
  document.body.appendChild(app);
  return app;
};

const createEditInput = (container) => {
  const editInputWrapper = document.createElement("div");
  editInputWrapper.classList.add("edit-input","edit-input__wrapper");

  const editLabel = document.createElement("label");
  editLabel.textContent = 'Edit key';
  editLabel.classList.add("edit-input__label");
  editInputWrapper.appendChild(editLabel);

  const editField = document.createElement("input");
  editField.classList.add("edit-input__field");
  editInputWrapper.appendChild(editField);

  container.appendChild(editInputWrapper);

  return { editInputWrapper, editField };
};

const createKeyboardContainer = (parent) => {
  const keyboardContainer = document.createElement("div");
  keyboardContainer.classList.add("keyboard");
  parent.appendChild(keyboardContainer);
  return keyboardContainer;
};

const createKeys = (container, keysData) => {
  keysData.map((key) => {
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
    keyButton.classList.add("key__button", `key__button--${key.colorClass}`);
    keyContainer.appendChild(keyButton);

    container.appendChild(keyContainer);
    return { keyContainer, editButton, keyName, keyButton };
  });
};

const createPlayerInput = (container) => {
  const playerInputWrapper = document.createElement("div");
  playerInputWrapper.classList.add("player-input","player-input__wrapper");

  const playerLabel = document.createElement("label");
  playerLabel.textContent = 'Enter key sequence';
  playerLabel.classList.add("player-input__label");
  playerInputWrapper.appendChild(playerLabel);

  const playerField = document.createElement("input");
  playerField.classList.add("player-input__field");
  playerInputWrapper.appendChild(playerField);

  const playerButton = document.createElement("button");
  playerButton.classList.add("button", "player-input__button");
  playerButton.textContent = 'Play';
  playerInputWrapper.appendChild(playerButton);

  container.appendChild(playerInputWrapper);

  return { playerInputWrapper, playerField, playerButton };
};

const initUI = (keysData) => {
  const app = createAppContainer();
  const { editInputWrapper, editField } = createEditInput(app);
  const keyboardContainer = createKeyboardContainer(app);
  const keys = createKeys(keyboardContainer, keysData);
  const { playerInputWrapper, playerField, playerButton } = createPlayerInput(app);

  return { 
    app, 
    keyboardContainer, 
    editInputWrapper, 
    editField, 
    keys, 
    playerInputWrapper, 
    playerField, 
    playerButton 
  };
};

export { initUI };
