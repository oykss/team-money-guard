import * as Yup from 'yup';

export const patchUserValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, 'Username should have at least 3 characters')
    .max(33, 'Username should have at most 33 characters')
    .required('Username is required'),
});
