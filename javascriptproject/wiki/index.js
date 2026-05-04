const searchForm = document.getElementById('search-form')  // Get the search form element
const searchInput = document.getElementById('search-input')  // Get the search input field
const searchResults = document.getElementById('search-results')  // Get the container for displaying results

// Theme toggler elements
const themeToggler = document.getElementById('theme-toggler')  // Get the theme toggle button
const body = document.body  // Get the body element for theme changes


async function searchWikipedia(query) {
  // Convert the raw query text into a URL-safe string
  const encodedQuery = encodeURIComponent(query);
  // Build the Wikipedia API request URL using the encoded search term
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;

  // Send the request and wait for the Wikipedia response
  const response = await fetch(endpoint);
  // If the response is not OK, throw an error so the caller can handle it
  if (!response.ok) {
    throw new Error('Failed to fetch search results from Wikipedia API');
  }

  const json = await response.json();
  return json;

}

function displayResults(results) {
  searchResults.innerHTML = '';  // Clear previous search results
  results.forEach((result) => {  // Loop through each search result
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;  // Construct the Wikipedia page URL using page ID
    const titleLink = `<a href="${url}" target="_blank" rel="noopener">${result.title} </a>`;  // Create a link for the title
    const urlLink = `<a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>`;  // Create a link for the URL

    const resultItem = document.createElement("div");  // Create a div for this result item
    resultItem.className = "result-item";  // Set the class for styling
    resultItem.innerHTML = `  
        <h3 class="result-title">${titleLink}</h3>
        ${urlLink}
        <p class="result-snippet">${result.snippet}</p>
        `;
// Set the inner HTML with title, URL, and snippet
    searchResults.appendChild(resultItem);  // Add the result item to the results container
  });
}


searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();  // Prevent the default form submission behavior

    const query = searchInput.value.trim();  // Get the trimmed search query from input
    if (!query) {  // Check if the query is empty
        searchResults.innerHTML = "<p> Please enter a valid search term </p>";  // Show error message
        return;  // Exit early
    }

    searchResults.innerHTML = "<div class = 'spinner'>Loading...</div>";  // Show loading spinner

    try {
        const results = await searchWikipedia(query);  // Fetch search results from Wikipedia

        if (results.query.searchinfo.totalhits == 0) {  // Check if no results found
            searchResults.innerHTML = "<p> No results found. </p>";  // Show no results message
        } else {
            displayResults(results.query.search);  // Display the search results
        }
    } catch (error) {
        console.error(error);  // Log the error to console
        searchResults.innerHTML = ' <p> An error occured while searching. Please try again later </p>';  // Show error message
    }
});

// Event listener for the theme toggler
themeToggler.addEventListener("click", () => {
  body.classList.toggle("dark-theme");  // Toggle the dark-theme class on the body
  if (body.classList.contains("dark-theme")) {  // Check if dark theme is active
    themeToggler.textContent = "Dark";  // Update button text to "Dark"
    themeToggler.style.background = "#fff";  // Set button background to white
    themeToggler.style.color = "#333";  // Set button text color to dark
  } else {
    themeToggler.textContent = "Light";  // Update button text to "Light"
    themeToggler.style.border = "2px solid #ccc";  // Add border for light theme
    themeToggler.style.color = "#333";  // Set button text color to dark
  }
});