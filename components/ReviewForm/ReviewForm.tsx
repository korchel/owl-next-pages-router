import cn from 'classnames';

import { ReviewFormProps } from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import { IReviewForm } from './ReviewForm.interface';
import { useForm, Controller } from 'react-hook-form';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: { errors }} = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data)
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
        />
        <Input
          className={styles.title}
          placeholder="Заголовок отзыва"
          {...register('title', {required: {value: true, message: 'Укажите заголовок'}})}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{required: {value: true, message: 'Поставьте оценку'}}}
            render={({ field }) => (
              <Rating isEditable rating={field.value} setRating={field.onChange} ref={field.ref} error={errors.rating} />  
            )}/>
        </div>
        <TextArea
          className={styles.text}
          placeholder="Текст отзыва"
          {...register('text', {required: {value: true, message: 'Оставьте отзыв'}})}
          error={errors.text}
        />
        <div className={styles.submit}>
          <Button variant="primary">Отправить</Button>
          <span  className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div  className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, Ваш отзыв будет опубликован после проверки</div>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  );
};