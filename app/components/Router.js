import { fetch_request } from "../helpers/fetch_request.js";
import { ProductsCards } from "./ProductsCards.js";
import { MainView } from "./MainView.js";
import { SignUp } from "./SignUp.js";
import { Login } from "./Login.js";
import { Favs } from "./Favs.js";
import { MisCompras } from "./MisCompras.js";
import { Cart } from "./Cart.js";
import { Auth } from "../helpers/authCheck.js";

export async function Router() {
  console.log("ENTRA A ROUTER");
  const d = document,
    w = window;
  let { hash } = location;

  if (!hash || hash === "#/") {
    // Remover la clase .grid-fluid
    d.getElementById("main").classList.add("grid-fluid");

    await fetch_request({
      url: "https://fakestoreapi.com/products",
      cbSuccess: async (products) => {
        if (!Auth.userDb) {
          let html = "";
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
            d.getElementById("main").innerHTML = html;
          });
        } else if (Auth.userDb) {
          let html = "";
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

            d.getElementById("main").innerHTML = html;
          });
        }
      },
    });
  } else if (hash === "#/signup") {
    // Añadir la clase .grid-fluid
    d.getElementById("main").classList.add("grid-fluid");

    d.getElementById("main").appendChild(SignUp());
  } else if (hash === "#/login") {
    // Añadir la clase .grid-fluid
    d.getElementById("main").classList.add("grid-fluid");

    d.getElementById("main").appendChild(Login());
  } else if (hash === "#/favoritos") {
    // Añadir la clase .grid-fluid
    d.getElementById("main").classList.add("grid-fluid");

    d.getElementById("main").appendChild(Favs());
  } else if (hash === "#/mis-compras") {
    // Añadir la clase .grid-fluid
    d.getElementById("main").classList.add("grid-fluid");

    d.getElementById("main").appendChild(MisCompras());
  } else if (hash === "#/cart") {
    // Remover la clase .grid-fluid
    d.getElementById("main").classList.remove("grid-fluid");

    d.getElementById("main").appendChild(Cart());
  }
}
