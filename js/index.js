// jquery for datePicker
$(document).ready(function () {
  $("#datepicker").datepicker({
    startDate: new Date(),
    autoclose: true,
    todayHighlight: true,
    format: "dd/mm/yyyy",
  });
});

//   state and cities data
let stateCityData = {
  Maharashtra: ["Mumbai", "Pune", "Thane"],
  Delhi: ["Delhi", "New Delhi"],
  Karnataka: ["Bengaluru", "Hubli-Dharwad", "Mangaluru"],
};

//   local Storage Object
let formData;
// check if formData object present in localStorage if present then get it and set it to variable
if (localStorage.getItem("formData")) {
  formData = JSON.parse(localStorage.getItem("formData"));
} else {
  // if not present then create object and store it in localStorage
  formData = {};
  localStorage.setItem("formData", JSON.stringify(formData));
}

// same logic like formdata
if (localStorage.getItem("stateCityData")) {
  stateCityData = JSON.parse(localStorage.getItem("stateCityData"));
} else {
  localStorage.setItem("stateCityData", JSON.stringify(stateCityData));
}

// city and state elements fill it with data values
let stateInput = document.querySelector("#stateInput");
let cityInput = document.querySelector("#cityInput");

loadState();

//   when user selects state it will populate city according to state
stateInput.addEventListener("change", (e) => {
  loadCity2(e.target.value);
});

//   get all forms
let forms = document.querySelectorAll(".form");
//   get all progress dots
let progressDots = document.querySelectorAll(".progress-dots");

//   pointers
// current state of the form
let currentForm = 0;
nextStepProgressDot();

//   get all next buttons
let formOneNextBtn = document.querySelector(".formOne .btn-group .btn-primary");
let formTwoNextBtn = document.querySelector(".formTwo .btn-group .btn-primary");
let formThreeNextBtn = document.querySelector(
  ".formThree .btn-group .btn-primary"
);
let formFourSubmitBtn = document.querySelector(
  ".formFour .btn-group #submitBtn"
);

let passConditions = document.querySelectorAll(".pass-condition");
let passwordProgress = document.querySelector("#passwordProgress");
let progressBar = passwordProgress.querySelector(".progress-bar");
let badge = document.querySelector(".badge");

let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#phoneInput");
let dateInput = document.querySelector("#dateInput");
let passwordInput = document.querySelector("#passwordInput");

// onblur for inputs
nameInput.addEventListener("blur", nameValidation);
emailInput.addEventListener("blur", emailValidation);
phoneInput.addEventListener("blur", phoneValidation);
dateInput.addEventListener("blur", (e) => {
  if (dateInput.getAttribute("stid")) {
    clearTimeout(+dateInput.getAttribute("stid"));
  }
  let stid = setTimeout(() => {
    dateValidation();
  }, 500);

  dateInput.setAttribute("stid", stid);
});
stateInput.addEventListener("blur", stateValidation);
cityInput.addEventListener("blur", cityValidation);
passwordInput.addEventListener("blur", passwordValidation);

let conditionFlag = false;

// function to validate name according to conditions
function nameValidation() {
  nameInput.classList.remove("invalid");
  conditionFlag = false;
  if (nameInput.value == "") {
    conditionFlag = true;
    nameInput.classList.add("invalid");
    showErrorMessage(nameInput, "Name is required");
  } else {
    // check name with regex
    let pattern = /^[a-zA-Z\s]+$/;
    if (!pattern.test(nameInput.value)) {
      conditionFlag = true;
      nameInput.classList.add("invalid");
      showErrorMessage(
        nameInput,
        "Name can only contain characters and spaces"
      );
    } else {
      conditionFlag = true;
    }
  }

  return conditionFlag;
}

