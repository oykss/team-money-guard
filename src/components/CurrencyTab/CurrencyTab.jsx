import { useEffect, useState } from 'react';
import { getCurrency } from '../../utils/monoApiFn';
import css from './CurrencyTab.module.css';

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
          <thead className={css.tableHeading}>
            <tr>
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

      <div className={css.chartDiv}></div>
    </div>
  );
}
