// message from main thread
addEventListener("message", (message) => {
  console.log("worker received message", message.data);
  const [command, data] = message.data;

  switch (command) {
    case "generate":
      generatePrimes(data);
      break;
  }
});

// Generate primes (very inefficiently)
function generatePrimes(quota: number) {
  function isPrime(n: number) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }

  const primes = [];
  const maximum = 1000000;

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
    if (primes.length % 10000 === 0) {
      // send progress message to main thread
      postMessage(["progress", primes.length / quota]);
    }
  }

  // send completed message to main thread
  postMessage(["done", primes.length]);
}
