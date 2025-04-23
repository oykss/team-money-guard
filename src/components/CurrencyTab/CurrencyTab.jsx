import { useEffect, useState } from 'react';
import { getCurrency } from '../../utils/monoApiFn';
import css from './CurrencyTab.module.css';
import chartLine from '../../assets/photo/currency-chart-line.png';
import chartFull from '../../assets/photo/currency-chart-full.png';

export default function CurrencyTab() {
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    async function currency() {
      const data = await getCurrency();
      setCurrency(data);
    }
    currency();
  }, []);

  return (
    <div className={css.mainCurrencyDiv}>
      {currency && (
        <table>
          <thead>
            <tr className={css.tableHeading}>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td>{currency.usdBuy}</td>
              <td>{currency.usdSell}</td>
            </tr>
            <tr>
              <td>EURO</td>
              <td>{currency.euroBuy}</td>
              <td>{currency.euroSell}</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className={css.chartDiv}>
        <img className={css.chartLineImg} src={chartLine} alt="Chart line" />
        <img src={chartFull} alt="Chart" />
      </div>
    </div>
  );
}
