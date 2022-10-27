const toDoList = [
  {
    id: 1,
    title: "Дело 1",
    isDone: false,
  },
  {
    id: 2,
    title: "Дело 2",
    isDone: false,
  },
  {
    id: 3,
    title: "Дело 3",
    isDone: false,
  },
];

const toDoListContainer = document.querySelector(".to-do-list");

toDoList.forEach((deal) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="form-check">
        <input data-deal-id="${
          deal.id
        }" class="form-check-input" type="checkbox" id="${"deal" + deal.id}"  ${
    deal.isDone ? "checked" : ""
  }>
        <label class="form-check-label" for="${"deal" + deal.id}">
            ${deal.title}
        </label>
    </div>
    `;

toDoListContainer.append(div.firstElementChild)
});