// function to validate email according to email conditions
function emailValidation() {
  emailInput.classList.remove("invalid");
  conditionFlag = false;
  if (emailInput.value == "") {
    conditionFlag = false;
    emailInput.classList.add("invalid");
    showErrorMessage(emailInput, "Email is required");
    return;
  } else {
    // check email with regex
    pattern = /^[0-9a-zA-Z][a-zA-Z0-9\._-]*@[0-9a-zA-Z]+\.[a-zA-Z]{2,3}$/;

    if (!pattern.test(emailInput.value)) {
      conditionFlag = false;
      emailInput.classList.add("invalid");
      showErrorMessage(emailInput, "Email Address is invalid");
      return;
    } else {
      conditionFlag = true;
    }
  }

  return conditionFlag;
}

// function for phone number validations
function phoneValidation() {
  phoneInput.classList.remove("invalid");
  conditionFlag = false;
  if (phoneInput.value == "") {
    phoneInput.classList.add("invalid");
    showErrorMessage(phoneInput, "Phone number is required");
    conditionFlag = false;
  } else {
    // number validations
    let pattern = /^[9|8|7|6]/;
    if (!pattern.test(phoneInput.value)) {
      phoneInput.classList.add("invalid");
      showErrorMessage(
        phoneInput,
        "Phone Number is not valid. Number should start from 6/7/8/9"
      );
      conditionFlag = false;
    } else {
      if ((phoneInput.value + "").length == 10) {
        conditionFlag = true;
      } else {
        phoneInput.classList.add("invalid");
        showErrorMessage(
          phoneInput,
          "Phone Number is not valid. Number should be of 10 digit"
        );
        conditionFlag = false;
      }
    }
  }

  return conditionFlag;
}

// function for date validation
function dateValidation() {
  dateInput.classList.remove("invalid");
  conditionFlag = false;
  if (dateInput.value == "") {
    dateInput.classList.add("invalid");
    showErrorMessage(dateInput, "Date is required");
    conditionFlag = false;
  } else {
    conditionFlag = true;
  }

  return conditionFlag;
}

// function to validate state
function stateValidation() {
  stateInput.classList.remove("invalid");
  conditionFlag = false;
  if (stateInput.value == 0) {
    stateInput.classList.add("invalid");
    showErrorMessage(stateInput, "State is required");
    conditionFlag = false;
  } else {
    conditionFlag = true;
  }

  return conditionFlag;
}

// function to validate city
function cityValidation() {
  cityInput.classList.remove("invalid");
  conditionFlag = false;
  if (cityInput.value == 0) {
    cityInput.classList.add("invalid");
    showErrorMessage(cityInput, "City is required");
    conditionFlag = false;
  } else {
    conditionFlag = true;
  }

  return conditionFlag;
}

// function for password validation
function passwordValidation() {
  passwordInput.classList.remove("invalid");
  if (passwordInput.value == "") {
    passwordInput.classList.add("invalid");
    showErrorMessage(passwordInput, "Password is required");
  }
}

// nextHandler
function nextHandler(
  firstInput,
  secondInput,
  firstValidation,
  secondValidation
) {
  if (firstValidation() && secondValidation()) {
    // all data valid then save to local storage
    formData[firstInput.name] = firstInput.value;
    formData[secondInput.name] = secondInput.value;

    // localStorage.setItem("formData", JSON.stringify(formData));
    // move to next form
    forms[currentForm].classList.add("d-none");
    forms[currentForm + 1].classList.remove("d-none");
    currentForm++;
    nextStepProgressDot();
    // localStorage.setItem("currentForm", currentForm);
  }
}

formOneNextBtn.addEventListener("click", () => {
  nextHandler(nameInput, emailInput, nameValidation, emailValidation);
});

formTwoNextBtn.addEventListener("click", () => {
  nextHandler(phoneInput, dateInput, phoneValidation, dateValidation);
});

formThreeNextBtn.addEventListener("click", () => {
  nextHandler(stateInput, cityInput, stateValidation, cityValidation);
});

