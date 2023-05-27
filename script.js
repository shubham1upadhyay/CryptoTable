const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let cryptoData = [];

// Fetch data using .then
// function fetchDataWithThen() {
//   fetch(API_URL)
//     .then(response => response.json())
//     .then(data => renderTable(data))
//     .catch(error => console.log(error));
// }

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    cryptoData = data;
    renderTable(data);
  } catch (error) {
    console.log(error);
  }
}


function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${crypto.image}" alt="${crypto.name}" width="30"></td>
    <td>${crypto.name}</td>  
    <td>${crypto.symbol.toUpperCase()}</td>
    <td>$${crypto.current_price}</td>
    <td>$${crypto.total_volume}</td>
    <td>${crypto.price_change_percentage_24h}%</td>
    <td>Mkt Cap: $${crypto.market_cap}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search Function 
function search(){
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchTerm) || crypto.symbol.toLowerCase().includes(searchTerm));
  renderTable(filteredData);
}

// Sort By Mkt Cap Function
function sortByMktCap(){
  const sortedData = cryptoData.slice().sort((a, b) => b.market_cap_rank - a.market_cap_rank);
  renderTable(sortedData);
}

// Sort By Percentage Function
function sortByPercentage(){
  const sortedData = cryptoData.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
}

// fetchDataWithThen();
fetchDataWithAsyncAwait(); 
