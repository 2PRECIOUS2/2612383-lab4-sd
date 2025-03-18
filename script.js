document.addEventListener("DOMContentLoaded", function () {
    const countryForm = document.getElementById("country-form");
    const enterCountry = document.getElementById("enterCountry");
    const countryInfo = document.getElementById("country-info");
    const borderingCountries = document.getElementById("bordering-countries");
    const searchCountryButton = document.getElementById("SearchCountry");
    
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
            console.error("Error fetching country data:", error)
        }
    });

});

