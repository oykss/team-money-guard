import { useEffect, useState } from 'react';
import { getCurrency } from '../../utils/monoApiFn';
import css from './CurrencyTab.module.css';
import { Chart } from '../Chart/Chart';

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
    currency && (
      <div className={css.mainCurrencyDiv}>
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
        <div className={css.chartDiv}>
          <Chart />
          <p className={css.usdP}>{currency.usdBuy}</p>
          <p className={css.euroP}>{currency.euroBuy}</p>
        </div>
      </div>
    )
  );
}
