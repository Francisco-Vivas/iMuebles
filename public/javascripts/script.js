document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("This was made with love!");

    const $priceInput = document.querySelector("#priceProducts");
    if ($priceInput) $priceInput.value /= 100;
  },
  false
);

function formatValues(id = "minPrice") {
  const $element = document.querySelector(`#${id}`);
  if (!$element) return;
  $element.onchange = (e) => {
    $element.value = parseFloat(e.target.value).toFixed(2);
  };
}

function sameParameters([key, value]) {
  document.querySelector(`#${key}`).value = value;
}
const params = new URLSearchParams(window.location.search);
for (const param of params) {
  if (param[0] === "category") continue;
  sameParameters(param);
}

formatValues("minPrice");
formatValues("maxPrice");
formatValues("priceProducts");
