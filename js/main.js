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

document.getElementById("goto-subscribe-btn").addEventListener("click", () => {
  modal.style.display = "none";
});

// Function to open the modal and set the form values
window.onload = () => {
  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // Show the modal
      modal.style.display = "block";
      //
      if (localStorage.getItem("email") == null) {
        document.querySelector(".non-subscriber").style.display = "flex";
        document.querySelector(".modal-content").style.display = "none";
      } else {
        document.querySelector(".non-subscriber").style.display = "none";
        document.querySelector(".modal-content").style.display = "block";
        const productCard = event.target.closest(".product-card");
        const mangoVariety = productCard.querySelector("h3").textContent;
        const pricePerKg = productCard.querySelector("p").textContent;

        // Set the values in the form
        document.getElementById("mangoVariety").value = mangoVariety;
        document.getElementById("price-per-kg").textContent = pricePerKg;
      }
    });
  });
};

// Update total price on amount change
document.getElementById("amount").addEventListener("input", () => {
  const pricePerKg = document.getElementById("price-per-kg").textContent;
  const amount = parseFloat(document.getElementById("amount").value);
  const price = parseFloat(pricePerKg.split(" ")[0]); // Assuming the format is "xx BDT/kg"

  if (!isNaN(amount) && !isNaN(price) && amount > 0) {
    const totalPrice = amount * price;
    document.getElementById(
      "totalPrice"
    ).textContent = `মোট: ${totalPrice} BDT`;
    document.getElementById("total").value = totalPrice;
  } else {
    document.getElementById("totalPrice").textContent = " ";
    document.getElementById("total").value = 0;
  }
});

// store subscriber email in local storage
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
      form.reset();
    }
  });
