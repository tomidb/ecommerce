import { Logo } from "./Logo.js";
import { Profile } from "./Profile.js";
import { SearchForm } from "./SearchForm.js";

export function Header() {
  console.log("ENTRA A HEADER");
  const d = document,
    $header = d.createElement("header");

  $header.classList.add("header");
  $header.appendChild(Logo());
  $header.appendChild(SearchForm());
  $header.appendChild(Profile());

  return $header;
}
