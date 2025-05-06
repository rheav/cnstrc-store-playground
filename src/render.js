export function renderBrowseResults(products, container) {
  container.innerHTML = "";
  // console.log(products);

  products.forEach((product) => {
    const card = document.createElement("div");
    // console.log(product);
    card.classList.add("product-card", "pb-15");
    card.innerHTML = `
      <img src="${product.data.image_url}" alt="${product.value}" class="h-full w-full">
      <h3 class="font-bold">${product.value}</h3>
      <p>$${product.data.price}</p>
    `;
    container.appendChild(card);
  });
}

export function renderFeaturedProduct(products, container) {
  if (!products.length) return;
  const product = products[0];
  // console.log(product.data.image_url);
  const featuredProductName = document.getElementById("featured-product-name");
  featuredProductName.textContent = product.value;
  container.innerHTML = `
    <div class="featured">
      <img src="${product.data.image_url}" alt="${product.value}" class="">
   
    </div>
  `;
}

//todo Tratar autocomplete
