import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Contacto() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header();

    viewContainer.innerHTML += loadContacto();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadContacto() {
    return `<main><h1>Contacto</h1></main>`
}