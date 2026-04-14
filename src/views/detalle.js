import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Detalle() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Detalle");

    viewContainer.innerHTML += loadDetalle();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadDetalle() {
    return `<main><h1>Detalle</h1></main>`
}