import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindId.css';

const FindId = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
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

      console.log('아이디 찾기 요청 준비 완료:', {
        name: form.name,
        phone: sanitizedPhone,
      });

      alert('아이디가 확인되었습니다!');

      navigate('/login');

    } catch (error) {
      console.error('아이디 찾기 오류:', error);
      alert('아이디 찾기에 실패했습니다.');
    }
  };

  return (
    <div className="findid-container">
      <h2 className="findid-title">아이디 찾기</h2>

      <form className="findid-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="findid-input"
          placeholder="이름"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="findid-input"
          placeholder="전화번호 (- 없이 숫자만 입력)"
          required
        />
        <div className="findid-divider" />
        <button type="submit" className="button button--primary">아이디 찾기</button>
      </form>
    </div>
  );
};

export default FindId;
