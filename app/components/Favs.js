export function Favs() {
  console.log("ENTRA A FAVS");
  let $favs = document.createElement("div");
  $favs.id = "favoritos";

  $favs.innerHTML = `
  <h2>Favoritos</h2> 
  `;

  return $favs;
}
