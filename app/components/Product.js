import { fetch_request } from "../helpers/fetch_request.js";
import { Auth } from "../helpers/authCheck.js";

export function Product() {
  const d = document,
    $productContainer = d.createElement("div"),
    $product = d.createElement("article");

  $productContainer.classList.add("product-content");
  $product.classList.add("product-container");

  let ProductCard = async () => {
    const currentHash = window.location.hash;
    const productIdMatch = currentHash.match(/#\/product\/(\d+)/);
    const productId = productIdMatch[1];
    await fetch_request({
      url: `https://fakestoreapi.com/products/${productId}`,
      cbSuccess: async (product) => {
        $productContainer.innerHTML = `
        <div class="product-title-container">
          <p class="product-title-prod">${product.title}</p>
        </div>
        <div class="product-img-container">
            <img src="${product.image}" alt="${
          product.title
        }" class="product-img">
        </div>
        <div class="product-data-container">
            <div class="product-price-container">
              <span class="prod-price">$${product.price.toFixed(2)}</span>
            </div>
            <div class="product-description-container">
              <p>${product.description}</p>
            </div>
            <div class="add-cart-btn-container">
              <button class="add-cart-btn" id="add-cart-btn-${
                product.id
              }">Agregar al carrito</button>
              </div>
        </div>
        `;

        d.getElementById("main").addEventListener("click", (e) => {
          if (e.target.matches(`#add-cart-btn-${product.id}`)) {
            Auth.userDb.addProductToCart(
              product.id,
              product.title,
              product.price,
              product.image
            );
          }
        });
      },
    });
    $product.appendChild($productContainer);
  };

  ProductCard();
  return $product;
}
