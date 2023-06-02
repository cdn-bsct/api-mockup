let queryData = null;
let fetch_url = "https://staging-pricing.petco.com"
// GQL Query Elements
let locationId = 6989;
let skuId = 2471105;

async function itemQuery(location, sku) {
  await fetch(fetch_url, {
    method: "POST",
    headers: {
      "x-api-key": "X5hbNvtra15hv69pH7ZK23QCxK5g0Z1m6CjR27VU",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query {
                  getPriceByLocation(locationIds: "${location}", skuIds: "${sku}") {
                    data {
                      location
                      item
                      listPrice
                      salePrice
                      basePrice
                      recommendedPrice
                      rdPrice
                      markdownPrice
                      lastUpdatedDateTime
                      createdDateTime
                      boposPrice
                    }
                  }
                }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => (queryData = res.data.getPriceByLocation.data[0]))
    .catch((err) => console.log(err));
}

async function changePrice(data) {
  console.log(data.recommendedPrice);
  let el = document.getElementsByClassName("zyTvb");
  el[0].innerHTML = `$${data.recommendedPrice}`;
}

async function updatePrice() {
  await itemQuery(locationId, skuId);
  await changePrice(queryData);
}

updatePrice();

setInterval(async function () {
  updatePrice();
}, 30000);
