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
      productDiv.classList.add("product-card");
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

    // Function to open the modal and set the form values
    document.querySelectorAll(".buy-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const productCard = event.target.closest(".product-card");
        const mangoVariety = productCard.querySelector("h3").textContent;
        const pricePerKg = productCard.querySelector("p").textContent;

        // Set the values in the form
        document.getElementById("mangoVariety").value = mangoVariety;
        document.getElementById("price-per-kg").textContent = pricePerKg;

        // Show the modal
        modal.style.display = "block";
      });
    });

    // Update total price on amount change
    document.getElementById("amount").addEventListener("input", () => {
      const pricePerKg = document.getElementById("price-per-kg").textContent;
      const amount = parseFloat(document.getElementById("amount").value);
      const price = parseFloat(pricePerKg.split(" ")[0]); // Assuming the format is "xx BDT/kg"

      if (!isNaN(amount) && !isNaN(price) && amount > 0) {
        const totalPrice = amount * price;
        document.getElementById(
          "totalPrice"
        ).textContent = `Total: ${totalPrice} BDT`;
        document.getElementById("total").value = totalPrice;
      } else {
        document.getElementById("totalPrice").textContent = " ";
        document.getElementById("total").value = 0;
      }
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


document
  .getElementById("mc-embedded-subscribe")
  .addEventListener("click", (event) => {
    event.preventDefault();

    let form = document.getElementById("mc-embedded-subscribe-form");
    let email = document.getElementById("mce-EMAIL");
    let fname = document.getElementById("mce-FNAME");

    if (email.checkValidity() && fname.checkValidity()) {
      localStorage.setItem("email", email.value);
      form.submit();
      form.clear();
    }
  });
