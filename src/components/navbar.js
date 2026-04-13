
export function Navbar() {
  return `
      <button onclick="window.navigate('/')">
        <img class="icono" src="./src/assets/icons/garaje.png" />
        <span>Home</span>
      </button>
      <button onclick="window.navigate('/search')">
        <img class="icono" src="./src/assets/icons/search.png" />
        <span>Busqueda</span>
      </button>
      <button onclick="window.navigate('/contact')">
        <img class="icono" src="./src/assets/icons/casco.png" />
        <span>Contacto</span>
      </button>
      <button onclick="window.navigate('/detail')">
        <img class="icono" src="./src/assets/icons/boxes.png" />
        <span>Detalle</span>
      </button>
      <button onclick="window.navigate('/history')">
        <img class="icono" src="./src/assets/icons/boxes.png" />
        <span>Historial</span>
      </button>
      <button onclick="window.navigate('/wishList')">
        <img class="icono" src="./src/assets/icons/boxes.png" />
        <span>WishList</span>
      </button>`;
}