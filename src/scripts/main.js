import 'modern-normalize/modern-normalize.css';
import "../styles/style.scss";
import { initUI } from "./createUI";
import { initEdit } from "./edit";


const keysData = [
  { name: "A", code: "KeyA", slot: "first" },
  { name: "S", code: "KeyS", slot: "second" },
  { name: "D", code: "KeyD", slot: "third" },
  { name: "F", code: "KeyF", slot: "fourth" },
  { name: "G", code: "KeyG", slot: "fifth" },
  { name: "H", code: "KeyH", slot: "sixth" },
  { name: "J", code: "KeyJ", slot: "seventh" },
  { name: "K", code: "KeyK", slot: "eighth" },
];

const { keys, editInputWrapper, editField } = initUI(keysData);

initEdit(keys, editInputWrapper, editField);