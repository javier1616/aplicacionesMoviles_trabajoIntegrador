import { render, initRouter } from "./router.js";
import { Navbar } from "./components/navbar.js";

/* preguntar al profe si se puede usar window.navigate o es mejor otra cosa */
import { navigate } from "./router.js";
window.navigate = navigate;
/* ------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  
  //const nav_container = document.createElement("div");
  //nav_container.innerHTML = Navbar();

  const nav = document.getElementById("nav");

  const nav_component = document.createElement("div");
  nav_component.innerHTML = Navbar();

  nav.replaceChildren(...nav_component.children);

  render();
  console.log("main js loaded");
});

