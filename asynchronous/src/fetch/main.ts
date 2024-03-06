export {};

function setup() {
  const results = document.querySelector(
    "#results"
  ) as HTMLDivElement;
  if (!results) return;

  const select = document.querySelector(
    "select#source"
  ) as HTMLSelectElement;
  if (!select) return;

  // optional loading animation
  const loader = document.querySelector("#loader") as HTMLDivElement;
  if (loader) loader.style.display = "none";

  /**
   * Using Fetch API with "thenable" promises
   * @param url
   */
  async function doFetch1(url: string) {
    results.innerText = "Fetching ...";
    console.log("📦 Fetch1 START");
    if (loader) loader.style.display = "flex";

    // fetch is an asynchronous function that
    // returns a "response promise"
    fetch(url)
      // resolved response
      .then((response) => {
        console.log("Fetch1 response", response);
        // the json property is another promise
        return response.json();
      })
      // resolved json data in response
      .then((data) => {
        results.innerText = JSON.stringify(data, null, 2);
        if (loader) loader.style.display = "none";
      })
      // rejected
      .catch((error) => {
        console.error(error);
        results.innerText = "Error fetching data";
        if (loader) loader.style.display = "none";
      });
    console.log("📦 Fetch1 END");
  }

  /**
   * Using Fetch API with try/catch and await
   * @param url
   */
  async function doFetch2(url: string) {
    results.innerText = "Fetching ...";
    console.log("📦 Fetch2 START");
    if (loader) loader.style.display = "flex";

    try {
      // fetch is an asynchronous function that
      // returns a "response promise"
      const response = await fetch(url);
      // resolved response
      console.log("Fetch2 response", response);
      // the json property is another promise
      const data = await response.json();
      // resolved json data in response
      results.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
      // rejected
      console.error(error);
      results.innerText = "Error fetching data";
      if (loader) loader.style.display = "none";
    }
    console.log("📦 Fetch2 END");
  }

  const button = document.querySelector("button#fetch");
  if (!button) return;

  button.addEventListener("click", () => {
    console.log("👇 click callback START 👇");
    const url = select.value;
    // try either doFetch1 (promises) or doFetch2 (async/await)
    doFetch1(url);
    console.log("👆 click callback END 👆");
  });
}

setup();
