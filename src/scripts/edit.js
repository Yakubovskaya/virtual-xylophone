const initEdit = (keys, inputWrapper, inputEl) => {
  keys.forEach((keyObj) => {
    const { editButton } = keyObj;
    editButton.addEventListener("click", () =>
      onEditButtonClick(inputWrapper, inputEl, keyObj, keys),
    );
  });
};

const onEditButtonClick = (inputWrapper, inputEl, keyObj, keys) => {
  inputWrapper.classList.remove("hidden");
  inputEl.value = keyObj.assignedKey;
  inputEl.focus();

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      const newKey = e.target.value.toUpperCase();

      const isDuplicate = keys.some((key) => {
        return key.assignedKey === newKey && key !== keyObj;
      });

      const isValid = /^[A-Z]$/.test(newKey);

      if (!isDuplicate && isValid) {
        keyObj.assignedKey = newKey;
        keyObj.keyName.textContent = newKey;
      } else {
        const oldMsg = inputWrapper.querySelector(".error-msg");
        if (oldMsg) oldMsg.remove();

        inputEl.classList.add("is-invalid");

        const msg = document.createElement("span");
        msg.textContent = isDuplicate
          ? "This key is already in use"
          : "Please enter one Latin letter";
        msg.classList.add("error-msg");
        inputWrapper.appendChild(msg);

        setTimeout(() => {
          inputEl.classList.remove("is-invalid");
          msg.remove();
        }, 2000);
        return;
      }

      inputWrapper.classList.add("hidden");
      inputEl.removeEventListener("keydown", enterHandler);
    }
  };

  inputEl.addEventListener("keydown", enterHandler);
};

export { initEdit };
