document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch mango data from JSON file
    const response = await fetch("./json/mangoes.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const mangoesData = await response.json();

    // Populate products grid with mango data
    const productsGrid = document.getElementById("products-grid");
    mangoesData.mangoes.forEach((mango) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
                <div>
                    <img src="./img/${mango.image}" alt="${mango.name}" />
                </div>
                <div class="product-info">
                    <h3>${mango.name}</h3>
                    <p>${mango.price_per_kg} BDT/kg</p>
                    <button class="buy-btn">Buy</button>
                </div>
            `;
      productsGrid.appendChild(productDiv);
    });

    // Populate mango varieties in the form's datalist
    const datalist = document.getElementById("mangoVarieties");
    mangoesData.mangoes.forEach((mango) => {
      const option = document.createElement("option");
      option.value = mango.name;
      datalist.appendChild(option);
    });

    // Event listener for dynamically updating price display based on form inputs
    const mangoVarietyInput = document.getElementById("mangoVariety");
    const amountInput = document.getElementById("amount");
    const priceDisplay = document.getElementById("priceDisplay");
    const total = document.getElementById("totalPrice");

    function updatePrice() {
      const varietyValue = mangoVarietyInput.value.trim();
      const amountValue = amountInput.value.trim();

      // Check if both variety and amount fields have values
      if (varietyValue && amountValue) {
        const selectedMango = mangoesData.mangoes.find(
          (mango) => mango.name === varietyValue
        );
        if (selectedMango) {
          const totalPrice =
            selectedMango.price_per_kg * parseFloat(amountValue);
          priceDisplay.textContent = `Total Price: ${totalPrice.toFixed(
            2
          )} BDT`;
        } else {
          priceDisplay.textContent = ""; // Clear price display if no mango is selected
        }
      } else {
        priceDisplay.textContent = ""; // Clear price display if either field is empty
      }
    }

    mangoVarietyInput.addEventListener("input", updatePrice);
    amountInput.addEventListener("input", updatePrice);

    /*==============js for order form`s modal=================*/
    // Event listeners for "Buy" buttons to show modal
    document.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.style.display = "block";
      });
    });

    // Modal code
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close-modal")[0];

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  } catch (error) {
    console.error("Error fetching and rendering data:", error);
  }
});
