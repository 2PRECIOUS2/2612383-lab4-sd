document.addEventListener("DOMContentLoaded", function () {
    const countryForm = document.getElementById("country-form");
    const enterCountry = document.getElementById("enterCountry");
    const countryInfo = document.getElementById("country-info");
    const borderingCountries = document.getElementById("bordering-countries");
    const searchCountryButton = document.getElementById("SearchCountry");

    // Listen for a click event on the search button
    searchCountryButton.addEventListener("click", async () => {
        const countryName = enterCountry.value.trim();

        if (!countryName) {
            alert("Please enter a country name.");
            return;
        }

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            if (!response.ok) {
                throw new Error("Country not found!");
            }
            const data = await response.json();
            displayCountryInfo(data[0]);
        } catch (error) {
            console.error("Error fetching country data:", error);
            countryInfo.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
            borderingCountries.innerHTML = "";
        }
    });

    // Function to display the country's information using bullet points
    function displayCountryInfo(country) {
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <ul>
                <li><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</li>
                <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
                <li><strong>Region:</strong> ${country.region}</li>
                <li><strong>Flag:</strong></li>
            </ul>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
        `;
        displayBorderingCountries(country.borders || []);
    }

    // Function to fetch and display bordering countries
    async function displayBorderingCountries(borders) {
        borderingCountries.innerHTML = "<h2>Bordering Countries</h2>";

        if (borders.length === 0) {
            borderingCountries.innerHTML += "<p>No neighboring countries.</p>";
            return;
        }

        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`);
            if (!response.ok) {
                throw new Error("Error fetching neighboring countries");
            }
            const neighboringCountries = await response.json();

            borderingCountries.innerHTML += `<ul>${neighboringCountries.map(country => `
                <li>
                    <strong>${country.name.common}</strong><br>
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="50">
                </li>
            `).join("")}</ul>`;
        } catch (error) {
            console.error("Error fetching neighboring countries:", error);
            borderingCountries.innerHTML += "<p style='color:red;'>Error loading neighboring countries.</p>";
        }
    }
});

