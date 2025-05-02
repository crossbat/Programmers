import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import './ResetPwd.css';
// import axios from 'axios'; // 실제 연동 시 주석 해제

const ResetPwd = () => {
  const navigate = useNavigate(); // ✅ 추가

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedPhone = form.phone.replace(/[^0-9]/g, '');

    try {
      // 실제 API 요청 예시
      // const response = await axios.post('/api/reset-password', {
      //   ...form,
      //   phone: sanitizedPhone,
      // });

      console.log('비밀번호 초기화 요청 준비 완료:', {
        ...form,
        phone: sanitizedPhone,
      });

      // 🔁 비밀번호 재설정 페이지로 이동
      navigate('/newpwd');
    } catch (error) {
      console.error('비밀번호 초기화 오류:', error);
      alert('비밀번호 초기화에 실패했습니다.');
    }
  };

  return (
    <div className="resetpwd-container">
      <h2 className="resetpwd-title">비밀번호 초기화</h2>

      <form className="resetpwd-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="resetpwd-input"
          placeholder="이름"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="resetpwd-input"
          placeholder="이메일"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="resetpwd-input"
          placeholder="전화번호 (- 없이 숫자만 입력)"
          required
        />
        <div className="resetpwd-divider" />
        <button type="submit" className="button button--primary">비밀번호 초기화</button>
      </form>
    </div>
  );
};

export default ResetPwd;
