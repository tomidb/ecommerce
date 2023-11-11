export function Slides(props) {
  const { id, name, image, price } = props;

  return `
  <article class="offer-slide">
    <div class="offer-data-container">
      <span class="offer-title">especial noviembre</span>
      <p class="offer-msj">¡Hasta 30% en monitores!</p>
      <button class="offer-btn">Ver ofertas</button>
    </div>
    <div class="offer-img-container">
      <img src="${image}" alt="${name}"class="offer-product-img">
    </div>
  </article>
  `;
}
