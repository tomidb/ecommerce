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

/*
  await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) =>
      json.forEach((element) => {
        console.log(element);
        const $slide = d.createElement("a");
        $slide.textContent = element;
        $slide.classList.add("category-slide");
        $sliderContainer.appendChild($slide);
      })
    )
    .catch((err) => {
      let message = err.statusText || "Ocurrio un error alacceder a la API";

      document.getElementById("main").innerHTML = `
    <div class="error">
      <p>Error ${err.status}: ${message}</p>
    </div>
    `;

      console.log(err);
    });

    */

// SEGUNDA FUNCION DE PRUEBA
/*
  let getSlider = async () => {
    await fetch_request({
      url: "https://fakestoreapi.com/products/categories",
      cbSuccess: async (categories) => {
        await categories.forEach(async (category) => {
          console.log(category);
          const $slide = d.createElement("a");
          $slide.textContent = category;
          $slide.classList.add("category-slide");
          $sliderContainer.appendChild($slide);
        });
      },
    });
  };
*/

/*

export function CategoriesSlider() {
  const d = document,
    $sliderContainer = d.createElement("div");
  $sliderContainer.classList.add("slider-container", "display-toggle");

  let getSlider = async () => {
    await fetch("https://fakestoreapi.com/products/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) =>
        json.forEach((element) => {
          console.log(element);
          const $slide = d.createElement("a");
          $slide.textContent = element;
          $slide.classList.add("category-slide");
          $sliderContainer.appendChild($slide);
        })
      )
      .catch((err) => {
        let message = err.statusText || "Ocurrio un error alacceder a la API";

        document.getElementById("main").innerHTML = `
    <div class="error">
      <p>Error ${err.status}: ${message}</p>
    </div>
    `;

        console.log(err);
      });
  };

  getSlider();
  return $sliderContainer;
}

*/
