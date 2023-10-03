import { Logo } from "./Logo.js";
import { MenuToggle } from "./MenuToggle.js";
import { Navbar } from "./Navbar.js";
import { Profile } from "./Profile.js";

export function Header() {
  console.log("ENTRA A HEADER");
  const d = document,
    $header = d.createElement("header"),
    $mainNavBar = d.createElement("div");

  $header.classList.add("header");
  $mainNavBar.classList.add("main-navbar");
  $header.appendChild($mainNavBar);

  $mainNavBar.appendChild(MenuToggle());
  $mainNavBar.appendChild(Logo());
  //$header.appendChild(SearchForm());
  $mainNavBar.appendChild(Profile());
  $header.appendChild(Navbar());

  return $header;
}
