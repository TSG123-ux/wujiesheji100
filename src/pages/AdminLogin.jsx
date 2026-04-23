import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  // 生成 CSRF token
  useEffect(() => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('csrfToken', token);
    setCsrfToken(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 验证 CSRF token
    const storedToken = sessionStorage.getItem('csrfToken');
    if (!storedToken || storedToken !== csrfToken) {
      setError('CSRF 验证失败，请刷新页面重试');
      return;
    }
    
    // 管理员账号密码验证
    // 账号：puxuzhen，密码：TSG200554tsg
    if (username === 'puxuzhen' && password === 'TSG200554tsg') {
      // 保存登录状态到会话存储
      sessionStorage.setItem('adminLoggedIn', 'true');
      // 跳转到管理后台
      navigate('/admin');
    } else {
      setError('账号或密码错误');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>管理员登录</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <div className="form-group">
            <label htmlFor="username">账号</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn login-btn">
            登录
          </button>
        </form>
        <div className="login-footer">
          <p><Link to="/">返回首页</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;