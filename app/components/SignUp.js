import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { auth } from "../helpers/firebase.js";

export function SignUp() {
  console.log("ENTRA A SIGNUP");
  const $signupForm = document.getElementById("signup-form");
  if ($signupForm) {
    return $signupForm.parentNode;
  }

  let $signUpContainer = document.createElement("div");
  $signUpContainer.classList.add("signup-container");

  $signUpContainer.innerHTML = `
    <form id="signup-form">
    <div class="input-box">
      <input type="text"  id="signup-email" name="" required="">
      <label>Usuario</label>
    </div>
    <div class="input-box">
      <input type="password" id="signup-password" name="" required="">
      <label>Contraseña</label>
    </div>
    <div class="submit-box">
      <input type="submit" name="" value="Registrarse">
    </div>
  </form>
  `;

  $signUpContainer.addEventListener("submit", async (e) => {
    e.preventDefault();
    let email = document.querySelector("#signup-email").value,
      password = document.querySelector("#signup-password").value,
      form = document.querySelector("#signup-form");

    console.log(email, password);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      form.reset();
      // location.assign("http://127.0.0.1:5501/index.html#/");
      location.assign("https://buyit-ecommerce.netlify.app/#/");

      console.log("Usuario creado con exito");
      console.log(userCredentials);
    } catch (error) {}
  });
  return $signUpContainer;
}
