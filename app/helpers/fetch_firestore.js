import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../helpers/firebase.js";

export async function fetch_firestore(props) {
  let { ref, cbSuccess } = props;

  try {
    const querySnapshot = await getDocs(ref);
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(products);
    cbSuccess(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz
  }
}

/*
export async function fetchProductsFromFirestore(cbSuccess) {
  const productsCollectionRef = collection(db, "products");

  try {
    const querySnapshot = await getDocs(productsCollectionRef);
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    cbSuccess(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz
  }
}
*/
