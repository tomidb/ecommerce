export async function fetch_request(props) {
  console.log("ENTRA A FETCH_REQUEST");
  let { url, cbSuccess } = props;

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      let message = err.statusText || "Ocurrio un error alacceder a la API";

      document.getElementById("main").innerHTML = `
    <div class="error">
      <p>Error ${err.status}: ${message}</p>
    </div>
    `;

      console.log(err);
    });
}
