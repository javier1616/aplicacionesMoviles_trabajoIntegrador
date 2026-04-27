
export function Navbar() {
  return `
      <button class="navbar-button" onclick="window.navigate('/')">
        <img class="icono" src="./src/assets/icons/banderas.png" />
        <span class="navbar-icon-description">Home</span>
      </button>
      <button class="navbar-button" onclick="window.navigate('/search')">
        <img class="icono" src="./src/assets/icons/binoculares3.png" />
        <span class="navbar-icon-description">Busqueda</span>
      </button>
      <button class="navbar-button" onclick="window.navigate('/championship')">
        <img class="icono" src="./src/assets/icons/trofeo3.png" />
        <span class="navbar-icon-description">Campeonato</span>
      </button>
      <button class="navbar-button" onclick="window.navigate('/favorite')">
        <img class="icono" src="./src/assets/icons/medalla.png" />
        <span class="navbar-icon-description">Favoritos</span>
      </button>
      <button class="navbar-button" onclick="window.navigate('/history')">
        <img class="icono" src="./src/assets/icons/crono1.png" />
        <span class="navbar-icon-description">Historial</span>
      </button>
      <button class="navbar-button" onclick="window.navigate('/contact')">
        <img class="icono" src="./src/assets/icons/location.png" />
        <span class="navbar-icon-description">Contacto</span>
      </button>`;
}