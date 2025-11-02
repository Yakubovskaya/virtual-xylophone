import "modern-normalize/modern-normalize.css";
import "../styles/style.scss";
import { initUI } from "./createUI";
import { initEdit } from "./edit";
import { loadSounds } from "./key-sounds";
import { initKeyInteractions } from "./key-interactions";

const addFavicon = (url) => {
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/x-icon";
  link.href = url;
  document.head.appendChild(link);
};

addFavicon("./favicon.ico");
loadSounds();

const keysData = [
  { name: "A", code: "KeyA", slot: "first" },
  { name: "S", code: "KeyS", slot: "second" },
  { name: "D", code: "KeyD", slot: "third" },
  { name: "F", code: "KeyF", slot: "fourth" },
  { name: "G", code: "KeyG", slot: "fifth" },
  { name: "H", code: "KeyH", slot: "sixth" },
  { name: "J", code: "KeyJ", slot: "seventh" },
];

const { keys, editInputWrapper, editField } = initUI(keysData);

initKeyInteractions(keys);
initEdit(keys, editInputWrapper, editField);

