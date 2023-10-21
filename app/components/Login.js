import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

export function Login() {
  console.log("ENTRA A LOGIN");
  const $loginForm = document.getElementById("login-form");
  if ($loginForm) {
    return $loginForm.parentNode;
  }

  let $loginContainer = document.createElement("div");
  $loginContainer.classList.add("login-container");

  $loginContainer.innerHTML = `
    <form id="login-form">
    <div class="input-box">
      <input type="text"  id="login-email" name="" required="">
      <label>Usuario</label>
    </div>
    <div class="input-box">
      <input type="password" id="login-password" name="" required="">
      <label>Contraseña</label>
    </div>
    <div class="submit-box">
      <input type="submit" name="" value="Iniciar Sesión">
    </div>
  </form>
  `;

  $loginContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.querySelector("#login-email").value,
      password = document.querySelector("#login-password").value,
      form = document.querySelector("#login-form");

    console.log(email, password, "desde el Login");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        form.reset();
        const user = userCredential.user;
        console.log("Inicio de sesion exitoso");
      })
      .then(() => {
        // location.assign("http://127.0.0.1:5501/index.html#/");
        location.assign("https://buyit-ecommerce.netlify.app/#/");
      });
  });

  return $loginContainer;
}
