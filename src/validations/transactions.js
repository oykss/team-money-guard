import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  transactionType: yup
    .string()
    .trim()
    .required('Transaction type is required')
    .oneOf(
      ['income', 'expense'],
      'Transaction type must be either "income" or "expense"'
    ),

  categoryId: yup.string().when('transactionType', {
    is: 'expense',
    then: schema => schema.required('Category ID is required'),
    otherwise: schema => schema.notRequired(),
  }),

  summ: yup
    .number()
    .required('Amount is required')
    .min(0.01, 'Amount must be at least 0.01'),

  date: yup.date().typeError('Date must be a valid date-time string'),

  comment: yup.string().trim().max(300, 'Comment must be at most 300 characters'),
});
