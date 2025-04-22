import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';
import { login } from '../../store/auth/operations.js';
import { loginValidationSchema } from '../../validations/loginValidation.js';

import { IoMdLock } from 'react-icons/io';
import { IoMail } from 'react-icons/io5';

import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onSubmit',
  });

  const handleFormSubmit = data => dispatch(login(data));

  return (
    <div className={css.loginWrap}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={css.loginForm}>
        <img src={logoSvg} alt="Logo" className={css.formLogo} />

        <div className={css.formGroup}>
          <label className={css.loginLabel}>
            <IoMail className={css.logoIcon} size={24} />

            <input
              {...register('email')}
              type="email"
              className={css.loginField}
              placeholder="E-mail"
            />
          </label>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
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
          </label>
          {errors.password && <p className={css.error}>{errors.password.message}</p>}
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
