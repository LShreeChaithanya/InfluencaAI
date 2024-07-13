import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const HeaderContainer = styled.header`
  background-color: #1da1f2;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 1rem;
`;

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderContainer>
      <Logo to="/">InfluenceAI</Logo>
      <nav>
        {isAuthenticated ? (
          <>
            <NavLink to="/content-studio">Content Studio</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
            <NavLink to="/partnerships">Partnerships</NavLink>
            <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>
    </HeaderContainer>
  );
};

export default Header;