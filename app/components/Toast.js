export function Toast() {
  let x;
  let $toast = document.querySelector(".toast");

  function showToast() {
    clearTimeout(x);
    $toast.style.transform = "translateY(140px)";
    x = setTimeout(() => {
      $toast.style.transform = "translateY(-120px)";
    }, 5000);

    console.log("toast");
  }
  showToast();
}
