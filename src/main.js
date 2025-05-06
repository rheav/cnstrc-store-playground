// src/main.js

import {
  fetchAutocompleteQuery,
  fetchBrowseResults,
  fetchFeaturedProducts,
} from "./api.js";
import { renderBrowseResults, renderFeaturedProduct } from "./render.js";

const browseContainer = document.getElementById("browse-container");
const featuredContainer = document.getElementById("featured-container");

async function init() {
  try {
    const [browseData, featuredData] = await Promise.all([
      fetchBrowseResults("W1233858"),
      fetchFeaturedProducts(["P65079454"]),
      //todo Tratar autocomplete
      fetchAutocompleteQuery("t-shirt"),
    ]);

    renderBrowseResults(browseData, browseContainer);
    renderFeaturedProduct(featuredData, featuredContainer);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

document.addEventListener("DOMContentLoaded", init);