//   listening on change event for state input to check user selects add state option
stateInput.addEventListener("change", (e) => {
  if (stateInput.value == "addstate") {
    let state = prompt("Enter State name:");

    if (state != null) {
      // check if duplicate state present
      let states = Object.keys(stateCityData);

      states = states.filter((val, idx) => {
        if (state.toLowerCase() == val.toLowerCase()) {
          return val;
        }
      });

      if (states.length >= 1) {
        alert(`${state} already exists`);
        stateInput.value = 0;
        loadCity2(0);
        return;
      }

      state = state.split("");
      state[0] = state[0].toUpperCase();
      state = state.join("");

      stateCityData[state] = [];
      localStorage.setItem("stateCityData", JSON.stringify(stateCityData));

      // TODO: load state again
      loadState();

      stateInput.value = state;
      loadCity2(stateInput.value);
      // loadCity()
    } else {
      stateInput.value = 0;
    }
  }
});

//   listening on change event for city input to check user selects add city option
cityInput.addEventListener("change", () => {
  if (cityInput.value == "addcity") {
    let city = prompt("Enter city name:");

    if (city != "") {
      // check if city is present in selected state
      let cities = stateCityData[stateInput.value];
      cities = cities.filter((val) => {
        if (city.toLowerCase() == val.toLowerCase()) {
          return val;
        }
      });

      if (cities.length >= 1) {
        // showErrorMessage(cityInput, `${city} already exists`);
        alert(`${city} already exists`);
        cityInput.value = 0;
        return;
      }

      city = city.split("");
      city[0] = city[0].toUpperCase();
      city = city.join("");

      if (stateInput.value != 0) {
        stateCityData[stateInput.value].push(city);
        localStorage.setItem("stateCityData", JSON.stringify(stateCityData));
        // load city
        // loadCity();
        loadCity2(stateInput.value);
        cityInput.value = city;
      }
    } else {
      cityInput.value = 0;
    }
  }
});

//   passScore variable to store score of password based on conditions
let passScore = 0;
formFourSubmitBtn.addEventListener("click", () => {
  if (passScore < 80) {
    passwordInput.classList.add("invalid");
    showErrorMessage(
      passwordInput,
      "Password should contain all mentioned characters"
    );
    return;
  }

  formData["password"] = passwordInput.value;
  localStorage.setItem("formData", JSON.stringify(formData));
  localStorage.setItem("currentForm", currentForm);
  //  go to new page
  location.href = "details.html";
});

let showHidePass = document.querySelector("#showHidePass");
passwordInput.addEventListener("input", (e) => {
  // show eyecon only when password has data else don't show
  if (e.target.value.length > 0) {
    showHidePass.classList.remove("d-none");
  } else {
    showHidePass.classList.add("d-none");
  }
  let progress = document.querySelector(".progress");
  progress.classList.remove("d-none");
  passwordCheck2(e.target.value);
});

let formTwoPrevBtn = document.querySelector(
  ".formTwo .btn-group .btn-secondary"
);
let formThreePrevBtn = document.querySelector(
  ".formThree .btn-group .btn-secondary"
);
let formFourPrevBtn = document.querySelector(
  ".formFour .btn-group .btn-secondary"
);

//   previous btn events
function previousHandler() {
  forms[currentForm].classList.add("d-none");

  forms[currentForm - 1].classList.remove("d-none");
  currentForm--;
  prevStepProgressDot();
  // localStorage.setItem("currentForm", currentForm);
}

formTwoPrevBtn.addEventListener("click", previousHandler);

formThreePrevBtn.addEventListener("click", previousHandler);

formFourPrevBtn.addEventListener("click", previousHandler);

// function to change style of progress-dot class elem when next btn is clicked
function nextStepProgressDot() {
  progressDots[currentForm].classList.add("bg-primary", "text-white");
  for (let i = 0; i < currentForm; i++) {
    progressDots[i].classList.remove("bg-primary", "text-white");
    progressDots[i].classList.add("bg-success", "text-white");
  }
}

// function to change style of progress-dot class elem when prev btn is clicked
function prevStepProgressDot() {
  progressDots[currentForm + 1].classList.remove("bg-primary", "text-white");
  progressDots[currentForm + 1].classList.remove("bg-success", "text-white");
  progressDots[currentForm].classList.add("bg-primary", "text-white");
  progressDots[currentForm].classList.remove("bg-success");
  for (let i = 0; i < currentForm; i++) {
    progressDots[i].classList.remove("bg-primary");
    progressDots[i].classList.add("bg-success", "text-white");
  }
}

