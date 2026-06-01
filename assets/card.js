
const MANUAL_DATA = {
  name: "john",
  surname: "doe",
  nationality: "POLSKIE",
  year: "200?",
  month: "?",
  day: "??",
  sex: "m",        
  familyName: "imie",
  fathersName: "imie",
  mothersName: "imie",
  fathersFamilyName: "imie",
  mothersFamilyName: "imie",
  birthPlace: "Bytom",
  countryOfBirth: "Polska",
  address1: "ulica",
  address2: "kod pocztowy",
  city: "miasto",
};

const IMAGE_PATH = "./ryj.png";

var confirmElement = document.querySelector(".confirm");
var time = document.getElementById("time");

if (localStorage.getItem("update") == null) {
  localStorage.setItem("update", "24.12.2025");
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener("click", () => {
  var newDate = date.toLocaleDateString("pl-PL", options);
  localStorage.setItem("update", newDate);
  updateText.innerHTML = newDate;
  scroll(0, 0);
});

setClock();
function setClock() {
  date = new Date();
  time.innerHTML =
    "Czas: " +
    date.toLocaleTimeString("pl-PL", optionsTime) +
    " " +
    date.toLocaleDateString("pl-PL", options);
  delay(1000).then(() => setClock());
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener("click", () => {
  unfold.classList.toggle("unfolded");
});

loadReadyData(MANUAL_DATA);

function loadReadyData(result) {
  Object.keys(result).forEach((key) => {
    result[key] = htmlEncode(result[key]);
  });

  const birthdayDate = new Date();
  birthdayDate.setFullYear(result["year"], result["month"] - 1, result["day"]);

  var sex = result["sex"];

  let day   = birthdayDate.getDate();
  let month = birthdayDate.getMonth() + 1;
  let year  = birthdayDate.getFullYear();

  var textSex = sex === "m" ? "Mężczyzna" : "Kobieta";

  var seriesAndNumber = localStorage.getItem("seriesAndNumber");
  if (!seriesAndNumber) {
    seriesAndNumber = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUWXYZ".split("");
    for (var i = 0; i < 4; i++) seriesAndNumber += chars[getRandom(0, chars.length)];
    seriesAndNumber += " ";
    for (var i = 0; i < 5; i++) seriesAndNumber += getRandom(0, 9);
    localStorage.setItem("seriesAndNumber", seriesAndNumber);
  }

  var dayStr   = day   > 9 ? day   : "0" + day;
  var monthStr = month > 9 ? month : "0" + month;

  setData("seriesAndNumber", seriesAndNumber);
  setData("name",            result["name"].toUpperCase());
  setData("surname",         result["surname"].toUpperCase());
  setData("nationality",     result["nationality"].toUpperCase());
  setData("fathersName",     result["fathersName"].toUpperCase());
  setData("mothersName",     result["mothersName"].toUpperCase());
  setData("birthday",        dayStr + "." + monthStr + "." + year);
  setData("familyName",      result["familyName"]);
  setData("sex",             textSex);
  setData("fathersFamilyName", result["fathersFamilyName"]);
  setData("mothersFamilyName", result["mothersFamilyName"]);
  setData("birthPlace",      result["birthPlace"]);
  setData("countryOfBirth",  result["countryOfBirth"]);
  setData("adress",
    "ul. " + result["address1"] + "<br>" + result["address2"] + " " + result["city"]
  );

  var givenDate = new Date(birthdayDate);
  givenDate.setFullYear(givenDate.getFullYear() + 18);
  setData("givenDate", givenDate.toLocaleDateString("pl-PL", options));

  var expiryDate = new Date(givenDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 10);
  setData("expiryDate", expiryDate.toLocaleDateString("pl-PL", options));

  if (!localStorage.getItem("homeDate")) {
    var homeDate = new Date();
    homeDate.setDate(getRandom(1, 25));
    homeDate.setMonth(getRandom(0, 12));
    homeDate.setFullYear(getRandom(2012, 2019));
    localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options));
  }
  document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate");

  // PESEL
  var peselMonth = parseInt(monthStr);
  if (parseInt(year) >= 2000) peselMonth += 20;
  var peselMonthStr = peselMonth > 9 ? "" + peselMonth : "0" + peselMonth;
  var later = sex === "m" ? "0295" : "0382";
  var pesel = year.toString().substring(2) + peselMonthStr + dayStr + later + "7";
  setData("pesel", pesel);
}

loadImage();
function loadImage() {
  document.querySelector(".id_own_image").style.backgroundImage = `url("${IMAGE_PATH}")`;
}

function setImage(image) {
  document.querySelector(".id_own_image").style.backgroundImage = `url(${image})`;
}

function setData(id, value) {
  document.getElementById(id).innerHTML = value;
}
