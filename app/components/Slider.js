import { Slides } from "./Slides.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../helpers/firebase.js";

export function Slider() {
  const d = document,
    $sliderContainer = d.createElement("div"),
    $bigContainer = d.createElement("div");
  $sliderContainer.classList.add("slider-container");
  $bigContainer.classList.add("big-container");

  let createSlider = async () => {
    const productsCollectionRef = collection(db, "products");

    // Crear una consulta que filtre los productos por la categoría "monitor"
    const q = query(productsCollectionRef, where("category", "==", "Monitor"));

    try {
      const querySnapshot = await getDocs(q);
      const monitors = [];

      querySnapshot.forEach((doc) => {
        monitors.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      let html = "";
      await monitors.forEach(async (monitor) => {
        html += Slides({ ...monitor });
        console.log($sliderContainer);
      });
      $sliderContainer.innerHTML = html;
      console.log($sliderContainer);

      let copy = $sliderContainer.cloneNode(true);
      $bigContainer.appendChild($sliderContainer);
      $bigContainer.appendChild(copy);
      return monitors;
    } catch (error) {
      console.error("Error al obtener monitores:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz
      return [];
    }

    /* 
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
*/
  };

  createSlider();
  console.log($bigContainer);
  return $bigContainer;
}