// function to display current form based on state (no need now ig cause we are reseting data when refresh)
function showCurrentForm() {
  currentForm = +localStorage.getItem("currentForm") || 0;
  forms.forEach((form) => {
    form.classList.add("d-none");
  });
  forms[currentForm].classList.remove("d-none");
  nextStepProgressDot();
  // prevStepProgressDot()
}

// function to persist data when user clicks back btn on details page
function persistWhenBack() {
  if (Object.keys(formData).length == 0) return;
  showCurrentForm();
  loadState();
  loadCity2(formData.state);
  formData.password && passwordCheck2(formData.password);
  if (formData["name"]) nameInput.value = formData["name"];
  if (formData["email"]) emailInput.value = formData["email"];
  if (formData["phone"]) phoneInput.value = formData["phone"];
  if (formData["date"]) dateInput.value = formData["date"];
  if (formData["state"]) stateInput.value = formData["state"];
  if (formData["city"]) cityInput.value = formData["city"];
  if (formData["password"]) passwordInput.value = formData["password"];

  showHidePass.classList.remove("d-none");
  showHidePass.classList.remove("bi-eye");
  showHidePass.classList.add("bi-eye-slash");
}
persistWhenBack();

// function to load state from local storage and when new state is added by user
function loadState() {
  let stateInput = document.querySelector("#stateInput");
  stateInput.innerHTML = `<option selected value="0">Select State</option>`;

  Object.keys(stateCityData).forEach((val, idx, arr) => {
    let state = `<option value="${val}">${val}</option>`;
    stateInput.insertAdjacentHTML("beforeend", state);
  });
  let addStateBtn = document.createElement("option");
  addStateBtn.classList.add("text-white", "bg-primary");
  addStateBtn.id = "addState";
  addStateBtn.value = "addstate";
  addStateBtn.innerText = "Add State";
  stateInput.insertAdjacentElement("beforeend", addStateBtn);
}

// function to load city according to state selected by user and load when new city is added
function loadCity2(currentState) {
  let cityInput = document.querySelector("#cityInput");
  cityInput.innerHTML = `<option selected value="0">Select City</option>`;

  if (currentState == 0) {
    return;
  }

  if (Array.isArray(stateCityData[currentState])) {
    stateCityData[currentState].forEach((val, idx, arr) => {
      let city = `<option value="${val}">${val}</option>`;
      cityInput.insertAdjacentHTML("beforeend", city);
    });
  }

  if (currentState != 0) {
    let addCityBtn = document.createElement("option");
    addCityBtn.classList.add("text-white", "bg-primary");
    addCityBtn.id = "addCity";
    addCityBtn.value = "addcity";
    addCityBtn.innerText = "Add City";
    cityInput.insertAdjacentElement("beforeend", addCityBtn);
  }
}

// function to display error message by passing elem and error message
function showErrorMessage(element, message) {
  //   get next error msg elem
  let errElm = element.parentElement.nextElementSibling;

  errElm.querySelector(".message").innerText = message;
  errElm.classList.remove("d-none");

  if (!errElm.hasAttribute("isTimeOutSet")) {
    errElm.setAttribute("isTimeOutSet", false);
  }

  if (errElm.getAttribute("isTimeOutSet") == "false") {
    setTimeout(() => {
      errElm.classList.add("d-none");
      errElm.setAttribute("isTimeOutSet", false);
    }, 5000);
    errElm.setAttribute("isTimeOutSet", true);
  }
}

