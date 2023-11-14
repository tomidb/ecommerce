export function Informacion() {
  const $InfoContainer = document.createElement("div");
  $InfoContainer.classList.add("info-container");
  $InfoContainer.innerHTML = `
  <h2> Información sobre nosotros </h2>

  <ul class="info-list">
    <li><span class="bold">Teléfono: </span>351 7594045</li>
    <li><span class="bold">Mail: </span>debreuiltomas@gmail.com</li>
    <li><span class="bold">Ubicación: </span> Segurola y Habana 4310</li>
  </ul>
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1348567713594!2d-58.520997725050854!3d-34.600751257340065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb7cd94d6d3e5%3A0xe340dcd012c8d71!2sEsquina%20Diego%20Armando%20Maradona%20%7C%20Segurola%20y%20Habana!5e0!3m2!1ses!2sar!4v1699974515114!5m2!1ses!2sar"
    width="300"
    height="200"
    style="border:1px solid black;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>

    <div class="redes-sociales">
  <i class="fa-brands fa-instagram"></i>
  <i class="fa-brands fa-square-facebook"></i>
<i class="fa-brands fa-whatsapp"></i>
  </div>
  `;
  return $InfoContainer;
}
