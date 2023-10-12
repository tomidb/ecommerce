export function Slides(props) {
  const { id, title, image, price } = props;

  return `
  <article class="offer-slide">
    <div class="offer-data-container">
      <span class="offer-title">Día de la madre</span>
      <p class="offer-msj">¡Hasta 30% en joyería!</p>
      <button class="offer-btn">Ver ofertas</button>
    </div>
    <div class="offer-img-container">
      <img src="${image}" alt="${title}"class="offer-product-img">
    </div>
  </article>
  `;
}
