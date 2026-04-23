import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          无界设计
        </Link>
        
        {/* 移动端菜单按钮 */}
        <div 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* 导航链接 */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/client-login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            客户登录
          </Link>
          <Link to="/client-dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            客户中心
          </Link>
          <Link to="/designer-login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            设计师登录
          </Link>
          <Link to="/designer-orders" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            我的订单
          </Link>
          <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            管理后台
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;