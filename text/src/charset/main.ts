console.log("charset");

const ul = document.getElementById("list") as HTMLUListElement;

for (let i = 0; i < 10000; i++) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${i}:</span> ${String.fromCharCode(i)}`;
  ul.appendChild(li);
}
