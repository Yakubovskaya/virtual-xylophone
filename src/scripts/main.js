import 'modern-normalize/modern-normalize.css';
import "../styles/style.scss";
import { initUI } from "./createUI";
import { initEdit } from "./edit";

const addFavicon = (url) => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = url;
  document.head.appendChild(link);
}

const keysData = [
  { name: "A", code: "KeyA", slot: "first" },
  { name: "S", code: "KeyS", slot: "second" },
  { name: "D", code: "KeyD", slot: "third" },
  { name: "F", code: "KeyF", slot: "fourth" },
  { name: "G", code: "KeyG", slot: "fifth" },
  { name: "H", code: "KeyH", slot: "sixth" },
  { name: "J", code: "KeyJ", slot: "seventh" }
];

addFavicon('./favicon.ico');

const { keys, editInputWrapper, editField } = initUI(keysData);

initEdit(keys, editInputWrapper, editField);