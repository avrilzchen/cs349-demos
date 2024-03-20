console.log("drag-and-drop");

let draggedItem: HTMLElement;

// drag and drop elements
let items = document.querySelectorAll(
  ".container .item"
) as NodeListOf<HTMLElement>;

// setup drag events for all elements
items.forEach((item) => {
  // drag start
  item.addEventListener("dragstart", (e) => {
    console.log(`🟢 dragstart ${item.id}`);

    // update feedback style
    item.classList.add("dragging");
    // remember the item being dragged
    draggedItem = item;
    if (e.dataTransfer) {
      // changes the cursor style
      e.dataTransfer.effectAllowed = "move";
      // sets the data that will be dragged
      e.dataTransfer.setData("text/html", item.innerHTML);
    }
  });

  // drag over
  item.addEventListener("dragover", (e) => {
    // console.log(`dragover ${item.id}`);
    // prevent default which doesn't allow a drop
    // (default won't fire drop event)
    e.preventDefault();
  });

  // drag enter
  item.addEventListener("dragenter", (e) => {
    console.log(`dragenter ${item.id}`);
    // update feedback styles
    item.classList.add("over");
  });

  // drag leave
  item.addEventListener("dragleave", (e) => {
    console.log(`dragleave ${item.id}`);
    // update feedback styles
    item.classList.remove("over");
  });

  // drag end
  item.addEventListener("dragend", (e) => {
    console.log(`🛑 dragend ${item.id}`);
    // update feedback styles
    item.classList.remove("dragging");
    items.forEach(function (item) {
      item.classList.remove("over");
    });
  });

  // drag drop
  item.addEventListener("drop", (e) => {
    console.log(`👍 drop ${draggedItem.id} on ${item.id}`);
    if (draggedItem !== item && e.dataTransfer) {
      // this does the actual swapping of the elements
      draggedItem.innerHTML = item.innerHTML;
      const data = e.dataTransfer.getData("text/html");
      item.innerHTML = data;
      console.log(`  data '${data}'`);
    }
  });
});
