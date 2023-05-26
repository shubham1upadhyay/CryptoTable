const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";


// Fetch data using .then
function fetchDataWithThen() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.log(error));
}

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${crypto.image}" alt="${crypto.name}" width="30"></td>
      <td style="text-align:left">${crypto.name}</td>
      <td class="text-center">${crypto.symbol.toUpperCase()}</td>
      <td style="text-align:right">$${crypto.current_price}</td>
      <td style="text-align:left">$${crypto.total_volume}</td>
      <td>${crypto.price_change_percentage}</td>
      <td>Mkt Cap:$${crypto.market_cap}</td>
      
    `;
    tableBody.appendChild(row);
  });
}


// fetchDataWithThen();
fetchDataWithAsyncAwait(); 
