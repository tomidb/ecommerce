export function AddProductForm() {
  const $addProd = document.createElement("div");
  $addProd.classList.add("adm-panel-container");
  $addProd.innerHTML = `
  <label>Product Name</label>
  <input type="text" id="name">
    <label>Price</label>
  <input type="text" id="price">
    <label>Category</label>
  <select id="category">
    <option value="Mouse">Mouse</option>
    <option value="Teclado">Teclado</option>
    <option value="Monitor">Monitor</option>
    <option value="Notebook">Notebook</option>
  </select>
  <label>Product Description</label>
  <textarea id="description"></textarea>

<label>Image Name</label>
<input type="text" id="namebox"> 
<label id="extlab"> </label>
<img id="myimg">  
<label id="upprogress"></label>
  <button id="selbtn" type="file">Select Image</button>
  <button id="upbtn">Upload</button>  
  <button id="addprodbtn">Add Product</button>
  `;
  return $addProd;
}
