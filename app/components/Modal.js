export function Modal() {
  const d = document;
  const $modalSection = d.createElement("section");

  $modalSection.classList.add("modal-section");

  $modalSection.innerHTML = `
  <span class="overlay"> </span>
  <div class="modal-box">
    <i class="fa-solid fa-door-open"></i>
    <h2>Primero debes iniciar sesión</h2>
    <div class="modal-btn-panel">
      <a href="#/login">Iniciar sesión</a>
      <a href="#/signup">Registrarse</a>
      <button class="close-modal">Volver</button>
    </div>
  </div>

`;
  $modalSection.addEventListener("click", (e) => {
    if (e.target.matches(".close-modal")) {
      d.querySelector(".modal-section").classList.remove("active");
    }
  });
  return $modalSection;
}
