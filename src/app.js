// src/app.js - Combined JavaScript file
import ConstructorioClient from "@constructor-io/constructorio-client-javascript";

// =============== API FUNCTIONS ===============

// Initialize the Constructor.io client
const constructorio = new ConstructorioClient({
  apiKey: "key_EKYrO0qcAxTeRwha",
});

// Browse results function
async function fetchBrowseResults(groupId, resultsPerPage = 40) {
  const response = await constructorio.browse.getBrowseResults(
    "group_id",
    groupId,
    {
      resultsPerPage,
      filters: {},
      filterMatchTypes: {},
    }
  );
  return response.response;
}

// Featured products function
async function fetchFeaturedProducts(itemIds) {
  const response = await constructorio.browse.getBrowseResultsForItemIds(
    itemIds,
    {
      filters: {},
    }
  );
  return response.response.results;
}

// Autocomplete function
async function fetchAutocompleteQuery(query) {
  const response = await constructorio.autocomplete.getAutocompleteResults(
    query,
    {
      resultsPerSection: {
        Products: 5,
        "Search Suggestions": 10,
      },
      filters: {},
    }
  );
  console.log(
    "Autocomplete:",
    response.request.term,
    response.sections.Products
  );
}

// =============== RENDER FUNCTIONS ===============

// Render browse results
function renderBrowseResults(productGroup, container) {
  container.innerHTML = "";

  const { groups, results } = productGroup;

  const [{ display_name }] = groups;

  const featuredCategoryContainer =
    document.querySelector(".featured-category");
  featuredCategoryContainer.textContent = display_name;

  results.forEach(({ value, data: { image_url, price } }) => {
    const card = document.createElement("div");
    card.classList.add("product-card", "pb-15");
    card.innerHTML = `
      <img src="${image_url}" alt="${value}" class="h-full w-full">
      <h3 class="font-bold">${value}</h3>
      <p>$${price}</p>
    `;
    container.appendChild(card);
  });
}

// Render featured product
function renderFeaturedProduct(products, container) {
  if (!products.length) return;
  const product = products[0];
  const featuredProductName = document.getElementById("featured-product-name");
  featuredProductName.textContent = product.value;
  container.innerHTML = `
    <div class="featured">
      <img src="${product.data.image_url}" alt="${product.value}" class="">
    </div>
  `;
}

// =============== MAIN APP LOGIC ===============

// DOM element references
const browseContainer = document.getElementById("browse-container");
const featuredContainer = document.getElementById("featured-container");
const searchInput = document.getElementById("site-search");

// Initialize data
async function initData() {
  try {
    const [browseData, featuredData] = await Promise.all([
      fetchBrowseResults("W1233858"),
      fetchFeaturedProducts(["P65079454"]),
    ]);

    renderBrowseResults(browseData, browseContainer);
    renderFeaturedProduct(featuredData, featuredContainer);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Initialize autocomplete
function initAutocompleteLogger() {
  if (!searchInput) {
    console.warn("#site-search not found—autocomplete won't work");
    return;
  }

  searchInput.addEventListener("input", (e) => {
    if (e.target.value.length >= 3) {
      console.log("autocomplete query:", e.target.value);
      fetchAutocompleteQuery(e.target.value);
    }
  });
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initData(); // fetch & render browse/featured data
  initAutocompleteLogger(); // wire up the live-search console logger
});
