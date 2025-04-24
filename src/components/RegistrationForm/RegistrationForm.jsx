import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsLoading } from '../../store/auth/selectors';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';

import { IoMdLock } from 'react-icons/io';
import { IoMail, IoPerson } from 'react-icons/io5';
import logoSvg from '../../assets/logo.svg';

import { ROUTES } from '../../constants/index.js';
import { register } from '../../store/auth/operations.js';
import PasswordMatchIndicator from '../../ui/PasswordMatchIndicator/PasswordMatchIndicator.jsx';
import { registerValidationSchema } from '../../validations/registerValidation.js';
import css from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: 'onSubmit',
  });

  const password = watch('password');
  const confirmPassword = watch('_confirmPassword');

  const handleFormSubmit = data => {
    const { _confirmPassword, ...payload } = data;
    dispatch(register(payload))
      .unwrap()
      .then(() => navigate(ROUTES.LOGIN));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <fieldset className={css.fieldset} disabled={isLoading}>
        <img src={logoSvg} alt="Logo" className={css.logo} />

        <div className={css.wrap}>
          <label className={css.label}>
            <IoPerson className={css.icon} size={28} />
            <input {...formRegister('name')} type="text" placeholder="Name" />
          </label>

          {errors.name && <span className={css.error}>{errors.name.message}</span>}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <IoMail className={css.icon} size={28} />
            <input {...formRegister('email')} type="email" placeholder="E-mail" />
          </label>

          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <IoMdLock className={css.icon} size={28} />
            <input {...formRegister('password')} type="password" placeholder="Password" />
          </label>

          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={css.wrap}>
          <label className={css.label}>
            <IoMdLock className={css.icon} size={28} />
            <input
              {...formRegister('_confirmPassword')}
              type="password"
              placeholder="Confirm password"
            />
          </label>

          <PasswordMatchIndicator password={password} confirmPassword={confirmPassword} />
          {errors._confirmPassword && (
            <span className={css.error}>{errors._confirmPassword.message}</span>
          )}
        </div>

        <LoadingBtn type="submit" isLoading={isLoading} className={css.registerBtn}>
          register
        </LoadingBtn>
        <Link
          to="/login"
          className={css.loginLink}
          onClick={e => (isLoading ? e.preventDefault() : null)}
        >
          log in
        </Link>
      </fieldset>
    </form>
  );
}
