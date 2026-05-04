
export function Navbar() {




  return `
      <button class="navbar-button" id="navbar-home-button" data-route="/">
        <img class="icono" id="icon-home" src="./src/assets/icons/banderas.png" />
        <span class="navbar-icon-description">Home</span>
      </button>
      <button class="navbar-button" data-route="/search">
        <img class="icono" src="./src/assets/icons/binoculares3.png" />
        <span class="navbar-icon-description">Busqueda</span>
      </button>
      <button class="navbar-button" data-route="/championship">
        <img class="icono" src="./src/assets/icons/trofeo3.png" />
        <span class="navbar-icon-description">Campeonato</span>
      </button>
      <button class="navbar-button" data-route="/favorite">
        <img class="icono" src="./src/assets/icons/medalla.png" />
        <span class="navbar-icon-description">Favoritos</span>
      </button>
      <button class="navbar-button" data-route="/history">
        <img class="icono" src="./src/assets/icons/crono1.png" />
        <span class="navbar-icon-description">Historial</span>
      </button>
      <button class="navbar-button" data-route="/contact">
        <img class="icono" src="./src/assets/icons/location.png" />
        <span class="navbar-icon-description">Contacto</span>
      </button>`;
}


export function initNavbar() {
  const mobile = window.matchMedia("(max-width: 1023px)");

  function updateIcons(e) {
    const isMobile = e.matches;

    const icon = document.getElementById("icon-home");
    if (!icon) return;

    icon.src = isMobile
      ? "./src/assets/icons/banderas.png"
      : "./src/assets/img/f1_logo.svg";
  }

  updateIcons(mobile);
  mobile.addEventListener("change", updateIcons);
}