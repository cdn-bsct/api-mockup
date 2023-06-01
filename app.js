let queryData = null;
let fetch_url = "https://pricing-engine-staging-api.petc.com/graphql";
// GQL Query Elements
let locationId = 6989;
let skuId = 2471105;

async function itemQuery(location, sku) {
  await fetch(fetch_url, {
    method: "POST",
    headers: {
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
    .then((res) => (queryData = res.data.getPriceByLocation.data[0]));
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
