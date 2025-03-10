document.addEventListener("DOMContentLoaded", function (){
const CountryForm = document.getElementById("country-form")
const enterCountry = document.getElementById("EnterCountry");
const countryInfo = document.getElementById("country-info");
const BorderingCountries = document.getElementById("bordering-countries")

const searchCountries = document.getElementById("CounntryName");

searchCountries.addEventListener("countryName", async => {

    const countryName = input.valueOf.trim();
    if(!countryName){
        alert("please enter a country name");
        return;
    }

    async function getCountryData(countryName) {
        const url ="ttps://restcountries.com/";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data[0];  
        } catch (error) {
            console.error(error);
            alert("Country not found");
        }
    }
      
});

});    
   

