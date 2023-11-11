import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../helpers/firebase.js";
import { Auth } from "../helpers/authCheck.js";
import { ProductsCards } from "./ProductsCards.js";

export function fetchCategories() {
  const $CategoriesCardBigContainer = document.createElement("div");
  const $CategoriesCardContainer = document.createElement("div");
  $CategoriesCardBigContainer.classList.add("categories-container");
  $CategoriesCardContainer.classList.add("grid-fluid", "categories-container");

  let CreateCards = async () => {
    const productsCollectionRef = collection(db, "products");
    const currentHash = window.location.hash;
    const categoryMatch = currentHash.match(/#\/category\/(\w+)/);
    const category = categoryMatch[1];
    console.log(category);
    const q = query(productsCollectionRef, where("category", "==", category));

    try {
      const querySnapshot = await getDocs(q);
      const products = [];

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      if (!Auth.userDb) {
        let html = ``;
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
          $CategoriesCardContainer.innerHTML = html;
        });
      } else if (Auth.userDb) {
        let html = ``;
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

          $CategoriesCardContainer.innerHTML = html;
        });
      }
      console.log(products);

      $CategoriesCardBigContainer.appendChild($CategoriesCardContainer);
      return products;
    } catch (error) {
      console.error("Error al obtener monitores:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz
      return [];
    }
  };

  CreateCards();

  return $CategoriesCardBigContainer;
}
