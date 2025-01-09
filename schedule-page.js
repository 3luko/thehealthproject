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
