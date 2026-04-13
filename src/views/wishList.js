import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function WishList() {

    
    const viewContainer = document.createElement("div");

   
    viewContainer.innerHTML += Header("Header WishList");

    viewContainer.innerHTML += loadWishList();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadWishList() {
    return `<main><h1>WishList</h1></main>`
}