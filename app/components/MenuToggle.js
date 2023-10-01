export function MenuToggle() {
  const $menuToggle = document.createElement("label");

  $menuToggle.classList.add("menu-toggle");
  $menuToggle.innerHTML = `
  <span class="menu-toggler-bar"></span>
  <span class="menu-toggler-bar-mid"></span>
  <span class="menu-toggler-bar"></span>
  `;

  return $menuToggle;
}
