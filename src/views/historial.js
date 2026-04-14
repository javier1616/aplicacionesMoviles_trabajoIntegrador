import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Historial() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Historial");

    viewContainer.innerHTML += loadHistorial();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadHistorial() {
    return `<main><h1>Historial</h1></main>`
}