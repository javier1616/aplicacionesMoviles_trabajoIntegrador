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
                <div id="home-container">
                    <div>
                        <button class="home-team-button" data-constructorId="alpine">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026alpinelogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="ferrari">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026ferrarilogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="mercedes">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026mercedeslogowhite.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                    </div>
                    <div>
                        <button class="home-team-button" data-constructorId="cadillac">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026cadillaclogowhite.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="audi">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026audilogowhite.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="williams">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026williamslogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="rb">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026racingbullslogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="red_bull">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026redbullracinglogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                    </div>
                    <div>
                        <button class="home-team-button" data-constructorId="haas">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026haasf1teamlogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="mclaren">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026mclarenlogo.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                        <button class="home-team-button" data-constructorId="aston_martin">
                            <div class="home-img-team-container">
                                <img src="./src/assets/img/2026astonmartinlogowhite.avif" class="home-img-team-icon" alt="imagen">
                            </div>
                        </button>
                    </div>
                </div>
            </main>`
}

