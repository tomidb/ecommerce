import { Auth } from "../helpers/authCheck.js";
import { ProductsCards } from "./ProductsCards.js";
import { app, db } from "../helpers/firebase.js";
import {
  updateDoc,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

export function Favs() {
  console.log("ENTRA A FAVS");
  const $favsBigContainer = document.createElement("div");
  const $favsContainer = document.createElement("div");
  $favsBigContainer.classList.add("favs-container");
  $favsContainer.classList.add("favs-container", "grid-fluid");

  let getFavs = async () => {
    let html = ``;
    let favs = await Auth.userDb.getFavsWithDetails();
    console.log(favs);

    await favs.forEach(async (product) => {
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

      $favsContainer.innerHTML = html;
      $favsBigContainer.appendChild($favsContainer);
    });
  };

  getFavs();
  return $favsBigContainer;
}
