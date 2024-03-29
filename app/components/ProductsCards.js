import { Auth } from "../helpers/authCheck.js";

export function ProductsCards(props) {
  console.log("ENTRA A PRODUCT CARDS");
  const {
    id,
    name,
    image,
    thumbnail,
    price,
    description,
    category,
    isFavorite,
    favIconClass,
    isInCart,
    cartIconClass,
  } = props;

  const handleFavoriteClick = async () => {
    if (Auth.userDb) {
      const icon = document.getElementById(`icon-${id}`);
      const favorites = await Auth.userDb.getFavorites();

      if (favorites.includes(id.toString())) {
        await Auth.userDb.delProductFromFav(id);
        icon.classList.replace("fas", "far");
      } else {
        await Auth.userDb.addProductToFav(id, name, price, image);
        icon.classList.replace("far", "fas");
      }
    } else {
      document.querySelector(".modal-section").classList.add("active");
    }
  };

  const handleCartClick = async () => {
    if (Auth.userDb) {
      // Agrega el producto al carrito de compras en la colección de Firestore del usuario
      const icon = document.getElementById(`cart-${id}`);
      const cart = await Auth.userDb.getCart();
      // await Auth.userDb.addProductToCart(id);        << ESTA LINEA ERA TODO

      if (cart.includes(id.toString())) {
        await Auth.userDb.delProductFromCart(id);
        icon.classList.replace("success-color", "neutral-color");
      } else {
        await Auth.userDb.addProductToCart(id, name, price, image);
        icon.classList.replace("neutral-color", "success-color");
      }
      // Actualiza el icono del carrito en el header para indicar que hay productos en el carrito
      Auth.userDb.updateCartIcon();
    } else {
      document.querySelector(".modal-section").classList.add("active");
    }
  };

  document.getElementById("main").addEventListener("click", (e) => {
    if (e.target.matches(`#icon-${id}`)) {
      e.stopPropagation();
      handleFavoriteClick();
    } else if (e.target.matches(`#cart-${id}`)) {
      //FUNCION RELACIONADA AL CARRITO DE COMPRAS
      e.stopPropagation();
      handleCartClick();
    }
  });
  console.log("antes del return dentro de productcards");
  return `
  <article class="product-card">
  <div class="image-container">
    <img src="${image}" alt="${name}" class="product-card-img">
  </div>
  <div class="data-container">
    <p class="product-name">
      <a href="#/product/${id}">${name}</a>
    </p>
    <p class="product-data">
      <span class="product-price">$ ${price}</span>
    </p> 
    <div class="button-panel" id="button-panel">
      <button id="fav-${id}" class="fav-${id}"><i  id="icon-${id}" class="${favIconClass} fa-heart" style="color:red;"></i></button>
      <button id="cart-btn-${id}" class="buy-${id}"><i  id="cart-${id}" class="${cartIconClass} fas fa-cart-plus"></i></i></button>
    </div>
</article> 
  `;
}
