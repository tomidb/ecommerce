import { Header } from "../components/Header.js";
import { Main } from "../components/Main.js";
import { Router } from "../components/Router.js";
import { UserDb } from "./usersDb.js";

export const Auth = {
  userDb: null,
  authCheck(user) {
    console.log("ENTRA A AUTHCHECK");
    this.userDb = null;
    console.log(this.userDb);

    const d = document,
      $root = d.getElementById("root");

    $root.innerHTML = null;

    $root.appendChild(Header());
    $root.appendChild(Main());

    const $loggedOutLinks = document.querySelector("#logged-out-menu");
    const $loggedInLinks = document.querySelector("#logged-in-menu");

    if (user) {
      Auth.userDb = new UserDb(user);
      Auth.userDb.decirUserId();
      Auth.userDb.createUserDoc();
      console.log(this.userDb);
      $loggedOutLinks.classList.add("display-toggle");
      $loggedInLinks.classList.remove("display-toggle");

      Auth.userDb.updateCartIcon();
    } else {
      console.log("NO HAY USUARIOS LOGUEADOS DESDE AUTHCHECK");
      $loggedOutLinks.classList.remove("display-toggle");
      $loggedInLinks.classList.add("display-toggle");
    }

    Router();
  },
};
