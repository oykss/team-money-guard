import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Switcher from '../../ui/Switcher/Switcher';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../../validations/transactions.js';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../store/transactions/operations';
import css from './AddTransactionForm.module.css';
import Select from 'react-select';
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
    if (!data.comment || data.comment.trim() === '') {
      data.comment = '-';
    }
    dispatch(addTransaction(data));
    reset();
    handleClose();
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(74, 86, 226, 0.1)',
      borderStyle: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: state.isFocused ? '0 0 0 1px #A27BFF' : 'none',
      color: '#FBFBFB',
      cursor: 'pointer',
    }),
    menu: base => ({
      ...base,
      background:
        'linear-gradient(180deg, rgba(83, 61, 186, 1), rgba(80, 48, 154, 1), rgba(106, 70, 165, 0.75), rgba(133, 93, 175, 0.19))',
      borderRadius: '8px',
      marginTop: '0px',
      overflow: 'hidden',
      zIndex: 5,
      backdropFilter: 'blur(8px)',
    }),
    menuList: base => ({
      ...base,
      padding: '12px 0',
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? 'rgba(162, 123, 255, 0.3)' : 'transparent',
      color: isFocused ? '#FF868D' : '#fff',
      padding: '10px 15px',
      cursor: 'pointer',
    }),
    singleValue: base => ({
      ...base,
      color: '#FBFBFB',
    }),
    dropdownIndicator: base => ({
      ...base,
      color: '#FBFBFB',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
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
              <Select
                {...field}
                value={expenses
                  .map(exp => ({ value: exp._id, label: exp.title }))
                  .find(option => option.value === field.value)}
                onChange={selectedOption => field.onChange(selectedOption?.value)}
                options={expenses.map(exp => ({
                  value: exp._id,
                  label: exp.title,
                }))}
                styles={customStyles}
                placeholder="Select a category..."
              />
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
