const workoutSubmit = document.getElementById("workout-submit-button");
//function for when workout submit button is selected
workoutSubmit.addEventListener("click", () => {
  workout_to_container(
    document.getElementById("workout-name"),
    document.getElementById("number-of-sets"),
    document.getElementById("number-of-reps")
  );
});

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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
      document.getElementById("user-workouts-container").style.display =
        "block";
      document.getElementById("show-workout-button-container").style.display =
        "block";
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

function workout_to_container(name, sets, reps) {
  if (isEmpty(name) || isEmpty(sets) || isEmpty(reps)) {
    alert("Please input all values");
  } else {
    var newDiv = document.createElement("div");
    newDiv.classList.add("user-workouts");

    const workout_name_div = document.createElement("div");
    workout_name_div.classList.add("workouts-p");
    const workout_p = document.createElement("p");
    workout_p.textContent = ` ${
      document.getElementById("user-workouts-container").childElementCount
    }. ${name.value}`;
    workout_name_div.appendChild(workout_p);
    newDiv.appendChild(workout_name_div);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Workout";
    deleteButton.classList.add("delete-workout-button");
    deleteButton.addEventListener("click", () => {
      newDiv.remove();
      renumberWorkouts();
    });
    newDiv.appendChild(deleteButton);

    document.getElementById("user-workouts-container").appendChild(newDiv);

    document.getElementById("workout-name").value = "";
    document.getElementById("number-of-sets").value = "";
    document.getElementById("number-of-reps").value = "";
    document.getElementById("schedule-options").style.display = "none";

    return {
      name,
      reps,
      sets,
    };
  }
}

function renumberWorkouts() {
  const workoutContainers = document.querySelectorAll(
    "#user-workouts-container .user-workouts"
  );
  workoutContainers.forEach((container, index) => {
    const workout_p = container.querySelector(".workouts-p p");
    workout_p.textContent = `${index + 1}. ${
      workout_p.textContent.split(". ")[1]
    }`;
  });
}

const addWorkoutButton = document.getElementById("show-add-workout");
addWorkoutButton.addEventListener("click", () => {
  document.getElementById("schedule-options").style.display = "block";
});
