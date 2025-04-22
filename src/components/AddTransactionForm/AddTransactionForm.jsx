// import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Switcher from '../../ui/Switcher/Switcher';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../../validation/transactions';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/transactions/operations';
import { MenuItem, Select } from '@mui/material';

export default function AddTransactionForm() {
  const dispatch = useDispatch();

  const {
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
    },
  });

  const transactionType = watch('transactionType');

  const onSubmit = data => {
    console.log(data);

    dispatch(addTransaction(data));
  };

  return (
    <div>
      <Switcher transactionType={transactionType} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {transactionType === 'expense' && (
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select {...field} displayEmpty>
                <MenuItem value="" disabled>
                  Select category
                </MenuItem>
                <MenuItem>One</MenuItem>
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

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
