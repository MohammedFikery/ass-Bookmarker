// !========================== Start Global Variables
var BookmarksNameInput = document.getElementById("BookmarksName"); // Input element for product name
var SiteURLInput = document.getElementById("SiteURL"); // Input element for product price
var searchInput = document.getElementById("searchInput"); // Search input field
var btnSubmit = document.getElementById("btnSubmit"); // Button to add a new product
var btnUpdate = document.getElementById("btnUpdate"); // Button to update an existing product
var selectIndex = 0; // Index of the product being updated
var productList = []; // Array to store the list of products

// Load product data from localStorage if available
if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer")); // Load products into the list
  displayData(); // Display product data on the page
}
// !========================== End Global Variables

if (localStorage.getItem("productList") !== null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  ShowData();
}

function addProduct() {
  if (validationBookmarksName() && validationSiteURL()) {
    var product = {
      BookmarksName: BookmarksNameInput.value,
      SiteURL: SiteURLInput.value,
    };
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    ShowData();
    clearinput();
  }
}

function clearinput() {
  SiteURLInput.value = null;
  BookmarksNameInput.value = null;


  SiteURLInput.classList.remove("is-valid");
  BookmarksNameInput.classList.remove("is-valid");
}

function ShowData() {
  var term = searchInput.value;
  var item = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].BookmarksName.toLowerCase().includes(term.toLowerCase())
    ) {
      item += `
     <tr>
                  <td> ${i}</td>
                  <td>${productList[i].BookmarksName}</td>
                  <td>
                    <button onclick="" class="btn btn-visit" data-index="0">
                      <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button  onclick="deleteItem(${i})" class="btn btn-delete pe-2" data-index="0">
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </td>
                </tr>
  `;
    }
  }

  document.getElementById("tableContent").innerHTML = item;
}
function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  ShowData();
}

function validationBookmarksName() {
  var regex = /^[a-zA-Z0-9\s]{1,50}$/; // Regex to validate product name
  var text = BookmarksNameInput.value;
  var msgName = document.getElementById("msgName");

  if (regex.test(text)) {
    // Valid input
    BookmarksNameInput.classList.add("is-valid");
    BookmarksNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    // Invalid input
    BookmarksNameInput.classList.add("is-invalid");
    BookmarksNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}

function validationSiteURL() {
  var regex =
    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/; // Regex to validate product name
  var text = SiteURLInput.value;
  var msgName = document.getElementById("msgUrl");

  if (regex.test(text)) {
    // Valid input
    SiteURLInput.classList.add("is-valid");
    SiteURLInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    // Invalid input
    SiteURLInput.classList.add("is-invalid");
    SiteURLInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}
