export function Logo() {
  console.log("ENTRA A LOGO");
  const $logo = document.createElement("div");

  $logo.classList.add("logo");
  $logo.innerHTML = `<a href="#/">BuyIt!</a> `;

  return $logo;
}
