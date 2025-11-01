import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'modern-normalize/modern-normalize.css';
import "../styles/style.scss";
import { initUI } from "./createUI";


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

initUI(keysData);