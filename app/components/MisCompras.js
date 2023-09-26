export function MisCompras() {
    console.log("ENTRA A MISCOMPRAS");
  let $misCompras = document.createElement("div");
  $misCompras.id = "mis-compras";

  $misCompras.innerHTML = `
  <h2>Mis Compras</h2> 
  `;

  return $misCompras;
}
