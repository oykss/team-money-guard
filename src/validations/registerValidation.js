import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Username should have at least 3 characters')
    .max(33, 'Username should have at most 33 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .max(64, 'Email should have at most 64 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should have at least 8 characters')
    .max(64, 'Password should have at most 64 characters')
    .required('Password is required'),
  _confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
