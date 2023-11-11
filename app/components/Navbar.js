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
						<li><a href="#/category/Mouse">Mouse</a></li>
						<li><a href="#/category/Teclado">Teclado </a></li>
						<li><a href="#/category/Notebook">Notebook</a></li>
            <li><a href="#/category/Monitor">Monitor</a></li>
					</ul>
				</li>
				<li><a href="#/informacion">Información</a></li>
        <li class="adm-panel-link"><a href="#/buyitadminpanel" class="adm-panel-link-a">Admin panel</a></li>
			</ul>
  `;

  return $navbar;
}
