import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Switcher from '../../ui/Switcher/Switcher';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../../validation/transactions';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../store/transactions/operations';
import { MenuItem, Select } from '@mui/material';
import css from './AddTransactionForm.module.css';
import {
  selectIncomeCategories,
  selectExpenseCategories,
} from '../../store/categories/selectors.js';

export default function AddTransactionForm({ handleClose }) {
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      transactionType: 'expense',
      date: new Date(),
      categoryId: '',
      comment: ' ',
    },
  });

  const transactionType = watch('transactionType');
  const incomes = useSelector(selectIncomeCategories);
  const expenses = useSelector(selectExpenseCategories);
  const onSubmit = data => {
    if (transactionType === 'income') {
      if (incomes && incomes.length > 0) {
        data.categoryId = incomes[0]._id;
      }
    }
    dispatch(addTransaction(data));
    reset();
    handleClose();
  };

  return (
    <div>
      <h3 className={css['modal-title']}>Add Transaction</h3>
      <Switcher
        value={transactionType}
        onChange={val => setValue('transactionType', val)}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {transactionType === 'expense' && (
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select {...field} displayEmpty>
                <MenuItem value="" disabled className={css['select-item']}>
                  Select a category
                </MenuItem>
                {expenses.map(expense => (
                  <MenuItem key={expense._id} value={expense._id}>
                    {expense.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        )}

        {errors.categoryId && <p>{errors.categoryId.message}</p>}

        <input {...register('summ')} type="number" />
        {errors.summ && <p>{errors.summ.message}</p>}

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              dateFormat="dd-MM-yyyy"
            />
          )}
        />
        {errors.date && <p>{errors.date.message}</p>}

        <textarea {...register('comment')} />
        {errors.comment && <p>{errors.comment.message}</p>}

        <div className={css['btn-box']}>
          <button type="submit" className={css['btn']}>
            Add
          </button>
          <button
            type="button"
            className={`${css.btn} ${css.cancel}`}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
