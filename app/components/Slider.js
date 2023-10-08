import { fetch_request } from "../helpers/fetch_request.js";
import { Slides } from "./Slides.js";

export function Slider() {
  const d = document,
    $sliderContainer = d.createElement("div"),
    $bigContainer = d.createElement("div");
  $sliderContainer.classList.add("slider-container");
  $bigContainer.classList.add("big-container");

  let createSlider = async () => {
    await fetch_request({
      url: "https://fakestoreapi.com/products/category/jewelery",
      cbSuccess: async (products) => {
        let html = "";
        await products.forEach(async (product) => {
          html += Slides({ ...product });
          console.log($sliderContainer);
        });
        $sliderContainer.innerHTML = html;
        console.log($sliderContainer);
      },
    });
    let copy = $sliderContainer.cloneNode(true);
    $bigContainer.appendChild($sliderContainer);
    $bigContainer.appendChild(copy);
  };

  createSlider();
  return $bigContainer;
}
