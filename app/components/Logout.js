import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "../helpers/firebase.js";

export function Logout() {
  console.log("ENTRA A LOGOUT");
  document.addEventListener("click", async (e) => {
    if (e.target.matches("#logout")) {
      document.getElementById("main").innerHTML = null;
      await signOut(auth);

      console.log("Logout Exitoso");
    }
  });
}
