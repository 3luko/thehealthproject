let gender = document.getElementById("gender-choice");
let weight = document.getElementById("weight");
let age = document.getElementById("user-age");
let height_inches = document.getElementById("height-inches");
let height_feet = document.getElementById("height-feet");
let exercise_week = document.getElementById("often-exer");
let week_amount = document.getElementById("week-amount");
let weight_lost = document.getElementById("weight-lost");
let output = document.getElementById("output-box-container");

const goals_calc = document.getElementById("calculate-goals-button");
const clear_goals_button = document.getElementById("clear-input-button");

clear_goals_button.addEventListener("click", function () {
  gender.value = "";
  weight.value = "";
  age.value = "";
  height_inches.value = "";
  height_feet.value = "";
  exercise_week.value = "";
  week_amount.value = "";
  weight_lost.value = "";
});

goals_calc.addEventListener("click", function () {
  show_calorie_intake();
});

// function for if non-priority inputs were not put in
function input_fields_filled() {
  if (
    isEmpty(gender) ||
    isEmpty(weight) ||
    isEmpty(age) ||
    isEmpty(height_feet) ||
    isEmpty(height_inches) ||
    isEmpty(exercise_week) ||
    isEmpty(week_amount) ||
    isEmpty(weight_lost)
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmpty(word) {
  if (word.value === "") {
    return true;
  } else {
    return false;
  }
}

function bmr_men() {
  //if user submitted without inputting height
  let height_cm;
  let weight_kg;
  let age_bmr;
  let bmr;

  if (
    isEmpty(document.getElementById("height-feet")) ||
    isEmpty(document.getElementById("height-inches"))
  ) {
    height_cm = (5 * 12 + 9) * 2.54;
    //user submitted height
  } else {
    height_cm =
      (Number(document.getElementById("height-feet").value) * 12 +
        Number(document.getElementById("height-inches").value)) *
      2.54;
  }

  //if the user did not enter a weight, put in the  average weight of American men
  if (isEmpty(document.getElementById("weight"))) {
    weight_kg = 199.8 * 0.45359237;
    //If the user did input a weight, it uses that and converts it to kilograms
  } else {
    weight_kg = Number(document.getElementById("weight").value) * 0.45359237;
    console.log("Weight in Kg = " + weight_kg);
  }

  age_bmr = Number(document.getElementById("user-age").value);
  console.log("Age = " + age_bmr);
  //determining if it is a male or a women to change the calculations.
  if (gender.value === "male") {
    bmr = weight_kg * 10 + 6.25 * height_cm - age_bmr * 5 + 5;
    console.log("math for a man");
  } else if (gender.value === "female") {
    bmr = weight_kg * 10 + 6.25 * height_cm - age_bmr * 5 - 161;
    console.log("math for a women");
  } else {
    bmr =
      weight_kg * 10 +
      6.25 * height_cm -
      age_bmr * 5 +
      5 +
      (weight_kg * 10 + 6.25 * height_cm - age_bmr * 5 - 161) / 2;
  }

  return bmr;
}

function daily_cal_deficit() {
  let calories = Number(document.getElementById("weight-lost").value) * 3500;

  const weeks = Number(document.getElementById("week-amount").value);

  calories = calories / weeks;

  return calories / 7;
}

function tdee() {
  const exercise_rate = Number(document.getElementById("often-exer").value);
  let finalVal;
  if (exercise_rate == 6) {
    finalVal = bmr_men() * 1.2;
  } else if (exercise_rate == 3) {
    finalVal = bmr_men() * 1.55;
  } else if (exercise_rate == 1) {
    finalVal = bmr_men() * 1.375;
  } else {
    finalVal = bmr_men() * 1.2;
  }
  return finalVal;
}

function show_calorie_intake() {
  //if all the input fields are filled it will output results
  if (input_fields_filled()) {
    const calories = Math.round(tdee() - daily_cal_deficit());
    if (calories < 0) {
      output.innerHTML = `<p>Seems like this goal is a bit unrealistic, consider tampering with the duration, or changing the the weight lost goal!</p>`;
    } else {
      output.innerHTML = `<p>You should consume an approximate maximum of <strong class="result">${calories} calories/day</strong> to lose ${+document.getElementById(
        "weight-lost"
      ).value}
                            lbs in ${
                              document.getElementById("week-amount").value
                            } weeks</p>`;
    }
  } else {
    alert("Please fill out all fields for an accurate output");
  }
}

function noNewTab() {
  window.location.href = "home.html";
}
