import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";


export function Home() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header();

    viewContainer.innerHTML += loadHome();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadHome() {
    return `<main>
                <h1>Home</h1>
                <p>https://www.flaticon.es/resultados?word=f1</p>
                <p>Tenes que dimensionar con em y eso para que se achique bien</p>
            </main>`
}

