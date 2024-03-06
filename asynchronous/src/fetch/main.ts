export {};

console.log("fetch");

function setup() {
  const results = document.querySelector(
    "#results"
  ) as HTMLDivElement;
  if (!results) return;

  const select = document.querySelector(
    "select#source"
  ) as HTMLSelectElement;
  if (!select) return;

  const spinner = document.querySelector(
    "#spinner"
  ) as HTMLDivElement;

  if (spinner) spinner.style.display = "none";

  // fetch is an asynchronous function that returns a promise
  async function doFetch(url: string) {
    results.innerText = "Fetching...";
    if (spinner) spinner.style.display = "flex";
    // the fetch call
    fetch(url)
      .then(
        (response) => response.json(), // success
        (reason) => {
          console.error(reason); // error
        }
      )
      .then(
        (data) => (results.innerText = JSON.stringify(data, null, 2))
      )
      .then(() =>
        spinner ? (spinner.style.display = "none") : null
      );
  }

  const button = document.querySelector("button#fetch");
  if (!button) return;

  button.addEventListener("click", () => {
    console.log("start...");
    const url = select.value;
    doFetch(url);
  });
}

setup();
