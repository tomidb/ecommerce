export function Navbar() {
  const $navbar = document.createElement("nav");
  $navbar.classList.add("navbar", "display-toggle");

  $navbar.addEventListener("click", (e) => {
    if (e.target.matches(".categories-link")) {
      document.querySelector(".children").classList.toggle("display-none");
      console.log(e.target);
    }
  });

  $navbar.innerHTML = `
<ul class="navbar-menu">
				<li><a href="#">Volver a Inicio</a></li>
				<li class="submenu">
					<span class="categories-link">Categorías<i class="fa-solid fa-caret-down arrow-down"></i></span>
					<ul class="children display-none">
						<li><a href="#/category/Mouse">Mouse</a></li>
						<li><a href="#/category/Teclado">Teclado</a></li>
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
