import { db, firebase } from "./firebase.js";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { Toast } from "../components/Toast.js";

export function UserDb(props) {
  console.log("ENTRA A USERSDB");
  let { uid, email } = props;

  this.id = uid;
  this.email = email;

  this.decirUserId = function () {
    console.log(`Usuario "${this.id}" logueado`);
  };

  this.createUserDoc = async function () {
    const userCollectionRef = collection(db, "users");
    await setDoc(doc(userCollectionRef, uid), {
      email: this.email,
      id: this.id,
    });
  };
  // FUNCION PARA AÑADIR PRODUCTO A FAVORITOS
  this.addProductToFav = async function (productId, name, price, image) {
    const userFavCollectionRef = collection(db, "users", uid, "favorites");

    try {
      const userFavDoc = await getDoc(
        doc(userFavCollectionRef, productId.toString())
      ); // Corregimos aquí
      if (userFavDoc.exists()) {
        console.log("El producto ya existe en la lista de favoritos");
        return;
      }

      await setDoc(doc(userFavCollectionRef, productId.toString()), {
        timestamp: serverTimestamp(),
        name: name,
        price: price,
        image: image,
      });

      console.log("Producto agregado a la lista de favoritos");
    } catch (error) {
      console.error(
        `Error al agregar el producto ${productId} a la lista de favoritos`,
        error
      );
    }
  };

  // FUNCION PARA ELIMINAR PRODUCTO DE FAVORITOS

  this.delProductFromFav = async function (productId) {
    const userFavDocRef = doc(
      collection(db, "users", uid, "favorites"),
      productId.toString()
    );
    try {
      const userFavDoc = await getDoc(userFavDocRef);
      if (!userFavDoc.exists()) {
        console.log("El producto no existe en la lista de favoritos");
        return;
      }

      await deleteDoc(userFavDocRef);
      console.log("Producto eliminado de la lista de favoritos");
    } catch (error) {
      console.error(
        `Error al eliminar el producto ${productId} de la lista de favoritos`,
        error
      );
    }
  };

  // FUNCION PARA OBTENER LOS PRODUCTOS FAVORITOS

  this.getFavorites = async function () {
    const userFavCollectionRef = collection(db, "users", uid, "favorites");
    const userFavDocs = await getDocs(userFavCollectionRef);
    const favorites = [];
    userFavDocs.forEach((doc) => {
      favorites.push(doc.id);
    });
    return favorites;
  };

  // FUNCION PARA OBTENER FAVORITOS CON DETALLE

  this.getFavsWithDetails = async function () {
    const userFavsCollectionRef = collection(db, "users", uid, "favorites");
    const userFavsDocs = await getDocs(userFavsCollectionRef);
    const favorites = [];

    userFavsDocs.forEach((docSnap) => {
      const productId = docSnap.id;
      const productData = docSnap.data();

      const product = {
        id: productId,
        name: productData.name,
        price: productData.price,
        image: productData.image,
      };
      favorites.push(product);
    });

    return favorites;
  };

  // FUNCION PARA AÑADIR PRODUCTOS AL CARRITO DE COMPRA

  this.addProductToCart = async function (productId, name, price, image) {
    const userCartCollectionRef = collection(db, "users", uid, "cart");

    try {
      const userCartDoc = await getDoc(
        doc(userCartCollectionRef, productId.toString())
      );
      if (userCartDoc.exists()) {
        console.log("El producto ya existe en el carrito de compras");
        return;
      }

      await setDoc(doc(userCartCollectionRef, productId.toString()), {
        quantity: 1,
        name: name,
        price: price,
        image: image,
        timestamp: serverTimestamp(),
      });

      console.log("Producto agregado al carrito de compras");
      this.updateCartIcon();
      Toast();
    } catch (error) {
      console.error(
        `Error al agregar el producto ${productId} al carrito de compras`,
        error
      );
    }
  };

  // FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO DE COMPRAS

  this.delProductFromCart = async function (productId) {
    const userCartDocRef = doc(
      collection(db, "users", uid, "cart"),
      productId.toString()
    );
    try {
      const userCartDoc = await getDoc(userCartDocRef);
      if (!userCartDoc.exists()) {
        console.log("El producto no existe en el carrito");
        return;
      }
      await deleteDoc(userCartDocRef);
      this.updateCartIcon();
      console.log("Producto eliminado del carrito de compras");
    } catch (error) {
      console.error(
        `Error al eliminar el producto ${productId} de la lista del carrito`,
        error
      );
    }
  };

  // FUNCION PARA OBTENER LOS PRODUCTOS DEL CARRITO DE COMPRAS

  this.getCart = async function () {
    const userCartCollectionRef = collection(db, "users", uid, "cart");
    const userCartDocs = await getDocs(userCartCollectionRef);
    const cart = [];
    userCartDocs.forEach((doc) => {
      cart.push(doc.id);
    });
    return cart;
  };

  // CART WITH DETAILS

  this.getCartWithDetails = async function () {
    const userCartCollectionRef = collection(db, "users", uid, "cart");
    const userCartDocs = await getDocs(userCartCollectionRef);
    const cart = [];

    userCartDocs.forEach((docSnap) => {
      const productId = docSnap.id;
      const productData = docSnap.data();

      const product = {
        id: productId,
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        image: productData.image,
      };
      cart.push(product);
    });

    return cart;
  };

  // FUNCION PARA MODIFICAR ICONO DE CARRITO DEL HEADER

  this.updateCartIcon = async function () {
    const $cartIcon = document.getElementById("cart-icon");
    const cart = await this.getCart();
    const isCartEmpty = cart.length === 0;

    if (isCartEmpty) {
      $cartIcon.style.display = "none";
    } else {
      $cartIcon.style.display = "block";
    }
  };
}
