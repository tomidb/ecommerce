export function ToastModule() {
  const $toast = document.createElement("div");
  $toast.classList.add("wrapper");

  $toast.innerHTML = `
          <div class="toast">
             <div class="container-1">
               <i class="fa-solid fa-square-check"></i>
             </div>
             <div class="container-2">
              <p>Listo:</p>
              <p>El producto se ha añadido a tu carrito de compras.</p> 
            </div>
           </div>   
        `;
  return $toast;
}
