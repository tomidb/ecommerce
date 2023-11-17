import { fetch_request } from "../helpers/fetch_request.js";
import { ProductsCards } from "./ProductsCards.js";
import { SignUp } from "./SignUp.js";
import { Login } from "./Login.js";
import { Favs } from "./Favs.js";
import { MisCompras } from "./MisCompras.js";
import { Cart } from "./Cart.js";
import { Auth } from "../helpers/authCheck.js";
import { Product } from "./Product.js";
import { AdmPanel } from "./AdmPanel.js";
import { fetch_firestore } from "../helpers/fetch_firestore.js";
import { collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../helpers/firebase.js";
import { fetchCategories } from "./Categories.js";
import { Informacion } from "./Informacion.js";
import { ToastModule } from "./ToastModule.js";

export async function Router() {
  console.log("ENTRA A ROUTER");
  const d = document,
    w = window,
    $main = d.getElementById("main"),
    $slider = d.querySelector(".big-container");

  let { hash } = location;

  if (!hash || hash === "#/") {
    $main.classList.add("grid-fluid");
    $slider.classList.remove("display-toggle");
    fetch_firestore({
      ref: collection(db, "products"),
      cbSuccess: async (products) => {
        if (!Auth.userDb) {
          let html = `<h2 class="home-title">Todos nuestros productos</h2>`;
          console.log(Auth.userDb);
          console.log("NO HAY USUARIOS CONECTADOS");
          await products.forEach(async (product) => {
            const favIconClass = "far";
            const cartIconClass = "neutral-color";
            html += ProductsCards({
              ...product,
              favIconClass,
              cartIconClass,
            });
            $main.innerHTML = html;
          });
        } else if (Auth.userDb) {
          let html = `<h2 class="home-title">Todos nuestros productos</h2>`;
          console.log(Auth.userDb);
          console.log("HAY USUARIOS CONECTADOS");
          await products.forEach(async (product) => {
            const favorites = await Promise.resolve(Auth.userDb.getFavorites());
            const isFavorite = await favorites.includes(product.id.toString());
            const favIconClass = (await isFavorite) ? "fas" : "far";

            const cart = await Promise.resolve(Auth.userDb.getCart());
            const isInCart = await cart.includes(product.id.toString());
            const cartIconClass = (await isInCart)
              ? "success-color"
              : "neutral-color";

            html += ProductsCards({
              ...product,
              isFavorite,
              favIconClass,
              isInCart,
              cartIconClass,
            });

            $main.innerHTML = html;
          });
        }
      },
    });
  } else if (hash === "#/signup") {
    // Añadir la clase .grid-fluid
    $main.classList.add("grid-fluid");
    $slider.classList.add("display-toggle");

    $main.appendChild(SignUp());
  } else if (hash === "#/login") {
    // Añadir la clase .grid-fluid
    $main.classList.add("grid-fluid");
    $slider.classList.add("display-toggle");

    $main.appendChild(Login());
  } else if (hash === "#/favoritos") {
    // Añadir la clase .grid-fluid
    $main.classList.remove("grid-fluid");
    $slider.classList.add("display-toggle");
    $main.appendChild(Favs());
  } else if (hash === "#/mis-compras") {
    // Añadir la clase .grid-fluid
    $main.classList.add("grid-fluid");
    $slider.classList.add("display-toggle");

    $main.appendChild(MisCompras());
  } else if (hash === "#/cart") {
    // Remover la clase .grid-fluid
    $main.classList.remove("grid-fluid");
    $slider.classList.add("display-toggle");
    $main.appendChild(Cart());
  } else if (hash.includes("#/product/")) {
    $slider.classList.add("display-toggle");
    $main.classList.add("grid-fluid");
    $main.appendChild(Product());
  } else if (hash.includes("#/category/")) {
    $slider.classList.add("display-toggle");
    $main.classList.remove("grid-fluid");
    $main.appendChild(fetchCategories());
  } else if (hash === "#/informacion") {
    $main.classList.remove("grid-fluid");
    $slider.classList.add("display-toggle");
    $main.appendChild(Informacion());
  } else if (hash === "#/buyitadminpanel") {
    $main.classList.remove("grid-fluid");
    $slider.classList.add("display-toggle");
    $main.appendChild(AdmPanel());
  }
}
