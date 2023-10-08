export function Navbar() {
  const $navbar = document.createElement("nav");
  $navbar.classList.add("navbar", "display-toggle");

  $navbar.addEventListener("click", (e) => {
    if (e.target.matches(".categories-link")) {
      document.querySelector(".children").classList.add("display-none");
      console.log(e.target);
    }
  });

  $navbar.innerHTML = `
<ul>
				<li><a href="#">Volver a Inicio</a></li>
				<li class="submenu">
					<a href="#" class="categories-link">Categorías</a>
					<ul class="children">
						<li><a href="#">Electronics</a></li>
						<li><a href="#">Jewelery </a></li>
						<li><a href="#">Men's clothing</a></li>
            <li><a href="#">Women's clothing</a></li>
					</ul>
				</li>
				<li><a href="#">Ubicación</a></li>
				<li><a href="#">Información</a></li>
			</ul>
  `;

  return $navbar;
}
