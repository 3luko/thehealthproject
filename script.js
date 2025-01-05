const gender = document.getElementById("gender-choice");
const weight = document.getElementById("weight");
const age = document.getElementById("user-age");
const height_inches = document.getElementById("height-inches");
const height_feet = document.getElementById("height-feet");

const goals_calc = document.getElementById("calculate-goals-button");

goals_calc.addEventListener("click", function () {
  // alert("Would you like to input your gender? This information can be crucial to getting the most accurate understanding of what you need to do to complete your goals!")
  // console.log("Button was clicked!")
  non_priority_alert();
  console.log(bmr_men());
  console.log("after non-priority function call");
});

//function for if non-priority inputs were not put in
function non_priority_alert() {
  document.getElementById("weight").style.outline = "none";
  document.getElementById("user-age").style.outline = "none";
  document.getElementById("height-inches").style.outline = "none";
  document.getElementById("height-feet").style.outline = "none";
  //const user_response;
  if (weight.value === "") {
    user_response = confirm("Please input your weight");
    if (user_response) {
      document.getElementById("weight").style.outline = "solid 1px red";
      return;
    }
  } else {
    document.getElementById("weight").style.outline = "none";
  }

  if (height_inches.value === "" || height_feet.value === "") {
    user_response = confirm("Please input your height");
    if (user_response && height_inches.value === "") {
      document.getElementById("height-inches").style.outline = "solid 1px red";
    }
    if (user_response && height_feet.value === "") {
      document.getElementById("height-feet").style.outline = "solid 1px red";
    }
    return;
  } else {
    //if the inches input is not empty it will change back to red
    if (!isEmpty(height_inches.value)) {
      document.getElementById("height-inches").style.outline = "none";
    }
    if (!isEmpty(height_feet.value)) {
      document.getElementById("height-feet").style.outline = "none";
    }
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

  if (
    isEmpty(document.getElementById("height-feet")) ||
    isEmpty(document.getElementById("height-inches"))
  ) {
    height_cm = (5 * 12 + 9) * 2.54;
    //console.log(height);
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

  const bmr = weight_kg * 10 + 6.25 * height_cm - age_bmr * 5 + 5;

  return bmr + " " + document.getElementById("user-name").value;
}

function daily_cal_deficit() {
  const calories = Number(document.getElementById("weight-lost").value) * 3500;

  const weeks = Number(document.getElementById("week-amount").value);

  calories = calories / weeks;

  return calories / 7;
}
