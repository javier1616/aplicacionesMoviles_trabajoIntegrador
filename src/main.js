import { render, initRouter } from "./router.js";

/* preguntar al profe si se puede usar window.navigate o es mejor otra cosa */
import { navigate } from "./router.js";
window.navigate = navigate;
/* ------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  render();
  console.log("main js loaded");
});





/*
import { render } from "./router.js";

window.navigate = (path) => {
  history.pushState({}, "", path);
  render();
};

window.addEventListener("popstate", render);

render();
*/