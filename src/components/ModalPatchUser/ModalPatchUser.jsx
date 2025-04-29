import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPlus, FaRegUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, updateUserPhoto } from '../../store/auth/operations';
import { selectIsLoading, selectUser } from '../../store/auth/selectors';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import Modal from '../../ui/Modal/Modal';
import { patchUserValidationSchema } from '../../validations/patchUser';
import Avatar from '../Avatar/Avatar';
import css from './ModalPatchUser.module.css';

export default function ModalPatchUser({ closeMenu }) {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(patchUserValidationSchema),
    defaultValues: {
      name,
    },
  });

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setValue('photo', file);
    }
  };

  const submit = async () => {
    const { name } = getValues();

    try {
      if (photoFile) await dispatch(updateUserPhoto({ photo: photoFile })).unwrap();

      if (isDirty) await dispatch(updateUserName({ name })).unwrap();

      closeMenu();
    } catch (error) {
      toast.error(`Failed to update profile: ${error}`);
    }
  };

  return (
    <Modal closeFn={closeMenu}>
      <form onSubmit={handleSubmit(submit)}>
        <fieldset className={css.fieldset}>
          <label className={css.labelAvatar}>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhoto}
              className="visually-hidden"
            />
            {!photoPreview ? (
              <Avatar className={css.avatar} />
            ) : (
              <img
                src={photoPreview}
                alt="Avatar preview"
                className={css.avatarPreview}
              />
            )}

            <div className={css.iconPlus}>
              <FaPlus size={16} color="#161616" />
            </div>
          </label>

          <div className={css.wrap}>
            <label className={css.label}>
              <FaRegUser className={css.icon} size={24} />

              <input {...register('name')} type="text" placeholder="Name" />
            </label>
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <LoadingBtn
            type="submit"
            className={clsx(css.btn)}
            isLoading={isLoading}
            disabled={!photoFile && !isDirty}
          >
            Save
          </LoadingBtn>
        </fieldset>
      </form>
    </Modal>
  );
}