// function to check password based on condition
function passwordCheck2(passValue) {
  // password checks
  let hasSmallCaseChar = false;
  let hasCapitalCaseChar = false;
  let hasNumbers = false;
  let hasSpecialChar = false;
  let hasValidLength = false; // >=6

  passScore = 0;

  // check smallCase contains
  let pattern = /[a-z]/g;
  if (passValue.match(pattern)) {
    hasSmallCaseChar = true;
    passScore += 16;
  }

  // check capitalCase contains
  pattern = /[A-Z]/g;
  if (passValue.match(pattern)) {
    hasCapitalCaseChar = true;
    passScore += 16;
  }

  // check numbers
  pattern = /[0-9]/g;
  if (passValue.match(pattern)) {
    hasNumbers = true;
    passScore += 16;
  }

  // check special chars
  // pattern = /[~!@#$%^&*()_+=-]/g
  // TODO: understand this pattern clearly
  pattern = /[^a-zA-Z0-9\s]/;
  if (pattern.test(passValue)) {
    hasSpecialChar = true;
    passScore += 16;
  }

  // check length >= 6
  if (passValue.length >= 6) {
    hasValidLength = true;
    passScore += 16;
  }

  // if all condition true and length is greater than 6 than excellent

  if (
    hasSmallCaseChar &&
    hasCapitalCaseChar &&
    hasNumbers &&
    hasSpecialChar &&
    hasValidLength &&
    passValue.length > 6
  ) {
    passScore += 20;
  }

  switch (passScore) {
    case 16:
    case 32:
      setProgress("Weak", "danger");
      break;

    case 48:
    case 64:
      setProgress("Medium", "warning");
      break;

    case 80:
      setProgress("Strong", "info");

      break;
    case 100:
      setProgress("Excellent", "primary");

      break;

    default:
      progressBar.className = "progress-bar";
      badge.innerText = "";
      badge.className = "badge d-none";
      break;
  }
  progressBar.style.width = passScore + "%";
  progressBar.innerText = passScore + "%";

  toggleConditionClass(0, hasSmallCaseChar);
  toggleConditionClass(1, hasCapitalCaseChar);
  toggleConditionClass(2, hasNumbers);
  toggleConditionClass(3, hasSpecialChar);
  toggleConditionClass(4, hasValidLength);
}

function setProgress(badgeName, styleName) {
  progressBar.className = `progress-bar  bg-${styleName}`;
  badge.innerText = badgeName;
  badge.className = `badge my-2 text-bg-${styleName}`;
}
// helper function for password validation
function toggleConditionClass(conditionIndex, conditionMet) {
  if (conditionMet) {
    passConditions[conditionIndex].classList.add("text-success");
    passConditions[conditionIndex].classList.remove("text-danger");
  } else {
    passConditions[conditionIndex].classList.add("text-danger");
    passConditions[conditionIndex].classList.remove("text-success");
  }
}

// function to reset all data from localstorage and setting input values to ""
function resetData() {
  formData = {};
  localStorage.clear();
  currentForm = 0;
  showCurrentForm();

  progressDots.forEach((elm) => {
    elm.classList.remove("bg-primary", "bg-success", "text-white");
  });
  progressDots[0].classList.add("bg-primary", "text-white");

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  dateInput.value = "";
  stateInput.value = 0;
  cityInput.value = 0;
  passwordInput.value = "";
  resetPasswordConditions();
  loadCity2(0);

  nameInput.classList.remove("invalid");
  emailInput.classList.remove("invalid");
  phoneInput.classList.remove("invalid");
  dateInput.classList.remove("invalid");
  stateInput.classList.remove("invalid");
  cityInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");
}

// function to reseting password conditions styles when we hit reset btn
function resetPasswordConditions() {
  passwordProgress.classList.add("d-none");
  badge.classList.add("d-none");
  passConditions.forEach((elm) => {
    elm.classList.remove("text-danger", "text-success");
  });
}

// reset btn
let resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetData);

// show hide icon for password
showHidePass.addEventListener("click", () => {
  if (showHidePass.classList.contains("bi-eye")) {
    showHidePass.classList.remove("bi-eye");
    showHidePass.classList.add("bi-eye-slash");
    passwordInput.setAttribute("type", "password");
  } else {
    showHidePass.classList.remove("bi-eye-slash");
    showHidePass.classList.add("bi-eye");
    passwordInput.setAttribute("type", "text");
  }
});

// load event on window for reset data when page is refresh by user and to persist data when user hits back btn on detail page
window.addEventListener("load", () => {
  if (localStorage.getItem("isRefreshFromDetailPage") == "true") {
    localStorage.setItem("isRefreshFromDetailPage", "false");
  } else {
    resetData();
  }
});
