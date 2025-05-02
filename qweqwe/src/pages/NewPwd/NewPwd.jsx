import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPwd.css';


const NewPwd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      console.log('비밀번호 재설정 요청:', form);
      alert('비밀번호가 성공적으로 변경되었습니다.');

      navigate('/login');

    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className="newpwd-container">
      <h2 className="newpwd-title">비밀번호 재설정</h2>

      <form className="newpwd-form" onSubmit={handleSubmit}>
        <input
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          className="newpwd-input"
          placeholder="새 비밀번호"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="newpwd-input"
          placeholder="새 비밀번호 확인"
          required
        />
        <div className="newpwd-divider" />
        <button type="submit" className="button button--primary">
          비밀번호 재설정
        </button>
      </form>
    </div>
  );
};

export default NewPwd;
