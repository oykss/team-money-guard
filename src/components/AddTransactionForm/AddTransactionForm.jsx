import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { FaMoneyBillWave, FaRegCalendarAlt, FaRegCommentDots } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  selectExpenseCategories,
  selectIncomeCategories,
} from '../../store/categories/selectors.js';
import { addTransaction } from '../../store/transactions/operations';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn.jsx';
import Switcher from '../../ui/Switcher/Switcher';
import { transactionSchema } from '../../validations/transactions.js';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './AddTransactionForm.module.css';

export default function AddTransactionForm({ handleClose }) {
  const dispatch = useDispatch();
  const { isMobile } = useMediaPoints();
  const incomes = useSelector(selectIncomeCategories);
  const expenses = useSelector(selectExpenseCategories) ?? [];

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
      categoryId: null,
    },
  });

  const transactionType = watch('transactionType');

  const onSubmit = data => {
    if (transactionType === 'income' && incomes && incomes.length > 0)
      data.categoryId = incomes[0]._id;

    if (!data.comment || data.comment.trim() === '') data.comment = '-';

    dispatch(addTransaction(data))
      .unwrap()
      .then(() => handleClose());
  };

  const customStyles = {
    control: (_, { isFocused }) => ({
      display: 'flex',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      borderStyle: 'none',
      border: isFocused
        ? '1px solid rgba(255, 255, 255, 0.6)'
        : '1px solid rgba(255, 255, 255, 0.2)',
      outline: 'none',
      color: 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer',
      transition: 'all 200ms ease',
      '&:hover': {
        border: '1px solid rgba(255, 255, 255, 0.6)',
      },
    }),
    menu: base => ({
      ...base,
      background:
        'linear-gradient(180deg, rgba(83, 61, 186), rgba(80, 48, 154), rgba(106, 70, 165), rgba(133, 93, 175))',
      borderRadius: '8px',
      marginTop: '0px',
      overflow: 'hidden',
      backdropFilter: 'blur(8px)',
    }),
    menuList: base => ({
      ...base,
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
      },
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? 'rgba(162, 123, 255, 0.3)' : 'transparent',
      color: isFocused ? '#FF868D' : '#fff',
      padding: '10px 15px',
      transition: 'all 100ms ease',
      cursor: 'pointer',
    }),
    singleValue: base => ({
      ...base,
      color: 'rgba(255, 255, 255, 0.6)',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base, { isFocused }) => ({
      ...base,
      color: isFocused ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)',
      transition: 'color 200ms ease',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={css.fieldset}>
        <h2 className={css.title}>Add Transaction</h2>

        <Switcher
          value={transactionType}
          onChange={val => setValue('transactionType', val)}
          className={css.switcher}
        />

        {transactionType === 'expense' && (
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <div className={css.wrap}>
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
                {errors.categoryId && (
                  <span className={css.error}>{errors.categoryId.message}</span>
                )}
              </div>
            )}
          />
        )}

        <div className={css.inputWrap}>
          <div className={css.wrap}>
            <label className={css.label}>
              <FaMoneyBillWave className={css.icon} size={28} />
              <input
                {...register('summ')}
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.01"
              />
            </label>
            {errors.summ && <span className={css.error}>{errors.summ.message}</span>}
          </div>

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <div className={css.wrap}>
                <label className={css.label}>
                  <DatePicker
                    className={css.datePicker}
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="dd-MM-yyyy"
                  />
                  <FaRegCalendarAlt className={clsx(css.icon, css.iconDate)} size={28} />
                </label>{' '}
                {errors.date && <span className={css.error}>{errors.date.message}</span>}
              </div>
            )}
          />
        </div>

        <div className={clsx(css.wrap, css.comment)}>
          <label className={css.label}>
            {!isMobile && <FaRegCommentDots className={css.icon} size={24} />}
            <textarea {...register('comment')} placeholder="Comment" />
          </label>
          {errors.comment && <span className={css.error}>{errors.comment.message}</span>}
        </div>

        <LoadingBtn type="submit">Add</LoadingBtn>
        <button
          type="button"
          onClick={handleClose}
          className={clsx(css.cancelBtn, 'btn-pr-effect')}
        >
          cancel
        </button>
      </fieldset>
    </form>
  );
}
