export function SearchForm() {
  console.log("ENTRA A SEARCHFORM");
  const d = document,
    $searchContainer = d.createElement("div"),
    $input = d.createElement("input"),
    $searchButton = d.createElement("div"),
    $searchImage = d.createElement("img");

  $searchContainer.classList.add("search-container");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Ingresá tu busqueda..";

  $searchImage.src = "app/assets/SearchImage.svg";
  $searchImage.alt = "Search";
  $searchImage.classList.add("search-image");
  $searchButton.classList.add("search-button");
  $searchButton.appendChild($searchImage);

  $searchContainer.appendChild($input);
  $searchContainer.appendChild($searchButton);
  return $searchContainer;
}
