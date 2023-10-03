export function Navbar() {
  const $navbar = document.createElement("nav");
  $navbar.classList.add("navbar", "display-toggle");

  $navbar.innerHTML = `
<ul>
				<li><a href="#">Volver a Inicio</a></li>
				<li class="submenu">
					<a href="#">Categorías<span class="caret icon-arrow-down6"></span></a>
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
