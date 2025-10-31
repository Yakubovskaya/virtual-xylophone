import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { initUI } from "./createUI";
import "../styles/style.scss";

const keysData = [
  { name: "A", code: "KeyA", colorClass: "red" },
  { name: "S", code: "KeyS", colorClass: "orange" },
  { name: "D", code: "KeyD", colorClass: "yellow" },
  { name: "F", code: "KeyF", colorClass: "green" },
  { name: "G", code: "KeyG", colorClass: "blue" },
  { name: "H", code: "KeyH", colorClass: "dark-blue" },
  { name: "J", code: "KeyJ", colorClass: "purple" },
  { name: "K", code: "KeyK", colorClass: "pink" },
];

initUI(keysData);