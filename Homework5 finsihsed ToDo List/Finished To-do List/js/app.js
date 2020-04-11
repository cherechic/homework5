var clear = document.querySelector(".clear");
var dateElement = document.getElementById("date");
var list = document.getElementById("list");
var input = document.getElementById("input");

var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle-thin";
var LINE_THROUGH = "lineThrough";

let LIST = [],
  id = 0;

let data = localStorage.getItem("TODO");

var options = { weekday: "long", month: "short", day: "numeric" };
var today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  var DONE = done ? CHECK : UNCHECK;
  var LINE = done ? LINE_THROUGH : "";
  var item = `<li class="item">
  <i class=" fa ${DONE} co" job="complete" id="${id}"></i>
 <p class="text ${LINE}">${toDo}</p>
 <i class=" fa fa-trash-o de" job="delete" id="0"></i>
</li>`;
  var position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(even) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash = true;
}

list.addEventListener("click", function(event) {
  var element = event.target;
  var elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
