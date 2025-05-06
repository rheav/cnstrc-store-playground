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
