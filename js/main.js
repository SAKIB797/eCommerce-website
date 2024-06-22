// Fetch mango data from mangoes.json and render dynamically
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./json/mangoes.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const mangoesData = await response.json();

    const productsGrid = document.getElementById("products-grid");
    mangoesData.mangoes.forEach((mango) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
                        <div>
                          <img src="./img/${mango.image}" alt="${mango.name}" />
                        </div>
                        <div>
                          <h3>${mango.name}</h3>
                          <p>${mango.price_per_kg} BDT/kg</p>
                          <a role="button" href="#">Buy</a>
                        </div>
                    `;
      productsGrid.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching and rendering data:", error);
  }
});
