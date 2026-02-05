const fromCurrency = document.querySelector(".fromCurrency");
const toCurrency = document.querySelector(".toCurrency");
const convertedAmount = document.querySelector(".convertedAmount");
const amount = document.querySelector(".amount");
const resultElement = document.querySelector(".result");
const converterContainer = document.querySelector(".converter-container");

const countries = [
  { "code": "USD", "name": "United States" },
  { "code": "EUR", "name": "European Union" },
  { "code": "JPY", "name": "Japan" },
  { "code": "GBP", "name": "United Kingdom" },
  { "code": "AUD", "name": "Australia" },
  { "code": "CAD", "name": "Canada" },
  { "code": "CHF", "name": "Switzerland" },
  { "code": "CNY", "name": "China" },
  { "code": "SEK", "name": "Sweden" },
  { "code": "NZD", "name": "New Zealand" },
  { "code": "INR", "name": "India" },
  { "code": "BRL", "name": "Brazil" },
  { "code": "RUB", "name": "Russia" },
  { "code": "ZAR", "name": "South Africa" },
  { "code": "SGD", "name": "Singapore" },
  { "code": "HKD", "name": "Hong Kong" },
  { "code": "NOK", "name": "Norway" },
  { "code": "MXN", "name": "Mexico" },
  { "code": "KRW", "name": "South Korea" },
  { "code": "TRY", "name": "Turkey" },
  { "code": "AED", "name": "United Arab Emirates" }
];

countries.forEach(country => {
  const option1 = document.createElement("option");
  option1.value = country.code;
  option1.textContent = `${country.code} (${country.name})`;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = country.code;
  option2.textContent = `${country.code} (${country.name})`;
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

const getExchangeRate = async () => {
  const amtValue = parseFloat(amount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  resultElement.textContent = "Fetching Exchange Rates...";

  try {
    // fetch data
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();

    // correct property: data.rates[to]
    const conversionRate = data.rates[to];
    const total = amtValue * conversionRate;

    if(typeof conversionRate == 'undefined'){
      resultElement.textContent = "Exchanges rates data is not available for selected countries!!!"
      convertedAmount="";  
    }

    // show result
    convertedAmount.value = total.toFixed(2);
    resultElement.textContent = `${amtValue} ${from} = ${total.toFixed(2)} ${to}`;
  } catch (error) {
    converterContainer.innerHTML = `<h1>Error while fetching exchange rates!!!</h1>`;
  }
};

// event listener
amount.addEventListener("input", getExchangeRate);
fromCurrency.addEventListener("change", getExchangeRate);
toCurrency.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
