let allCars = [];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("carGrid");
  const searchInput = document.getElementById("searchInput");
  const filterType = document.getElementById("filterType");
  const filterBrand = document.getElementById("filterBrand");
  const suggestions = document.getElementById("suggestions");
  const lastReserveBtn = document.getElementById("lastReserveBtn");
  
  if (lastReserveBtn) {
    lastReserveBtn.addEventListener("click", goToLastReservation);
  }

  fetch("cars.json")   // AJAX
    .then(res => res.json())
    .then(data => {
      allCars = data.cars;
      displayCars(allCars);

      searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        showSuggestions(keyword);
      });

      searchInput.addEventListener("blur", () => {
        setTimeout(() => suggestions.style.display = "none", 100);
      });

      suggestions.addEventListener("click", e => {
        if (e.target.tagName === "DIV") {
          searchInput.value = e.target.innerText;
          filterAndDisplay();
        }
      });

      document.getElementById("searchBtn").addEventListener("click", filterAndDisplay);
      filterType.addEventListener("change", filterAndDisplay);
      filterBrand.addEventListener("change", filterAndDisplay);
    });

  function validateForm() {
  let valid = true;

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const license = document.getElementById("license").value.trim();
  const start = document.getElementById("start").value;
  const days = parseInt(document.getElementById("days").value);

  const nameF = document.getElementById("nameFeedback");
  const phoneF = document.getElementById("phoneFeedback");
  const emailF = document.getElementById("emailFeedback");
  const licenseF = document.getElementById("licenseFeedback");
  const startF = document.getElementById("startFeedback");
  const daysF = document.getElementById("daysFeedback");


  if (name.length < 2) {
    nameF.textContent = "Name is too short.";
    valid = false;
  } else {
    nameF.textContent = "✔️";
    nameF.classList.add("valid");
  }

  if (!/^\d{8,}$/.test(phone)) {
    phoneF.textContent = "Enter a valid phone number.";
    valid = false;
  } else {
    phoneF.textContent = "✔️";
    phoneF.classList.add("valid");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailF.textContent = "Invalid email format.";
    valid = false;
  } else {
    emailF.textContent = "✔️";
    emailF.classList.add("valid");
  }

  if (license.length < 6) {
    licenseF.textContent = "License number too short.";
    valid = false;
  } else {
    licenseF.textContent = "✔️";
    licenseF.classList.add("valid");
  }

  if (!start) {
    startF.textContent = "Select a start date.";
    valid = false;
  } else {
    startF.textContent = "";
  }

  if (!days || days < 1) {
    daysF.textContent = "Enter valid days.";
    valid = false;
  } else {
    daysF.textContent = "";
  }

  document.getElementById("submitBtn").disabled = !valid;
  if (valid) updateTotal();
}

const reservationForm = document.querySelector("form");
if (reservationForm) {
  reservationForm.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", validateForm);
  });
}


  function showSuggestions(keyword) {
    if (!keyword) return suggestions.style.display = "none";
    const matchList = allCars
      .filter(car =>
        car.brand.toLowerCase().includes(keyword) ||
        car.carModel.toLowerCase().includes(keyword) ||
        car.carType.toLowerCase().includes(keyword) ||
        car.description.toLowerCase().includes(keyword)
      )
      .map(car => `${car.brand} ${car.carModel}`);

    const unique = [...new Set(matchList)];
    suggestions.innerHTML = unique.map(item => `<div>${item}</div>`).join("");
    suggestions.style.display = unique.length ? "block" : "none";
  }

  function filterAndDisplay() {
  const keyword = searchInput.value.toLowerCase();
  const keywords = keyword.split(" ");
  const type = filterType.value;
  const brand = filterBrand.value;

  const filtered = allCars.filter(car => {
    const matchKeyword = keywords.every(kw =>
      car.brand.toLowerCase().includes(kw) ||
      car.carModel.toLowerCase().includes(kw) ||
      car.carType.toLowerCase().includes(kw) ||
      car.description.toLowerCase().includes(kw)
    );
    const matchType = !type || car.carType === type;
    const matchBrand = !brand || car.brand === brand;
    return matchKeyword && matchType && matchBrand;
  });

  displayCars(filtered);
}


function goToLastReservation() {
  const vin = localStorage.getItem("last_reserved_vin");
  if (vin) {
    window.location.href = `reservation.php?vin=${vin}`;
  } else {
    alert("You haven't reserved any vehicle yet.");
  }
}

  function displayCars(cars) {
    grid.innerHTML = "";
    cars.forEach(car => {
      const div = document.createElement("div");
      div.className = "car-row";
      div.innerHTML = `
        <img src="${car.image}" alt="${car.carModel}" />
        <div class="car-info">
          <p><strong>${car.brand} ${car.carModel}</strong> (${car.carType})</p>
          <p>Year: ${car.yearOfManufacture}</p>
          <p>Mileage: ${car.mileage}</p>
          <p>Fuel Type: ${car.fuelType}</p>
          <p class="price">$${car.pricePerDay} / day</p>
          <p>${car.available ? "✅ Available" : "❌ Not Available"}</p>
          <p>${car.description}</p>
          ${car.available
           ? `<a href="reservation.php?vin=${car.vin}" onclick="localStorage.setItem('last_reserved_vin', '${car.vin}')">
           <button>Reserve</button>
           </a>`
           : `<button disabled style="background-color: #ccc; cursor: not-allowed;">Not Available</button>`
          }


        </div>
      `;
      grid.appendChild(div);
    });
  }
});
