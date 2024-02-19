const key = 'IZ49YB2LNDMZPRFJ';
const baseUrl = 'https://www.alphavantage.co/query';
let rate='prout';



const getVNDExchangeRate = async () => {
    let requestParams = `?function=CURRENCY_EXCHANGE_RATE&from_currency=CAD&to_currency=VND&apikey=${key}`
    let urlToFetch = baseUrl + requestParams;

    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();

            rate = jsonResponse['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            
            document.getElementById('rate').innerHTML = `The current CAD to VND rate is ${rate} VND.`;
        }
    }
    catch (error) {
        document.getElementById('rate').innerHTML = e;
    }
}
const button = document.getElementById('exchange-rate-button');
button.addEventListener('click', getVNDExchangeRate());
