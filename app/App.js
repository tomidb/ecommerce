import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "./helpers/firebase.js";
import { Auth } from "./helpers/authCheck.js";
import { Logout } from "./components/Logout.js";
// AGREGANDO COMENTARIO RANDOM

export async function App() {
  console.log("ENTRA A APP");
  const d = document,
    $root = d.getElementById("root");

  // GET PRODUCTS

  /* async function getProductsAPI1() {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  async function getProductsAPI2() {
    await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }
  */

  // AUTH CHECK

  await onAuthStateChanged(auth, async (user) => {
    await Auth.authCheck(user);
    console.log("DETECTANDO CAMBIO DE USUARIO");
  });

  // EJECUTA FUNCIONES

  Logout();
}
