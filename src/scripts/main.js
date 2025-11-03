import "modern-normalize/modern-normalize.css";
import "../styles/style.scss";
import { initUI } from "./createUI";
import { initEdit } from "./edit";
import { loadSounds } from "./key-sounds";
import { initKeyInteractions } from "./key-interactions";
import { initKeySequence } from "./key-sequence";

const addFavicon = (url) => {
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/x-icon";
  link.href = url;
  document.head.appendChild(link);
};

addFavicon("./favicon.ico");

const keysData = [
  { name: "A", note: "C", code: "KeyA", slot: "first" },
  { name: "S", note: "D", code: "KeyS", slot: "second" },
  { name: "D", note: "E", code: "KeyD", slot: "third" },
  { name: "F", note: "F", code: "KeyF", slot: "fourth" },
  { name: "G", note: "G", code: "KeyG", slot: "fifth" },
  { name: "H", note: "A", code: "KeyH", slot: "sixth" },
  { name: "J", note: "B", code: "KeyJ", slot: "seventh" },
];

loadSounds();

const { keys, editInputWrapper, editField, playerField, playerButton } =
  initUI(keysData);

initKeyInteractions(keys);
initEdit(keys, editInputWrapper, editField, playerField, playerButton);
initKeySequence(playerButton, playerField, keys);
