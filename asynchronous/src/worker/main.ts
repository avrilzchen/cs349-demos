export {};
console.log("worker");

function setup() {
  const quota = document.querySelector("#quota") as HTMLInputElement;
  const output = document.querySelector("#output") as HTMLDivElement;
  const cancelButton = document.querySelector(
    "button[name=cancel]"
  ) as HTMLButtonElement;
  const generateButton = document.querySelector(
    "button[name=generate]"
  ) as HTMLButtonElement;
  const progress = document.querySelector(
    "progress"
  ) as HTMLProgressElement;

  if (
    !quota ||
    !output ||
    !cancelButton ||
    !generateButton ||
    !progress
  )
    return;

  // generate button
  generateButton.addEventListener("click", () => {
    console.log("start...");
    generateButton.setAttribute("disabled", "");
    cancelButton.removeAttribute("disabled");

    const worker = new Worker(
      new URL("./generate.ts", import.meta.url)
    );

    worker.postMessage(["generate", quota.valueAsNumber]);

    // receive messages from worker
    worker.addEventListener("message", (message) => {
      const [type, data] = message.data;

      switch (type) {
        case "progress":
          progress.value = data * 100;
          output.textContent = `Generating primes... ${Math.round(
            data * 100
          )}% complete`;
          break;

        case "done":
          output.textContent = `Finished generating ${data} primes.`;
          generateButton.removeAttribute("disabled");
          cancelButton.setAttribute("disabled", "");
          break;

        case "cancelled":
          output.textContent = `Cancelled after generating ${data} primes.`;
          generateButton.removeAttribute("disabled");
          cancelButton.setAttribute("disabled", "");
          break;
      }
    });

    // cancel button
    cancelButton.addEventListener("click", () => {
      console.log("cancel...");
      worker.terminate();
      generateButton.removeAttribute("disabled");
      cancelButton.setAttribute("disabled", "");
    });
  });

  // reload button
  document
    .querySelector("button[name=reload]")
    ?.addEventListener("click", () => {
      // forces a page reload
      document.location.reload();
    });
}

setup();
