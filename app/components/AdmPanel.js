import { db } from "../helpers/firebase.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

export function AdmPanel() {
  const $addProd = document.createElement("div");
  const $addProdContainer = document.createElement("div");
  $addProd.classList.add("adm-panel-container");

  $addProd.innerHTML = `
  <label>Product Name</label>
  <input type="text" id="add-prod-name">
    <label>Price</label>
  <input type="text" id="add-prod-price">
    <label>Category</label>
  <select id="add-prod-category">
    <option value="Mouse">Mouse</option>
    <option value="Teclado">Teclado</option>
    <option value="Monitor">Monitor</option>
    <option value="Notebook">Notebook</option>
  </select>
  <label>Product Description</label>
  <textarea id="add-prod-description"></textarea>

<label>Image Name</label>
<input type="text" id="namebox"> 
<label id="extlab"> </label>
<img id="myimg">  
<label id="upprogress"></label>
  <button id="selbtn" type="file">Select Image</button>
  <button id="add-new-product">Add Product</button>  

  `;

  // firebase & firestore variables & references

  const clouddb = getFirestore();

  var files = [];
  var reader = new FileReader();

  var input = document.createElement("input");
  input.type = "file";

  input.onchange = (e) => {
    files = e.target.files;

    var extention = GetFileExt(files[0]);
    var name = GetFileName(files[0]);

    document.getElementById("namebox").value = name;
    document.getElementById("extlab").innerHTML = extention;

    reader.readAsDataURL(files[0]);
  };

  reader.onload = function () {
    document.getElementById("myimg").src = reader.result;
  };

  // SELECTION PROCESS

  document.addEventListener("click", (e) => {
    if (e.target.matches("#selbtn")) {
      input.click();
    } else if (e.target.matches("#add-new-product")) {
      UploadProcess();
    }
  });

  function GetFileExt(file) {
    var temp = file.name.split(".");
    var ext = temp.slice(temp.length - 1, temp.length);
    return "." + ext[0];
  }

  function GetFileName(file) {
    var temp = file.name.split(".");
    var fname = temp.slice(0, 1).join(".");
    return fname;
  }

  // UPLOAD PROCESS

  async function UploadProcess() {
    var ImgToUpload = files[0];
    var ImgName =
      document.getElementById("namebox").value +
      document.getElementById("extlab").innerHTML;

    const metaData = {
      contentType: ImgToUpload.type,
    };

    const storage = getStorage();
    const storageRef = sRef(storage, "Images/" + ImgName);
    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    UploadTask.on(
      "state-changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("upprogress").innerHTML =
          "Upload" + progress + "%";
      },
      (error) => {
        alert("error: image not uploaded");
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
          SaveProductToFirestore(downloadURL);
        });
      }
    );
  }
  // FUNCION PARA GUARDAR DOC EN FIRESTORE DATABASE

  async function SaveProductToFirestore(url) {
    var productsCollectionRef = collection(clouddb, "products");

    await addDoc(productsCollectionRef, {
      image: url,
      name: document.getElementById("add-prod-name").value,
      price: document.getElementById("add-prod-price").value,
      category: document.getElementById("add-prod-category").value,
      description: document.getElementById("add-prod-description").value,
    });
  }
  return $addProd;
}
