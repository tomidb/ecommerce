export function CategoriesSlider() {
  const d = document,
    $sliderContainer = d.createElement("div"),
    $bigContainer = d.createElement("div");
  $sliderContainer.classList.add("slider-container");
  $bigContainer.classList.add("big-container");

  let getSlider = async () => {
    await fetch("https://fakestoreapi.com/products/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) =>
        json.forEach((element) => {
          console.log(element);
          const $categoryContainer = d.createElement("div");
          $categoryContainer.classList.add("category-slide");
          const $slide = d.createElement("a");
          $slide.textContent = element;
          $slide.classList.add("category-link");
          $categoryContainer.appendChild($slide);
          $sliderContainer.appendChild($categoryContainer);
        })
      )
      .catch((err) => {
        let message = err.statusText || "Ocurrio un error alacceder a la API";

        document.getElementById("main").innerHTML = `
    <div class="error">
      <p>Error ${err.status}: ${message}</p>
    </div>
    `;

        console.log(err);
      });
    let copy = $sliderContainer.cloneNode(true);
    let copy2 = $sliderContainer.cloneNode(true);
    $bigContainer.appendChild($sliderContainer);
    $bigContainer.appendChild(copy);
    $bigContainer.appendChild(copy2);
  };

  getSlider();
  return $bigContainer;
}
