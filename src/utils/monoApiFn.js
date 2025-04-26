import { apiMono } from '../service/index.js';

const ONE_HOUR = 60 * 60 * 1000;

export async function getCurrency() {
  const cached = JSON.parse(localStorage.getItem('currencyInfo') || 'null');
  const now = Date.now();

  if (cached && now < cached.time) return cached.currency;

  try {
    const { data } = await apiMono.get();

    if (!data) {
      throw new Error('No data received from API');
    }

    const usd = data.find(item => {
      return item.currencyCodeA === 840 && item.currencyCodeB === 980;
    });
    const euro = data.find(item => {
      return item.currencyCodeA === 978 && item.currencyCodeB === 980;
    });
    const currencyRates = {
      usdBuy: usd?.rateBuy.toFixed(2),
      usdSell: usd?.rateSell.toFixed(2),
      euroBuy: euro?.rateBuy.toFixed(2),
      euroSell: euro?.rateSell.toFixed(2),
    };

    localStorage.setItem(
      'currencyInfo',
      JSON.stringify({ currency: currencyRates, time: Date.now() + ONE_HOUR })
    );

    return currencyRates;
  } catch (error) {
    return error.message;
  }
}
