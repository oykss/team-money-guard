import { useEffect, useState } from 'react';
import Skeleton from '../../ui/Skeleton/Skeleton';
import { getCurrency } from '../../utils/monoApiFn';
import CurrencyChart from '../CurrencyChart/CurrencyChart';
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

  return currency ? (
    <div className={css.container}>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USD</td>
            <td>{currency?.usdBuy}</td>
            <td>{currency?.usdSell}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{currency?.euroBuy}</td>
            <td>{currency?.euroSell}</td>
          </tr>
        </tbody>
      </table>
      <div className={css.chart}>
        <CurrencyChart />
        <span className={css.usd}>{currency?.usdBuy}</span>
        <span className={css.euro}>{currency?.euroBuy}</span>
      </div>
    </div>
  ) : (
    <Skeleton className={css.skeleton} />
  );
}
