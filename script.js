const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

async function fetchHotels() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();   
    const hotels = result.data;             
    console.log(hotels);                   
    displayHotels(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

function displayHotels(hotels) {
  const hotelList = document.getElementById("hotelList");
  hotelList.innerHTML = "";

  hotels.forEach(hotel => {
    const card = document.createElement("div");
    card.className = "hotel-card";

    card.innerHTML = `
      <img src="${hotel.thumbnail}" alt="${hotel.name}">
      <div class="info">
        <h3>${hotel.name}</h3>
        <p>📍 ${hotel.location}</p>
        <p>💲 Price: ${hotel.price}</p>
        <p>⭐ Rating: ${hotel.rating}</p>
        <p>${hotel.description.substring(0, 100)}...</p>
      </div>
    `;

    hotelList.appendChild(card);
  });
}

document.getElementById("searchBox").addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  const response = await fetch(API_URL);
  const result = await response.json();
  const hotels = result.data;
  const filtered = hotels.filter(hotel => hotel.name.toLowerCase().includes(query));
  displayHotels(filtered);
});

fetchHotels();
