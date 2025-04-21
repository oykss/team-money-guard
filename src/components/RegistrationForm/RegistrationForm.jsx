import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../store/auth/operations.js';
import PasswordStrengthBar from 'react-password-strength-bar';
import logoSvg from '../../assets/logo.svg';
import { IoPerson } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';

import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import css from './RegistrationForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must not be more than 12 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleFormSubmit = async data => {
    const { confirmPassword, ...payload } = data;
    try {
      await dispatch(registerThunk(payload)).unwrap();
      reset();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed.Please try again.');
    }
  };

  const getMatchProgress = () => {
    if (!confirmPassword) return 0;
    return password === confirmPassword ? 100 : 50;
  };

  return (
    <div className={css.registerWrap}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={css.registerForm}>
        <img src={logoSvg} alt="Logo" className={css.formLogo} />

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoPerson className={css.logoIcon} size={24} />

            <input
              {...register('name')}
              type="text"
              className={css.registerField}
              placeholder="Name"
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </label>
        </div>

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <MdOutlineMailOutline className={css.logoIcon} size={24} />

            <input
              {...register('email')}
              type="email"
              className={css.registerField}
              placeholder="E-mail"
            />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </label>
        </div>

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoMdLock className={css.logoIcon} size={24} />

            <input
              {...register('password')}
              type="password"
              className={css.registerField}
              placeholder="Password"
            />
            {errors.password && <p className={css.error}>{errors.password.message}</p>}
          </label>
          <PasswordStrengthBar password={password} className={css.strengthBar} />
        </div>

        <div className={css.formGroup}>
          <label className={css.registerLabel}>
            <IoMdLock className={css.logoIcon} size={24} />

            <input
              {...register('confirmPassword')}
              type="password"
              className={css.registerField}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className={css.error}>{errors.confirmPassword.message}</p>
            )}
          </label>
          <div className={css.progressBar}>
            <div
              className={css.progressFill}
              style={{ width: `${getMatchProgress()}%` }}
            ></div>
          </div>
        </div>

        <button type="submit" className={css.registerBtn}>
          register
        </button>
        <Link to="/login" className={css.registerLink}>
          log in
        </Link>
      </form>
    </div>
  );
}
