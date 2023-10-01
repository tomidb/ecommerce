import { Logo } from "./Logo.js";
import { MenuToggle } from "./MenuToggle.js";
import { Profile } from "./Profile.js";
import { SearchForm } from "./SearchForm.js";

export function Header() {
  console.log("ENTRA A HEADER");
  const d = document,
    $header = d.createElement("header");

  $header.classList.add("header");

  $header.appendChild(MenuToggle());
  $header.appendChild(Logo());
  //$header.appendChild(SearchForm());
  $header.appendChild(Profile());

  return $header;
}
