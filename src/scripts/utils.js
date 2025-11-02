const showErrorMessage = (input, options = {}) => {
  const {
    text = "Invalid",      
    parent = input.parentElement,
    className = "error-msg",      
    top = null                    
  } = options;

  const oldMsg = parent.querySelector(className);
  if (oldMsg) oldMsg.remove();

  input.classList.add("is-invalid");

  const msg = document.createElement("span");
  msg.textContent = text;
  msg.classList.add(className);

  if(top !== null)
  msg.style.top = top;

  parent.appendChild(msg);

  setTimeout(() => {
    input.classList.remove("is-invalid");
    msg.remove();
  }, 2000);
  return;
};

export { showErrorMessage };