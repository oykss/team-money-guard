import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../store/auth/operations.js';
import logoSvg from '../../assets/logo.svg';

import { MdOutlineMailOutline } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';

import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import css from './LoginForm.module.css';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must not be more than 12 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = async data => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      reset();
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.message === 'Invalid credentials') {
        toast.error('Incorrect email or password. Please try again.');
      } else {
        toast.error('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className={css.loginWrap}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={css.loginForm}>
        <img src={logoSvg} alt="Logo" className={css.formLogo} />

        <div className={css.formGroup}>
          <label className={css.loginLabel}>
            <MdOutlineMailOutline className={css.logoIcon} size={24} />

            <input
              {...register('email')}
              type="email"
              className={css.loginField}
              placeholder="E-mail"
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </label>
        </div>

        <div className={css.formGroup}>
          <label className={css.loginLabel}>
            <IoMdLock className={css.logoIcon} size={24} />

            <input
              {...register('password')}
              type="password"
              className={css.loginField}
              placeholder="Password"
            />
            {errors.password && <p className={css.error}>{errors.password.message}</p>}
          </label>
        </div>

        <button type="submit" className={css.loginBtn}>
          LOG IN
        </button>
        <Link to="/register" className={css.loginLink}>
          REGISTER
        </Link>
      </form>
    </div>
  );
}
