import style from './UpdateInfo.module.css'
import profileImage from '../../assets/default_image.jpg';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';


export default function UpdateInfo() {
  const { contextUserData } = useOutletContext();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (contextUserData) {
      reset({
        name: contextUserData.name,
        nickname: contextUserData.nickname,
        email: contextUserData.email,
        info: contextUserData.info,
        contact: contextUserData.contact
      })
    }
  }, [contextUserData, reset])
  const navigate = useNavigate();
  const toMain = () => {
    navigate('/users/mypage');
  }

  const onSubmit = (data) => { console.log(data) }
  return (
    <form className={style.updateInfoContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.imageBox}>
        <img src={profileImage} alt="" />
        <button type="file">업로드</button>
      </div>
      <div className={style.inputContainer}>
        <input type="text" name="name" placeholder={`기존 데이터 : ${contextUserData.name}`} {...register('')} />
        <input type="text" name="nickname" placeholder={`기존 데이터 : ${contextUserData.nickname}`} {...register('')} />
        <input type="email" name="email" placeholder={`기존 데이터 : ${contextUserData.email}`} {...register('')} />
        <textarea name="info" placeholder={`기존 데이터 : ${contextUserData.info}`} {...register('')}></textarea>
        <input type="tel" name="contact" placeholder={`기존 데이터 : ${contextUserData.contact}`} {...register('')} />
        <input type="password" name="password" placeholder='비밀번호' {...register('')} />
        <input type="password" name="checkPassword" placeholder='비밀번호 확인' {...register('')} />
      </div>
      <hr />
      <div className={style.buttonContainer}>
        <button type="submit" onClick={toMain}>수정하기</button>
        <button type="reset">다시쓰기</button>
      </div>
    </form>
  )
}
