import { fetch_request } from "../helpers/fetch_request.js";
const d = document,
  $productContainer = d.createElement("div"),
  $product = d.createElement("article");

$productContainer.classList.add("product-content");
$product.classList.add("product-container");

export function Product() {
  let ProductCard = async () => {
    const currentHash = window.location.hash;
    const productIdMatch = currentHash.match(/#\/product\/(\d+)/);
    const productId = productIdMatch[1];
    await fetch_request({
      url: `https://fakestoreapi.com/products/${productId}`,
      cbSuccess: async (product) => {
        $productContainer.innerHTML = `
        <div class="product-title-container">
          <p class="product-title">${product.title}</p>
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
              <button class="add-cart-btn">Agregar al carrito</button>
              </div>
        </div>
        `;
      },
    });

    $product.appendChild($productContainer);
  };

  /*
  const currentHash = window.location.hash;
  const productIdMatch = currentHash.match(/#\/product\/(\d+)/); // Esto buscará "#/product/" seguido de un número (el ID del producto)
  const $product = document.createElement("div");
  $product.classList.add("producto");
  if (productIdMatch) {
    const productId = productIdMatch[1];
    console.log(productId);
    $product.innerHTML = `
  <h2>${productId}</h2>
  `;
  }
*/
  ProductCard();
  return $product;
}
