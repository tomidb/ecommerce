export function MenuToggle() {
  const $menuToggle = document.createElement("div");

  $menuToggle.classList.add("menu-toggle");
  $menuToggle.innerHTML = `
  <span class="menu-toggler-bar"></span>
  <span class="menu-toggler-bar-mid"></span>
  <span class="menu-toggler-bar"></span>
  <span class="menu-toggle-mask"></span>
  `;

  $menuToggle.addEventListener("click", (e) => {
    if (e.target.matches(".menu-toggle-mask")) {
      document.querySelector(".navbar").classList.toggle("display-toggle");
      if (
        !document.querySelector(".children").classList.contains("display-none")
      ) {
        document.querySelector(".children").classList.toggle("display-none");
      }
    }
  });

  return $menuToggle;
}
