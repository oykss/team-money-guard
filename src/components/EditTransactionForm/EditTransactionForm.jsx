import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { transactionSchema } from '../../validations/transactions';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenseCategories } from '../../store/categories/selectors';
import DatePicker from 'react-datepicker';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import { selectIsLoading } from '../../store/transactions/selectors.js';
import { updTransaction } from '../../store/transactions/operations';
import css from './EditTransactionForm.module.css';
import clsx from 'clsx';
import { FaRegCalendarAlt, FaRegCommentDots } from 'react-icons/fa';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';

export default function EditTransactionForm({ transaction, handleClose }) {
  const { _id, date, transactionType, categoryId, comment, summ } = transaction;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      date: date,
      transactionType: transactionType,
      categoryId: categoryId,
      comment: comment,
      summ: summ,
    },
  });

  const { isMobile } = useMediaPoints();
  const expenses = useSelector(selectExpenseCategories);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const onSubmit = async data => {
    dispatch(updTransaction({ data, transactionId: _id }))
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
      <fieldset className={css.fieldset} disabled={isLoading}>
        <h2 className={css.title}>Edit Transaction</h2>
        <div className={css.wrap}>
          <p className={css.typeText}>
            <span
              style={{
                color: transactionType === 'income' ? '#FFB627' : 'var(--white-600)',
              }}
            >
              Income
            </span>
            /
            <span
              style={{
                color: transactionType === 'expense' ? '#FF868D' : 'var(--white-600)',
              }}
            >
              Expense
            </span>
          </p>
        </div>
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
                  onChange={selectedOption => field.onChange(selectedOption.value)}
                  options={expenses.map(exp => ({
                    value: exp._id,
                    label: exp.title,
                  }))}
                  styles={customStyles}
                />
                {errors.categoryId && <span className>{errors.categoryId.message}</span>}
              </div>
            )}
          />
        )}

        <div className={css.inputWrap}>
          <div className={css.wrap}>
            <label className={css.label}>
              <input
                {...register('summ')}
                type="number"
                step="0.01"
                min="0.01"
                defaultValue={summ}
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
                </label>
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

        <LoadingBtn type="submit" isLoading={isLoading}>
          Save
        </LoadingBtn>
        <button type="button" onClick={handleClose} className={css.cancelBtn}>
          Cancel
        </button>
      </fieldset>
    </form>
  );
}
