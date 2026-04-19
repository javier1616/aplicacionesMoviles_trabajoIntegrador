import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";


export function Home() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Home");

    viewContainer.innerHTML += loadHome();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadHome() {
    return `<main>
                <p>EL PROXIMO PASO ES QUE CUANDO ACCEDO AL DETALLE<br>
                    LA CARD SE AGREGA AL HISTORIAL</p>
                <p>https://www.formula1.com/en/racing/2026</p>
                <p>https://www.f1racinghub.com/drivers</p>
                <p>https://www.f1racinghub.com/about</p>
                <p>localStorage.setItem("fav", "true");
                    Así la estrella queda marcada aunque recargues.<p>
                <ul>
                    <li>RF01 - Home             X </li>
                    <li>RF02 - Busqueda 3f      X </li>
                    <li>RF03 - Resultados       X </li>
                    <li>RF04 - Detalles         X </li>
                    <li>RF05 - Favoritos        X </li>
                    <li>RF06 - Historial        X </li>
                    <li>RF07 - Contacto + form  X </li>
                    <li>RF08 - Responsive       X </li>
                    <li>RFXX - PWA              X </li>
                    
                </ul>
            </main>`
}

