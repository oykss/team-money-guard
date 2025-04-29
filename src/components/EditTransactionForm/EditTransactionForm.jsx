import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { FaRegCalendarAlt, FaRegCommentDots } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { customStyles } from '../../constants/select-styles.js';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';
import { selectExpenseCategories } from '../../store/categories/selectors';
import { updTransaction } from '../../store/transactions/operations.js';
import { selectIsLoading } from '../../store/transactions/selectors.js';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import { transactionSchema } from '../../validations/transactions';
import css from './EditTransactionForm.module.css';

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
    const transactionId = _id;

    dispatch(updTransaction({ data, transactionId }))
      .unwrap()
      .then(() => handleClose());
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
              <input {...register('summ')} type="number" defaultValue={summ} />
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
