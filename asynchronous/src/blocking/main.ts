export {};
console.log("blocking");

//#region generate primes

const MAX_PRIME = 1000000;

function isPrime(n: number) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max: number) => Math.floor(Math.random() * max);

let cancel = false;

function generatePrimes(quota: number) {
  cancel = false;
  const primes = [];
  while (primes.length < quota && !cancel) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

//#endregion

function setup() {
  const quota = document.querySelector("#quota") as HTMLInputElement;
  const output = document.querySelector("#output") as HTMLDivElement;
  const cancelButton = document.querySelector(
    "button[name=cancel]"
  ) as HTMLButtonElement;
  const generateButton = document.querySelector(
    "button[name=generate]"
  ) as HTMLButtonElement;

  if (!quota || !output || !cancelButton || !generateButton) return;

  // generate button
  generateButton.addEventListener("click", () => {
    generateButton.setAttribute("disabled", "");
    cancelButton.removeAttribute("disabled");
    console.log("Generating primes ...");
    output.textContent = "Starting ...";
    // this will block the UI
    const primes = generatePrimes(Number.parseInt(quota.value));
    output.textContent += ` finished generating ${quota.value} primes.`;
    generateButton.removeAttribute("disabled");
    cancelButton.setAttribute("disabled", "");
  });

  // cancel button
  cancelButton.addEventListener("click", () => {
    console.log("Cancelling ...");
    cancel = true;
  });

  // reload button
  document
    .querySelector("button[name=reload]")
    ?.addEventListener("click", () => {
      document.location.reload();
    });
}

setup();
