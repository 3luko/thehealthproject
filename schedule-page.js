const testerButton = document.getElementById("tester-Button");
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

testerButton.addEventListener("click", () => {
  console.log("Tester Button Pressed");
});
generateWeekSchedule();
showLogButton();
logworkout();

function noNewTab() {
  window.location.href = "home.html";
}

//function for showing the log button based on if you are going to do a workout or not
function showLogButton() {
  for (let i = 0; i < 7; i++) {
    const currentSplit = document.getElementById(`${days[i]}-select`);
    currentSplit.addEventListener("click", () => {
      if (currentSplit.value !== "") {
        document.getElementById(`${days[i]}-log-button`).style.display =
          "block";
      } else {
        document.getElementById(`${days[i]}-log-button`).style.display = "none";
      }
    });
  }
}

function logworkout() {
  for (let i = 0; i < days.length; i++) {
    const currentLog = document.getElementById(`${days[i]}-log-button`);
    const scheduleHeading = document.getElementById("schedule-heading");
    currentLog.addEventListener("click", () => {
      const calendartable = document.getElementById("calendar-table");
      calendartable.style.display = "none";
      scheduleHeading.innerHTML = `${
        days[i].charAt(0).toUpperCase() + days[i].slice(1)
      }'s Schedule`;
      scheduleHeading.style.marginLeft = "35%";
    });
  }
}

//Automatically add dates to cell regardless of days in the week.
function generateWeekSchedule() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const monday = new Date(currentDate);

  monday.setDate(
    currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
  );

  let daysofWeek = [
    "monday-cell",
    "tuesday-cell",
    "wednesday-cell",
    "thursday-cell",
    "friday-cell",
    "saturday-cell",
    "sunday-cell",
  ];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    const formatDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    document.getElementById(`${daysofWeek[i]}`).innerHTML = formatDate;
  }
  return daysofWeek;
}

function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = `<strong>${arr[i].substr(0, val.length)}</strong>`;
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += `<input type="hidden" value='${arr[i]}'`;
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists;
        });
        a.appendChild(b);
      }
    }
  });
}

function isEmpty(word) {
  if (word.value === "") {
    return true;
  } else {
    return false;
  }
}

function workout_to_container() {
  const name = document.getElementById("workout-name");
  const sets = document.getElementById("number-of-sets");
  const reps = document.getElementById("number-of-reps");

  if (isEmpty(name) || isEmpty(sets) || isEmpty(reps)) {
    alert("Please input all values");
  } else {

    var newDiv = document.createElement("div");
    newDiv.classList.add("user-workouts");



    const workout_name_div = document.createElement("div");
    workout_name_div.classList.add("workouts-p");
    const workout_p = document.createElement("p");
    workout_p.textContent = `${name.value}`
    workout_name_div.appendChild(workout_p)
    newDiv.appendChild(workout_name_div);
    

    const sets_div = document.createElement("div");
    sets_div.classList.add("workouts-p");
    const sets_p = document.createElement("p");
    sets_p.textContent = `${sets.value}`
    sets_div.appendChild(sets_p)
    newDiv.appendChild(sets_div);

    const reps_div = document.createElement("div");
    reps_div.classList.add("workouts-p");
    const reps_p = document.createElement("p");
    reps_p.textContent = `${reps.value}`
    reps_div.appendChild(reps_p)
    newDiv.appendChild(reps_div);

    document.getElementById("user-workouts-container").appendChild(newDiv);

    document.getElementById("workout-name").value = "";
    document.getElementById("number-of-sets").value = "";
    document.getElementById("number-of-reps").value = "";
  }
}
