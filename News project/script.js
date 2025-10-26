const container = document.getElementById("news-container");
const countrySelect = document.getElementById("country");
const apiKey = "e2deb721fbb4b5956d5f0e0d3a5f43ef";

// ✅ Fetch News
const fetchNews = async (country = "in") => {
  container.innerHTML = `<p class='text-center text-gray-600 text-lg col-span-full'>Loading latest headlines...</p>`;

  try {
    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&country=${country}&max=9&token=${apiKey}`
    );
    const data = await res.json();

    container.innerHTML = ""; // clear old cards

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = `<p class='text-center text-gray-600 text-lg col-span-full'>No news found for this region.</p>`;
      return;
    }

    // ✅ Create cards
    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card bg-white rounded-xl shadow overflow-hidden flex flex-col";

      card.innerHTML = `
        <img src="${article.image}" alt="News Image" class="w-full h-48 object-cover">
        <div class="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h2 class="text-lg font-bold mb-2 text-gray-800">${article.title}</h2>
            <p class="text-gray-600 text-sm mb-3">${article.description || ""}</p>
          </div>
          <div class="mt-auto">
            <a href="${article.url}" target="_blank" 
               class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
               Read More →
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    container.innerHTML = `<p class='text-red-600 text-center text-lg col-span-full'>⚠️ Failed to load news. Try again later.</p>`;
  }
};

// ✅ Default country on load
fetchNews();

// ✅ Change news when user switches country
countrySelect.addEventListener("change", (e) => fetchNews(e.target.value));
