import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmPasswordMatchBar from '../ConfirmPasswordMatchBar/ConfirmPasswordMatchBar.jsx';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import { selectIsLoading } from '../../store/auth/selectors';

import { IoMdLock } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { IoMail } from 'react-icons/io5';
import logoSvg from '../../assets/logo.svg';

import { registerValidationSchema } from '../../validations/registerValidation.js';
import { ROUTES } from '../../constants/index.js';
import { register } from '../../store/auth/operations.js';
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
    <div className={css.registerWrap}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={css.registerForm}>
        <img src={logoSvg} alt="Logo" className={css.formLogo} />

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoPerson className={css.logoIcon} size={24} />

            <input
              {...formRegister('name')}
              type="text"
              className={css.registerField}
              placeholder="Name"
            />
          </label>
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoMail className={css.logoIcon} size={24} />

            <input
              {...formRegister('email')}
              type="email"
              className={css.registerField}
              placeholder="E-mail"
            />
          </label>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoMdLock className={css.logoIcon} size={24} />

            <input
              {...formRegister('password')}
              type="password"
              className={css.registerField}
              placeholder="Password"
            />
          </label>
          {errors.password && <p className={css.error}>{errors.password.message}</p>}
        </div>

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoMdLock className={css.logoIcon} size={24} />

            <input
              {...formRegister('_confirmPassword')}
              type="password"
              className={css.registerField}
              placeholder="Confirm password"
            />
          </label>

          <ConfirmPasswordMatchBar
            password={password}
            confirmPassword={confirmPassword}
          />
          {errors._confirmPassword && (
            <p className={css.error}>{errors._confirmPassword.message}</p>
          )}
        </div>

        <LoadingBtn type="submit" isLoading={isLoading} className={css.registerBtn}>
          register
        </LoadingBtn>
        <Link to="/login" className={css.registerLink}>
          log in
        </Link>
      </form>
    </div>
  );
}
