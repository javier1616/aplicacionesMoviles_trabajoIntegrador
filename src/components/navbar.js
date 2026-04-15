
export function Navbar() {
  return `
      <button onclick="window.navigate('/')">
        <img class="icono" src="./src/assets/icons/garaje.png" />
        <span class="navbar-icon-description">Home</span>
      </button>
      <button onclick="window.navigate('/search')">
        <img class="icono" src="./src/assets/icons/search.png" />
        <span class="navbar-icon-description">Busqueda</span>
      </button>
      <button onclick="window.navigate('/contact')">
        <img class="icono" src="./src/assets/icons/casco.png" />
        <span class="navbar-icon-description">Contacto</span>
      </button>
      <button onclick="window.navigate('/detail')">
        <img class="icono" src="./src/assets/icons/boxes.png" />
        <span class="navbar-icon-description">Detalle</span>
      </button>
      <button onclick="window.navigate('/history')">
        <img class="icono" src="./src/assets/icons/boxes.png" />
        <span class="navbar-icon-description">Historial</span>
      </button>
      <button onclick="window.navigate('/wishList')">
        <img class="icono" src="./src/assets/icons/boxes.png" />
        <span class="navbar-icon-description">WishList</span>
      </button>`;
}