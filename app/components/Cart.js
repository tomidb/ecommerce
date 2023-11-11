import { Auth } from "../helpers/authCheck.js";
import { app, db } from "../helpers/firebase.js";
import {
  updateDoc,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

export function Cart() {
  console.log("ENTRA A CART");
  const d = document;
  const $main = d.querySelector("main");

  const $cartContainer = document.createElement("div");
  const $template = d.getElementById("cart-template").content;
  const $footerTemplate = d.querySelector("#footer-template");
  const $fragment = d.createDocumentFragment();
  $cartContainer.id = "cart-container";
  $cartContainer.classList.add("cart-container");

  let getCart = async () => {
    $cartContainer.innerHTML = "";
    let cart = await Auth.userDb.getCartWithDetails();
    console.log(cart);
    cart.forEach((el) => {
      let prodPrice = el.quantity * el.price,
        finalProdPrice = prodPrice.toFixed(3);
      $template.querySelector("img").setAttribute("src", el.image);
      $template.querySelector(".product-title").textContent = el.name;
      $template.querySelector(".quantity").textContent = el.quantity;
      $template.querySelector(".price").textContent = `$${finalProdPrice}`;
      $template.querySelector(".decrement-button").dataset.id = el.id;
      $template.querySelector(".increment-button").dataset.id = el.id;
      $template.querySelector(".del-button").dataset.id = el.id;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    // HASTA AQUI

    let getTotalPrice = async () => {
      let $cartFooter = d.createElement("div");
      $cartFooter.classList.add("cart-footer-container");

      $cartFooter.innerHTML = "";
      if (cart.length === 0) {
        $cartFooter.innerHTML = `
                <p>Tu carrito de compras está vacío.</p>
                `;
        console.log("El carrito de compras está vacío.");
      } else {
        const nPrice = Object.values(cart)
          .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
          .toFixed(3);

        const wspText = cart
          .reduce(
            (message, product) =>
              message.concat(
                `\n*${product.title}*\n- Cantidad: ${
                  product.quantity
                }\n- Precio: $${product.quantity * product.price}\n`
              ),
            `_¡Hola! Te paso el resumen de mi pedido:_\n`
          )
          .concat(`\n*TOTAL: $${nPrice}*\n`)
          .concat(`\n_Espero tu respuesta para confirmar mi pedido_`);

        console.log(wspText);
        $cartFooter.innerHTML = `
      <div class="total-container">
        <p class="total">Total:</p>
        <span class="total-price">$ ${nPrice}</span>
      </div>
      <div class="buy-container">
        <a href="https://wa.me/5493517594045?text=${encodeURIComponent(
          wspText
        )}" class="buy-button">Comprar ahora</a>
      </div>
        `;
      }
      $cartContainer.appendChild($cartFooter);
    };

    // HASTA AQUI
    $cartContainer.appendChild($fragment);
    getTotalPrice();
  };

  $cartContainer.addEventListener("click", (e) => {
    if (e.target.matches(".del-button")) {
      deleteProductFromCart(e.target.dataset.id);
    } else {
      setQuantity(e);
    }
  });

  const deleteProductFromCart = async (productId) => {
    try {
      await Auth.userDb.delProductFromCart(productId);
      console.log("Producto eliminado del carrito de compras");
      getCart(); // Actualiza el carrito después de eliminar el producto
    } catch (error) {
      console.error(
        "Error al eliminar el producto del carrito de compras",
        error
      );
    }
  };

  const setQuantity = async (e) => {
    const id = e.target.dataset.id;

    const cart = await Auth.userDb.getCartWithDetails();
    const product = cart.find((el) => el.id === id);
    if (e.target.matches(".decrement-button")) {
      product.quantity--;
      if (product.quantity === 0) {
        deleteProductFromCart(id);
        return; // Salir de la función para evitar que se actualice el producto en la base de datos
      }
    } else if (e.target.matches(".increment-button")) {
      product.quantity++;
    }

    // Actualizar la cantidad del producto en la base de datos

    const userCartCollectionRef = collection(
      db,
      "users",
      Auth.userDb.id,
      "cart"
    );

    await updateDoc(doc(userCartCollectionRef, id), {
      quantity: product.quantity,
    });

    // Volver a obtener y renderizar el carrito actualizado
    getCart();
  };

  getCart();

  return $cartContainer;
}
