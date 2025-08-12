const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD"];
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

// Populate dropdowns
currencies.forEach((currency) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.text = option2.text = currency;
  fromDropDown.add(option1);
  toDropDown.add(option2);
});

// Set defaults
fromDropDown.value = "USD";
toDropDown.value = "INR";

const convertCurrency = () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const api = `https://v6.exchangerate-api.com/v6/12fe7eabf4862511edcfe12a/latest/${fromCurrency}`;

  fetch(api)
    .then((resp) => resp.json())
    .then((data) => {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = amount * rate;
      result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch((err) => {
      console.error("API fetch error:", err);
      alert("Error fetching exchange rates. Please try again later.");
    });
};

document.getElementById("convert-button").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
