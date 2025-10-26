const movieContainer = document.getElementById('movieContainer');
const button = document.getElementById('searchBtn');

const fetchMoviedata = async (query) => {
  try {
    const data = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=52ff0202`);
    const response = await data.json();
    console.log(response);

    // Clear previous content
    movieContainer.innerHTML = '';

    // Create poster card
    const cardiv = document.createElement('div');
    cardiv.classList.add('card');
    cardiv.innerHTML = `
  <div class="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
    <img src="${response.Poster}" alt="${response.Title}" class="w-64 h-auto rounded-lg mb-4">
    <h2 class="text-black text-xl font-bold mb-2">${response.Title}</h2>
    <p class="text-black mb-1"><strong>Ratings:</strong> ${response.imdbRating}</p>
    <p class="text-black mb-1"><strong>Year:</strong> ${response.Year}</p>
    <p class="text-black mb-1"><strong>Genre:</strong> ${response.Genre}</p>
    <p class="text-black mb-1"><strong>Actors:</strong> ${response.Actors}</p>
  </div>
`;

    movieContainer.appendChild(cardiv);

  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};

// Initial fetch
fetchMoviedata("Avengers");
fetchMoviedata("thor");

// Search button
button.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('input').value.trim();
  if (input) fetchMoviedata(input);
});
