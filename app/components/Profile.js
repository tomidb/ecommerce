export function Profile() {
  console.log("ENTRA A PROFILE");
  const d = document,
    $profileContainer = d.createElement("div");

  $profileContainer.classList.add("profile-container");

  $profileContainer.innerHTML = `
  <div class="user-start-menu" id="logged-out-menu">
  <a class="login-link" href="#/login">
    <span>Iniciar sesión</span>
    <i class="fas fa-sign-in-alt login-image"></i>
  </a>
  <a class="signup-link" href="#/signup">
    <span>Registrarse</span>
    <i class="fas fa-user signup-image"></i>
  </a>
</div>
<div class="user-profile-menu" id="logged-in-menu">
  <a class="cart-link" href="#/cart">
    <i id="cart-icon" class="fas fa-shopping-cart"></i>
  </a>  
  <div class="profile-menu-container">
    <i id="profile-image" class="fas fa-user-circle"></i>
    <ul class="profile-menu">
      <li>
        <span>Mi perfil</span>
      </li>
      <hr>
      <li>
        <a href="#/favoritos">Favoritos</a>
      </li>
      <li>
        <a href="#/mis-compras">Mis compras</a>
      </li>
      <li>
        <a>Mis búsquedas</a>
      </li>
      <hr>
      <li>
        <a id="logout" href="#/">Cerrar sesión</a>
      </li>
  </div>
</div>
  `;

  return $profileContainer;
}
