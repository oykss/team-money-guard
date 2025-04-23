import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectIsLoading } from '../../store/auth/selectors';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';

import logoSvg from '../../assets/logo.svg';
import { login } from '../../store/auth/operations.js';
import { loginValidationSchema } from '../../validations/loginValidation.js';

import { IoMdLock } from 'react-icons/io';
import { IoMail } from 'react-icons/io5';

import css from './LoginForm.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <fieldset className={css.fieldset} disabled={isLoading}>
        <img src={logoSvg} alt="Logo" className={css.logo} />

        <div className={css.wrap}>
          <label className={css.label}>
            <IoMail className={css.icon} size={24} />

            <input {...register('email')} type="email" placeholder="E-mail" />
          </label>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <IoMdLock className={css.icon} size={24} />
            <input {...register('password')} type="password" placeholder="Password" />
          </label>
          {errors.password && <p className={css.error}>{errors.password.message}</p>}
        </div>

        <LoadingBtn isLoading={isLoading} type="submit" className={css.loginBtn}>
          LOG IN
        </LoadingBtn>
        <Link
          to="/register"
          className={css.registerLink}
          onClick={e => (isLoading ? e.preventDefault() : null)}
        >
          REGISTER
        </Link>
      </fieldset>
    </form>
  );
}
