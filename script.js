let toDoList = [];

const toDoListContainer = document.querySelector(".to-do-list");
const titleInput = document.querySelector(".new-deal");
const btnNew = document.querySelector(".add-btn");

fetch("http://localhost/todo/index.php?key=get-list")
  .then((r) => r.json())
  .then((data) => {
    toDoList = data;
    setToDoList();
  });

function setToDoList() {
  drawData();
  toDoListContainer.addEventListener("change", (event) => {
    const changedCheckBox = event.target.closest("[data-deal-id]");
    if (!changedCheckBox) {
      return;
    }

    const deal = toDoList.find(
      (deal) => deal.id == changedCheckBox.dataset.dealId
    );
    if (!deal) {
      return;
    }

    deal.isDone = changedCheckBox.checked;
    post("http://localhost/todo/index.php?key=set-is-done", deal).then(
      (response) => {
        console.log(response);
      }
    );
  });

  toDoListContainer.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest("[data-delete-deal-id]");
    if (!deleteBtn) {
      return;
    }

    const deal = toDoList.find(
      (deal) => deal.id == deleteBtn.dataset.deleteDealId
    );
    if (!deal) {
      return;
    }

    post("http://localhost/todo/index.php?key=delete-deal", {
      id: deal.id,
    }).then(() => {
      toDoList = toDoList.filter((d) => d.id != deal.id);
      drawData();
    });
  });
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

function drawData() {
  toDoListContainer.innerHTML = "";
  toDoList.forEach((deal) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="form-check">
          <input data-deal-id="${
            deal.id
          }" class="form-check-input" type="checkbox" id="${"deal" +
      deal.id}"  ${deal.isDone ? "checked" : ""}>
          <label class="form-check-label" for="${"deal" + deal.id}">
              ${deal.title}
          </label>
          <button data-delete-deal-id="${
            deal.id
          }" class="btn btn-danger ml-1">x</button>
      </div>
      `;

    toDoListContainer.append(div.firstElementChild);
  });
}

btnNew.addEventListener("click", () => {
  const dataForServer = {
    title: titleInput.value,
    isDone: false,
  };
  post("http://localhost/todo/index.php?key=add-deal", dataForServer).then(
    (id) => {
      dataForServer.id = id;
      toDoList.push(dataForServer);
      titleInput.value = "";
      drawData();
    }
  );
});
