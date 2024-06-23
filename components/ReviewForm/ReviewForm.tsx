import cn from 'classnames';

import { ReviewFormProps } from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { IReviewForm, IReviewResponce } from './ReviewForm.interface';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API } from '@/helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, isOpen, className, ...props }: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data} = await axios.post<IReviewResponce>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        setSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch(error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)}
        {...props}
      >
        <Input
          className={styles.name}
          placeholder="Имя"
          {...register('name', {required: {value: true, message: 'Укажите имя'}})}
          error={errors.name}
          tabIndex={isOpen ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          className={styles.title}
          placeholder="Заголовок отзыва"
          {...register('title', {required: {value: true, message: 'Укажите заголовок'}})}
          error={errors.title}
          tabIndex={isOpen ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{required: {value: true, message: 'Поставьте оценку'}}}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpen ? 0 : -1}
              />  
            )}/>
        </div>
        <TextArea
          className={styles.text}
          placeholder="Текст отзыва"
          {...register('description', {required: {value: true, message: 'Оставьте отзыв'}})}
          error={errors.description}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button variant="primary" tabIndex={isOpen ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
          <span  className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {success && <div className={cn(styles.success, styles.messageBlock)} role="alert">
        <div  className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, Ваш отзыв будет опубликован после проверки</div>
        <button
          className={styles.close}
          onClick={() => setSuccess(false)}
          aria-label="Закрыть оповещение"
        >
          <CloseIcon />
        </button>

      </div>}
      {error && <div className={cn(styles.error, styles.messageBlock)} role="alert">
        <div>Что-то пошло не так. Попробуйте обновить страницу</div>
        <button
          className={styles.close}
          onClick={() => setError('')}
          aria-label="Закрыть оповещение"
        >
          <CloseIcon />
        </button>
      </div>}
    </form>
  );
};