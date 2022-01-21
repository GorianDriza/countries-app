export async function getCountriesList(context) {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();

    return data;
}

export async function getCountryDetails(context) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${context}`);
    const data = await res.json();
    
    return data;
}

export async function getCountryByName(context) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${context}`);
    const data = await res.json();
    
    return data;
}