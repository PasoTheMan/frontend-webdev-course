let baseCurrency = 'EUR';

const isLoading = document.getElementById('isLoading');
isLoading.style.display = 'none';

document.getElementById( 'base' ).onchange = (e) =>{
    baseCurrency = e.target.value;      //e=event, target=element(select tag)
    const currencyIndicator = document.getElementById( 'currency-indicator' );
    if(baseCurrency === "EUR")
        currencyIndicator.innerHTML = '&euro;';     //Eurosign is also possible, but html entity is better
    else if(baseCurrency === "USD")
        currencyIndicator.innerHTML = '&dollar;';   //this and euro changes the euro/dollar sign in the form
};

const exchangeRatesAjax = new XMLHttpRequest();
exchangeRatesAjax.addEventListener('load', (e) => {

        const currencyList = document.getElementById('currency-list');
        currencyList.innerHTML = '';    //clears the list of previous items

        const sumValue = document.getElementById('sum').value;
        const exchangeRates = JSON.parse(exchangeRatesAjax.responseText);   //parses the JSON to js

        Object.entries(exchangeRates.rates).forEach((item) =>{
            const currencyName = item[0];
            const value = (item[1] * sumValue).toFixed(2);

            const listItemElement = document.createElement('li');
            listItemElement.innerHTML = `<div>${currencyName}</div><div>${value}</div>`
            currencyList.appendChild(listItemElement);
    } );

    isLoading.style.display = 'none';

} );

document.getElementById('currency-converter-form').onsubmit = (e) => {
    e.preventDefault();

    isLoading.style.display = 'flex';

    exchangeRatesAjax.open('GET','https://api.exchangeratesapi.io/latest?base=' + baseCurrency );
    exchangeRatesAjax.send();

    

};