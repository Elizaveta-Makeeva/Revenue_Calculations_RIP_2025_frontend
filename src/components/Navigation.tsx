import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path;
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <a 
          className="navbar-brand-custom"
          onClick={() => handleNavigation('/')}
        >
          <span className="logo-text">emastats</span>
        </a>

        <button 
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => handleNavigation('/')}
            >
              Главная
            </a>
          </li>
          <li>
            <a
              className={`nav-link ${isActive('/periods') ? 'active' : ''}`}
              onClick={() => handleNavigation('/periods')}
            >
              Периоды
            </a>
          </li>
          {/* Убрали ссылку на корзину выручки */}
          <li>
            <a className="nav-link disabled">
              Заявки
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;