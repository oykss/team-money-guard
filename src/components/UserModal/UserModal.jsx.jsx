import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import logoSvg from '../../assets/logo.svg';
import {
  updateUserName,
  updateUserPhoto,
  currentUser,
} from '../../store/auth/operations';
import { selectIsLoading, selectUser } from '../../store/auth/selectors';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import Modal from '../../ui/Modal/Modal';
import { useMediaPoints } from '../../hooks/useMediaPoints';
import { FaPlus } from 'react-icons/fa6';
import defaultAvatar from '../../assets/avatar-placeholder.png';
import css from './UserModal.module.css';
import toast from 'react-hot-toast';

export default function ModalUserUpdate({ onClose }) {
  const { isMobile } = useMediaPoints();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name || '',
    },
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user.photo);

  useEffect(() => {
    reset({ name: user.name });
    setPhotoPreview(user.photo);
    setPhotoFile(null);
  }, [user, reset]);

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    reset({ name: user.name });
    setPhotoPreview(user.photo);
    setPhotoFile(null);
    onClose();
  };

  const onSubmit = async data => {
    try {
      let wasUpdated = false;

      if (data.name && data.name !== user.name) {
        await dispatch(updateUserName({ name: data.name })).unwrap();
        wasUpdated = true;
      }

      if (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);
        await dispatch(updateUserPhoto(formData)).unwrap();
        wasUpdated = true;
      }

      if (wasUpdated) {
        await dispatch(currentUser());
      }

      handleClose();
    } catch (error) {
      console.error('Failed to update user', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <Modal closeFn={handleClose} className={css.modal}>
      {isLoading && (
        <div className={css.loadingOverlay}>
          <div className={css.spinner}></div>
        </div>
      )}

      <h2 className={css.mainText}>Edit profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarWrap}>
          <label className={css.avatarLabel}>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <img
              src={photoPreview || defaultAvatar}
              alt="Avatar preview"
              className={css.avatarPreview}
            />
            <div className={css.cameraIcon}>
              <FaPlus size={13} />
            </div>
          </label>
        </div>
        <div className={css.inputWrapper}>
          <input
            type="text"
            className={`${css.input} ${errors.name ? css.errorInput : ''}`}
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' },
              maxLength: { value: 33, message: 'Name must be at most 33 characters' },
              pattern: {
                value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-\s]+$/,
                message: 'Error: You can add only letters',
              },
            })}
          />
          {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
        </div>
        <LoadingBtn isLoading={isLoading} className={css.saveBtn} type="submit">
          Save
        </LoadingBtn>
      </form>
    </Modal>
  );
}
