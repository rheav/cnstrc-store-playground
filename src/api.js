// src/api.js
import ConstructorioClient from "@constructor-io/constructorio-client-javascript";

// Initialize the Constructor.io client
const constructorio = new ConstructorioClient({
  apiKey: "key_EKYrO0qcAxTeRwha",
});

export async function fetchBrowseResults(groupId, resultsPerPage = 40) {
  const response = await constructorio.browse.getBrowseResults(
    "group_id",
    groupId,
    {
      resultsPerPage,
      filters: {},
      filterMatchTypes: {},
    }
  );
  // Return only the array of results
  console.log("Browse Products:", response.response.results);

  return response.response.results;
}

export async function fetchFeaturedProducts(itemIds) {
  const response = await constructorio.browse.getBrowseResultsForItemIds(
    itemIds,
    {
      filters: {},
    }
  );
  console.log("Featured Product:", response.response.results);
  return response.response.results;
}

//todo Tratar autocomplete
export async function fetchAutocompleteQuery(query) {
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
  console.log("Autocomplete:", response);
}
