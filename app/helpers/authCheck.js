import { Modal } from "../components/Modal.js";
import { Header } from "../components/Header.js";
import { Main } from "../components/Main.js";
import { Router } from "../components/Router.js";
import { UserDb } from "./usersDb.js";
import { CategoriesSlider } from "../components/CategoriesSlider.js";
import { Slider } from "../components/Slider.js";

export const Auth = {
  userDb: null,
  authCheck(user) {
    console.log("ENTRA A AUTHCHECK");
    this.userDb = null;
    console.log(this.userDb);

    const d = document,
      $root = d.getElementById("root");

    $root.innerHTML = null;

    $root.appendChild(Modal());
    $root.appendChild(Header());
    // $root.appendChild(CategoriesSlider());
    $root.appendChild(Slider());
    $root.appendChild(Main());

    const $loggedOutLinks = document.querySelector("#logged-out-menu");
    const $loggedInLinks = document.querySelector("#logged-in-menu");

    const $admPanelLink = document.querySelector(".adm-panel-link");

    if (user) {
      Auth.userDb = new UserDb(user);
      Auth.userDb.decirUserId();
      Auth.userDb.createUserDoc();
      console.log(this.userDb);

      $loggedOutLinks.classList.add("display-toggle");
      $loggedInLinks.classList.remove("display-toggle");

      Auth.userDb.updateCartIcon();

      if (Auth.userDb.email === "ecommerce@admin.com") {
        console.log(Auth.userDb.email);
        console.log(this.userDb.email);
        $admPanelLink.classList.remove("display-none");
        $admPanelLink.classList.add("display-block");
      } else {
        $admPanelLink.classList.remove("display-block");
        $admPanelLink.classList.add("display-none");
      }
    } else {
      console.log("NO HAY USUARIOS LOGUEADOS DESDE AUTHCHECK");
      $loggedOutLinks.classList.remove("display-toggle");
      $loggedInLinks.classList.add("display-toggle");
      $admPanelLink.classList.add("display-none");
    }

    Router();
  },
};
