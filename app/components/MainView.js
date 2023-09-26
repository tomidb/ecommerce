import { ProductsCards } from "./ProductsCards.js";
import { Auth } from "../helpers/authCheck.js";

export async function MainView(products) {
  console.log("ENTRA A MAINVIEW");
  let $products = document.createElement("div");
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
    });
    console.log(html);
    $products.innerHTML = html;
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
      console.log("dentro de product");
    });
    console.log(html);
    $products.innerHTML = html;
    console.log($products);
  }
}
