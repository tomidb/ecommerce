import { App } from "./App.js";
import "./helpers/firebase.js";
console.log("ENTRA A INDEX");
document.addEventListener("DOMContentLoaded", App());

window.addEventListener("hashchange", () => {
  App();
});
