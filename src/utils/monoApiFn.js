import monoApi from '../service/index.js';

export async function getCurrency() {
  const ONE_HOUR = 60 * 60 * 1000;

  const cached = localStorage.getItem('currencyInfo');
  if (cached) {
    const savedInfo = JSON.parse(cached);

    if (Date.now() - savedInfo.time < ONE_HOUR) {
      return savedInfo.currency;
    }
  }
  try {
    const res = monoApi.get();
    const data = res.data;

    //find appropriate currency rates
    const usd = data.find(item => {
      return item.currencyCodeA === 840 && item.currencyCodeB === 980;
    });
    const euro = data.find(item => {
      return item.currencyCodeA === 978 && item.currencyCodeB === 980;
    });
    const currencyRates = {
      usdSell: usd?.rateSell,
      usdBuy: usd?.rateBuy,
      euroSell: euro?.rateSell,
      euroBuy: euro?.rateBuy,
    };

    localStorage.setItem(
      'currencyInfo',
      JSON.stringify({ currency: currencyRates, time: Date.now() })
    );

    return currencyRates;
  } catch (error) {
    return error.message;
  }
}
